import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddTaxForm = ({setSendRequest, setMessageError}) => {

    const [formAddTax, setFormAddTax] = useState({
        TAX: 0
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
                <div className="col-md-2">
                <label className='form-label mt-2' htmlFor="TAX">Impuesto<span className="text-danger">*</span></label>
                <input onChange={handleInputChange} value={formAddTax.TAX ? formAddTax.TAX: ''} className='form-control' name='TAX' type="float" required/>
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