const mysqlConnect = require('../config');

const getRoles = (req, res) => {
    const sp = 'CALL SP_ROLES()';

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    })
};

const addRole = (req, res) => {
    const sp = 'CALL SP_INS_ROLE(?,?,?,?,?,?,?)';

    const {
        NAM_ROLE,
        DES_ROLE,
        COD_MODULE,
        QUE,
        INS,
        UPD,
        DEL
    } = req.body

    mysqlConnect.query(sp, [
        NAM_ROLE,
        DES_ROLE,
        COD_MODULE,
        QUE,
        INS,
        UPD,
        DEL
    ], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(200).json({message: 'Rol creado correctamente.'});
        }
    })
};

module.exports = {
    getRoles,
    addRole
}