const mysqlConnect = require('../config')

const getTypOut = (req, res) =>{
    const sp  = 'CALL SP_SEL_TYPE_OUTPUT(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getTypOutS = (req, res) =>{
    const {codTypOut} = req.params;
    const sp  = 'CALL SP_SEL_TYPE_OUTPUT(?)';
    mysqlConnect.query(sp, [codTypOut], (error, resultado) => {
        if(error){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addTypOut = (req, res) => {
  const {
    NAM_TYPE,
    DES_TYPE,
    } = req.body

    const sp = 'CALL SP_INS_TYPE_OUTPUT(?,?)';

    mysqlConnect.query(sp,[
        NAM_TYPE.trim(),
        DES_TYPE
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'El tipo de salida se ha agregado exitosamente'})
        }
    });
}

const updateTypOut = (req, res) =>{
    const {codTypOut} = req.params;

    const {
        NAM_TYPE,
        DES_TYPE
        } = req.body
    
        const sp = 'CALL SP_UPD_TYP_OUTPUT(?,?,?)';
    
        mysqlConnect.query(sp,[
            codTypOut,
            NAM_TYPE,
            DES_TYPE
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});
            }else{
                res.status(200).send({message: 'El tipo de salida se ha actualizado exitosamente'})
            }
        });
    }

    const deleteTypOut = (req, res) =>{
        const {codTypOut} = req.params;
        const sp  = 'CALL SP_DEL_TYPE_OUTPUT(?)';
        mysqlConnect.query(sp, [codTypOut], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});    
            }else{
                res.status(200).send({message: 'El tipo de entrada se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getTypOut,
    getTypOutS,
    addTypOut,
    updateTypOut,
    deleteTypOut,
}