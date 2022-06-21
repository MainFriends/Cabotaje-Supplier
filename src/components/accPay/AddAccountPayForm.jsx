import { useState } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";

const AddAccountPayForm = ({setSendRequest, setMessageError}) => {
    const [formAddAccountPay, setFormAddAccountPay] = useState({
        COD_INVOICE: '',
        DESCRIPTION: '',
        TOT_BALANCE: '',
        DATE_LIMIT: ''
    });

    const handleInputChange = (e) => {
        setFormAddAccountPay({
            ... formAddAccountPay,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmitAccountPayForm = (e) => {
        e.preventDefault();
        axios.post('/accounts-pay', formAddAccountPay, token())
           .then(res => {
               document.querySelector('#idCloseAddAccountPayForm').click();
               e.target.reset()
               setSendRequest(true);
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
        <form id='AddAccountPayForm' onSubmit={handleSubmitAccountPayForm} action='#'>
            <div className="row mb-4">
                <div className="col-md-4 mt-3">
                    <label className='form-label' htmlFor="COD_INVOICE">Código de la Factura <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='COD_INVOICE' type="number" required/>
                </div>
                <div className="col-md-8 mt-3">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción <span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} className='form-control' name='DESCRIPTION' type="text" required/>
                </div>
                <div className="col-md-3 mt-3">
                    <label className='form-label' htmlFor="TOT_BALANCE">Monto <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='TOT_BALANCE' type="number" required/>
                </div>
                <div className="col-md-3 mt-3">
                    <label className='form-label' htmlFor="DATE_LIMIT">Fecha Límite <span className="text-danger"> *</span> </label>
                    <input onChange={handleInputChange} className='form-control' name='DATE_LIMIT' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseAddAccountPayForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default AddAccountPayForm;