import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddTaxForm = ({setSendRequest, setMessageError}) => {

    const [formAddTax, setFormAddTax] = useState({
        TAX: 0.0,
        COD_STATUS:''
    });

    const handleInputChange = (e) => {
        setFormAddTax({
            ...formAddTax,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitTax = (e) => {
        e.preventDefault();
        axios.post('/taxes', formAddTax, token())
            .then(res => {
                document.querySelector('#idCloseAddForm').click();
                e.target.reset();
                setSendRequest(true);
                setFormAddTax({
                    TAX: 0.0,
                    COD_STATUS:''
                });
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }

    return(
        <form id='addFormTax' onSubmit={handleSubmitTax} action='#'>
            <div className="row mb-2">
                <div className="col-3">
                <label className='form-label' htmlFor="TAX">Impuesto <span className="text-danger">*</span></label>
                    <input min={0.0} max={0.99} step="0.01" onChange={handleInputChange} value={formAddTax.TAX ? formAddTax.TAX: ''} className='form-control' name='TAX' type="number" required/>
                </div>
                < div className="col-4">
                    <label className="form-label" htmlFor="COD_STATUS">
                        Estado<span className="text-danger"> *</span>
                    </label>
                    <select
                        onChange={handleInputChange}
                        defaultValue={""}
                        className="form-control"
                        name="COD_STATUS"
                        type="text"
                        required
                    >
                        <option value="">-Seleccionar-</option>
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}

export default AddTaxForm;