const mysqlConnect = require('../config');

const getSystemSetting = (req, res) => {
    const sp = "CALL SP_SEL_SYSTEM_SETTINGS()";
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    })
}
const updateSystemSetting = (req, res) => {
    const {COD_USER} = req.user;
    const {
        NUM_DAYS_PASSWORD_EXPIRED,
        NUM_ATTEMPS_LOGIN
    } = req.body;

    const sp= "CALL SP_UPD_SYSTEM_SETTINGS(?,?,?)";

    mysqlConnect.query(sp, [
        NUM_DAYS_PASSWORD_EXPIRED,
        NUM_ATTEMPS_LOGIN,
        COD_USER
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'Cambios actualizados exitosamente'});
        }
    });
}

module.exports = {
    getSystemSetting,
    updateSystemSetting
}