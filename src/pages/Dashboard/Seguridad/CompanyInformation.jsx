import React, { useEffect, useState } from 'react'
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AlertSuccess from '../../../components/AlertSuccess';
import AlertError from '../../../components/AlertError';

const CompanyInformation = () => {
    const [companyData, setCompanyData] = useState({
        COMPANY_NAM: '',
        COMPANY_ADDRESS: '',
        COMPANY_EMAIL: '',
        COMPANY_RTN: '',
        COMPANY_PHONE: '',
        COMPANY_LOCATION: '',
        COMPANY_FACEBOOK: '',
        COMPANY_INSTAGRAM: '',
        COMPANY_WHATSAPP: '',
        USER_LAST_UPDATE: '',
    });

    const [alertMessage, setAlertMessage] = useState({
        message: '',
        ok: ''
    });

    useEffect(() => {
        axios.get('/company-information', token())
        .then(res => setCompanyData(res.data[0]))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/company-information', companyData, token())
        .then(res =>{
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

    const handleInputChange = (e) => {
        setCompanyData({
            ...companyData,
            [e.target.name]: e.target.value
        })
    }
  return (
    <div className='p-4'>
        <h1 className="text-dark">Información de la empresa</h1>
        <hr />
        <form onSubmit={handleSubmit} action="#">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label>Nombre de la empresa</label>
                                <input onChange={handleInputChange} value={companyData.COMPANY_NAM} className="form-control text-dark" type="text" name="COMPANY_NAM" required/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Dirección de la empresa</label>
                                <textarea onChange={handleInputChange} value={companyData.COMPANY_ADDRESS} className="form-control text-dark" rows="3" name="COMPANY_ADDRESS" required/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Ciudad</label>
                                <input onChange={handleInputChange} value={companyData.COMPANY_LOCATION} className="form-control text-dark" type="text" name="COMPANY_LOCATION" required/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Email de la empresa</label>
                                <input onChange={handleInputChange} value={companyData.COMPANY_EMAIL} className="form-control text-dark" type="email" name="COMPANY_EMAIL" required/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>RTN</label>
                                <input minLength={14}  maxLength={14} pattern="^[0-9]{14}" onChange={handleInputChange} value={companyData.COMPANY_RTN} className="form-control text-dark" type="text" name="COMPANY_RTN" required title="RTN debe contener 14 carácteres númericos, sin guiones ni espacios."/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input minLength={8}  maxLength={8} pattern="^[0-9]{8}" onChange={handleInputChange} value={companyData.COMPANY_PHONE} className="form-control text-dark" type="text" name="COMPANY_PHONE" title="Teléfono debe contener 8 carácteres númericos, sin guiones ni espacios." required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 mt-2">
                            <i className="fa-brands fa-facebook fa-2xl text-primary"></i>
                        </div>
                        <div className="col-8 ml-1">
                            <div className="form-group">
                                <input onChange={handleInputChange} value={companyData.COMPANY_FACEBOOK} className="form-control text-dark" type="text" name="COMPANY_FACEBOOK" required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 mt-2">
                            <i className="fa-brands fa-instagram fa-2xl text-dark"></i>
                        </div>
                        <div className="col-8">
                            <div className="form-group">
                                <input onChange={handleInputChange} value={companyData.COMPANY_INSTAGRAM} className="form-control text-dark" type="text" name="COMPANY_INSTAGRAM" required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 mt-2">
                            <i className="fa-brands fa-whatsapp fa-2xl text-success"></i>
                        </div>
                        <div className="col-8">
                            <div className="form-group">
                                <input minLength={8}  maxLength={8} pattern="^[0-9]{8}" onChange={handleInputChange} value={companyData.COMPANY_WHATSAPP} className="form-control text-dark" type="text" name="COMPANY_WHATSAPP" title="Teléfono debe contener 8 carácteres númericos, sin guiones ni espacios." required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>{`Última actualización de: ${companyData.USER_LAST_UPDATE}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="submit" className='btn btn-success mb-2'>Actualizar información</button>
            </div>
            <div className="row">
                <div className="col-12">
                {alertMessage.ok ? <AlertSuccess message={alertMessage.message}/> : null}
                {alertMessage.ok === false ? <AlertError message={alertMessage.message}/> : null}
                </div>
            </div>
        </form>
    </div>
  )
}

export default CompanyInformation