const mysqlConnect = require('../config')

const getInventoryDetail = (req, res) =>{
    const sp  = 'CALL SP_SEL_INVENTORY_DETAIL(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getInventoryDetailS = (req, res) =>{
    const {codInventoryDetail} = req.params;
    const sp  = 'CALL SP_SEL_INVENTORY_DETAIL(?)';
    mysqlConnect.query(sp, [codInventoryDetail], (error, resultado) => {
        if(error){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addInventoryDetail = (req, res) => {
  const {
    COD_PRODUCT,
    NORMAL_UNIT_PRICE,
    PURCHASE_PRICE,
    WHOLESALE_CANT,
    WHOLESALE_PRICE,
    ISV, 
	DAT_PURCHASE, 
    DAT_EXP,
    CANT_PRODUCTS,
    NUM_LOT,
    COD_ORDER = 0,
    COD_STATUS
    } = req.body

    const sp = 'CALL SP_INS_INVENTORY_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
    COD_PRODUCT, 
    NORMAL_UNIT_PRICE,
    PURCHASE_PRICE,
    WHOLESALE_CANT,
    WHOLESALE_PRICE,
    ISV,
    DAT_PURCHASE, 
    DAT_EXP,
    CANT_PRODUCTS,
    NUM_LOT,
    COD_ORDER,
    COD_STATUS
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'El detalle de inventario se ha agregado exitosamente'})
        }
    });
}

const updateInventoryDetail = (req, res) =>{
    const {codInventoryDetail} = req.params;

    const {
        COD_PRODUCT,
        NORMAL_UNIT_PRICE,
        PURCHASE_PRICE,
        WHOLESALE_CANT,
        WHOLESALE_PRICE,
        ISV, 
        DAT_PURCHASE, 
        DAT_EXP,
        CANT_PRODUCTS,
        NUM_LOT,
        COD_ORDER,
        COD_STATUS
        } = req.body
    
        const sp = 'CALL SP_UPD_INVENTORY_DETAIL(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codInventoryDetail,
        COD_PRODUCT,
        NORMAL_UNIT_PRICE,
        PURCHASE_PRICE,
        WHOLESALE_CANT,
        WHOLESALE_PRICE,
        ISV, 
	    DAT_PURCHASE, 
        DAT_EXP,
        CANT_PRODUCTS,
        NUM_LOT,
        COD_ORDER,
        COD_STATUS
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});
            }else{
                res.status(200).send({message: 'El detalle inventario se ha actualizado exitosamente'})
            }
        });
    }

    const deleteInventoryDetail = (req, res) =>{
        const {codInventoryDetail} = req.params;
        const sp  = 'CALL SP_DEL_INVENTORY_DETAIL(?)';
        mysqlConnect.query(sp, [codInventoryDetail], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});
            }else{
                res.status(200).send({message: 'El inventario se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getInventoryDetail,
    getInventoryDetailS,
    addInventoryDetail,
    updateInventoryDetail,
    deleteInventoryDetail
}