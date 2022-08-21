import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AlertError from '../../../components/AlertError';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';

const SecurityQuestions = ({setGoDashboard}) => {
    const [questions, setQuestions] = useState([]);
    const [questionsUser, setQuestionsUser] = useState({
        COD_QUESTION_1: '',
        RESPONSE_1: '',
        COD_QUESTION_2: '',
        RESPONSE_2: '',
        COD_QUESTION_3: '',
        RESPONSE_3: '',
    });
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        axios.get('/security-user-questions', token())
        .then(res => {
            setQuestions(res.data)
            setQuestionsUser({
                ...questionsUser,
                COD_QUESTION_1: res.data[0].COD_QUESTION,
                COD_QUESTION_2: res.data[1].COD_QUESTION,
                COD_QUESTION_3: res.data[2].COD_QUESTION
            });
        })
        .catch(err => console.log(err.response))
    }, [])

    const handleChangeValue = (e) => {
        setQuestionsUser({
            ...questionsUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/security-compare-questions',questionsUser, token())
        .then(res => {
            setGoDashboard(true)
        })
        .catch(err => {
            const {message} = err.response.data;
            setMessageError(message)

            setTimeout(() => {
                setMessageError('')
            }, 3000);
        })
    }

  return (
    <div className='container p-5'>
        <h4 className='text-dark'>Preguntas de seguridad</h4>
        <hr />
        <p>Selecciona tres preguntas de seguridad. Estas preguntas nos ayudarán a verificar tu identidad si olvidas tu contraseña.</p>
        <form onSubmit={handleSubmit} action="#">
            <div className="row">
                <div className="col-10">
                    <div className="row">
                        <div className="col-4">
                            <p className='text-dark font-weight-bold'>Pregunta de seguridad 1 <span className='text-danger'>*</span></p>
                        </div>
                        <div className="col-8">
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value={questions[0]?.QUESTION}
                            />
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
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value={questions[1]?.QUESTION}
                            />
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
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                value={questions[2]?.QUESTION}
                            />
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
                <div className="col-2 d-none d-lg-block bg-login-image"></div>
            </div>
            <div className="row">
                <div className="col-12 text-right mt-5">
                    <button className='btn btn-primary' type="submit">Terminar</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {messageError ? <AlertError message={messageError}/> : null}
                </div>
            </div>
        </form>
    </div>
  )
}

export default SecurityQuestions