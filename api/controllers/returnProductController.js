const mysqlConnect = require('../config')

const getReturnProduct = (req, res) =>{
    const sp  = 'CALL SP_SEL_RETURN_PRODUCT(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getReturnProductS = (req, res) =>{
    const {codReturnProduct} = req.params;
    const sp  = 'CALL SP_SEL_RETURN_PRODUCT(?)';
    mysqlConnect.query(sp, [codReturnProduct], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addReturnProduct = (req, res) => {
  const {
    COD_PRODUCT,
    CONCEPT,
    CANT_PRODUCT,
    NUM_LOT,
    COD_USER,
    MOVEMENT,
    DES_RETURN
    } = req.body

    const sp = 'CALL SP_ADD_RETURN_PRODUCT(?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
    COD_PRODUCT,
    CONCEPT,
    CANT_PRODUCT,
    NUM_LOT,
    COD_USER,
    MOVEMENT,
    DES_RETURN
    ], (error, resultado) => {
        if(error){
            res.status(400).send({message: error.message});
        }else{
            res.status(201).send({message: 'La devolucion se ha agregado exitosamente'})
        }
    });
}

const updateReturnProduct = (req, res) =>{
    const {codReturnProduct} = req.params;

    const {
        COD_PRODUCT,
        CONCEPT,
        CANT_PRODUCT,
        NUM_LOT,
        COD_USER,
        MOVEMENT,
        DES_RETURN
        } = req.body
    
        const sp = 'CALL SP_UPD_RETURN_PRODUCT(?,?,?,?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codReturnProduct,
        COD_PRODUCT,
        CONCEPT,
        CANT_PRODUCT,
        NUM_LOT,
        COD_USER,
        MOVEMENT,
        DES_RETURN
        ], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'La devolucion se ha actualizado exitosamente'})
            }
        });
    }

    const deleteReturnProduct = (req, res) =>{
        const {codReturnProduct} = req.params;
        const sp  = 'CALL SP_DEL_RETURN_PRODUCT(?)';
        mysqlConnect.query(sp, [codReturnProduct], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'La devolucion se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getReturnProduct,
    getReturnProductS,
    addReturnProduct,
    updateReturnProduct,
    deleteReturnProduct
}