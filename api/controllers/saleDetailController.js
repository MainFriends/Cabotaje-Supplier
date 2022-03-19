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
    const sp = 'CALL SP_INS_SALE_DETAIL(?,?,?,?,?)';
    
    data.forEach(detail => {
        const {
            COD_PRODUCT,
            PRICE,
            CANT_PRODUCTS,
            DISCOUNT,
            TOTAL
        } = detail;

        mysqlConnect.query(sp, [
            COD_PRODUCT,
            PRICE,
            CANT_PRODUCTS,
            DISCOUNT,
            TOTAL
        ]);
    });

    res.status(201).send({message: 'Transacción completada.'})
};

module.exports = {
    getDetail,
    addDetail
}