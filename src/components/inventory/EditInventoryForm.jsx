import { useEffect, useState } from "react"
import axios from '../../config/axios'
import token from '../../../src/helpers/getToken'

const EditInventoryForm = ({rowCOD, setSendRequest, setMessageError}) => {
 
         const [formEditInvent, setFormEditInvent] = useState({
            NAM_PRODUCT:'',
            DES_PRODUCT:'',
            COD_TYP_PRODUCT:'',
            COD_SUPPLIER:'',
            ISV:'',
            PRICE_UNIT_PURCHASE:'',
            NORMAL_UNIT_PRICE_1:'',
            NORMAL_UNIT_PRICE_2:'',
            NORMAL_UNIT_PRICE_3:'',
            WHOLESALE_PRICE_1:'',
            WHOLESALE_PRICE_2:'',
            WHOLESALE_CANT_1:'',
            WHOLESALE_CANT_2:''
         })

    const handleInputChange=(e)=>{
        setFormEditInvent({
            ...formEditInvent,
            [e.target.name]: e.target.value
        })
    }

     useEffect(() => {
        if(rowCOD){
            axios.get(`/inventory/${rowCOD}`, token())
            .then(res => setFormEditInvent(res.data[0]))
        }
    }, [rowCOD])

    const handleSubmitInventory = (e) => {
        e.preventDefault();       
        axios.put(`/inventory/${rowCOD}`, formEditInvent, token())
        .then(res => {
                document.querySelector('#idCloseEditForm').click();
                e.target.reset();
                setSendRequest(true)
        })
        .catch(err => {
            const {message} = err.response.data;
            setMessageError(message)
            setTimeout(()=>{
                setMessageError('')
            }, 3000)
        })

    }
    return(
        <form id='editFormInventory' onSubmit={handleSubmitInventory} action='#'>
        <div className="row mb-4">
            <div className="col-md-6">
                <label className='form-label' htmlFor="NAM_PRODUCT">Nombre</label>
                <input onChange={handleInputChange} value = {formEditInvent.NAM_PRODUCT} className='form-control' name='NAM_PRODUCT' type="text" required/>
            </div>
            <div className="col-md-6">
                <label className='form-label' htmlFor="DES_PRODUCT">Descripción</label>
                <textarea onChange={handleInputChange} value = {formEditInvent.DES_PRODUCT} className='form-control' name='DES_PRODUCT' type="text" maxLength={50}  wrap="hard" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="COD_TYP_PRODUCT">Tipo Producto</label>
                <input onChange={handleInputChange} value = {formEditInvent.COD_TYP_PRODUCT} className='form-control' name='COD_TYP_PRODUCT' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="COD_SUPPLIER">Proveedor</label>
                <input onChange={handleInputChange} value = {formEditInvent.COD_SUPPLIER} className='form-control' name='COD_SUPPLIER' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="ISV">ISV</label>
                <input onChange={handleInputChange} value = {formEditInvent.ISV} className='form-control' name='ISV' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="PRICE_UNIT_PURCHASE">Precio compra</label>
                <input onChange={handleInputChange} value = {formEditInvent.PRICE_UNIT_PURCHASE} className='form-control' name='PRICE_UNIT_PURCHASE' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NORMAL_UNIT_PRICE_1">Precio unidad 1</label>
                <input onChange={handleInputChange} value = {formEditInvent.NORMAL_UNIT_PRICE_1} className='form-control' name='NORMAL_UNIT_PRICE_1' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NORMAL_UNIT_PRICE_2">Precio unidad 2</label>
                <input onChange={handleInputChange} value = {formEditInvent.NORMAL_UNIT_PRICE_2}  className='form-control' name='NORMAL_UNIT_PRICE_2' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NORMAL_UNIT_PRICE_3">Precio unidad 3</label>
                <input onChange={handleInputChange} value = {formEditInvent.NORMAL_UNIT_PRICE_3} className='form-control' name='NORMAL_UNIT_PRICE_3' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_PRICE_1">Precio venta 1</label>
                <input onChange={handleInputChange} value = {formEditInvent.WHOLESALE_PRICE_1} className='form-control' name='WHOLESALE_PRICE_1' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_PRICE_2">Precio venta 2</label>
                <input onChange={handleInputChange} value = {formEditInvent.WHOLESALE_PRICE_2} className='form-control' name='WHOLESALE_PRICE_2' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_CANT_1">Cantidad venta 1</label>
                <input onChange={handleInputChange} value = {formEditInvent.WHOLESALE_CANT_1} className='form-control' name='WHOLESALE_CANT_1' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_CANT_2">Cantidad venta 2</label>
                <input onChange={handleInputChange} value = {formEditInvent.WHOLESALE_CANT_2} className='form-control' name='WHOLESALE_CANT_2' type="text" required/>
            </div>
        </div>
        
        <div className="modal-footer">
            <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default EditInventoryForm