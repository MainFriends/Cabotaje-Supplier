import {useState, useEffect} from 'react';

import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddFeesReceivable = ({rowCOD, setMessageError}) => {
    const [formAddFeesReceivable, setFormAddFeesReceivable] = useState({
        AMOUNT: 0,
        DAT_PAY: '',
        COD_TYP_PAY: 0
    });

    const [rowsCuotas, setRowsCuotas] = useState([]);
    const [sendRequestFeesReceivable, setSendRequestFeesReceivable] = useState(false);

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
                setSendRequestFeesReceivable(true);
           })
           .catch(err => {
               const {message} = err.response.data;
               setMessageError(message);

               setTimeout(() => {
                setMessageError('');
               }, 3000);
           })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/fees-receivable/${rowCOD}`, token())
           .then(res => {
               const {data} = res;
               setRowsCuotas(data);
               setSendRequestFeesReceivable(false);
           })
        }
    }, [rowCOD, sendRequestFeesReceivable]);

    return(
        <form id='AddFormCuota' onSubmit={handleSubmitFeesReceivable} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="AMOUNT">Monto</label>
                    <input onChange={handleInputChange} className='form-control' name='AMOUNT' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DAT_PAY">Fecha</label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_PAY' type="date" required/>
                </div>
                <div className="col-md-3">
                    <label className='form-label' htmlFor="COD_TYP_PAY">Tipo</label>
                    <input onChange={handleInputChange} className='form-control' name='COD_TYP_PAY' type="number" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseFeesReceivable' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default AddFeesReceivable;