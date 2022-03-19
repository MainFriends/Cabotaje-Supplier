const mysqlConnect = require('../config')

const getDecrease = (req, res) =>{
    const sp  = 'CALL SP_SEL_DECREASE(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getDecreaseS = (req, res) =>{
    const {codDecrease} = req.params;
    const sp  = 'CALL SP_SEL_DECREASE(?)';
    mysqlConnect.query(sp, [codDecrease], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addDecrease = (req, res) => {
  const {
    COD_PRODUCT,
    CONCEPT,
    CANT_PRODUCTS,
    NUM_LOT,
    COD_USER,
    DAT_DECREASE
    } = req.body

    const sp = 'CALL SP_ADD_DECREASE(?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
    COD_PRODUCT,
    CONCEPT,
    CANT_PRODUCTS,
    NUM_LOT,
    COD_USER,
    DAT_DECREASE
    ], (error, resultado) => {
        if(error){
            res.status(400).send({message: error.message});
        }else{
            res.status(201).send({message: 'La merma se ha agregado exitosamente'})
        }
    });
}

const updateDecrease = (req, res) =>{
    const {codDecrease} = req.params;

    const {
        COD_PRODUCT,
        CONCEPT,
        CANT_PRODUCTS,
        NUM_LOT,
        COD_USER,
        DAT_DECREASE
        } = req.body
    
        const sp = 'CALL SP_UPD_DECREASE(?,?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codDecrease,
        COD_PRODUCT,
        CONCEPT,
        CANT_PRODUCTS,
        NUM_LOT,
        COD_USER,
        DAT_DECREASE
        ], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'El detalle inventario se ha actualizado exitosamente'})
            }
        });
    }

    const deleteDecrease = (req, res) =>{
        const {codDecrease} = req.params;
        const sp  = 'CALL SP_DEL_DECREASE(?)';
        mysqlConnect.query(sp, [codDecrease], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'La merma se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getDecrease,
    getDecreaseS,
    addDecrease,
    updateDecrease,
    deleteDecrease
}