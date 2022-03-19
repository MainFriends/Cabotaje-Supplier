const mysqlConnect = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = (req, res) => {
    const {EMAIL, PASSWORD} = req.body;

    const sp = 'CALL SP_LOGIN(?)';

    mysqlConnect.query(sp, [EMAIL], async (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            const [data] = result[0];
            const {COD_ROLE, FIRST_NAME, LAST_NAME, USER_PASSWORD} = data;
            
            const isPasswordCorrect = await bcrypt.compare(PASSWORD, USER_PASSWORD);
            
            if(isPasswordCorrect){
                //generar token
                const payload = {
                    COD_ROLE,
                    FIRST_NAME,
                    LAST_NAME
                }

                jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                    if(err){
                        res.status(500).send({message: 'Error al generar token'});
                    }else{
                        res.send({message: 'success', token});
                    }
                })
            }else{
                res.status(400).send({message: 'El email o contraseña son incorrectos.'});
            }
        }
    })
}

module.exports = {
    login
}