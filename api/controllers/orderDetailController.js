const e = require('express');
const mysqlConnect = require('../config'); 

const getOrdersDetail  = (req, res) => {
    const sp = 'CALL SP_SEL_ORDER_DETAIL(?)';
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            res.status(500).send({messsage: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const getOrderDetail = (req, res) => {
    const {codOrderDetail} = req.params;
    const sp = 'CALL SP_SEL_ORDER_DETAIL(?)';

    mysqlConnect.query(sp, [codOrderDetail], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const addOrderDetail = (req, res) => {

    const data = req.body;
    
    const sp = 'CALL SP_INS_ORDER_DETAIL(?,?,?)';

    data.forEach(producto => {
        const{
            COD_PRODUCT,
            DES_ORDER,
            CANT_PRODUCTS
        } = producto;
        
        mysqlConnect.query(sp, [
            COD_PRODUCT,
            DES_ORDER,
            CANT_PRODUCTS
        ]);
    });
    
    res.status(201).send({message: 'Transaccion completada.'});

};

const updateOrderDetail = (req, res) => {
    const {codOrderDetail} = req.params;
    const{
        COD_PRODUCT,
        DES_ORDER,
        CANT_PRODUCTS
    } = req.body;

    const sp = 'CALL SP_UPD_ORDER_DETAIL(?,?,?,?)';

    mysqlConnect.query(sp, [
        codOrderDetail,
        COD_PRODUCT,
        DES_ORDER,
        CANT_PRODUCTS
    ], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: 'El detalle de la orden a sido actualizado exitosamente.'});
        };
    });
};

const deleteOrderDetail = (req, res) => {
    const {codOrderDetail} = req.params;

    const sp = `CALL SP_DEL_ORDER_DETAIL(?)`;

    mysqlConnect.query(sp, [codOrderDetail], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: "El detalle de la orden a sido eliminado corrrectamente"});
        };
    });
};

module.exports = {
    getOrdersDetail,
    getOrderDetail,
    addOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
}