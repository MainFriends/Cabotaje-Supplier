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
    const {COD_USER} = req.user;
    const {
        COD_CLIENT,
        SUBTOTAL,
        TOT_DISCOUNT = 0,
        TOT_ISV,
        TOT_SALE,
        TYP_TO_SALE,
        COD_TYP_PAY,
        DESCRIPTION = null,
        DAT_LIMIT = null,
        AMOUNT
    } = req.body;

    console.log(AMOUNT)

    const sp = 'CALL SP_INS_SALE_INVOICE(?,?,?,?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp, [
        COD_CLIENT,
        COD_USER, 
        SUBTOTAL,
        TOT_DISCOUNT,
        TOT_ISV,
        TOT_SALE,
        TYP_TO_SALE,
        COD_TYP_PAY,
        DESCRIPTION,
        DAT_LIMIT,
        AMOUNT
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'Transacción completada.'});
        }
    })
}

const getCategories = (req, res) => {
    const sp = `CALL SP_SEL_CATEGORIES()`;

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const getProducts = (req, res) => {
    const {codCategory} = req.params;

    const sp = `CALL SP_SEL_PRODUCTS(?)`;

    mysqlConnect.query(sp, [codCategory], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const getCorrelative = (req, res) => {

    const sp = `CALL SP_SEL_CORRELATIVE()`;

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const getClient = (req, res) => {

    const {rtn} = req.params

    const sp = `CALL SP_SEL_FINDCLIENT(?)`;

    mysqlConnect.query(sp, [rtn], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

module.exports = {
    getInvoices,
    getInvoice,
    addInvoice,
    getCategories,
    getProducts,
    getCorrelative,
    getClient
};