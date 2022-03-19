const mysqlConnect = require('../config');

const getInvoices = (req, res) => {
    const sp = `CALL SP_SEL_SALES_INVOICE(?)`;

    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const getInvoice = (req, res) => {
    const {codInvoice} = req.params;

    const sp = `CALL SP_SEL_SALES_INVOICE(?)`;

    mysqlConnect.query(sp, [codInvoice], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const addInvoice = (req, res) => {
    const {
        COD_CLIENT,
        COD_USER, 
        SUBTOTAL,
        TOT_DISCOUNT,
        TOT_ISV,
        TOT_SALE,
        TYP_TO_SALE,
        COD_TYP_PAY 
    } = req.body;

    const sp = 'CALL SP_INS_SALE_INVOICE(?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp, [
        COD_CLIENT,
        COD_USER, 
        SUBTOTAL,
        TOT_DISCOUNT,
        TOT_ISV,
        TOT_SALE,
        TYP_TO_SALE,
        COD_TYP_PAY 
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'Transacción completada.'});
        }
    })
}

module.exports = {
    getInvoices,
    getInvoice,
    addInvoice
};