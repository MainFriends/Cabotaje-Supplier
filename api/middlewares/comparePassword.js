const mysqlConnect = require('../config');
const bcrypt = require('bcrypt');

const comparePassword = (req, res, next) => {
    const {COD_USER} = req.user;
    const {LAST_USER_PASSWORD} = req.body;

    const sp = 'CALL SP_SEL_PASSWORD(?)';

    mysqlConnect.query(sp, [COD_USER], async (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            const [data] = result[0];
            const {USER_PASSWORD} = data;
            
            const isPasswordCorrect = await bcrypt.compare(LAST_USER_PASSWORD, USER_PASSWORD);
            
            if(isPasswordCorrect){
                next();
            }else{
                res.status(400).send({message: 'La contraseña ingresada es incorrecta.'});
            }
        }
    })
}

module.exports = comparePassword;