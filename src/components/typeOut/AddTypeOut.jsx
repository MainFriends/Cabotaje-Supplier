import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const AddTypOut = ({setSendRequest, setMessageError}) => {

    const [formAddTypOut, setFormAddTypOut] = useState({
        NAM_TYPE: '',
        DES_TYPE:''
    })

    const handleInputChange = (e) => {
        setFormAddTypOut({
            ...formAddTypOut,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitTypOut = (e) => {
        e.preventDefault();
        axios.post('/typeOut', formAddTypOut, token())
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
        <form id='addTypOut' onSubmit={handleSubmitTypOut} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_TYPE">Tipo de salida<span className="text-danger">  *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_TYPE' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$" title="El tipo de salida no debe contener números." onInput={toUpperCase}required/>
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



export default AddTypOut;