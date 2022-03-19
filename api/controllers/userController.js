const mysqlConnect = require('../config');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    const sp = 'CALL SP_SEL_USER(?)';
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
};

const getUser = (req, res) => {
    const {codUser} = req.params;
    const sp = 'CALL SP_SEL_USER(?)';
    mysqlConnect.query(sp, [codUser], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0])
        }
    });
};

const addUser = async (req, res) => {
    const {
        IDENTITY,
        FIRST_NAME,
        MIDDLE_NAME,
        LAST_NAME,
        GENDER,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO = null,
        NUM_PHONE_REFERENCE,
        DAT_BIRTHDAY,
        NAM_CITY,
        ADDRESS,
        IMG_USER = null,
        COD_ROLE,
        USER_EMAIL,
        USER_PASSWORD
    } = req.body;

    const USER_PASSWORD_HASH = await bcrypt.hash(USER_PASSWORD, 10);

    const sp = 'CALL SP_INS_USER(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,
    [
        IDENTITY,
        FIRST_NAME,
        MIDDLE_NAME,
        LAST_NAME,
        GENDER,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO,
        NUM_PHONE_REFERENCE,
        DAT_BIRTHDAY,
        NAM_CITY,
        ADDRESS,
        IMG_USER,
        COD_ROLE,
        USER_EMAIL,
        USER_PASSWORD_HASH
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'El usuario ha sido creado correctamente.'});
        }
    });
};

const updateUser = (req, res) => {
    const {codUser} = req.params;
    const {
        IDENTITY,
        FIRST_NAME,
        MIDDLE_NAME,
        LAST_NAME,
        GENDER,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO = null,
        NUM_PHONE_REFERENCE,
        DAT_BIRTHDAY,
        NAM_CITY,
        ADDRESS,
        IMG_USER = null,
        COD_ROLE,
        USER_EMAIL,
        USER_PASSWORD
    } = req.body;

    const sp = 'CALL SP_UPD_USER(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,
        [   
            codUser,
            IDENTITY,
            FIRST_NAME,
            MIDDLE_NAME,
            LAST_NAME,
            GENDER,
            NUM_PHONE_ONE,
            NUM_PHONE_TWO,
            NUM_PHONE_REFERENCE,
            DAT_BIRTHDAY,
            NAM_CITY,
            ADDRESS,
            IMG_USER,
            COD_ROLE,
            USER_EMAIL,
            USER_PASSWORD
        ], (err) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send({message: 'El usuario ha sido modificado.'});
            }
        });
}

const deleteUser = (req, res) => {
    const {codUser} = req.params;
    const sp = `CALL SP_DEL_USER(?)`;
    mysqlConnect.query(sp, [codUser], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: 'El usuario ha sido eliminado exitosamente.'});
        }
    })
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};