const mysqlConnect = require('../config')

const getTypEntries = (req, res) =>{
    const sp  = 'CALL SP_SEL_TYPE_ENTRIES(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getTypEntriesS = (req, res) =>{
    const {codTypEntries} = req.params;
    const sp  = 'CALL SP_SEL_TYPE_ENTRIES(?)';
    mysqlConnect.query(sp, [codTypEntries], (error, resultado) => {
        if(error){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addTypEntries = (req, res) => {
  const {
    NAM_TYPE,
    DES_TYPE,
    } = req.body

    const sp = 'CALL SP_INS_TYPE_ENTRIES(?,?)';

    mysqlConnect.query(sp,[
        NAM_TYPE.trim(),
        DES_TYPE
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'El tipo de entrada se ha agregado exitosamente'})
        }
    });
}

const updateTypEntries = (req, res) =>{
    const {codTypEntries} = req.params;

    const {
        NAM_TYPE,
        DES_TYPE
        } = req.body
    
        const sp = 'CALL SP_UPD_TYP_ENTRIES(?,?,?)';
    
        mysqlConnect.query(sp,[
            codTypEntries,
            NAM_TYPE,
            DES_TYPE
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});
            }else{
                res.status(200).send({message: 'La categoría se ha actualizado exitosamente'})
            }
        });
    }

    const deleteTypEntries = (req, res) =>{
        const {codTypEntries} = req.params;
        const sp  = 'CALL SP_DEL_TYPE_ENTRIES(?)';
        mysqlConnect.query(sp, [codTypEntries], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});    
            }else{
                res.status(200).send({message: 'El tipo de entrada se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getTypEntries,
    getTypEntriesS,
    addTypEntries,
    updateTypEntries,
    deleteTypEntries
}