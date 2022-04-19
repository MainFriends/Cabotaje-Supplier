import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from "moment";

const EditAccountPayForm = ({rowCOD, setSendRequest}) => {
    const [formEditAccountPay, setFormEditAccountPay] = useState({
        DESCRIPTION: '',
        TOT_BALANCE: '',
        DATE_LIMIT: ''
    });

    const handleInputChange = (e) => {
        setFormEditAccountPay({
            ... formEditAccountPay,
            [e.target.name] : e.target.value
        });
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/accounts-pay/${rowCOD}`, token())
           .then(res => setFormEditAccountPay(res.data[0]))
        }
    }, [rowCOD])

    const handleSubmitAccountPayForm = (e) => {
        e.preventDefault();

        axios.put(`/accounts-pay/${rowCOD}`, formEditAccountPay, token())
           .then(res => {
            document.querySelector('#idCloseEditAccountPayForm').click();
            setSendRequest(true)
           })
    }

    return(
        <form id='AddAccountPayForm' onSubmit={handleSubmitAccountPayForm} action='#'>
            <div className="row mb-4">
                <div className="col-md-8 mt-3">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                    <textarea onChange={handleInputChange} value={formEditAccountPay.DESCRIPTION} className='form-control' name='DESCRIPTION' type="text" required/>
                </div>
                <div className="col-md-3 mt-3">
                    <label className='form-label' htmlFor="TOT_BALANCE">Monto</label>
                    <input onChange={handleInputChange} value={formEditAccountPay.TOT_BALANCE} className='form-control' name='TOT_BALANCE' type="number" required/>
                </div>
                <div className="col-md-3 mt-3">
                    <label className='form-label' htmlFor="DATE_LIMIT">Fecha Límite</label>
                    <input onChange={handleInputChange} value={moment(formEditAccountPay.DATE_LIMIT).format('YYYY-MM-DD')} className='form-control' name='DATE_LIMIT' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseEditAccountPayForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default EditAccountPayForm;