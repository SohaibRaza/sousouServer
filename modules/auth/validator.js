const jwt = require('jsonwebtoken');

function validator (req, res, next){
	const token = req.header('auth-token');
	if (!token) return res.sendStatus(403);
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		//if (!verified) return res.sendStatus(403);
        req.user = verified;
		next();

	} catch (error) {
		res.status(400).send('Error Occured');
	}
};

module.exports = validator;