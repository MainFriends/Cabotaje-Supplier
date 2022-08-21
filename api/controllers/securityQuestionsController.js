const mysqlConnect= require('../config');

const getQuestions = (req,res) => {
    const sp= 'CALL SP_SEL_SECURITY_QUESTIONS()';
    mysqlConnect.query(sp, [0], (err,result) =>{
        if(err){ 
            res.status(500).json(err);
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const addAnswer = (req,res) => {
    const {COD_USER} = req.user;
    const sp = 'CALL SP_INS_SECURITY_ANSWERS(?,?,?,?,?,?,?)';

    const {
        COD_QUESTION_1,
        RESPONSE_1,
        COD_QUESTION_2,
        RESPONSE_2,
        COD_QUESTION_3,
        RESPONSE_3
    } = req.body

    mysqlConnect.query(sp, [
        COD_USER,
        COD_QUESTION_1,
        RESPONSE_1,
        COD_QUESTION_2,
        RESPONSE_2,
        COD_QUESTION_3,
        RESPONSE_3
    ], (err,result) =>{
        if(err){ 
            res.status(500).json(err);
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const getUserQuestions = (req,res) => {
    const {COD_USER} = req.user;
    const sp= 'CALL SP_SEL_SECURITY_QUESTIONS()';
    mysqlConnect.query(sp, [COD_USER], (err,result) =>{
        if(err){ 
            res.status(500).json(err);
        }else{
            res.status(200).json(result[0]);
        };
    });
};

const compareQuestions = (req,res) =>{
    
    const {COD_USER} = req.user;
    const sp = 'CALL SP_COMPARE_SECURITY_QUESTION(?,?,?,?,?,?,?)';

    const {
        COD_QUESTION_1,
        RESPONSE_1,
        COD_QUESTION_2,
        RESPONSE_2,
        COD_QUESTION_3,
        RESPONSE_3
    } = req.body

    mysqlConnect.query(sp, [
        COD_USER,
        COD_QUESTION_1,
        RESPONSE_1,
        COD_QUESTION_2,
        RESPONSE_2,
        COD_QUESTION_3,
        RESPONSE_3
    ], (err,result) =>{
        if(err){ 
            res.status(500).json({message:'Alguna de tus respuestas es incorrecta.'});
        }else{
            res.status(200).json({message:'Excelente'});
        };
    });
};


module.exports = {
    getQuestions,
    addAnswer,
    getUserQuestions,
    compareQuestions
}