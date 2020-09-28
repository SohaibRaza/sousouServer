const jwt = require('jsonwebtoken');
const UsersModel = require('../modules/users/model/users');


const authorize = async (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.sendStatus(403);
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		//if (!verified) return res.sendStatus(403);
		const user = await UsersModel.findById(req.body.id);
		if (!user) return res.status(400).json({message: 'User not found'});
		if (user.role !== req.body.role) {
			return res.status(403).json({
				message: 'Forbidden! You are not authorized to access this resource.'
			});
		}
        req.user = verified;
		next();

	} catch (error) {
		res.status(400).json({
			message:'Error Occurred Authorizing User.',
			Error: error
		});
	}
};

module.exports = authorize;