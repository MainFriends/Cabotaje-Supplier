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
        const input = document.querySelector('#USER_PASSWORD');
        if(NEW_USER_PASSWORD === USER_PASSWORD && USER_PASSWORD !== ''){
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }else if(USER_PASSWORD !== ''){
            input.classList.add('is-invalid');
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
                        <input onChange={handleInputChange} className="form-control text-dark" type="password" name="NEW_USER_PASSWORD"/>
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