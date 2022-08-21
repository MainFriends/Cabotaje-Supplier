const mysqlConnect = require('../config');

const getCategories = (req, res) => {
    const sp = 'CALL SP_SELECT_CATEGORY()';
    
    mysqlConnect.query(sp, (err, result) => {
            if(err){
                const message = err.message.split(': ')[1];
                res.status(400).send({message});
            }else{
                res.status(200).send(result[0]);
            }
        });
}

const getTaxes = (req, res) => {
    const sp = 'CALL SP_SELECT_TAX()';

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400).send({message});
        }else{
            res.status(200).send(result[0]);
        }
    })
}

module.exports = {
    getCategories,
    getTaxes
}