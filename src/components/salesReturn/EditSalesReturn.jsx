import { useState, useEffect } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from "moment";

const EditSalesReturn = ({setSendRequest, rowCOD}) => {
    const [formEditSalesReturn, setFormEditSalesReturn] = useState({
        COD_PRODUCT: '',
        CANT: 0,
        NAM_TYPE_PRODUCT: '',
        AMOUNT: 0,
        DAT_RETURN: ''
    });

    const handleInputChange = (e) => {
        setFormEditSalesReturn({
            ...formEditSalesReturn,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/sales-returns/${rowCOD}`, token())
            .then(res => {
                setFormEditSalesReturn({
                    ...res.data[0],
                    DAT_RETURN: moment(res.data[0].DAT_RETURN).format('YYYY-MM-DD')
                })        
            })
        }
    }, [rowCOD])

    const handleSubmitSalesReturn = (e) => {
        e.preventDefault();
        axios.put(`/sales-returns/${rowCOD}`, formEditSalesReturn, token())
           .then(res => {
               document.querySelector('#idCloseEditSalesReturn').click();
               setSendRequest(true);
           })
    }

    return(
        <form id='addFormSalesReturn' onSubmit={handleSubmitSalesReturn} action='#'>
            <div className="row mb-4">
                <div className="col-md-5">
                    <label className='form-label' htmlFor="PRODUCT">Producto <span className="text-danger"> *</span> </label>
                    <input className='form-control' value={`${formEditSalesReturn.NAM_PRODUCT}`} name='PRODUCT' type="text" required disabled/>
                </div>
                <div className="col-md-5 mt-2">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                    <textarea className='form-control' value={formEditSalesReturn.DESCRIPTION} onChange={handleInputChange} name='DESCRIPTION' type="text"  maxLength={50}  wrap="hard"  required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="CANT">Cantidad <span className="text-danger"> *</span> </label>
                    <input className='form-control' value={formEditSalesReturn.CANT} onChange={handleInputChange} name='CANT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="AMOUNT">Monto <span className="text-danger"> *</span> </label>
                    <input className='form-control' value={formEditSalesReturn.AMOUNT} onChange={handleInputChange} name='AMOUNT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="DAT_RETURN">Fecha <span className="text-danger"> *</span> </label>
                    <input max={moment().format('YYYY-MM-DD')} className='form-control' value={moment(formEditSalesReturn.DAT_RETURN).format('YYYY-MM-DD')} onChange={handleInputChange} name='DAT_RETURN' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseEditSalesReturn' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
} 

export default EditSalesReturn;