const mysqlConnect = require('../config')

const getCompanyData = (req, res) =>{
    const sp  = 'CALL SP_SEL_COMPANY_DATA()';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const updateCompanyData = (req, res) =>{
    const {COD_USER} = req.user;

        const {
            COMPANY_NAM,
            COMPANY_ADDRESS,
            COMPANY_EMAIL,
            COMPANY_RTN,
            COMPANY_PHONE,
            COMPANY_LOCATION,
            COMPANY_FACEBOOK,
            COMPANY_INSTAGRAM,
            COMPANY_WHATSAPP
        } = req.body
    
        const sp = 'CALL SP_UPD_COMPANY_DATA(?,?,?,?,?,?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
            COMPANY_NAM,
            COMPANY_ADDRESS,
            COMPANY_EMAIL,
            COMPANY_RTN,
            COMPANY_PHONE,
            COMPANY_LOCATION,
            COMPANY_FACEBOOK,
            COMPANY_INSTAGRAM,
            COMPANY_WHATSAPP,
            COD_USER
        ], (error, resultado) => {
            if(error){
                const message = error.message.split(': ')[1];
                res.status(500).send({message});
            }else{
                res.status(200).send({message: 'Información de la empresa actualizada exitosamente'})
            }
        });
    }

module.exports = {
    getCompanyData,
    updateCompanyData
}