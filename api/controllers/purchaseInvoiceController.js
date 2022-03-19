const mysqlConnect = require('../config');

const getPurchases = (req, res) => {
    const sp = 'CALL SP_SEL_PURCHASE_INVOICE(?)';
    mysqlConnect.query(sp,[0], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    });
};

const getPurchase = (req, res) => {
    const {codInvoice} = req.params;
    const sp = 'CALL SP_SEL_PURCHASE_INVOICE(?)';
    mysqlConnect.query(sp, [codInvoice] ,(err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0])
        }
    });
};

const addPurchase = (req,res)=>{
    const {
        SUBTOTAL,
        TOT_DISCOUNT ,
        TOT_ISV,
        TOT_PURCHASE,
        TYP_TO_PURCHASE,
        COD_TYP_PAY,
        DAT_INVOICE,
        COD_ORDER,
        COD_USER
    }= req.body;

    const sp = 'CALL SP_INS_PURCHASE_INVOICE(?,?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,
    [
        SUBTOTAL,
        TOT_DISCOUNT ,
        TOT_ISV,
        TOT_PURCHASE,
        TYP_TO_PURCHASE,
        COD_TYP_PAY,
        DAT_INVOICE,
        COD_ORDER,
        COD_USER
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'Transaccion completada.'});
        }
    }); 
};  

const updatePurchase = (req,res)=>{
    const {codInvoice} = req.params;
    const {
        SUBTOTAL,
        TOT_DISCOUNT,
        TOT_ISV,
        TOT_PURCHASE,
        TYP_TO_PURCHASE,
        COD_TYP_PAY,
        DAT_INVOICE,
        COD_ORDER,
        COD_USER
    }= req.body;

    const sp = 'CALL SP_UPD_PURCHASE_INVOICE(?,?,?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,
        [
            codInvoice,
            SUBTOTAL,
            TOT_DISCOUNT,
            TOT_ISV,
            TOT_PURCHASE,
            TYP_TO_PURCHASE,
            COD_TYP_PAY,
            DAT_INVOICE,
            COD_ORDER,
            COD_USER
        ], (err) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(201).send({message: 'Transaccion completada.'});
            }
    }); 
};  

const deletePurchase = (req, res) => {
    const {codInvoice} = req.params;
    const sp = 'CALL SP_DEL_PURCHASE_INVOICE(?)';
    mysqlConnect.query(sp,[codInvoice], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: 'Transaccion completada.'});
        }
    })
};

module.exports = {
    getPurchases,
    getPurchase,
    addPurchase,
    updatePurchase,
    deletePurchase
};


