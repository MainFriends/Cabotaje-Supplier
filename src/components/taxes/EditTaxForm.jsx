import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const EditTaxForm = ({rowCOD, setSendRequest, setMessageError}) => {
    const [formEditTax, setFormEditTax] = useState({
        COD_STATUS: ''
    });

    const handleInputChange = (e) => {
        setFormEditTax({
            ...formEditTax,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/taxes/${rowCOD}`, token())
            .then(res => setFormEditTax(res.data[0]))
        }
    }, [rowCOD]);

    const handleSubmitTax = (e) => {
        e.preventDefault();
        axios.put(`/taxes/${rowCOD}`,formEditTax, token())
            .then(res => {
                document.querySelector('#idCloseEditForm').click();
                setSendRequest(true);
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            });
    }

    return(
        <form id='editFormTax' onSubmit={handleSubmitTax} action='#'>
            <div className="row mb-2">
                <div className="col-3">
                <label className='form-label' htmlFor="TAX">Impuesto</label>
                    <input min={0.0} max={0.99} step="0.01" onChange={handleInputChange} value={formEditTax.TAX ? formEditTax.TAX: ''} className='form-control' name='TAX' type="number" disabled/>
                </div>
                < div className="col-4">
                <label className='form-label' htmlFor="COD_STATUS">Estado  <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} value={formEditTax.COD_STATUS} className='form-control' name='COD_STATUS' required>
                        <option value=''>-Seleccionar-</option>
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
                    </select>    
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default EditTaxForm;