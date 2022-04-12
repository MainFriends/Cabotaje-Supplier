const mysqlConnect = require('../config');
const fs = require('fs');
const path = require('path');

const getUser = (req, res) => {
    const {COD_USER} = req.user;

    const sp = 'CALL SP_SEL_USER_INFORMATION(?)';

    mysqlConnect.query(sp, [COD_USER], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const updateUserInformation = (req, res) => {
    const {COD_USER} = req.user;
   
    const {
        NAM_CITY,
        ADDRESS,
        DAT_BIRTHDAY
    } = req.body;

    const sp = 'CALL SP_UPD_PROFILE(?,?,?,?)';

    mysqlConnect.query(sp,
        [   
            COD_USER,
            NAM_CITY,
            ADDRESS,
            DAT_BIRTHDAY
        ], (err) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send({message: 'Perfil actualizado exitosamente.'});
            }
        });
}

const updProfilePicture = (req, res) => {
    const sp = 'CALL SP_UPD_IMG_PROFILE(?,?)';

    const {COD_USER} = req.user;
    const DATA =  fs.readFileSync('api/uploads/' + req.file.filename);
    fs.rmSync('api/uploads/' + req.file.filename);
    
    mysqlConnect.query(sp,
        [   
            COD_USER,
            DATA,
        ], (err) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send({message: 'success'});
            }
        });
}

const getProfilePic = (req, res) => {
    const sp = 'CALL SP_SEL_PROFILE_PIC(?)';

    const {COD_USER} = req.user;
    
    mysqlConnect.query(sp,
        [   
            COD_USER
        ], (err, result) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send(result[0]);
            }
        });
}

module.exports = {
    getUser,
    updateUserInformation,
    updProfilePicture,
    getProfilePic
}