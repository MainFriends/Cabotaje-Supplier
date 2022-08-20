import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const AddTypEntries = ({setSendRequest, setMessageError}) => {

    const [formAddTypEntrie, setFormAddTypEntrie] = useState({
        NAM_TYPE: '',
        DES_TYPE:''
    })

    const handleInputChange = (e) => {
        setFormAddTypEntrie({
            ...formAddTypEntrie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitTypEntries = (e) => {
        e.preventDefault();
        axios.post('/typeEntries', formAddTypEntrie, token())
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
        <form id='addTypEntries' onSubmit={handleSubmitTypEntries} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_TYPE">Tipo de entrada<span className="text-danger">  *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_TYPE' type="text" pattern="^[a-zA-ZñÑ ]+$"  title="No debe contener caracteres numericos" onInput={toUpperCase}required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DES_TYPE">Descripción<span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} defaultValue={''} className='form-control' name='DES_TYPE' required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default AddTypEntries;