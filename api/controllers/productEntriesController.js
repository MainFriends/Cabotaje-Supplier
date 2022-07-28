const mysqlConnect = require('../config')

const getProductEntriesAll = (req, res) =>{
    const sp  = 'CALL SP_SEL_PRODUCT_ENTRIES(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getProductEntries = (req, res) =>{
    const {codProductEntrie} = req.params;
    console.log(codProductEntrie)
    const sp  = 'CALL SP_SEL_PRODUCT_ENTRIES(?)';
    mysqlConnect.query(sp, [codProductEntrie], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addProductEntries = (req, res) => {
    const {COD_USER} = req.user

  const {
    COD_PRODUCT,
    DES_ENTRIE,
    COD_TYPE,
    CANT_PRODUCT,
    NUM_LOT,
    DAT_ENTRIES
    } = req.body

    const sp = 'CALL SP_INS_PRODUCT_ENTRIES(?,?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
        COD_PRODUCT,
        DES_ENTRIE,
        COD_TYPE,
        CANT_PRODUCT,
        NUM_LOT,
        COD_USER,
        DAT_ENTRIES
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'La entrada se ha agregado exitosamente'})
        }
    });
}

const updateProductEntries = (req, res) =>{
    const {codProductEntrie} = req.params;
    const {COD_USER} = req.user

    const {
        DES_ENTRIE,
        COD_TYPE,
        DAT_ENTRIES
        } = req.body
    
        const sp = 'CALL SP_UPD_PRODUCT_ENTRIES(?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codProductEntrie,
        DES_ENTRIE,
        COD_TYPE,
        COD_USER,
        DAT_ENTRIES
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send({message: 'La entrada se ha actualizado exitosamente'})
            }
        });
    }

    const deleteProductEntries = (req, res) =>{
        const {codProductEntrie} = req.params;
        const sp  = 'CALL SP_DEL_PRODUCT_ENTRIES(?)';
        mysqlConnect.query(sp, [codProductEntrie], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'La entrada se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getProductEntriesAll,
    getProductEntries,
    addProductEntries,
    updateProductEntries,
    deleteProductEntries
}