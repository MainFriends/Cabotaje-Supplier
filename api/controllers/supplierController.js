const mysqlConnect= require('../config');


const getSuppliers=(req,res) => {
    const sp= 'CALL SP_SEL_SUPPLIER(?)';
    mysqlConnect.query(sp, [0], (err,result) =>{
        if(err){ 
        res.status(500). send({message:'ERROR EN EL SERVIDOR'});
        }else{
        res.status(200).json(result[0]);
        console.log(req.supplier);
        };
    });
};

const getSupplier=(req,res) => {
    const {codSupplier}= req.params;
    const sp= 'CALL SP_SEL_SUPPLIER(?)';
    mysqlConnect.query(sp,[codSupplier] ,(err,result) =>{

        if(err){ 
        res.status(500). send({message:'ERROR EN EL SERVIDOR'});
        }else{
        res.status(200).json(result[0]);
        };
    });
};

const addSupplier= (req,res) =>{
    const {
                                NAM_SUPPLIER,
								NAM_CONTACT,
								LAST_NAM_CONTACT,
								ADDRESS,
								NUM_PHONE_ONE,
								NUM_PHONE_TWO = null,
								EMAIL,
								NAM_CITY,
								ZIP_CODE

    } = req.body

    console.log(NUM_PHONE_TWO)




    const sp= 'CALL SP_INS_SUPPLIER(?,?,?,?,?,?,?,?,?)';
    mysqlConnect.query(sp,[

        NAM_SUPPLIER,
        NAM_CONTACT,
        LAST_NAM_CONTACT,
        ADDRESS,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO,
        EMAIL,
        NAM_CITY,
        ZIP_CODE

    ], (err)=> {

        if(err){
            res.status(400). send({message: err.message});
        }else{
            res.status(201).send({message:'El proveedor ha sido registrado correctamente'});
        }
    });

}

const updateSupplier= (req,res) =>{
    const {codSupplier} = req.params;
     const {
                                NAM_SUPPLIER,
								NAM_CONTACT,
								LAST_NAM_CONTACT,
								ADDRESS,
								NUM_PHONE_ONE,
								NUM_PHONE_TWO = null,
								EMAIL,
								NAM_CITY,
								ZIP_CODE

    } = req.body

    const sp= 'CALL SP_UPD_SUPPLIER (?,?,?,?,?,?,?,?,?,?)';
    mysqlConnect.query(sp,[
        codSupplier,
        NAM_SUPPLIER,
        NAM_CONTACT,
        LAST_NAM_CONTACT,
        ADDRESS,
        NUM_PHONE_ONE,
        NUM_PHONE_TWO,
        EMAIL,
        NAM_CITY,
        ZIP_CODE

    ], (err)=> {

        if(err){
            res.status(400). send({message: err.message});
        }else{
            res.status(201).send({message:'El proveedor ha sido actualizado correctamente'});
        }
    });

}
const deleteSupplier = (req, res) => {
    const {codSupplier} = req.params;
    const sp = `CALL SP_DEL_SUPPLIER(?)`;
    mysqlConnect.query(sp, [codSupplier], (err) => {
        if(err){
            res.status(304).send({message: err.message});
        }else{
            res.status(200).send({message: 'El usuario ha sido eliminado exitosamente.'});
        }
    })
};
module.exports={
    getSupplier,
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
}


