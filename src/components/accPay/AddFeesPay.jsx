import {useState} from 'react';
import moment from "moment";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddFeesPay = ({rowCOD, setMessageError, setSendRequest}) => {
    const [formAddFeesPay, setFormAddFeesPay] = useState({
        AMOUNT: 0,
        DATE_PAY: '',
        COD_TYP_PAY: ''
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
                setSendRequest(true);
                
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
                    <label className='form-label' htmlFor="AMOUNT">Monto <span className="text-danger"> *</span> </label>
                    <input onChange={handleInputChange} className='form-control' name='AMOUNT' type="number" required/>
                </div>
                <div className='col-md-4'>
                    <label className='form-label' htmlFor='COD_TYP_PAY'>Forma de Pago <span className="text-danger"> *</span> </label>
                    <select onChange={handleInputChange} value={formAddFeesPay.COD_TYP_PAY} className='form-control' name='COD_TYP_PAY' required>
                        <option value=''>-Seleccionar-</option>
                            <option value="1">Efectivo</option>
                            <option value="2">Tarjeta</option>
                            <option value="3">Transferencia</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DATE_PAY">Fecha <span className="text-danger"> *</span> </label>
                    <input max={moment().format('YYYY-MM-DD')} onChange={handleInputChange} className='form-control' name='DATE_PAY' type="date" required/>
                </div>
            </div>
                <div className="modal-footer">
                    <button type="button" id='idCloseFeesPay' className="btn btn-primary" data-toggle="modal" data-target='#idCobrar' data-dismiss="modal">Atrás</button>
                    <button type='submit' className="btn btn-success">Guardar</button>
                </div>
        </form>
    )
}

export default AddFeesPay;