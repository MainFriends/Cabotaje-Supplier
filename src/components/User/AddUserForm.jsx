import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';



const AddUserForm = ({setSendRequest, setMessageError}) => {

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

    const handleInputChange = (e) => {
        setFormAddUser({
            ...formAddUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitUser = (e) => {
        e.preventDefault();
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
                    <label className='form-label' htmlFor="IDENTITY">Identidad</label>
                    <input onChange={handleInputChange} className='form-control' name='IDENTITY' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="FIRST_NAME">Nombre</label>
                    <input onChange={handleInputChange} className='form-control' name='FIRST_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="MIDDLE_NAME">Segundo Nombre</label>
                    <input onChange={handleInputChange} className='form-control' name='MIDDLE_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="LAST_NAME">Apellido</label>
                    <input onChange={handleInputChange} className='form-control' name='LAST_NAME' type="text" required/>
                </div>

                <div className="col-md-4">
                    <label className='form-label' htmlFor="GENDER">Genero</label>
                    <input onChange={handleInputChange} className='form-control' name='GENDER' type="text" required/>
                </div>
                
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1</label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_PHONE_ONE' type="number" required/>
                </div> 
                
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_PHONE_TWO' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_REFERENCE">REFERENCIA</label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_REFERENCE' type="number" required/>
                </div>
                 <div className="col-md-4">
                    <label className='form-label' htmlFor="DAT_BIRTHDAY">FECHA DE NACIMIENTO</label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_BIRTHDAY' type="DATE" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_CITY">Ciudad</label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_CITY' type="text" required/>
                </div>
                <div className="col-md-8">
                    <label className='form-label' htmlFor="ADDRESS">Dirección</label>
                    <textarea onChange={handleInputChange} className='form-control' name='ADDRESS'  rows='3' cols='4' type="number" required/>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="col-md-12"> ROLES </div>

                <div className="form-check col-md-3" >
                    <input onChange={handleInputChange} className="form-check-input" type="radio" name="COD_ROLE" id="exampleRadios1" value="1" rows='3' cols='4' required/>
                    <label className="form-check-label" for="exampleRadios1">
                        ADMINISTRADOR
                    </label>
                    </div>
                    <div className="form-check col-md-3">
                    <input onChange={handleInputChange} className="form-check-input" type="radio" name="COD_ROLE" id="exampleRadios2" value="2" required/>
                    <label className="form-check-label" for="exampleRadios2">
                        CONTROL DE CALIDAD
                    </label>
                    </div>
                    <div className="form-check col-md-3">
                    <input onChange={handleInputChange} className="form-check-input" type="radio" name="COD_ROLE" id="exampleRadios3" value="3" required/>
                    <label className="form-check-label" for="exampleRadios3">
                       CONTADOR
                    </label>
                    </div>
                    <div className="form-check col-md-3">
                    <input onChange={handleInputChange} className="form-check-input" type="radio" name="COD_ROLE" id="exampleRadios2" value="4" required/>
                    <label className="form-check-label" for="exampleRadios2">
                        CAJERO
                    </label>
                    </div>

                <div className="col-md-5">
                    <label className='form-label' htmlFor="EMAIL">EMAIL</label>
                    <input onChange={handleInputChange} className='form-control' name='USER_EMAIL'  type="text" required/>
                </div>
                <div className="col-md-5">
                    <label className='form-label' htmlFor="PASSWORD">Contraseña</label>
                    <input onChange={handleInputChange} className='form-control' name='USER_PASSWORD'   type="Text" required/>
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