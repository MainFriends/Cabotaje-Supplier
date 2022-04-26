const mysqlConnect = require('../config');

const verifyRoleAccounting = (req, res, next) => {
    const {COD_ROLE} = req.user;
    const COD_MODULE = 5;
    const sp = 'CALL SP_VERIFY_ROLE(?,?)';
    const message = "No tienes autorización para realizar cambios.";

    mysqlConnect.query(sp, [COD_ROLE, COD_MODULE], (err, result) => {
        if(err){
            res.status(500).send({message: 'Ha ocurrido un error en el servidor.'});
        }else{
            const [permissions = {}] = result[0];

            const {
                INS = 0,
                UPD = 0,
                DEL = 0,
                QUE = 0,
            } = permissions;

            switch(req.method){
                case 'GET':
                    next();
                    break;
                case 'POST':
                    INS ? next() : res.status(401).send({message});
                    break;
                case 'PUT':
                    UPD ?  next() : res.status(401).send({message});
                    break;
                case 'DELETE':
                    DEL ? next() : res.status(401).send({message});
                    break;
            }
        }
    });
}

module.exports = verifyRoleAccounting;