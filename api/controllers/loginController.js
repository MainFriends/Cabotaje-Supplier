const mysqlConnect = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

const login = (req, res) => {
    const {EMAIL, PASSWORD} = req.body;
    let NUM_ATTEMPS_PARSE;

    const procedure = 'CALL SP_SEL_SYSTEM_SETTINGS()';
            
    mysqlConnect.query(procedure, (error, result) => {
        if(error){
            res.status(200).send({message: 'Ha ocurrido un error al intentar iniciar sesión'})
        }else{
            const NUM_ATTEMPS_LOGIN = JSON.stringify(result[0]);
            NUM_ATTEMPS_PARSE = JSON.parse(NUM_ATTEMPS_LOGIN);
        }
    });

    const sp = 'CALL SP_LOGIN(?)';

    mysqlConnect.query(sp, [EMAIL], async (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            const [data] = result[0];
            const {COD_USER, COD_ROLE, FIRST_NAME, LAST_NAME, USER_PASSWORD, COD_STATUS, DAT_EXP, NUM_ATTEMPS} = data;
            
            const isPasswordCorrect = await bcrypt.compare(PASSWORD, USER_PASSWORD);
            
            if(isPasswordCorrect){
                const DAT_EXP_FORMAT = moment(DAT_EXP).format('YYYY-MM-DD H:mm:ss');
                const DAT_NOW = moment().format('YYYY-MM-DD H:mm:ss');

                const duration = moment.duration(moment(DAT_EXP_FORMAT).diff(DAT_NOW));
                const hours = duration.asHours();

                if(COD_STATUS === 2){
                    res.status(400).send({message: 'Sus credenciales de sesión estan desactivadas, favor contactar con el administrador.'});
                    return;
                }
                
                if(hours < 0){
                    res.status(400).send({message: 'Sus credenciales de sesión han expirado, favor contactar con el administrador.'});
                    return;
                }
                
                if(NUM_ATTEMPS > NUM_ATTEMPS_PARSE[0].NUM_ATTEMPS_LOGIN){
                    res.status(400).send({message: 'Sus credenciales de sesión han sido deshabilitadas. Ha sobrepasado el número de intentos, favor contactar con el administrador.'});
                    return;
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

                const sp = 'CALL SP_UPD_NUM_ATTEMPS_LOGIN(?,?)';
                mysqlConnect.query(sp,[
                    'true',
                    COD_USER
                    ], (error, resultado) => {
                    });
            }else{
                const sp = 'CALL SP_UPD_NUM_ATTEMPS_LOGIN(?,?)';
                mysqlConnect.query(sp,[
                    'false',
                    COD_USER
                    ], (error, resultado) => {
                        if(error){
                            res.status(200).send({message: 'Ha ocurrido un error al intentar iniciar sesión'})
                        }else{
                            res.status(400).send({message: 'El email o contraseña son incorrectos.'});
                        }
                    });
            }
        }
    })
}

module.exports = {
    login
}