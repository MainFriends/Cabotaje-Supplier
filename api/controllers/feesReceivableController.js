const mysqlConnect = require('../config');

const getFeesReceivable = (req, res) => {
    const {codAccReceivable} = req.params;
    const sp = "CALL SP_SEL_FEES_RECEIVABLE(?)";
    mysqlConnect.query(sp,[codAccReceivable], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const addFeesReceivable = (req, res) => {
    const {
        COD_ACC_RECEIVABLE,
        AMOUNT,
        DAT_PAY,
        COD_TYP_PAY
    } = req.body;

    const sp = "CALL SP_INS_FEES_RECEIVABLE(?,?,?,?)";

    mysqlConnect.query(sp, [
        COD_ACC_RECEIVABLE,
        AMOUNT,
        DAT_PAY,
        COD_TYP_PAY
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(201).send({message: 'La cuota se ha añadido correctamente'});
        }
    })
}

const deleteFeesReceivable = (req, res) => {
    const {codFeesReceivable} = req.params;
    const sp = "CALL SP_DEL_FEES_RECEIVABLE(?)";
    mysqlConnect.query(sp, [codFeesReceivable], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La cuota fue eliminada correctamente'});
        }
    })
}

module.exports = {
    getFeesReceivable,
    addFeesReceivable,
    deleteFeesReceivable
}