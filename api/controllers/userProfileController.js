const mysqlConnect = require('../config');

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
        DAT_BIRTHDAY,
        IMG_USER
    } = req.body;

    const sp = 'CALL SP_UPD_PROFILE(?,?,?,?,?)';

    mysqlConnect.query(sp,
        [   
            COD_USER,
            NAM_CITY,
            ADDRESS,
            DAT_BIRTHDAY,
            IMG_USER
        ], (err) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send({message: 'Perfil actualizado exitosamente.'});
            }
        });
}

module.exports = {
    getUser,
    updateUserInformation
}