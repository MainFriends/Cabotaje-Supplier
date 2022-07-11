import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const AddCategoryForm = ({setSendRequest, setMessageError}) => {

    const [formAddCategor, setFormAddCategor] = useState({
        NAM_CATEGORY: '',
        DESCRIPTION:''
    })

    const handleInputChange = (e) => {
        setFormAddCategor({
            ...formAddCategor,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitCategor = (e) => {
        e.preventDefault();
        axios.post('/inventoryCategory', formAddCategor, token())
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
        <form id='addFormCategory' onSubmit={handleSubmitCategor} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_CATEGORY">Nombre categoría <span className="text-danger">  *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_CATEGORY' type="text" pattern="^[a-zA-ZñÑ]+$"  title="No debe contener caracteres numericos" onInput={toUpperCase}required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='DESCRIPTION' type="text" pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase}  required/>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default AddCategoryForm;