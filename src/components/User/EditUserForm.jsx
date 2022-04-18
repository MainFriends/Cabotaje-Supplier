import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

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
        USER_PASSWORD:''
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
                    <input onChange={handleInputChange} value={formEditUser.IDENTITY} className='form-control' name='IDENTITY' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="FIRST_NAME">Nombre</label>
                    <input onChange={handleInputChange} value={formEditUser.FIRST_NAME} className='form-control' name='FIRST_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="MIDDLE_NAME">Segundo Nombre</label>
                    <input onChange={handleInputChange} value={formEditUser.MIDDLE_NAME} className='form-control' name='MIDDLE_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="LAST_NAME">Apellido</label>
                    <input onChange={handleInputChange} value={formEditUser.LAST_NAME} className='form-control' name='LAST_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="GENDER">Apellido</label>
                    <input onChange={handleInputChange} value={formEditUser.GENDER} className='form-control' name='GENDER' type="text" required/>
                </div>
                <div className="col-md-4 ">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1</label>
                    <input onChange={handleInputChange} value={formEditUser.NUM_PHONE_ONE} className='form-control' name='NUM_PHONE_ONE' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} value={formEditUser.NUM_PHONE_TWO} className='form-control' name='NUM_PHONE_TWO' type="number" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NUM_REFERENCE">TELEFONO DE REFERENCIA</label>
                    <input onChange={handleInputChange} value={formEditUser.NUM_REFERENCE} className='form-control' name='NUM_REFERENCE' type="number" required/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="NAM_CITY">CIudad</label>
                    <input onChange={handleInputChange} value={formEditUser.NAM_CITY} className='form-control' name='NAM_CITY'   type="text" required/>
                </div>
                <div className="col-md-6 mt-1">
                    <label className='form-label' htmlFor="ADDRESS">Dirección</label>
                    <textarea onChange={handleInputChange} value={formEditUser.ADDRESS} className='form-control' name='ADDRESS'  rows='3' cols='4' type="text" required/>
                </div>
                <div className="col-md-2">
                    <label className='form-label' htmlFor="COD_ROLE">ROLES</label>
                    <input onChange={handleInputChange} value={formEditUser.COD_ROLE} className='form-control' name='CODE_ROLE'  type="text" required/>
                </div>
                <div className="col-md-5">
                    <label className='form-label' htmlFor="USER_EMAIL">EMAIL</label>
                    <input onChange={handleInputChange} value={formEditUser.USER_EMAIL} className='form-control' name='USER_EMAIL'  type="text" required/>
                </div>
                <div className="col-md-5">
                    <label className='form-label' htmlFor="USER_PASSWORD">Contraseña</label>
                    <input onChange={handleInputChange} value={formEditUser.USER_PASSWORD} className='form-control' name='USER_PASSWORD'   type="text" required/>
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