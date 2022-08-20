const mysqlConnect = require('../config');

const getTaxes = (req, res) => {
    const sp = 'CALL SP_SEL_TAXES(?)';

    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0])
        }
    });
}

const getTax = (req,res) => {
    const {codTax}= req.params;
    const sp= 'CALL SP_SEL_TAXES(?)';
    mysqlConnect.query(sp,[codTax] ,(err,result) =>{

        if(err){ 
        res.status(500). send({message:'ERROR EN EL SERVIDOR'});
        }else{
        res.status(200).json(result[0]);
        };
    });
};

const addTax = (req, res) => {
    const {
        TAX,
        COD_STATUS
    } = req.body;

    const sp = 'CALL SP_INS_TAXES(?,?)'

    mysqlConnect.query(sp, [
        TAX,
        COD_STATUS
    ], (err) => {

        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(201).send({message:'El impuesto ha sido registrado correctamente'});
        }
    });
}

const delTax = (req, res) => {
    const {codTax} = req.params;
    const sp = "CALL SP_DEL_TAXES(?)";
    mysqlConnect.query(sp, [codTax], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'Impuesto eliminado'});
        }
    })
}

const updateTax = (req, res) => {
    const {codTax} = req.params;

    const {
        COD_STATUS
    } = req.body;

    const sp = "CALL SP_UPD_TAXES(?,?)";

    mysqlConnect.query(sp, [
        codTax,
        COD_STATUS
    ], (error, resultado) => {
        if(error){
            const message = error.message.split(': ')[1];
            res.status(304).send({message});
        }else{
            res.status(200).send({message: 'El estado actual del impuesto se ha actualizado exitosamente'})
        }
    });
}

module.exports = {
    getTaxes, 
    getTax,
    addTax,
    delTax,
    updateTax
}