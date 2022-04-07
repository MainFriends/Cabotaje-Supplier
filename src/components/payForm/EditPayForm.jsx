import { useState, useEffect } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from "moment";

const EditPayForm = ({rowCOD, setSendRequest, setMessageError}) => {
    const [formEditPayForm, setFormEditPayForm] = useState({
        HOURS_WORKED: 0,
        AMO_GROSS: 0,
        BONUS: 0,
        TOT_DEDUCTIONS: 0,
        NET_SALARY: 0,
        DAT_PAYMENT: ''
    });
    const [netSalary, setNetSalary] = useState(0);

    const getNetSalary = () => {
        const {HOURS_WORKED, AMO_GROSS, BONUS, TOT_DEDUCTIONS} = formEditPayForm
        const totSalary = (parseFloat(HOURS_WORKED) * parseFloat(AMO_GROSS)) + parseFloat(BONUS) - parseFloat(TOT_DEDUCTIONS)
        setNetSalary(totSalary);
        setFormEditPayForm({
            ...formEditPayForm,
            NET_SALARY: totSalary
        })
    }

    const handleInputChange = (e) => {
        setFormEditPayForm({
            ...formEditPayForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get(`/pay-form/${rowCOD}`, token())
           .then(res => setFormEditPayForm(res.data[0]));
    }, [rowCOD])

    const handleSubmitPayForm = (e) => {
        e.preventDefault();
        console.log(formEditPayForm)

        axios.put(`/pay-form/${rowCOD}`, formEditPayForm, token())
           .then(res => {
                document.querySelector('#closeEditPayForm').click();
                setSendRequest(true)
           })
           .catch(err => {
               const {message} = err.response.data;
               setMessageError(message);
               setTimeout(() => {
                   setMessageError('')
               }, 3000);
           })
    }


    return(
        <form id='editPayForm' onSubmit={handleSubmitPayForm} action='#'>
        <div className="row mb-4">
            <div className="col-md-8">
                <label className='form-label' htmlFor="EMPLOYEE">Empleado</label>
                <input className='form-control' value={`${formEditPayForm.FIRST_NAME} ${formEditPayForm.LAST_NAME}`} name='EMPLOYEE' type="text" required disabled/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="HOURS_WORKED">Dias Trabajados</label>
                <input onBlur={() => getNetSalary()}  onChange={handleInputChange} value={formEditPayForm.HOURS_WORKED} className='form-control' name='HOURS_WORKED' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="AMO_GROSS">Salario Base</label>
                <input onBlur={() => getNetSalary()} onChange={handleInputChange} value={formEditPayForm.AMO_GROSS} className='form-control' name='AMO_GROSS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="BONUS">Bonificaciones</label>
                <input onBlur={() => getNetSalary()} onChange={handleInputChange} value={formEditPayForm.BONUS} className='form-control' name='BONUS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="TOT_DEDUCTIONS">Deducciones</label>
                <input onBlur={() => getNetSalary()} onChange={handleInputChange} value={formEditPayForm.TOT_DEDUCTIONS} className='form-control' name='TOT_DEDUCTIONS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="NET_SALARY">Salario Neto</label>
                <input className='form-control' value={netSalary} name='NET_SALARY' type="number" required disabled/>
            </div>
            <div className="col-md-4">
                <label className='form-label mt-2' htmlFor="DAT_PAYMENT">Fecha de Pago</label>
                <input onChange={handleInputChange} value={moment(formEditPayForm.DAT_PAYMENT).format('YYYY-MM-DD')} className='form-control' name='DAT_PAYMENT' type="date" required/>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" id='closeEditPayForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default EditPayForm;