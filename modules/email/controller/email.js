const { error } = require('console');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../../users/model/users');

let transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "efff4d70b55103",
		pass: "8c0246176c4f77"
	}
});

exports.resetPassword = async (req, res) => {
	try {
		const email = req.params.email;
		console.log("EMAIL: ", email);
		transport.verify(function(error, success) {
			if (error) {
				console.log(error);
			} else {
				console.log('Server is ready to take our messages');
			}
		});
		// transport.sendMail({
		// 	to: 'sohaibraza000@gmail.com',
		// 	from: 'no-reply@sousou.com',
		// 	subject: 'Reset Password',
		// 	html: '<h1>You click the link to rest a new password</h1>'
		// }, (error, info) => {
		// 	if (error) {
		// 		return console.log(error);
		// 	}
		// 	console.log('Message sent: %s', info.messageId);
		// })
		crypto.randomBytes(32, (error, buffer) => {
			if (error) {
				console.error("Crypto Token Error: ", error);
			}
			const token = buffer.toString('hex');
			User.findOne({ email: email})
			.then( user => {
				if (!user) return res.status(400).json({error: 'Email not found!'});
				user.resetToken = token;
				user.expireToken = Date.now() + 3600000; // expire token after 1 hour
				console.log("USER: ", user);
				user.save().then( result => {
					transport.sendMail({
						to: user.email,
						from: 'no-reply@sousou.com',
						subject: 'Reset Password',
						html: `<h3>You can click the link to rest a password</h3>
							<p>
								Click this
								<a href="http://localhost:3001/${token}">link</a>
								to reset password.
							</p>
						`
					}, (error, info) => {
						if (error) {
							console.log(error);
							return res.status(400).json({error: error});
						}
						console.log('Message sent: %s', info.messageId);
					})
				})
			})
		})

	} catch (error) {
		console.log("Reset Password Error: ", error);
		res.status(400).json({
			"error": error
		});
	}
};