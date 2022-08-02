const mysqlConnect = require('../config')

const getInventoryTransactions = (req, res) =>{
    const sp  = 'CALL SP_SEL_INVENTORY_TRANSACTIONS(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getLotes = (req, res) => {
    const {codProduct} = req.params
    const sp  = 'CALL SP_SEL_LOTES(?)';
    mysqlConnect.query(sp, [codProduct], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

module.exports = {
    getInventoryTransactions,
    getLotes
}