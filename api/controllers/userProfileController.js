const mysqlConnect = require('../config');

const getUser = (req, res) => {
    const {COD_USER} = req.user;
    console.log(req.user)

    const sp = 'CALL SP_SEL_USER_INFORMATION(?)';

    mysqlConnect.query(sp, [COD_USER], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

module.exports = {
    getUser
}