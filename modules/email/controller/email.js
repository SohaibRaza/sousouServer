const { error } = require('console');
const crypto = require('crypto');
const User = require('../../users/model/users');

exports.resetPassword = async (req, res) => {
	try {
		crypto.randomBytes(32, (err, buffer) => {
			if (error) {
				console.error("Crypto Token Error: ", error);
			}
			const token = buffer.toString('hex');
			await User.findOne({ email: req.body.email})
			.then( user => {


			})
		})

	} catch (error) {
		console.log("Reset Password Error: ", error);
		res.status(400).json({
			"error": error
		});
	}
};