import { useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddReturnProductForm = ({setSendRequest, setMessageError}) => {

    const [formAddReturnProduc, setFormAddReturnProduc] = useState({
        COD_PRODUCT: '',
        CONCEPT: '',
        CANT_PRODUCT: '',
        NUM_LOT: '',
        MOVEMENT: '',
        DES_RETURN: '',
        DAT_RETURN: ''
    })

    const handleInputChange = (e) => {
        setFormAddReturnProduc({
            ...formAddReturnProduc,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitReturnProduc = (e) => {
        e.preventDefault();
        axios.post('/returnProduct', formAddReturnProduc, token())
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
        <form id='addFormReturnProduct' onSubmit={handleSubmitReturnProduc} action='#'>
            <div className="row mb-4">
                <div className="col-md-6">
                    <label className='form-label' htmlFor="COD_PRODUCT">Código producto <span className="text-danger"> *</span></label>
                    <input min = "1" pattern="[0-9]+" onChange={handleInputChange} className='form-control' name='COD_PRODUCT' type="text" required/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="CONCEPT">Concepto <span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} className='form-control' name='CONCEPT' type="text" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="CANT_PRODUCT">Cantidad productos <span className="text-danger"> *</span></label>
                    <input min = "1" pattern="[0-9]+" onChange={handleInputChange} className='form-control' name='CANT_PRODUCT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_LOT">Número de lote  <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_LOT' type="text" required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="MOVEMENT">Movimiento  <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={''} className='form-control' name='MOVEMENT'  rows='3' cols='4' type="text" required>
                     <option value=''>-Seleccionar-</option>
                     <option value="1">Entrada</option>
                     <option value="2">Salida</option>
                     </select>         
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DES_RETURN">Descripción  <span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} className='form-control' name='DES_RETURN' type="text" required/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="DAT_RETURN">Fecha devolución  <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_RETURN' type="date" required/>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default AddReturnProductForm;