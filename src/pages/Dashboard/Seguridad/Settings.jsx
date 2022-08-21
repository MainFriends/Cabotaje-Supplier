import React, { useEffect, useState } from 'react'
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AlertSuccess from '../../../components/AlertSuccess';
import AlertError from '../../../components/AlertError';

const Settings = () => {
    const [systemSettings, setSystemSettings] = useState({
        NUM_DAYS_PASSWORD_EXPIRED: '',
        NUM_ATTEMPS_LOGIN: ''
    });

    const [alertMessage, setAlertMessage] = useState({
        message: '',
        ok: ''
    });

    useEffect(() => {
        axios.get('/system-settings', token())
        .then(res => setSystemSettings(res.data[0]));
    }, [])

    const handleInputChange = (e) => {
        setSystemSettings({
            ...systemSettings,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/system-settings', systemSettings, token())
        .then(res => {
            const {message} = res.data
            setAlertMessage({
                message,
                ok: true
            })

            setTimeout(() => {
                setAlertMessage({
                    message: '',
                    ok: ''
                });
            }, 3000);
        })
        .catch(err => {
            setAlertMessage({
                message: "Ha ocurrido un error al intentar guardar los cambios",
                ok: false
            })

            setTimeout(() => {
                setAlertMessage({
                    message: '',
                    ok: ''
                });
            }, 3000);
        })
    }
  return (
     <div className='p-4'>
        <h1 className="text-dark">Configuraciones del sistema</h1>
        <hr/>
        <form onSubmit={handleSubmit} action="#">
            <div className="row">
                <div className="col-6">
                    <label className="form-label" htmlFor="NUM_DAYS_PASSWORD_EXPIRED">
                        Tiempo de expiración de contraseñas
                    </label>
                    <select
                        onChange={handleInputChange}
                        value={systemSettings.NUM_DAYS_PASSWORD_EXPIRED}
                        className="form-control"
                        name="NUM_DAYS_PASSWORD_EXPIRED"
                        required
                    >
                        <option value="">-Seleccionar-</option>
                        <option value="15">15 días</option>
                        <option value="30">30 días</option>
                        <option value="60">60 días</option>
                        <option value="90">90 días</option>
                        <option value="120">120 días</option>
                    </select>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <label className="form-label" htmlFor="NUM_ATTEMPS_LOGIN">
                        Número de intentos de inicio de sesión
                    </label>
                    <select
                        onChange={handleInputChange}
                        value={systemSettings.NUM_ATTEMPS_LOGIN}
                        className="form-control"
                        name="NUM_ATTEMPS_LOGIN"
                        required
                    >
                        <option value="">-Seleccionar-</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mt-5">
                    <p>{`Última actualización de: ${systemSettings.USER_LAST_UPDATE}`}</p>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className='btn btn-success'>Actualizar información</button>
            </div>
            <div className="col-12">
                {alertMessage.ok ? <AlertSuccess message={alertMessage.message}/> : null}
                {alertMessage.ok === false ? <AlertError message={alertMessage.message}/> : null}
            </div>
        </form>
     </div>
  )
}

export default Settings