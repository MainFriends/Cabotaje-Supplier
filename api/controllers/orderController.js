const mysqlConnect = require('../config');

const getOrders = (req, res) => {
    const sp = 'CALL SP_SEL_ORDERS(?)';
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor.'});
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const getOrder = (req, res) => {
    const {codOrder} = req.params

    const sp = 'CALL SP_SEL_ORDERS(?)';

    mysqlConnect.query(sp, [codOrder], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor.'});
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const addOrder = (req, res) => {
    const{
        COD_SUPPLIER,
        DAT_REQUIRED,
        COD_USER
    } = req.body

   const sp = 'CALL SP_INS_ORDER(?,?,?)'

   mysqlConnect.query(sp, [
        COD_SUPPLIER,
        DAT_REQUIRED,
        COD_USER
   ], (err) => {
       if(err){
           res.status(400).send({message: err.message});
       }else{
           res.status(201).send({message: 'La orden a sido registrada.'})
       };
   });
};

const updateOrder = (req, res) => {
    const {codOrder} = req.params;
    const {
        COD_SUPPLIER,
        DAT_REQUIRED,
        COD_USER,
        COD_STATUS
    } = req.body

   const sp = 'CALL SP_UPD_ORDER(?,?,?,?,?)';

   mysqlConnect.query(sp, [
        codOrder,
        COD_SUPPLIER,
        DAT_REQUIRED,
        COD_USER,
        COD_STATUS
   ], (err) => {
       if(err){
           res.status(304).send({message: err.message});
       }else{
           res.status(200).send({message: 'La orden a sido actualizada exitosamente.'})
       };
   }); 
}

const deleteOrder = (req, res) => {
    const {codOrder} = req.params;

    const sp = 'CALL SP_DEL_ORDERS(?)'

    mysqlConnect.query(sp, [codOrder], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: "La orden a sido eliminada correctamente."})
        }
    })

}

module.exports = {
    getOrder,
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder
}