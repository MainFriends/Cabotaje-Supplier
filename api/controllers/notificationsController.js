const mysqlConnect = require('../config');

const getNotifications = (req, res) => {
    const sp = 'CALL SP_SEL_NOTIFICATIONS(?)';

    mysqlConnect.query(sp, [0], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.json(result[0]);
        }
    })
}

const getNotification = (req, res) => {
    const {codNotification} = req.params;
    
    const sp = 'CALL SP_SEL_NOTIFICATIONS(?)';

    mysqlConnect.query(sp, [codNotification], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.json(result[0]);
        }
    })
}

const addNotification = (req, res) => {
    const {
        COD_ROLE, 
        MESSAGE, 
        TYP_NOTIFICATION
    } = req.body;

    const sp = 'CALL SP_INS_NOTIFICATIONS(?,?,?)';

    mysqlConnect.query(sp, [
        COD_ROLE, 
        MESSAGE, 
        TYP_NOTIFICATION
    ], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(500).send({message});
        }else{
            res.send({message: "Notificación creada."})
        }
    });
}

module.exports = {
    getNotifications,
    getNotification,
    addNotification,
}