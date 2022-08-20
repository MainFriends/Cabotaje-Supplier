import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const EditTypEntrie= ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditTypEntrie, setFormEditEntrie] = useState({
        NAM_TYPE : '',
        DES_TYPE: ''
    })

    const handleInputChange = (e) => {
        setFormEditEntrie({
            ...formEditTypEntrie,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
        axios.get(`/typeEntries/${rowCOD}`, token())
            .then(res => {
                setFormEditEntrie({
                    ...res.data[0]
                })
            })
        }
    }, [rowCOD])

    const handleSubmitTypEntrie = (e) => {
        e.preventDefault();


        axios.put(`/typeEntries/${rowCOD}`,formEditTypEntrie, token())
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
        <form id='editFormTypEntries' onSubmit={handleSubmitTypEntrie} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_TYPE">Tipo de entrada<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value={formEditTypEntrie.NAM_TYPE ? formEditTypEntrie.NAM_TYPE : '' } className='form-control' name='NAM_TYPE' type="text"minLength={1} maxLength={15}  pattern="^[a-zA-ZñÑáéíóú ]+$"   onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="DES_TYPE">Descripción<span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} value={formEditTypEntrie.DES_TYPE} className='form-control' name='DES_TYPE' type="text"minLength={1} maxLength={15}  pattern="^[a-zA-ZñÑáéíóú ]+$"  onInput={toUpperCase} required/>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default EditTypEntrie;