import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const EditCategoryForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditCategor, setFormEditCategor] = useState({
        DESCRIPTION: ''
    })

    const handleInputChange = (e) => {
        setFormEditCategor({
            ...formEditCategor,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/inventoryCategory/${rowCOD}`, token())
            .then(res => setFormEditCategor(res.data[0]))
        }
    }, [rowCOD])

    const handleSubmitCategor = (e) => {
        e.preventDefault();
        axios.put(`/inventoryCategory/${rowCOD}`,formEditCategor, token())
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
        <form id='editFormCategory' onSubmit={handleSubmitCategor} action='#'>
            <div className="row mb-4">
                <div className="col-md-12">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                    <textarea onChange={handleInputChange} cols="2" rows="3" value = {formEditCategor.DESCRIPTION ? formEditCategor.DESCRIPTION : ''} className='form-control' name='DESCRIPTION' onInput={toUpperCase} required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
               
            </div>
        </form>
    )
}



export default EditCategoryForm;