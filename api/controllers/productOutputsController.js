const mysqlConnect = require('../config')

const getProductOutputsAll = (req, res) =>{
    const sp  = 'CALL SP_SEL_PRODUCT_OUTPUT(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :'Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getProductOutputs = (req, res) =>{
    const {codProductOutput} = req.params;
    const sp  = 'CALL SP_SEL_PRODUCT_OUTPUT(?)';
    mysqlConnect.query(sp, [codProductOutput], (error, resultado) => {
        if(error){
            res.status(500).send({message :'Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addProductOutputs = (req, res) => {
    const {COD_USER} = req.user

  const {
    COD_PRODUCT,
    DES_OUTPUT,
    COD_TYPE,
    CANT_PRODUCT,
    NUM_LOT,
    DAT_OUTPUT
    } = req.body

    const sp = 'CALL SP_INS_PRODUCT_OUTPUT(?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
        COD_PRODUCT,
        DES_OUTPUT,
        COD_TYPE,
        CANT_PRODUCT,
        NUM_LOT,
        COD_USER,
        DAT_OUTPUT
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'La salida se ha agregado exitosamente'})
        }
    });
}

const updateProductOutputs = (req, res) =>{
    const {codProductOutput} = req.params;
    const {COD_USER} = req.user

    const {
        DES_OUTPUT,
        COD_TYPE,
        DAT_OUTPUT
        } = req.body
    
        const sp = 'CALL SP_UPD_PRODUCT_OUTPUT(?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codProductOutput,
        DES_OUTPUT,
        COD_TYPE,
        COD_USER,
        DAT_OUTPUT
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send({message: 'La salida se ha actualizado exitosamente'})
            }
        });
    }

    const deleteProductOutputs = (req, res) =>{
        const {codProductOutput} = req.params;
        const sp  = 'CALL SP_DEL_PRODUCT_OUTPUT(?)';
        mysqlConnect.query(sp, [codProductOutput], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'La salida se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getProductOutputsAll,
    getProductOutputs,
    addProductOutputs,
    updateProductOutputs,
    deleteProductOutputs
}