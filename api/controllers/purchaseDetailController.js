const mysqlConnect = require('../config');

const getDetail = (req, res) => {
    const {codDetail} = req.params;
    const sp = 'CALL SP_SEL_PURCHASE_DETAIL(?)';
    mysqlConnect.query(sp, [codDetail] ,(err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0])
        }
    });
};

const addDetail = (req,res)=>{

    const data = req.body;

    const sp = 'CALL SP_INS_PURCHASE_DETAIL(?,?,?,?,?)';

    data.forEach(factura => {
        const {
            COD_PRODUCT ,
            PRICE,
            CANT_PRODUCTS,
            DISCOUNT,
            TOTAL
        } = factura;

        mysqlConnect.query(sp,[
            COD_PRODUCT ,
            PRICE,
            CANT_PRODUCTS,
            DISCOUNT,
            TOTAL
        ]);
    }); 

    res.status(201).send({message: 'Transacción completa'});
}


const updateDetail = (req,res)=>{
    const {codDetail} = req.params;
    const {
        COD_INVOICE,
        COD_PRODUCT ,
        PRICE,
        CANT_PRODUCTS,
        DISCOUNT,
        TOTAL
    }= req.body;

    const sp = 'CALL SP_UPD_PURCHASE_DETAIL(?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,
    [     codDetail,
        COD_INVOICE,
        COD_PRODUCT,
        PRICE,
        CANT_PRODUCTS,
        DISCOUNT,
        TOTAL
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'Accion completada.'});
        }
    }); 
};  

const deleteDetail = (req, res) => {
    const {codDetail} = req.params;
    const sp = 'CALL SP_DEL_PURCHASE_DETAIL(?)';
    mysqlConnect.query(sp,[codDetail], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: 'Accion completada.'});
        }
    })
};

module.exports = {
    getDetail,
    addDetail,
    updateDetail,
    deleteDetail
};