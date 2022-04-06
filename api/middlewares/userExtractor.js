const jwt = require('jsonwebtoken');
require('dotenv').config();

const userExtractor = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(authorization){
        //validar token
        const token = authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err){
                const {message} = err
                res.status(401).send({message});
            }else{
                req.user = user;
                next();
            }
        })
    }else{
        res.status(401).send({message: "Sin autorización"});
    }
}

module.exports = userExtractor; 