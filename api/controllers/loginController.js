const mysqlConnect = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
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
            const {COD_USER, COD_ROLE, FIRST_NAME, LAST_NAME, USER_PASSWORD, COD_STATUS, DAT_EXP} = data;
            
            const isPasswordCorrect = await bcrypt.compare(PASSWORD, USER_PASSWORD);
            
            if(isPasswordCorrect){
                const DAT_EXP_FORMAT = moment(DAT_EXP).format('YYYY-MM-DD h:mm:ss a');
                const DAT_NOW = moment().format('YYYY-MM-DD h:mm:ss a');

                if(COD_STATUS === 2){
                    res.status(400).send({message: 'Sus credenciales de sesión estan desactivadas, favor contactar con el administrador.'});
                }
                
                if(DAT_NOW >= DAT_EXP_FORMAT){
                    res.status(400).send({message: 'Sus credenciales de sesión han expirado, favor contactar con el administrador.'});
                }

                //generar token
                const payload = {
                    COD_USER,
                    COD_ROLE,
                    FIRST_NAME,
                    LAST_NAME
                }

                jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '15h'}, (err, token) => {
                    if(err){
                        res.status(500).send({message: 'Error al generar token'});
                    }else{
                        res.send({FIRST_NAME, LAST_NAME, token});
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