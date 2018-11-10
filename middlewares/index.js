const ApiResponse = require('../class/Response/ApiResponse');
const AuthHelper = require('../helper/AuthHelper');

class Middlewares {
    async verifyToken(req ,res, next) {
        try {
            const token = req.headers.authorization;
            req.profile = AuthHelper.verifyToken(token);
            next();
        } catch (error) {
            console.log(error);
            ApiResponse.error(error)(res);
        }
    }
}


module.exports = new Middlewares();