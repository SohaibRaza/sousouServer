const UsersModel = require('../users/model/users');
const jwt = require('jsonwebtoken');
const passwordHashing = require('bcrypt');

/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */

exports.register = async (req, res)=>{
    // Password Hashing
    console.log(req.body);
    if (!req.body.password) return res.status(400).json({"ERROR": "Error IN Registering"})
    const salt = await passwordHashing.genSalt(10);
    const hashedPassword = await passwordHashing.hash(req.body.password, salt); // Generating Hash

    const addUser = new UsersModel({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "username": req.body.username,
        "password": hashedPassword,
        "email": req.body.email,
    });
    try {
        const userSaved = await addUser.save();  // Registering User
        res.status(200).json({"Registered": userSaved.username});
    } catch (error) {
        res.status(400).json({
            "Message": `Error Registering`,
            "Error": error
        }); // Error Handling
    }
};

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */

exports.login = async (req, res)=>{
    console.log(JSON.stringify(req.body, undefined , 4) );
    try {
        const checkEmail = await UsersModel.findOne({email : req.body.email});  // Verifying Email
        if (checkEmail) // If valid Email, Else Throw Error
        {
            console.log("AFTER CONNECTION: ", req.body)
            // Verifying Password
            const checkPassword = await passwordHashing.compare(req.body.password, checkEmail.password);
            console.log("Password", checkPassword);
            if(checkPassword) // if Valid Password, Else Throw Error
            {
                console.log(req.body)
                const token = jwt.sign({
                        id: checkEmail._id,
                        usernaem: checkEmail.username
                    },
                    process.env.TOKEN_SECRET
                );
                const user = {id: checkEmail._id, email: checkEmail.email, username: checkEmail.username};
                res.header("auth-token", token).json({msg : 'Successfully loggedIn', 'token': token, user: user});
            }
            else throw({'Error': 'Invalid Credentials'});
        }
        else{
            throw({'Error': 'Invalid Credentials'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
};