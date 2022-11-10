const jwt = require("jsonwebtoken");

//juste pour voir si tu as un token (token apparait quand tu login)
const verifyToken = (req, res, next) => {
	//lis le token que tu as mis dans header avec le mot Bearer
	const authHeader = req.headers.token;
	//console.log(authHeader)
	//authHeader cest juste ton token
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		//token cest juste token mais sans Bearer

		//verify () decode ton token pour voir si tu as accés et que cest un token
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err) res.status(403).json("Token is not valid!");
			req.user = user;
			//obliger dutiliser next sinon fin de la fontion ne passe pas a celui dapres
			next();
		});
	} else {
		return res.status(401).json("No token bro");
	}
};

//cette fonction sert a voir si ton id et ton token se correspondent
const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("You are not alowed to do that!");
		}
	});
};

//voir si tu es admin et permets plus de chose avec ton token
const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json("You are not alowed to do that!");
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
