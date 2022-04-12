import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const EditClientForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditClient, setFormEditClient] = useState({
        FIRST_NAME: '',
        LAST_NAME: '',
        IDENTITY: '',
        NUM_PHONE_ONE: '',
        NUM_PHONE_TWO: '',
        ADDRESS: '',
        RTN: ''
    })

    const handleInputChange = (e) => {
        setFormEditClient({
            ...formEditClient,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/client/${rowCOD}`, token())
            .then(res => setFormEditClient(res.data[0]))
        }
    }, [rowCOD])

    const handleSubmitClient = (e) => {
        e.preventDefault();
        axios.put(`/client/${rowCOD}`,formEditClient, token())
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
        <form id='editFormClient' onSubmit={handleSubmitClient} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="FIRST_NAME">Nombre</label>
                    <input onChange={handleInputChange} value={formEditClient.FIRST_NAME} className='form-control' name='FIRST_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="LAST_NAME">Apellido</label>
                    <input onChange={handleInputChange} value={formEditClient.LAST_NAME} className='form-control' name='LAST_NAME' type="text" required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="IDENTITY">Identidad</label>
                    <input onChange={handleInputChange} value={formEditClient.IDENTITY} className='form-control' name='IDENTITY' type="number" required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1</label>
                    <input onChange={handleInputChange} value={formEditClient.NUM_PHONE_ONE} className='form-control' name='NUM_PHONE_ONE' type="number" required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} value={formEditClient.NUM_PHONE_TWO} className='form-control' name='NUM_PHONE_TWO' type="number" required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="ADDRESS">Dirección</label>
                    <textarea onChange={handleInputChange} value={formEditClient.ADDRESS} className='form-control' name='ADDRESS'  rows='3' cols='4' type="number" required/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="RTN">RTN</label>
                    <input onChange={handleInputChange} value={formEditClient.RTN} className='form-control' name='RTN' type="number" required/>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default EditClientForm;