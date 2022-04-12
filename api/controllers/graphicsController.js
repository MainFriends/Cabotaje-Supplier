const mysqlConnect = require('../config');

const getRoles = (req, res) => {
    
    const sp = 'CALL SP_GRAFICA_ROLES()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

module.exports = {
    getRoles
}
