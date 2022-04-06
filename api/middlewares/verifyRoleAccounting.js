const verifyRoleAccounting = (req, res, next) => {
    const {COD_ROLE} = req.user;

    const message = "No tienes autorización para realizar cambios.";

    switch(req.method){
        case 'GET':
            next();
            break;
        case 'POST':
            COD_ROLE === 1 || COD_ROLE === 3 ? next() : res.status(401).send({message});
            break;
        case 'PUT':
            COD_ROLE === 1 || COD_ROLE === 3 ?  next() : res.status(401).send({message});
            break;
        case 'DELETE':
            COD_ROLE === 1 || COD_ROLE === 3 ? next() : res.status(401).send({message});
            break;
    }
}

module.exports = verifyRoleAccounting;