import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const AddUserForm = ({setSendRequest, setMessageError}) => {
    const [roles, setRoles] = useState([]);

    const [formAddUser, setFormAddUser] = useState({
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
        COD_ROLES:'',
        USER_EMAIL:'',
        USER_PASSWORD:''
    })

    useEffect(() => {
        axios.get('/roles', token())
            .then(res => {
                const arrayRoles = res.data.filter(rol => rol.COD_ROLE !== 2);
                setRoles(arrayRoles);
            })
    }, [])

    const handleInputChange = (e) => {
        setFormAddUser({
            ...formAddUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitUser = (e) => {
        e.preventDefault();

        if(formAddUser.NUM_PHONE_TWO === ''){
            delete formAddUser['NUM_PHONE_TWO'];
        }

        axios.post('/User', formAddUser, token())
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
<form id='addFormUser' onSubmit={handleSubmitUser} action='#'>
            <div className="row mb-4">
            <div className="col-md-4">
                    <label className='form-label' htmlFor="IDENTITY">Identidad<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='IDENTITY' minlenght={13} maxLength={13}  type="text" pattern="[0-9]{13}"  title="Identidad debe contener 13 carácteres númericos, sin guiones ni espacios." required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="FIRST_NAME">Primer nombre<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange}  className='form-control'  name='FIRST_NAME' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$"  title="Primer nombre no debe contener carácteres especiales y/o númericos." onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="MIDDLE_NAME">Segundo nombre<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='MIDDLE_NAME' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$" title="Segundo nombre no debe contener carácteres especiales y/o númericos.." onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="LAST_NAME">Apellido<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='LAST_NAME'  type="text" pattern="^[a-zA-ZñÑáéíóú ]+$" title="Apellido no debe contener carácteres especiales y/o númericos.." onInput={toUpperCase} required/>
                </div>

                <div className="col-md-4 mt-2">
                    <label className="form-label" htmlFor="GENDER">Género<span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={''} className="form-control" name="GENDER" type="text" required>
                        <option value=''>-Seleccionar-</option> 
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Prefiero no decirlo</option>
                    </select>
                    </div>
                    
                    <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_PHONE_ONE' type="tel"  pattern="[0-9]{8}" minLength={8} maxLength={8} title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."  required/>
                </div>

                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_PHONE_TWO' type="tel" pattern="[0-9]{8}"  min={8}  maxLength={8} title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."/>
                    <small className="form-text text-muted">Opcional</small>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_REFERENCE">Teléfono de referencia<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_REFERENCE' type="tel" pattern="[0-9]{8}"  minLength={8}  maxLength={8} title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios." required/>
                </div>
                 <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="DAT_BIRTHDAY">Fecha de nacimiento<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_BIRTHDAY' type="DATE" min="1950-01-01" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NAM_CITY">Ciudad<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_CITY' type="text" pattern="^[a-zA-Z0-9ñÑ_ ]+$" onInput={toUpperCase} required/>
                </div>
                <div className="col-md-8 mt-2">
                    <label className='form-label' htmlFor="ADDRESS">Dirección<span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} className='form-control' name='ADDRESS'  rows='3' cols='4' type="text" pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase} required/>
                </div>
                <br></br>
                <br></br>
                <br></br>
                    <div className="col-md-4 mt-2">
                    <label className="form-label" htmlFor="COD_ROLE">Rol<span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={''} className="form-control" name="COD_ROLE" type="text" required>
                        <option value=''>-Seleccionar-</option> 
                        {roles.map(rol => {
                            return <option key={rol.COD_ROLE} value={rol.COD_ROLE}>{rol.NAM_ROLE}</option>
                        })}
                    </select>
                    </div>

                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="EMAIL">Correo eletrónico<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='USER_EMAIL' type="email" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="PASSWORD">Contraseña<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control form-control-user' name='USER_PASSWORD'   type="password" minLength={8} maxLength={20} pattern="[A-Z]{1,20}[a-z]{1,20}[0-9]{1,20}"  title="La contraseña debe contener: mayúsculas, minúsculas y números."  required/>
                    <small className="form-text text-muted">Defina una contraseña temporal.</small>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default AddUserForm;