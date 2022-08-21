import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';

const SecurityQuestions = ({setGoDashboard, setUserNew}) => {
    const [questions, setQuestions] = useState([]);
    const [questionsUser, setQuestionsUser] = useState({
        COD_QUESTION_1: '',
        RESPONSE_1: '',
        COD_QUESTION_2: '',
        RESPONSE_2: '',
        COD_QUESTION_3: '',
        RESPONSE_3: '',
    });

    useEffect(() => {
        axios.get('/security-questions', token())
        .then(res => setQuestions(res.data))
        .catch(err => console.log(err.response))
    }, [questionsUser.COD_QUESTION_1, questionsUser.COD_QUESTION_2, questionsUser.COD_QUESTION_3])

    const handleChangeValue = (e) => {
        setQuestionsUser({
            ...questionsUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/security-answers',questionsUser, token())
        .then(res => {
            setGoDashboard(true)
            setUserNew(false)
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='container p-5'>
        <h4 className='text-dark'>Preguntas de seguridad</h4>
        <hr />
        <p>Selecciona tres preguntas de seguridad. Estas preguntas nos ayudarán a verificar tu identidad si olvidas tu contraseña.</p>
        <form onSubmit={handleSubmit} action="#">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-4">
                            <p className='text-dark font-weight-bold'>Pregunta de seguridad 1 <span className='text-danger'>*</span></p>
                        </div>
                        <div className="col-8">
                            <select
                                onChange={handleChangeValue}
                                defaultValue={""}
                                className="form-control"
                                name="COD_QUESTION_1"
                                type="text"
                                required
                            >
                                <option value="">-Seleccionar-</option>
                                {questions.map(row => {
                                    if(row.COD_QUESTION != questionsUser.COD_QUESTION_2 && row.COD_QUESTION != questionsUser.COD_QUESTION_3){
                                        return <option key={row.COD_QUESTION} value={row.COD_QUESTION}>{row.QUESTION}</option>  
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <p className='text-dark'>Respuesta</p>
                        </div>
                        <div className="col-8">
                            <input
                            onChange={handleChangeValue}
                            className="form-control"
                            name="RESPONSE_1"
                            type="password"
                            required
                        />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4">
                            <p className='text-dark font-weight-bold'>Pregunta de seguridad 2<span className='text-danger'> *</span></p>
                        </div>
                        <div className="col-8">
                            <select
                                onChange={handleChangeValue}
                                defaultValue={""}
                                className="form-control"
                                name="COD_QUESTION_2"
                                type="text"
                                required
                            >
                                <option value="">-Seleccionar-</option>
                                {questions.map(row => {
                                    if(row.COD_QUESTION != questionsUser.COD_QUESTION_1 && row.COD_QUESTION != questionsUser.COD_QUESTION_3){
                                        return <option key={row.COD_QUESTION} value={row.COD_QUESTION}>{row.QUESTION}</option>  
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <p className='text-dark'>Respuesta</p>
                        </div>
                        <div className="col-8">
                            <input
                            onChange={handleChangeValue}
                            className="form-control"
                            name="RESPONSE_2"
                            type="password"
                            required
                        />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4">
                            <p className='text-dark font-weight-bold'>Pregunta de seguridad 3<span className='text-danger'> *</span></p>
                        </div>
                        <div className="col-8">
                            <select
                                onChange={handleChangeValue}
                                defaultValue={""}
                                className="form-control"
                                name="COD_QUESTION_3"
                                type="text"
                                required
                            >
                                <option value="">-Seleccionar-</option>
                                {questions.map(row => {
                                    if(row.COD_QUESTION != questionsUser.COD_QUESTION_1 && row.COD_QUESTION != questionsUser.COD_QUESTION_2){
                                        return <option key={row.COD_QUESTION} value={row.COD_QUESTION}>{row.QUESTION}</option>  
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4">
                            <p className='text-dark'>Respuesta</p>
                        </div>
                        <div className="col-8">
                            <input
                            onChange={handleChangeValue}
                            className="form-control"
                            name="RESPONSE_3"
                            type="password"
                            required
                        />
                        </div>
                    </div>
                </div>
                <div className="col-4 d-none d-lg-block bg-login-image"></div>
            </div>
            <div className="row">
                <div className="col-12 text-right mt-5">
                    <button className='btn btn-primary' type="submit">Terminar</button>
                    {false && <NavLink id='#go' to='/dashboard'></NavLink>}
                </div>
            </div>
        </form>
    </div>
  )
}

export default SecurityQuestions