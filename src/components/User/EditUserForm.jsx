import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from "moment";
import { toUpperCase } from "../../helpers/Mayusculas";


const EditUserForm = ({rowCOD, setSendRequest, setMessageError}) => {
    const [rolesEdit, setRolesEdit] = useState([]);
    const [isNewPasswordGenerate, setIsNewPasswordGenerate] = useState(false);

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
        COD_STATUS:'',
        COD_ROLE:'',
        USER_EMAIL:'',
        USER_PASSWORD: ''
    })

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        axios.get('/roles', token())
            .then(res => {
                const arrayRoles = res.data.filter(rol => rol.COD_ROLE !== 2);
                setRolesEdit(arrayRoles);
            })
    }, [])

    const handleInputChange = (e) => {
        setFormEditUser({
            ...formEditUser,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/User/${rowCOD}`, token())
            .then(res => {
                setFormEditUser({
                    ...res.data[0],
                    DAT_BIRTHDAY: moment(res.data[0].DAT_BIRTHDAY).format('YYYY-MM-DD'),
                    USER_PASSWORD: '' 
                })
            })
        }
    }, [rowCOD])

    const handleSubmitUser = (e) => {
        e.preventDefault();
        delete formEditUser['IMG_USER'];
        if(!isNewPasswordGenerate){
            delete formEditUser['USER_PASSWORD'];
        }
        if(formEditUser.NUM_PHONE_TWO === ''){
            delete formEditUser['NUM_PHONE_TWO'];
        }
        axios.put(`/User/${rowCOD}`,formEditUser, token())
            .then(res => {
                document.querySelector('#idCloseEditForm').click();
                setSendRequest(true);
                setIsNewPasswordGenerate(false);
                setFormEditUser({
                    ...formEditUser,
                    USER_PASSWORD: ''
                })
                delete formEditUser['USER_PASSWORD'];
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }

    useEffect(() => {
        //validar input contraseña
        if(isNewPasswordGenerate){
            const {USER_PASSWORD} = formEditUser
            const inputPass = document.querySelector('#USER_PASSWORD_EDIT');
            const regex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,255}$/
            if(regex.test(USER_PASSWORD)){
                inputPass.classList.remove('is-invalid');
                inputPass.classList.add('is-valid');
                setIsPasswordValid(true);
            }else{
                inputPass.classList.remove('is-valid');
                USER_PASSWORD !== '' && inputPass.classList.add('is-invalid');
                setIsPasswordValid(false);
            }
        }
  }, [formEditUser.USER_PASSWORD, isNewPasswordGenerate])

    return(
        <form id="editFormUser" onSubmit={handleSubmitUser} action="#">
        <h6 className="text-muted">Información general de empleado</h6>
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label" htmlFor="IDENTITY">
              Identidad<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.IDENTITY}
                onChange={handleInputChange}
                className="form-control"
                name="IDENTITY"
                minlenght={13}
                maxLength={13}
                type="text"
                pattern="^[0-1][0-9]{12}"
                title="Identidad debe comenzar con cero o uno, contener 13 carácteres númericos, sin guiones ni espacios."
                required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="FIRST_NAME">
              Primer nombre<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.FIRST_NAME}
                onChange={handleInputChange}
                className="form-control"
                name="FIRST_NAME"
                type="text"
                pattern="^[a-zA-ZñÑáéíóú ]+$"
                title="Primer nombre no debe contener carácteres especiales y/o númericos."
                onInput={toUpperCase}
                required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="MIDDLE_NAME">
              Segundo nombre<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.MIDDLE_NAME}
                onChange={handleInputChange}
                className="form-control"
                name="MIDDLE_NAME"
                type="text"
                pattern="^[a-zA-ZñÑáéíóú ]+$"
                title="Segundo nombre no debe contener carácteres especiales y/o númericos."
                onInput={toUpperCase}
                required
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="LAST_NAME">
              Apellido<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.LAST_NAME}
                onChange={handleInputChange}
                className="form-control"
                name="LAST_NAME"
                type="text"
                pattern="^[a-zA-ZñÑáéíóú ]+$"
                title="Apellido no debe contener carácteres especiales y/o númericos."
                onInput={toUpperCase}
                required
            />
          </div>
  
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="GENDER">
              Género<span className="text-danger"> *</span>
            </label>
            <select
                value={formEditUser.GENDER}
                onChange={handleInputChange}
                defaultValue={""}
                className="form-control"
                name="GENDER"
                type="text"
                required
            >
              <option value="">-Seleccionar-</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
  
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="NUM_PHONE_ONE">
              Teléfono 1<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.NUM_PHONE_ONE}
                onChange={handleInputChange}
                className="form-control"
                name="NUM_PHONE_ONE"
                type="tel"
                pattern="[0-9]{8}"
                minLength={8}
                maxLength={8}
                title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."
                required
            />
          </div>
  
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="NUM_PHONE_TWO">
              Teléfono 2
            </label>
            <input
                value={formEditUser.NUM_PHONE_TWO === 0 ? '' : formEditUser.NUM_PHONE_TWO}
                onChange={handleInputChange}
                className="form-control"
                name="NUM_PHONE_TWO"
                type="tel"
                pattern="[0-9]{8}"
                min={8}
                maxLength={8}
                title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."
            />
            <small className="form-text text-muted">Opcional</small>
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="NUM_REFERENCE">
              Teléfono de referencia<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.NUM_REFERENCE}
                onChange={handleInputChange}
                className="form-control"
                name="NUM_REFERENCE"
                type="tel"
                pattern="[0-9]{8}"
                minLength={8}
                maxLength={8}
                title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."
                required
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="DAT_BIRTHDAY">
              Fecha de nacimiento<span className="text-danger"> *</span>
            </label>
            <input
                value={moment(formEditUser.DAT_BIRTHDAY).format('YYYY-MM-DD')}
                onChange={handleInputChange}
                className="form-control"
                name="DAT_BIRTHDAY"
                type="DATE"
                min="1950-01-01"
                required
            />
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="NAM_CITY">
              Ciudad<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.NAM_CITY}
                onChange={handleInputChange}
                className="form-control"
                name="NAM_CITY"
                type="text"
                pattern="^[a-zA-Z0-9ñÑ_ ]+$"
                onInput={toUpperCase}
                required
            />
          </div>
          <div className="col-md-8 mt-2">
            <label className="form-label" htmlFor="ADDRESS">
              Dirección<span className="text-danger"> *</span>
            </label>
            <textarea
                value={formEditUser.ADDRESS}
                onChange={handleInputChange}
                className="form-control"
                name="ADDRESS"
                rows="3"
                cols="4"
                type="text"
                pattern="^[a-zA-Z0-9ñÑØº-_ ]+$"
                onInput={toUpperCase}
                required
            />
          </div>
        </div>
        <h6 className="text-muted">Información de acceso</h6>
        <div className="row">
          <br />
          <div className="col-md-3 mt-2">
            <label className="form-label" htmlFor="COD_ROLE">
              Rol<span className="text-danger"> *</span>
            </label>
            <select
                value={formEditUser.COD_ROLE}
                onChange={handleInputChange}
                className="form-control"
                name="COD_ROLE"
                type="text"
                required
            >
              <option value="">-Seleccionar-</option>
              {rolesEdit.map((rol) => {
                return (
                  <option key={rol.COD_ROLE} value={rol.COD_ROLE}>
                    {rol.NAM_ROLE}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-4 mt-2">
            <label className="form-label" htmlFor="EMAIL">
              Correo eletrónico<span className="text-danger"> *</span>
            </label>
            <input
                value={formEditUser.USER_EMAIL}
                onChange={handleInputChange}
                className="form-control"
                name="USER_EMAIL"
                type="email"
                required
            />
          </div>
            <div className="col-md-3 mt-2">
                <label className="form-label" htmlFor="COD_STATUS">
                Estado<span className="text-danger"> *</span>
                </label>
                <select
                    value={formEditUser.COD_STATUS}
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
              {
                isNewPasswordGenerate 
                ?
                    <div className="col-md-4 mt-2">
                        <label className="form-label" htmlFor="USER_PASSWORD">
                        Contraseña temporal<span className="text-danger"> *</span>
                        </label>
                        <input
                        id="USER_PASSWORD_EDIT"
                        onChange={handleInputChange}
                        className="form-control form-control-user"
                        name="USER_PASSWORD"
                        type="password"
                        title="La contraseña debe tener más de 8 caracteres, al menos un dígito, al menos una minúscula, 
                        al menos una mayúscula y al menos un caracter no alfanumérico."
                        required
                        />
                    </div>
                :
                    null
              }
            {
                isNewPasswordGenerate
                ?
                <div className="col-md-3 mt-4 pt-3">
                    <button className="btn btn-dark" type="button" onClick={() => setIsNewPasswordGenerate(false)}>Cancelar</button>
                </div>
                :
                <div className="col-md-12 mt-4 text-right">
                <button className="btn btn-dark btn-sm" type="button" onClick={() => setIsNewPasswordGenerate(true)}>Generar contraseña nueva</button>
                </div>
            }
            
        </div>
        <div className="modal-footer mt-3">
          <button
            type="button"
            id="idCloseEditForm"
            className="btn btn-primary"
            data-dismiss="modal"
          >
            Cerrar
          </button>
          <button type="submit" className={"btn btn-success " + (isNewPasswordGenerate ? (isPasswordValid ? '' : 'disabled') : '')}>
            Guardar
          </button>
        </div>
      </form>
    )
}



export default EditUserForm;