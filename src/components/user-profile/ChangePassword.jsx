import React, { useEffect, useState } from 'react'

const ChangePassword = () => {
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

    useEffect(() => {
        //validar input nueva contraseña
        const inputNewPass = document.querySelector('#NEW_USER_PASSWORD');
        const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/
        if(regex.test(NEW_USER_PASSWORD)){
            inputNewPass.classList.remove('is-invalid');
            inputNewPass.classList.add('is-valid');
        }else if(USER_PASSWORD !== ''){
            inputNewPass.classList.add('is-invalid');
        }

        //validar input repetir contraseña
        const inputPass = document.querySelector('#USER_PASSWORD');
        if(NEW_USER_PASSWORD === USER_PASSWORD && USER_PASSWORD !== ''){
            inputPass.classList.remove('is-invalid');
            inputPass.classList.add('is-valid');
        }else if(USER_PASSWORD !== ''){
            inputPass.classList.add('is-invalid');
        }
    }, [passForm])

  return (
    <>
        <h1 className="text-dark">Cambiar contraseña</h1>
        <hr />
        <form action="#">
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label>Contraseña actual</label>
                        <input onChange={handleInputChange} className="form-control text-dark" type="password" name="LAST_USER_PASSWORD"/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña nueva</label>
                        <input id='NEW_USER_PASSWORD' onChange={handleInputChange} className="form-control text-dark" type="password" name="NEW_USER_PASSWORD"/>
                        <small id="emailHelp" className="form-text text-muted">La contraseña debe tener entre 6 y 16 caracteres, al menos un número, al menos una minúscula y al menos una mayúscula.</small>
                    </div>
                    <div className="form-group">
                        <label>Repetir contraseña nueva</label>
                        <input id='USER_PASSWORD' onChange={handleInputChange} className="form-control text-dark" type="password" name="USER_PASSWORD"/>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className={'btn btn-success ' + (NEW_USER_PASSWORD !== USER_PASSWORD || USER_PASSWORD === '' ? 'disabled' : '')}>Cambiar contraseña</button>
            </div>
        </form>
    </>
  )
}

export default ChangePassword