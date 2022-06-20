import { useState } from "react";
import { useEffect } from "react";

import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from "moment";

const EditAccountPayForm = ({rowCOD, setSendRequest}) => {
    const [formEditAccountPay, setFormEditAccountPay] = useState({
        DESCRIPTION: '',
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

    useEffect(() => {
        if(rowCOD){
            axios.get(`/accounts-pay/${rowCOD}`, token())
               .then(res => {
                setFormEditAccountPay({
                    ...res.data[0],
                    DATE_LIMIT: moment(res.data[0].DATE_LIMIT).format('YYYY-MM-DD')
                })
               });
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
                    <label className='form-label' htmlFor="DATE_LIMIT">Fecha Límite <span className="text-danger"> *</span> </label>
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