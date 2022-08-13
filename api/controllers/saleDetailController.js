const mysqlConnect = require('../config');

const getDetail = (req, res) => {
    const {codInvoice} = req.params;
    const sp = 'CALL SP_SEL_SALE_DETAIL(?)';

    mysqlConnect.query(sp, [codInvoice], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    })
};

const addDetail = (req, res) => {
    const data = req.body;
    const sp = 'CALL SP_INS_SALE_DETAIL(?,?,?,?,?,?)';
    
    data.forEach(detail => {
        const {
            SKU,
            PRICE,
            CANT_PRODUCTS,
            DISCOUNT = 0,
            TOTAL,
            NUM_LOT
        } = detail;

        mysqlConnect.query(sp, [
            SKU,
            PRICE,
            CANT_PRODUCTS,
            DISCOUNT,
            TOTAL,
            NUM_LOT
        ]);
    });

    res.status(201).send({message: 'Transacción completada.'})
};

module.exports = {
    getDetail,
    addDetail
}