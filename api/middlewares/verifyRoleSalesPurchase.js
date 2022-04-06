const verifyRoleSalesPurchase = (req, res, next) => {
    const {COD_ROLE} = req.user;

    const message = "No tienes autorización.";

    switch(req.method){
        case 'GET':
            next();
            break;
        case 'POST':
            COD_ROLE === 1 || COD_ROLE === 4 ? next() : res.status(401).send({message});
            break;
        case 'PUT':
            COD_ROLE === 1 || COD_ROLE === 4 ?  next() : res.status(401).send({message});
            break;
        case 'DELETE':
            COD_ROLE === 1 || COD_ROLE === 4 ? next() : res.status(401).send({message});
            break;
    }
}

module.exports = verifyRoleSalesPurchase;