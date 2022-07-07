import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';

const EditReturnProductForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditReturnProduc, setFormEditReturnProduc] = useState({
        COD_PRODUCT: '',
        CONCEPT: '',
        CANT_PRODUCT: '',
        NUM_LOT: '',
        MOVEMENT: '',
        DES_RETURN: '',
        DAT_RETURN: ''
    })

    const handleInputChange = (e) => {
        setFormEditReturnProduc({
            ...formEditReturnProduc,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/returnProduct/${rowCOD}`, token())
            .then(res => {
                const {DAT_RETURN} = res.data[0]
                setFormEditReturnProduc({
                    ...res.data[0],
                    DAT_RETURN: moment(DAT_RETURN).format('YYYY-MM-DD')
                })
            })
        }
    }, [rowCOD])

    const handleSubmitReturnProduct = (e) => {
        e.preventDefault();
        axios.put(`/returnProduct/${rowCOD}`,formEditReturnProduc, token())
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
        <form id='editFormReturnProduct' onSubmit={handleSubmitReturnProduct} action='#'>
            <div className="row mb-4">
            <div className="col-md-6">
                    <label className='form-label' htmlFor="COD_PRODUCT">Código producto <span className="text-danger"> *</span></label>
                    <input min = "1" pattern="[0-9]+" onChange={handleInputChange} value = {formEditReturnProduc.COD_PRODUCT} className='form-control' name='COD_PRODUCT' type="text" required/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="CONCEPT">Concepto <span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} value = {formEditReturnProduc.CONCEPT} className='form-control' name='CONCEPT' type="text" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="CANT_PRODUCT">Cantidad productos <span className="text-danger"> *</span></label>
                    <input min = "1" pattern="[0-9]+" onChange={handleInputChange} value = {formEditReturnProduc.CANT_PRODUCT} className='form-control' name='CANT_PRODUCT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_LOT">Número de lote <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value = {formEditReturnProduc.NUM_LOT} className='form-control' name='NUM_LOT' type="text" required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="MOVEMENT">Movimiento <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} value = {formEditReturnProduc.MOVEMENT} className='form-control' name='MOVEMENT'  rows='3' cols='4' type="text" required>
                     <option value=''>-Seleccionar-</option>
                     <option value="1">Entrada</option>
                     <option value="2">Salida</option>
                     </select>         
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DES_RETURN">Descripción <span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} value = {formEditReturnProduc.DES_RETURN} className='form-control' name='DES_RETURN' type="text" required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DAT_RETURN">Fecha devolución <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value = {moment(formEditReturnProduc?.DAT_RETURN).format('YYYY-MM-DD')} className='form-control' name='DAT_RETURN' type="date" required/>
                </div>
            </div>*
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
               
            </div>
        </form>
    )
}



export default EditReturnProductForm;