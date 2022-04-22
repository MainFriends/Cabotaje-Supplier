import {useState} from 'react';

import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddFeesPay = ({rowCOD, setMessageError, setSendRequestFeesPay}) => {
    const [formAddFeesPay, setFormAddFeesPay] = useState({
        AMOUNT: 0,
        DATE_PAY: '',
        COD_TYP_PAY: 0
    });

    const handleInputChange = (e) => {
        setFormAddFeesPay({
            ...formAddFeesPay,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitFeesPay = (e) => {
        e.preventDefault();
        axios.post(`/fees-pay/${rowCOD}`, formAddFeesPay, token())
           .then(res => {
                document.querySelector('#idCloseFeesPay').click();
                e.target.reset();
                setSendRequestFeesPay(true);
           })
           .catch(err => {
               const {message} = err.response.data;
               setMessageError(message);

               setTimeout(() => {
                setMessageError('');
               }, 3000);
           })
    }

    return(
        <form id='AddFormCuota' onSubmit={handleSubmitFeesPay} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="AMOUNT">Monto</label>
                    <input onChange={handleInputChange} className='form-control' name='AMOUNT' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DATE_PAY">Fecha</label>
                    <input onChange={handleInputChange} className='form-control' name='DATE_PAY' type="date" required/>
                </div>
                <div className="col-md-3">
                    <label className='form-label' htmlFor="COD_TYP_PAY">Tipo</label>
                    <input onChange={handleInputChange} className='form-control' name='COD_TYP_PAY' type="number" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseFeesPay' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default AddFeesPay;