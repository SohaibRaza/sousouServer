const UsersModel = require('../model/users');
const group = require('../../group/model/group');

// Add user
exports.add = async (req, res) => {
	try {
		console.log("Request: ", req.body);
		const data = await UsersModel.insertMany(req.body)
		res.status(302).send("user successfully added");
	} catch (err) {
		console.log("Error: ", err);
		res.json({ message: err });
	}
}

// FIND User
exports.find = async (req, res) => {
	console.log("Request: ", req.params.id);
	try {
		const user = await UsersModel.findById(req.params.id)

		console.log(typeof(user));
		if (user) {
			console.log("User Profile:>> ",user);
			const userData = {
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				email: user.email
			}
			console.log("User Profile Data:>> ", userData);
			res.status(200).json(userData);
		} else {
			res.status(400).json({ unique_id: "No user found" });
		}
	} catch (error) {
		console.log('error finding user: ', error);
		res.status(400).json(error);
	}
}

// DELETE User
exports.delete = async (req, res) => {
	try {
		const deleteUser = await UsersModel.deleteOne({ unique_id: req.params.id });
		res.json({ deleted: "Item deleted Successfully" });
	} catch (error) {
		res.json(error);
	}
};

// UPDATE User
exports.update = async (req, res) => {
	try {
	} catch (error) {
		res.json(error);
	}
};


exports.generateGroupReferral = async (req, res) => {
	try {
		//Referral link could look for example like this: /register?referrer=${_id}, where ${_id} is user unique ID.
		//when someone want to join a group use => referral/:userId/:groupId
		let endpoint = 'localhost:5000/'; //  TODO: change it for production
		let userID = req.params.userID;
		let groupID = req.params.groupID;
		let responseJSON = {
			userId: userID,
			referralURL: endpoint+'/group/joingroup/'+userID+ '/'+groupID
		}
		res.status(200).json(responseJSON);


	} catch (error) {
		res.json(error);
	}
}