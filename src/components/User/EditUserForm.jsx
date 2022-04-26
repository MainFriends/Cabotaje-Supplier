import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from "moment";
import { toUpperCase } from "../../helpers/Mayusculas";


const EditUserForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditUser, setFormEditUser] = useState({
        IDENTITY: '',
        FIRST_NAME: '',
        MIDDLE_NAME: '',
        LAST_NAME: '',
        GENDER: '',
        NUM_PHONE_ONE: '',
        NUM_PHONE_TWO: '',
        NUM_REFERENCE: '',
        DAT_BIRTHDAY: '',
        NAM_CITY: '',
        ADDRESS: '',
        COD_ROLE:'',
        USER_EMAIL:'',
       
    })

    


    const handleInputChange = (e) => {
        setFormEditUser({
            ...formEditUser,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/User/${rowCOD}`, token())
            .then(res => setFormEditUser(res.data[0]))
        }
    }, [rowCOD])

    const handleSubmitUser = (e) => {
        e.preventDefault();
        axios.put(`/User/${rowCOD}`,formEditUser, token())
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
        <form id='editFormUser' onSubmit={handleSubmitUser} action='#'>
            <div className="row mb-4">
            <div className="col-md-4">
                    <label className='form-label' htmlFor="IDENTITY">Identidad</label>
                    <input onChange={handleInputChange} value={formEditUser.IDENTITY} className='form-control' name='IDENTITY' minlenght={13} maxLength={13}  type="tel" placeholder="####-####-######" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="FIRST_NAME">Nombre</label>
                    <input onChange={handleInputChange} value={formEditUser.FIRST_NAME} className='form-control' name='FIRST_NAME' type="text" pattern="[A-Z]{1}[a-z]{2,15}" title="La primera letra debe ser MAYUSCULA" placeholder="Ingrese Nombre" onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="MIDDLE_NAME">Segundo Nombre</label>
                    <input onChange={handleInputChange} value={formEditUser.MIDDLE_NAME} className='form-control' name='MIDDLE_NAME' type="text" pattern="[A-Z]{1}[a-z]{2,15}" title="La primera letra debe ser MAYUSCULA"placeholder="Ingrese segundo Nombre" onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="LAST_NAME">Apellido</label>
                    <input onChange={handleInputChange} value={formEditUser.LAST_NAME} className='form-control' name='LAST_NAME' type="text" pattern="[A-Z]{1}[a-z]{2,15}" title="La primera letra debe ser MAYUSCULA" placeholder="Ingrese Apellido" onInput={toUpperCase} required/>
                </div>
            
                <div className="col-md-4">
                    <label classname="form-label" htmlfor="GENDER">GENERO</label>
                    <select onChange={handleInputChange} value={formEditUser.GENDER} className="form-control" name="GENDER" type="text" required>
                    <option selected>-seleccionar-</option> 
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                    <option value="O">PREFIERO NO DECIRLO</option>
                    </select>   
                    </div>
                <div className="col-md-4 ">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1</label>
                    <input onChange={handleInputChange} value={formEditUser.NUM_PHONE_ONE} className='form-control' name='NUM_PHONE_ONE' type="tel"  pattern="[0-9]{8}" placeholder="########"   minLength={8} maxLength={8} title="El numero telfonico debe contener 8 caracteres" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} value={formEditUser.NUM_PHONE_TWO} className='form-control' name='NUM_PHONE_TWO' type="tel" pattern="[0-9]{1,8}"  placeholder="########" minLength={8}  maxLength={8} title="OPCIONAL" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_REFERENCE">TELEFONO DE REFERENCIA</label>
                    <input onChange={handleInputChange} value={formEditUser.NUM_REFERENCE} className='form-control' name='NUM_REFERENCE' type="tel" pattern="[0-9]{8}"  placeholder="########" minLength={8}  maxLength={8} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DAT_BIRTHDAY">fecha de Nacimiento</label>
                    <input onChange={handleInputChange} value={moment(formEditUser.DAT_BIRTHDAY).format('YYYY-MM-DD')} className='form-control' name='DAT_BIRTHDAY'   type="date" min="1950-01-01" required/>
                </div>
            
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_CITY">Ciudad</label>
                    <input onChange={handleInputChange.DAT_BIRTHDAY} value={formEditUser.NAM_CITY} className='form-control' name='NAM_CITY'   type="text" onInput={toUpperCase} pattern="[A-Z]{1}[a-z]{1,20}"  placeholder="Domicilio"  required/>
                </div>
                <div className="col-md-8 mt-1">
                    <label className='form-label' htmlFor="ADDRESS">Dirección</label>
                    <textarea onChange={handleInputChange} value={formEditUser.ADDRESS} className='form-control' name='ADDRESS'  rows='3' cols='4' type="text" placeholder="Direccion de su Domicilio" required/>
                </div>
                <br></br>
                <br></br>
                <br></br>
              
                    <div className="col-md-4">
                        <label classname="form-label" htmlfor="COD_ROLE">ROLES</label>
                        <select onChange={handleInputChange} value={formEditUser.COD_ROLE} className="form-control" name="COD_ROLE" type="text" required>
                        <option selected>-seleccionar-</option> 
                        <option value="1">administrador</option>
                        <option value="2">control de calidad</option>
                        <option value="3">contador</option>
                        <option value="4">cajero</option>
                        </select>
                        </div>
                <div className="col-md-5">
                    <label className='form-label' htmlFor="USER_EMAIL">EMAIL</label>
                    <input onChange={handleInputChange} value={formEditUser.USER_EMAIL} className='form-control' name='USER_EMAIL'  type="email" required/>
                </div>
            
            </div>
            
            
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default EditUserForm;