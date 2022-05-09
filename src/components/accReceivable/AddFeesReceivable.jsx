import {useState} from 'react';

import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddFeesReceivable = ({rowCOD, setMessageError, setSendRequest}) => {
    const [formAddFeesReceivable, setFormAddFeesReceivable] = useState({
        AMOUNT: 0,
        DAT_PAY: '',
        COD_TYP_PAY: ''
    });

    const handleInputChange = (e) => {
        setFormAddFeesReceivable({
            ...formAddFeesReceivable,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitFeesReceivable = (e) => {
        e.preventDefault();
        axios.post(`/fees-receivable/${rowCOD}`, formAddFeesReceivable, token())
           .then(res => {
                document.querySelector('#idCloseFeesReceivable').click();
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
        <form id='AddFormCuota' onSubmit={handleSubmitFeesReceivable} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="AMOUNT">Monto</label>
                    <input onChange={handleInputChange} className='form-control' name='AMOUNT' type="number" required/>
                </div>
                <div className='col-md-4'>
                    <label className='form-label' htmlFor='COD_TYP_PAY'>Forma de Pago</label>
                    <select onChange={handleInputChange} value={formAddFeesReceivable.COD_TYP_PAY} className='form-control' name='COD_TYP_PAY' required>
                        <option value=''>-Seleccionar-</option>
                            <option value="1">Efectivo</option>
                            <option value="2">Tarjeta</option>
                            <option value="3">Transferencia</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DAT_PAY">Fecha</label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_PAY' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseFeesReceivable' className="btn btn-primary" data-toggle="modal" data-target='#idCobrar' data-dismiss="modal">Atrás</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default AddFeesReceivable;