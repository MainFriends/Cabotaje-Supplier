import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const ChangePassword = ({setAlertMessage}) => {

    const [passForm, setPassForm] = useState({
        LAST_USER_PASSWORD: '',
        NEW_USER_PASSWORD: '',
        USER_PASSWORD: ''
    })

    const {NEW_USER_PASSWORD, USER_PASSWORD} = passForm;

    const handleInputChange = (e) => {
        setPassForm({
            ...passForm,
            [e.target.name]: e.target.value
        })
    }

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordEquals, setIsPasswordEquals] = useState(false);

    const cleanForm = (e) => {
        setPassForm({
            LAST_USER_PASSWORD: '',
            NEW_USER_PASSWORD: '',
            USER_PASSWORD: ''
        })
        e.target.reset()
    }

    useEffect(() => {
        //validar input nueva contraseña
        const inputNewPass = document.querySelector('#NEW_USER_PASSWORD');
        const regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
        if(regex.test(NEW_USER_PASSWORD)){
            inputNewPass.classList.remove('is-invalid');
            inputNewPass.classList.add('is-valid');
            setIsPasswordValid(true);
        }else{
            inputNewPass.classList.remove('is-valid');
            USER_PASSWORD !== '' && inputNewPass.classList.add('is-invalid');
            setIsPasswordValid(false);
        }

        //validar input repetir contraseña
        const inputPass = document.querySelector('#USER_PASSWORD');
        if(NEW_USER_PASSWORD === USER_PASSWORD && USER_PASSWORD !== ''){
            inputPass.classList.remove('is-invalid');
            inputPass.classList.add('is-valid');
            setIsPasswordEquals(true)
        }else{
            inputPass.classList.remove('is-valid');
            USER_PASSWORD !== '' && inputPass.classList.add('is-invalid');
            setIsPasswordEquals(false)
        }
    }, [passForm])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/change-password', passForm, token())
            .then(res => {
                const {message} = res.data;

                setAlertMessage({
                    message,
                    ok:true
                });

                setTimeout(() => {
                    setAlertMessage({
                        message: '',
                        ok: ''
                    });
                }, 3000);

                cleanForm(e)
            })
            .catch(err => {
                const {message} = err.response.data;

                setAlertMessage({
                    message,
                    ok:false
                });

                setTimeout(() => {
                    setAlertMessage({
                        message: '',
                        ok: ''
                    });
                }, 3000);

                e.target.LAST_USER_PASSWORD.value = ''
                e.target.LAST_USER_PASSWORD.focus()
            })
    }

  return (
    <>
        <h1 className="text-dark">Cambiar contraseña</h1>
        <hr />
        <form onSubmit={handleSubmit} action="#">
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label>Contraseña actual <span className="text-danger"> *</span></label>
                        <input onChange={handleInputChange} className="form-control text-dark" type="password" name="LAST_USER_PASSWORD" required/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña nueva <span className="text-danger"> *</span></label>
                        <input id='NEW_USER_PASSWORD' onChange={handleInputChange} className="form-control text-dark" type="password" name="NEW_USER_PASSWORD"/>
                        <small id="emailHelp" className="form-text text-muted">La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, 
                        al menos una mayúscula y al menos un caracter no alfanumérico.</small>
                    </div>
                    <div className="form-group">
                        <label>Repetir contraseña nueva <span className="text-danger"> *</span></label>
                        <input id='USER_PASSWORD' onChange={handleInputChange} className="form-control text-dark" type="password" name="USER_PASSWORD"/>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className={'btn btn-success ' + (isPasswordValid === true && isPasswordEquals === true && passForm.LAST_USER_PASSWORD !== '' ? '' : 'disabled')}>Cambiar contraseña</button>
            </div>
        </form>
    </>
  )
}

export default ChangePassword