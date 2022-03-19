const mysqlConnect = require('../config');

const getAccPays = (req, res) => {
    const sp = "CALL SP_SEL_ACCOUNTS_TO_PAY(?)";
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err) {
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

const getAccPay = (req, res) => {
    const {codAccPay} = req.params;
    const sp = "CALL SP_SEL_ACCOUNTS_TO_PAY(?)";
    mysqlConnect.query(sp,[codAccPay], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const addAccPay = (req, res) => {
    const {
        COD_INVOICE,
        DESCRIPTION, 
        TOT_BALANCE,
        DATE_LIMIT
    } = req.body;

    const sp = "CALL SP_INS_ACCOUNTS_TO_PAY(?,?,?,?)"

    mysqlConnect.query(sp, [
        COD_INVOICE,
        DESCRIPTION, 
        TOT_BALANCE,
        DATE_LIMIT
    ],(err) => {
        if(err) {
            res.status(500).send({message: err.message});
        }else{
            res.status(201).send({message: 'La cuenta por pagar se ha añadido correctamente'});
        }
    });
}

const updateAccPay = (req, res) => {
    const {codAccPay} = req.params;
    const {
        COD_INVOICE,
        DESCRIPTION,
        TOT_BALANCE,
        DATE_LIMIT
    } = req.body

    const sp = 'CALL SP_UPD_ACCOUNTS_TO_PAY(?,?,?,?,?)';

    mysqlConnect.query(sp, [
        codAccPay,
        COD_INVOICE,
        DESCRIPTION,
        TOT_BALANCE,
        DATE_LIMIT
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La cuota por pagar fue actualizada correctamente'});
        }
    })
}

module.exports = {
    getAccPays,
    getAccPay,
    addAccPay,
    updateAccPay
}