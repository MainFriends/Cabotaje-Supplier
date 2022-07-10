import { useState } from "react"
import axios from '../../config/axios'
import token from '../../../src/helpers/getToken'

const AddInventoryForm = ({setSendRequest, setMessageError}) => {
 
         const [formAddInvent, setFormAddInvent] = useState({
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
        setFormAddInvent({
            ...formAddInvent,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitInventory = (e) => {
        e.preventDefault();
        axios.post('/inventory', formAddInvent, token())
        .then(res => {
                document.querySelector('#idCloseAddForm').click();
                e.target.reset();
                setSendRequest(true)
        })
        .catch(err=> {
            const {message} = err.response.data;
            setMessageError(message)

            setTimeout(()=>{
                setMessageError('')
            }, 3000)
        })

    }
    return(
        <form id='addFormInventory' onSubmit={handleSubmitInventory} action='#'>
        <div className="row mb-4">
            <div className="col-md-6">
                <label className='form-label' htmlFor="NAM_PRODUCT">Nombre</label>
                <input onChange={handleInputChange} className='form-control' name='NAM_PRODUCT' type="text" required/>
            </div>
            <div className="col-md-6">
                <label className='form-label' htmlFor="DES_PRODUCT">Descripción</label>
                <textarea onChange={handleInputChange} className='form-control' name='DES_PRODUCT' maxLength={50}  wrap="hard" type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="COD_TYP_PRODUCT">Tipo Producto</label>
                <input onChange={handleInputChange} className='form-control' name='COD_TYP_PRODUCT' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="COD_SUPPLIER">Proveedor</label>
                <input onChange={handleInputChange} className='form-control' name='COD_SUPPLIER' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="ISV">ISV</label>
                <input onChange={handleInputChange} className='form-control' name='ISV' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="PRICE_UNIT_PURCHASE">Precio compra</label>
                <input onChange={handleInputChange} className='form-control' name='PRICE_UNIT_PURCHASE' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NORMAL_UNIT_PRICE_1">Precio unidad 1</label>
                <input onChange={handleInputChange} className='form-control' name='NORMAL_UNIT_PRICE_1' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NORMAL_UNIT_PRICE_2">Precio unidad 2</label>
                <input onChange={handleInputChange} className='form-control' name='NORMAL_UNIT_PRICE_2' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NORMAL_UNIT_PRICE_3">Precio unidad 3</label>
                <input onChange={handleInputChange} className='form-control' name='NORMAL_UNIT_PRICE_3' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_PRICE_1">Precio venta 1</label>
                <input onChange={handleInputChange} className='form-control' name='WHOLESALE_PRICE_1' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_PRICE_2">Precio venta 2</label>
                <input onChange={handleInputChange} className='form-control' name='WHOLESALE_PRICE_2' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_CANT_1">Cantidad venta 1</label>
                <input onChange={handleInputChange} className='form-control' name='WHOLESALE_CANT_1' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="WHOLESALE_CANT_2">Cantidad venta 2</label>
                <input onChange={handleInputChange} className='form-control' name='WHOLESALE_CANT_2' type="text" required/>
            </div>
        </div>
        
        <div className="modal-footer">
            <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default AddInventoryForm