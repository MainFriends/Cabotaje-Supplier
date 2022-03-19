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
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addInventoryDetail = (req, res) => {
  const {
    COD_PRODUCT, 
	DAT_PURCHASE, 
    DAT_EXP,
    CANT_PRODUCTS,
    NUM_LOT,
    COD_ORDER,
    COD_STATUS
    } = req.body

    const sp = 'CALL SP_ADD_INVENTORY_DETAIL(?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
    COD_PRODUCT, 
    DAT_PURCHASE, 
    DAT_EXP,
    CANT_PRODUCTS,
    NUM_LOT,
    COD_ORDER,
    COD_STATUS
    ], (error, resultado) => {
        if(error){
            res.status(400).send({message: error.message});
        }else{
            res.status(201).send({message: 'El detalle de inventario se ha agregado exitosamente'})
        }
    });
}

const updateInventoryDetail = (req, res) =>{
    const {codInventoryDetail} = req.params;

    const {
        COD_PRODUCT, 
        DAT_PURCHASE, 
        DAT_EXP,
        CANT_PRODUCTS,
        NUM_LOT,
        COD_ORDER,
        COD_STATUS
        } = req.body
    
        const sp = 'CALL SP_UPD_INVENTORY_DETAIL(?,?,?,?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codInventoryDetail,
        COD_PRODUCT, 
	    DAT_PURCHASE, 
        DAT_EXP,
        CANT_PRODUCTS,
        NUM_LOT,
        COD_ORDER,
        COD_STATUS
        ], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
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
                res.status(304).send({message: error.message});
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