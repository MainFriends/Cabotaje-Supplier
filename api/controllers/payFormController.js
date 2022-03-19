const { query } = require('express');
const mysqlConnect = require('../config');

const getPayForms = (req, res) => {
    const sp = "CALL SP_SEL_PAY_FORM(?)"
    mysqlConnect.query(sp,[0], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        }
    });
};

const getPayForm = (req, res) => {
    const {codPayForm} = req.params;
    const sp = "CALL SP_SEL_PAY_FORM(?)"
    mysqlConnect.query(sp,[codPayForm], (err, result) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            res.status(200).json(result[0]);
        }
    });
}

const addPayForm = (req, res) => {
    const {
        COD_USER,
        HOURS_WORKED,
        AMO_GROSS,
        BONUS,
        TOT_DEDUCTIONS,
        NET_SALARY,
        DAT_PAYMENT
    } = req.body

    const sp = 'CALL SP_INS_PAY_FORM(?,?,?,?,?,?,?)';

    mysqlConnect.query(sp, [
        COD_USER,
        HOURS_WORKED,
        AMO_GROSS,
        BONUS,
        TOT_DEDUCTIONS,
        NET_SALARY,
        DAT_PAYMENT
    ], (err) => {
        if(err) {
            res.status(4000).send({message: err.message});
        }else{
            res.status(201).send({message: 'La planilla se ha registrado correctamente'})
        }
    })
}

const updatePayForm = (req, res) => {
    const {codPayForm} = req.params;
    const {
        COD_USER,
        HOURS_WORKED,
        AMO_GROSS,
        BONUS,
        TOT_DEDUCTIONS,
        NET_SALARY,
        DAT_PAYMENT
    } = req.body

    const sp = 'CALL SP_UPD_PAY_FORM(?,?,?,?,?,?,?,?)';

    mysqlConnect.query(sp, [
        codPayForm,
        COD_USER,
        HOURS_WORKED,
        AMO_GROSS,
        BONUS,
        TOT_DEDUCTIONS,
        NET_SALARY,
        DAT_PAYMENT
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La planilla fue actualizada correctamente'});
        }
    })
}

const deletePayForm = (req, res) => {
    const {codPayForm} = req.params;

    const sp = "CALL SP_DEL_PAY_FORM(?)";

    mysqlConnect.query(sp, [codPayForm], (err) => {
        if(err) {
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: 'La planilla fue eliminada correctamente'});
        }
    })
}

module.exports = {
    getPayForms,
    getPayForm,
    addPayForm,
    updatePayForm,
    deletePayForm
}