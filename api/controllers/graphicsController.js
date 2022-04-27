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

//Tipo de pago
const getGraphicsType = (req, res) => {
    
    const sp = 'CALL SP_GRAPHICS_TYPE_PAY()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Ventas por categoria
const getGraphicsCategory = (req, res) => {
    
    const sp = 'CALL SP_GRAFICA_CATEGORY()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Compras de la semana
const getPurchaseWeek = (req, res) => {
    
    const sp = 'CALL SP_PURCHASE_WEEK()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Compras del mes
const getPurchaseMonth = (req, res) => {
    
    const sp = 'CALL SP_PURCHASE_MONTH()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Ventas por empleado
const getSalesEmployee = (req, res) => {
    
    const sp = 'CALL SP_SALES_EMPLOYEE()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Proveedor que mas se compra
const getPurchaseSupplier = (req, res) => {
    
    const sp = 'CALL SP_PURCHASE_SUPPLIER()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Ventas a la semana grafica
const getSalesDay = (req, res) => {
    
    const sp = 'CALL SP_TOT_DAY()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Compras a la semana grafica
const getPurchaseToDay = (req, res) => {
    
    const sp = 'CALL SP_PURCHASE_TO_DAY()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Pedidos en proceso
const getOrdesPro = (req, res) => {
    
    const sp = 'CALL SP_ORDERS_PRO()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Ventas al dia (Card)
const getDaySales = (req, res) => {
    
    const sp = 'CALL SP_SALE_DAY()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Canatidad de veces que compra un cliente
const getCantClient = (req, res) => {
    
    const sp = 'CALL SP_SALE_CANT_CLIENT()'

    mysqlConnect.query(sp, [], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

//Lugares de donde nos visitan los clientes
const getDecrease = (req, res) => {
    
    const sp = 'CALL SP_DECREASE()'

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
    getSalesMonth,
    getGraphicsType,
    getGraphicsCategory,
    getPurchaseWeek,
    getPurchaseMonth,
    getSalesEmployee,
    getPurchaseSupplier,
    getSalesDay,
    getPurchaseToDay,
    getOrdesPro,
    getDaySales,
    getCantClient,
    getDecrease
}
