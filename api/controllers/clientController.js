const { NULL } = require('mysql/lib/protocol/constants/types');
const mysqlConnect= require('../config');


const getClients=(req,res) => {
    const sp= 'CALL SP_SEL_CLIENT(?)';
    mysqlConnect.query(sp, [0], (err,result) =>{
        if(err){ 
        res.status(500). send({message:'ERROR EN EL SERVIDOR'});
        }else{
        res.status(200).json(result[0]);
        console.log(req.client);
        };
    });
};

const getClient=(req,res) => {
    const {codClient}= req.params;
    const sp= 'CALL SP_SEL_CLIENT(?)';
    mysqlConnect.query(sp,[codClient] ,(err,result) =>{

        if(err){ 
        res.status(500). send({message:'ERROR EN EL SERVIDOR'});
        }else{
        res.status(200).json(result[0]);
        };
    });
};
const addClient=  (req,res) =>{
    
    const {
        IDENTITY,
        FIRST_NAME,
        LAST_NAME,
        ADDRESS ,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO = NULL,
        RTN 
    } = req.body
const sp= 'CALL SP_INS_CLIENT(?,?,?,?,?,?,?)';
    mysqlConnect.query(sp,[

        IDENTITY,
        FIRST_NAME,
        LAST_NAME,
        ADDRESS,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO,
        RTN


    ], (err)=> {

        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(201).send({message:'El cliente   ha sido registrado correctamente'});
        }
    });

}

const updateClient= (req,res) =>{
    const {codClient} = req.params;
    const {
        IDENTITY,
        FIRST_NAME,
        LAST_NAME,
        ADDRESS ,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO= NULL,
        RTN

    } = req.body
    
 const sp= 'CALL SP_UPD_CLIENT(?,?,?,?,?,?,?,?)';
    mysqlConnect.query(sp,[

        codClient,
        IDENTITY,
        FIRST_NAME,
        LAST_NAME,
        ADDRESS,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO,
        RTN

    ], (err)=> {

        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(201).send({message:'El cliente  ha sido actualizado correctamente'});
        }
    });

}
const deleteClient = (req, res) => {
    const {codClient} = req.params;
    const sp = `CALL SP_DEL_CLIENT(?)`;
    mysqlConnect.query(sp, [codClient], (err) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(200).send({message: 'El cliente ha sido eliminado exitosamente.'});
        }
    })
};
module.exports={
    getClients,
    getClient,
    addClient,
    updateClient,
    deleteClient
}
