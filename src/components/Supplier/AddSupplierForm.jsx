import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const AddSupplierForm = ({setSendRequest, setMessageError}) => {

    const [formAddSupplier, setFormAddSupplier] = useState({
        NAM_SUPPLIER: '',
        NAM_CONTACT: '',
        LAST_NAM_CONTACT: '',
        ADDRESS: '',
        NUM_PHONE_ONE: '',
        NUM_PHONE_TWO: '',
        EMAIL:'',
        NAM_CITY: '',
        ZIP_CODE:' '
    })

    const handleInputChange = (e) => {
        setFormAddSupplier({
            ...formAddSupplier,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitSupplier = (e) => {
        e.preventDefault();

        if(formAddSupplier.NUM_PHONE_TWO === ''){
            delete formAddSupplier['NUM_PHONE_TWO']
        }

        axios.post('/Supplier', formAddSupplier, token())
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
        <form id='addFormSupplier' onSubmit={handleSubmitSupplier} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_SUPPLIER ">Nombre del Proveedor<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_SUPPLIER' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$" minLength={1} maxLength={20} title="No debe contener carácteres especiales y/o númericos." onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_CONTACT ">Nombre de contacto<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_CONTACT' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$" minLength={2} maxLength={15} title="No debe contener carácteres especiales y/o númericos." onInput={toUpperCase}required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="LAST_NAM_CONTACT">Apellido de contacto<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='LAST_NAM_CONTACT' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$"minLength={1}  maxLength={15} title="No debe contener carácteres especiales y/o númericos." onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="ADDRESS">Dirección<span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} className='form-control' name='ADDRESS'  rows='3' cols='4' type="text" pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase}  maxLength={50}  wrap="hard"  required/>
                </div>           
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_PHONE_ONE' type="tel"  pattern="[0-9]{8}" minLength={8} maxLength={8} title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios." required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_PHONE_TWO' type="tel"  pattern="[0-9]{8}" title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."  min={8} maxLength={8}/>
                    <small className="form-text text-muted">Opcional</small>
                </div>  
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="EMAIL">Correo electrónico<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='EMAIL' type="email" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NAM_CITY">Ciudad<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_CITY' type="text"  pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase}  required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="ZIP_CODE">Código postal<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='ZIP_CODE' type="text" pattern="[0-9]{1,5}" minLength={5} maxLength={5} title="El código postal debe contener 5 caracteres númericos, sin guiones ni espacios." required/>
                </div>
            </div>
           
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>

    )
}



export default AddSupplierForm;