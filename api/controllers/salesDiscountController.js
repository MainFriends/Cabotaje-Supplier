const mysqlConnect = require('../config');

const getSalesDiscounts = (req, res) => {
    const sp = "CALL SP_SEL_SALES_DISCOUNTS(?)";
    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

const getSalesDiscount = (req, res) => {
    const {codDiscount} = req.params;
    const sp = "CALL SP_SEL_SALES_DISCOUNTS(?)";
    mysqlConnect.query(sp, [codDiscount], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0]);
        }
    })
}

module.exports =  {
    getSalesDiscounts,
    getSalesDiscount
}