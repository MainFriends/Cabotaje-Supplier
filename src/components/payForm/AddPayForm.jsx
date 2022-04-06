import { useState } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";

const AddPayForm = () => {
    const [formAddPayForm, setFormAddPayForm] = useState({
        FIRST_NAME: '',
        LAST_NAME: '',
        HOURS_WORKED: '',
        AMO_GROSS: '',
        BONUS: '',
        TOT_DEDUCTIONS: '',
        NET_SALARY: '',
        DAT_PAYMENT: ''
    });

    const handleInputChange = (e) => {
        setFormAddPayForm({
            ...formAddPayForm,
            [e.target.name]: e.target.value
        })
    } 

    const handleSubmitPayForm = (e) => {
        e.preventDefault();
        axios.post('/pay-form', formAddPayForm, token())
           .then(res => console.log(res))
    }


    return(
        <form id='addPayForm' onSubmit={handleSubmitPayForm} action='#'>
        <div className="row mb-4">
            <div className="col-md-6">
                <label className='form-label' htmlFor="FIRST_NAME">Nombre</label>
                <input onChange={handleInputChange} className='form-control' name='FIRST_NAME' type="text" required/>
            </div>
            <div className="col-md-6">
                <label className='form-label' htmlFor="LAST_NAME">Apellido</label>
                <input onChange={handleInputChange} className='form-control' name='LAST_NAME' type="text" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label' htmlFor="HOURS_WORKED">Horas Trabajadas</label>
                <input onChange={handleInputChange} className='form-control' name='HOURS_WORKED' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label' htmlFor="AMO_GROSS">Salario Base</label>
                <input onChange={handleInputChange} className='form-control' name='AMO_GROSS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label' htmlFor="BONUS">Bonificaciones</label>
                <input onChange={handleInputChange} className='form-control' name='BONUS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label' htmlFor="TOT_DEDUCTIONS">Deducciones</label>
                <input className='form-control' name='TOT_DEDUCTIONS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label' htmlFor="NET_SALARY">Salario Neto</label>
                <input onChange={handleInputChange} className='form-control' name='NET_SALARY' type="number" required/>
            </div>
            <div className="col-md-4">
                <label className='form-label' htmlFor="DAT_PAYMENT">Fecha de Pago</label>
                <input onChange={handleInputChange} className='form-control' name='DAT_PAYMENT' type="date" required/>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" id='idClosePayForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default AddPayForm;