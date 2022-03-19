const mysqlConnect = require('../config');

const getAccReceivables = (req, res) => {
    const sp = "CALL SP_SEL_ACCOUNTS_RECEIVABLE(?)";
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

const getAccReceivable = (req, res) => {
    const {codAccReceivable} = req.params;
    const sp = "CALL SP_SEL_ACCOUNTS_RECEIVABLE(?)";
    mysqlConnect.query(sp,[codAccReceivable], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const addAccReceivable = (req, res) => {
    const {
        COD_INVOICE,
        DESCRIPTION, 
        TOT_BALANCE,
        DAT_LIMIT
    } = req.body;

    const sp = "CALL SP_INS_ACCOUNTS_RECEIVABLE(?,?,?,?)";

    mysqlConnect.query(sp, [
        COD_INVOICE,
        DESCRIPTION, 
        TOT_BALANCE,
        DAT_LIMIT
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La cuenta por cobrar fue añadida correctamente'});
        }
    })
}

module.exports = {
    getAccReceivables,
    getAccReceivable,
    addAccReceivable
}