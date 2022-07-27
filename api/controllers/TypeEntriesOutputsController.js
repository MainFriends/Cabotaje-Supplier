const mysqlConnect = require('../config');

const getTypeEntries = (req, res) => {
    const sp = 'CALL SP_SEL_TYP_PRODUCT_ENTRIES()';

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0])
        }
    });
}

const getTypeOutputs = (req, res) => {
    const sp = 'CALL SP_SEL_TYP_PRODUCT_OUTPUT()';

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.status(200).json(result[0])
        }
    });
}

module.exports = {
    getTypeEntries,
    getTypeOutputs
};