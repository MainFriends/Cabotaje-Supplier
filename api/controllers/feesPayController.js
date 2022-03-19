const mysqlConnect = require('../config');

const getFeesPay = (req, res) => {
    const {codAccPay} = req.params;
    const sp = "CALL SP_SEL_FEES_TO_PAY(?)";
    mysqlConnect.query(sp, [codAccPay], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

const addFeesPay = (req, res) => {
    const {
        COD_ACC_PAY,
        AMOUNT,
        DATE_PAY,
        COD_TYP_PAY
    } = req.body;

    const sp = "CALL SP_INS_FEES_TO_PAY(?,?,?,?)";

    mysqlConnect.query(sp, [
        COD_ACC_PAY,
        AMOUNT,
        DATE_PAY,
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

const deleteFeesPay = (req, res) => {
    const {codFeesPay} = req.params;
    const sp = "CALL SP_DEL_FEES_TO_PAY(?)";
    mysqlConnect.query(sp, [codFeesPay], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La cuota fue eliminada correctamente'});
        }
    })
}

module.exports = {
    getFeesPay,
    addFeesPay,
    deleteFeesPay
}