import { useEffect,useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const EditSupplierForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditSupplier, setFormEditSupplier] = useState({
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
        setFormEditSupplier({
            ...formEditSupplier,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if(rowCOD){
            axios.get(`/supplier/${rowCOD}`, token())
            .then(res => setFormEditSupplier(res.data[0]))
        }
    }, [rowCOD])
    const handleSubmitSupplier = (e) => {
        e.preventDefault();
        axios.put(`/supplier/${rowCOD}`,formEditSupplier, token())
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
            })
    }
    return(
        <form id='editFormSupplier' onSubmit={handleSubmitSupplier} action='#'>
        <div className="row mb-4">
            <div className="col-md-4">
                <label className='form-label' htmlFor="NAM_SUPPLIER">Nombre del Proveedor</label>
                <input onChange={handleInputChange} value={formEditSupplier.NAM_SUPPLIER} className='form-control' name='NAM_SUPPLIER' type="text"  onInput={toUpperCase} required/>
            </div>
            <div className="col-md-4">
                <label className='form-label' htmlFor="NAM_CONTACT">Nombre del contacto</label>
                <input onChange={handleInputChange} value={formEditSupplier.NAM_CONTACT} className='form-control' name='NAM_CONTACT' type="text"  pattern="[A-Z]{1}[a-z]{2,30}"  onInput={toUpperCase} required/>
            </div>
            <div className="col-md-4">
                <label className='form-label' htmlFor="LAST_NAM_CONTACT">Apellido del contacto</label>
                <input onChange={handleInputChange} value={formEditSupplier.LAST_NAM_CONTACT} className='form-control'  name='LAST_NAM_CONTACT' type="Text"  pattern="[A-Z]{1}[a-z]{2,30}"   onInput={toUpperCase} required/>
            </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="ADDRESS">Dirección</label>
                <textarea onChange={handleInputChange} value={formEditSupplier.ADDRESS} className='form-control' name='ADDRESS'  rows='3' cols='4' type="text" onInput={toUpperCase} required/>
            </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1</label>
                <input onChange={handleInputChange} value={formEditSupplier.NUM_PHONE_ONE} className='form-control' name='NUM_PHONE_ONE' type="tel" pattern="[0-9]{8}" minLength={8} maxLength={8} title="El numero telfono debe contener 8 caracteres" required/>
            </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                <input onChange={handleInputChange} value={formEditSupplier.NUM_PHONE_TWO} className='form-control' name='NUM_PHONE_TWO'  type="tel"  pattern="[0-9]{1,8}" title="OPCIONAL"  min={0} maxLength={8} required/>
            </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="EMAIL">Correo Electronico</label>
                <input onChange={handleInputChange} value={formEditSupplier.EMAIL} className='form-control' name='EMAIL' type="email" required/>
            </div>
            
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="NAM_CITY">Ciudad</label> 
                <input onChange={handleInputChange} value={formEditSupplier.NAM_CITY} className='form-control' name='NAM_CITY' type="text" pattern="[A-Z]{1}[a-z]{2,15}" onInput={toUpperCase} required/>
            </div>
         
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="ZIP_CODE">Código postal</label>
                <input onChange={handleInputChange} value={formEditSupplier.ZIP_CODE} className='form-control' name='ZIP_CODE' type="text" pattern="[0-9]{5,7}" minLength={5} maxLength={7} required/>
            </div>

        </div>
        
        <div className="modal-footer">
            <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}



export default EditSupplierForm;