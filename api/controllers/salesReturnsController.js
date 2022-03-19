const mysqlConnect = require('../config');

const getSalesReturns = (req, res) => {
    const sp = "CALL SP_SEL_SALES_RETURNS(?)";
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

const getSalesReturn = (req, res) => {
    const {codReturn} = req.params;
    const sp = "CALL SP_SEL_SALES_RETURNS(?)";
    mysqlConnect.query(sp, [codReturn], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

const addSalesReturn = (req, res) => {
    const {
        COD_PRODUCT,
        DESCRIPTION,
        CANT,
        AMOUNT,
        COD_USER,
        DAT_RETURN
    } = req.body;

    const sp = "CALL SP_INS_SALES_RETURNS(?,?,?,?,?,?)"

    mysqlConnect.query(sp, [
        COD_PRODUCT,
        DESCRIPTION,
        CANT,
        AMOUNT,
        COD_USER,
        DAT_RETURN
    ], (err) =>{
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(201).send({message: 'La devolución se ha efectuado correctamente'});
        }
    });
}

const deleteSalesReturn = (req, res) => {
    const {codReturn} = req.params;
    const sp = "CALL SP_DEL_SALES_RETURNS(?)";
    mysqlConnect.query(sp, [codReturn], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La devolución fue eliminada correctamente'});
        }
    })
}

const updateSalesReturn = (req, res) => {
    const {codReturn} = req.params;
    const {
        COD_PRODUCT,
        DESCRIPTION,
        CANT,
        AMOUNT,
        COD_USER,
        DAT_RETURN
    } = req.body;

    const sp= "CALL SP_UPD_SALES_RETURNS(?,?,?,?,?,?,?)";

    mysqlConnect.query(sp, [
        codReturn,
        COD_PRODUCT,
        DESCRIPTION,
        CANT,
        AMOUNT,
        COD_USER,
        DAT_RETURN
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).send({message: 'La devolución fue actualizada correctamente'});
        }
    });
}

module.exports = {
    getSalesReturns, 
    getSalesReturn,
    addSalesReturn,
    deleteSalesReturn,
    updateSalesReturn
}