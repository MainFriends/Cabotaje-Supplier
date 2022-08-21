const mysqlConnect = require('../config')

const getCategory = (req, res) =>{
    const sp  = 'CALL SP_SEL_CATEGORY(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getCategoryS = (req, res) =>{
    const {codCategory} = req.params;
    const sp  = 'CALL SP_SEL_CATEGORY(?)';
    mysqlConnect.query(sp, [codCategory], (error, resultado) => {
        if(error){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addCategory = (req, res) => {
  const {
    NAM_CATEGORY,
    DESCRIPTION,
    COD_STATUS
    } = req.body

    const sp = 'CALL SP_INS_CATEGORY(?,?,?)';

    mysqlConnect.query(sp,[
        NAM_CATEGORY.trim(),
        DESCRIPTION,
        COD_STATUS
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(201).send({message: 'La categoría se ha agregado exitosamente'})
        }
    });
}

const updateCategory = (req, res) =>{
    const {codCategory} = req.params;

    const {
        DESCRIPTION,
        COD_STATUS
        } = req.body
    
        const sp = 'CALL SP_UPD_CATEGORY(?,?,?)';
    
        mysqlConnect.query(sp,[
            codCategory,
            DESCRIPTION,
            COD_STATUS
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});
            }else{
                res.status(200).send({message: 'La categoría se ha actualizado exitosamente'})
            }
        });
    }

    const deleteCategory = (req, res) =>{
        const {codCategory} = req.params;
        const sp  = 'CALL SP_DEL_CATEGORY(?)';
        mysqlConnect.query(sp, [codCategory], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(304).send({message});    
            }else{
                res.status(200).send({message: 'La categoría se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getCategory,
    getCategoryS,
    addCategory,
    updateCategory,
    deleteCategory
}