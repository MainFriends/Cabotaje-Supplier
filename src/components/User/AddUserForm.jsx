import { useEffect, useState } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import { toUpperCase } from "../../helpers/Mayusculas";
import moment from "moment";

const AddUserForm = ({ setSendRequest, setMessageError }) => {
  const [roles, setRoles] = useState([]);

  const [formAddUser, setFormAddUser] = useState({
    IDENTITY: "",
    FIRST_NAME: "",
    MIDDLE_NAME: "",
    LAST_NAME: "",
    SECOND_LAST_NAME: "",
    GENDER: "",
    NUM_PHONE_ONE: "",
    NUM_PHONE_TWO: "",
    NUM_REFERENCE: "",
    DAT_BIRTHDAY: "",
    NAM_CITY: "",
    ADDRESS: "",
    COD_STATUS: "",
    COD_ROLES: "",
    USER_EMAIL: "",
    USER_PASSWORD: "",
  });

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    axios.get("/roles", token()).then((res) => {
      const arrayRoles = res.data.filter((rol) => rol.COD_ROLE !== 2);
      setRoles(arrayRoles);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormAddUser({
      ...formAddUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (formAddUser.NUM_PHONE_TWO === "") {
      delete formAddUser["NUM_PHONE_TWO"];
    }

    axios
      .post("/User", formAddUser, token())
      .then((res) => {
        document.querySelector("#idCloseAddForm").click();
        e.target.reset();
        setSendRequest(true);
        cleanForm();
        setIsPasswordValid(false);
      })
      .catch((err) => {
        const { message } = err.response.data;
        setMessageError(message);

        setTimeout(() => {
          setMessageError("");
        }, 3000);
      });
  };
  
  useEffect(() => {
        //validar input contraseña
        const {USER_PASSWORD} = formAddUser
        const inputPass = document.querySelector('#USER_PASSWORD');
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
  }, [formAddUser.USER_PASSWORD])

  const cleanForm = () => {
    setFormAddUser({
      IDENTITY: "",
      FIRST_NAME: "",
      MIDDLE_NAME: "",
      LAST_NAME: "",
      GENDER: "",
      NUM_PHONE_ONE: "",
      NUM_PHONE_TWO: "",
      NUM_REFERENCE: "",
      DAT_BIRTHDAY: "",
      NAM_CITY: "",
      ADDRESS: "",
      COD_STATUS: "",
      COD_ROLES: "",
      USER_EMAIL: "",
      USER_PASSWORD: "",
    });
  }
  
  return (
    <form id="addFormUser" onSubmit={handleSubmitUser} action="#">
      <h6 className="text-muted">Información general de empleado</h6>
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label" htmlFor="IDENTITY">
            Identidad<span className="text-danger"> *</span>
          </label>
          <input
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
            onChange={handleInputChange}
            className="form-control"
            name="FIRST_NAME"
            type="text"
            pattern="^[a-zA-ZñÑáéíóú ]+$"
            title="Primer nombre no debe contener carácteres especiales y/o númericos."
            onInput={toUpperCase}
            minLength={2}
            maxLength={15}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="MIDDLE_NAME">
            Segundo nombre<span className="text-danger"> *</span>
          </label>
          <input
            onChange={handleInputChange}
            className="form-control"
            name="MIDDLE_NAME"
            type="text"
            pattern="^[a-zA-ZñÑáéíóú ]+$"
            title="Segundo nombre no debe contener carácteres especiales y/o númericos."
            onInput={toUpperCase}
            minLength={2}
            maxLength={15}
            
            required
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label" htmlFor="LAST_NAME">
            Primer apellido<span className="text-danger"> *</span>
          </label>
          <input
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
          <label className="form-label" htmlFor="SECOND_LAST_NAME">
            Segundo apellido
          </label>
          <input
            onChange={handleInputChange}
            className="form-control"
            name="SECOND_LAST_NAME"
            type="text"
            pattern="^[a-zA-ZñÑáéíóú ]+$"
            title="Apellido no debe contener carácteres especiales y/o númericos."
            onInput={toUpperCase}
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label" htmlFor="DAT_BIRTHDAY">
            Fecha de nacimiento<span className="text-danger"> *</span>
          </label>
          <input
            onChange={handleInputChange}
            className="form-control"
            name="DAT_BIRTHDAY"
            type="DATE"
            min="1950-01-01"
            max={moment().format('YYYY-MM-DD')}
            required
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label" htmlFor="GENDER">
            Género<span className="text-danger"> *</span>
          </label>
          <select
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
          <label className="form-label" htmlFor="NAM_CITY">
            Ciudad<span className="text-danger"> *</span>
          </label>
          <input
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
            onChange={handleInputChange}
            className="form-control"
            name="ADDRESS"
            rows="3"
            cols="4"
            type="text"
            pattern="^[a-zA-Z0-9ñÑØº-_ ]+$"
            onInput={toUpperCase}
            maxLength={50}  wrap="hard" 
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
            onChange={handleInputChange}
            defaultValue={""}
            className="form-control"
            name="COD_ROLE"
            type="text"
            required
          >
            <option value="">-Seleccionar-</option>
            {roles.map((rol) => {
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
            onChange={handleInputChange}
            className="form-control"
            name="USER_EMAIL"
            type="email"
            required
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label" htmlFor="PASSWORD">
            Contraseña temporal<span className="text-danger"> *</span>
          </label>
          <span>
              
          </span>
          <input
            id="USER_PASSWORD"
            onChange={handleInputChange}
            className="form-control form-control-user"
            name="USER_PASSWORD"
            type="password"
            title="La contraseña debe tener más de 8 caracteres, al menos un dígito, al menos una minúscula, 
            al menos una mayúscula y al menos un caracter no alfanumérico."
            required
          />
        </div>
        < div className="col-md-3 mt-2">
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
      <div className="modal-footer mt-3">
        <button
          type="button"
          id="idCloseAddForm"
          className="btn btn-primary"
          data-dismiss="modal"
        >
          Cerrar
        </button>
        <button type="submit" className={"btn btn-success " + (isPasswordValid ? '' : 'disabled')}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
