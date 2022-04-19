const mysqlConnect = require('../config');

const getRoles = (req, res) => {
    
    const sp = 'CALL SP_GRAFICA_ROLES()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//productos mas vendidos
const getSalesProducts = (req, res) => {
    
    const sp = 'CALL SP_SEL_PRODUCTSSALES()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Ventas de la semana
const getSalesWeek = (req, res) => {
    
    const sp = 'CALL SP_SALES_WEEK()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Ventas del mes
const getSalesMonth = (req, res) => {
    
    const sp = 'CALL SP_SALES_MONTH()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}


module.exports = {
    getRoles,
    getSalesProducts,
    getSalesWeek,
    getSalesMonth

}
