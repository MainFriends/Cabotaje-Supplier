import { useState, useEffect } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import AlertError from "../AlertError";

const AddPayForm = ({setSendRequest, setMessageError}) => {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [formAddPayForm, setFormAddPayForm] = useState({
        COD_USER: '',
        HOURS_WORKED: 0,
        AMO_GROSS: 0,
        BONUS: 0,
        TOT_DEDUCTIONS: 0,
        NET_SALARY: 0,
        DAT_PAYMENT: ''
    });

    //Estado que maneja el nombre del empleado
    const [employeeName, setEmployeeName] = useState('')
    const [netSalary, setNetSalary] = useState(0);

    const {HOURS_WORKED, AMO_GROSS, BONUS, TOT_DEDUCTIONS} = formAddPayForm;

    const getNetSalary = () => {
        const totSalary = (parseFloat(HOURS_WORKED) * parseFloat(AMO_GROSS)) + parseFloat(BONUS) - parseFloat(TOT_DEDUCTIONS)
        setNetSalary(totSalary);
        setFormAddPayForm({
            ...formAddPayForm,
            NET_SALARY: totSalary
        })
    }

    useEffect(() => {
        getNetSalary()
    }, [HOURS_WORKED, AMO_GROSS, BONUS, TOT_DEDUCTIONS])

    const handleInputChange = (e) => {
        setFormAddPayForm({
            ...formAddPayForm,
            [e.target.name]: e.target.value
        })
    }

    //get del usuario cada vez que cambia de foco el input COD_USER
    const getUserInput = () => {
        axios.get(`/user/${formAddPayForm.COD_USER}`, token())
            .then(res => {
                const {FIRST_NAME, LAST_NAME} = res.data[0];
                setEmployeeName(`${FIRST_NAME} ${LAST_NAME}`)
            })
            .catch(err => {
                setEmployeeName(`Empleado no encontrado`)
            })
    }


    const resetState = () => {
        setFormAddPayForm({
            COD_USER: '',
            HOURS_WORKED: 0,
            AMO_GROSS: 0,
            BONUS: 0,
            TOT_DEDUCTIONS: 0,
            NET_SALARY: 0,
            DAT_PAYMENT: ''
        });

        setEmployeeName('')

        setNetSalary(0)
    }

    const handleSubmitPayForm = (e) => {
        e.preventDefault();

        if(formAddPayForm.TOT_DEDUCTIONS > netSalary && netSalary <= 0){
            setErrorMessage('Las deducciones no pueden ser mayores o iguales al salario');
            setTimeout(() => {
            setErrorMessage('')
         }, 3000);
         return
        }

        axios.post('/pay-form', formAddPayForm, token())
           .then(res => {
               document.querySelector('#closeAddPayForm').click();
               e.target.reset();
               setSendRequest(true)
               resetState()
           })
           .catch(err => {
               const {message} = err.response.data
               setMessageError(message);
               setTimeout(() => {
                setMessageError('')
               }, 3000);
           })
    }

    return(
        <form id='addPayForm' onSubmit={handleSubmitPayForm} action='#'>
        <div className="row mb-4">
            <div className="col-md-3">
                <label className='form-label' htmlFor="COD_USER">Código<span className="text-danger"> *</span></label>
                <input onBlur={() => getUserInput()} onChange={handleInputChange} className='form-control' name='COD_USER' type="number" required/>
            </div>
            <div className="col-md-7">
                <label className='form-label' htmlFor="EMPLOYEE">Empleado</label>
                <input className='form-control' value={employeeName} name='EMPLOYEE' type="text" required disabled/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="HOURS_WORKED">Dias Trabajados <span className="text-danger"> *</span></label>
                <input min="1" pattern="[0-9]+" onChange={handleInputChange} value={formAddPayForm?.HOURS_WORKED} className='form-control' name='HOURS_WORKED' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="AMO_GROSS">Salario Base <span className="text-danger"> *</span> </label>
                <input min="1" pattern="[0-9]+" onChange={handleInputChange} value={formAddPayForm?.AMO_GROSS} className='form-control' name='AMO_GROSS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="BONUS">Bonificaciones</label>
                <input min="1" pattern="[0-9]+" onChange={handleInputChange} value={formAddPayForm?.BONUS} className='form-control' name='BONUS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="TOT_DEDUCTIONS">Deducciones <span className="text-danger"> *</span> </label>
                <input min="1" pattern="[0-9]+" onChange={handleInputChange} value={formAddPayForm?.TOT_DEDUCTIONS} className='form-control' name='TOT_DEDUCTIONS' type="number" required/>
            </div>
            <div className="col-md-3">
                <label className='form-label mt-2' htmlFor="NET_SALARY">Salario Neto</label>
                <input min="1" pattern="[0-9]+" onChange={handleInputChange} className='form-control' value={netSalary} name='NET_SALARY' type="number" required disabled/>
            </div>
            <div className="col-md-4">
                <label className='form-label mt-2' htmlFor="DAT_PAYMENT">Fecha de Pago <span className="text-danger"> *</span> </label>
                <input onChange={handleInputChange} className='form-control' name='DAT_PAYMENT' type="date" required/>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" id='closeAddPayForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit'  className="btn btn-success">Guardar</button>
        </div>
        {errorMessage ? <AlertError message={errorMessage} /> : null} 
    </form>
    )
}

export default AddPayForm;