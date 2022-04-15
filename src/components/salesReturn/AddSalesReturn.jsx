import { useState } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";

const AddSalesReturn = () => {
    const [formAddSalesReturn, setFormAddSalesReturn] = useState({
        COD_PRODUCT: '',
        CANT: 0,
        NAM_TYPE_PRODUCT: '',
        AMOUNT: 0,
        COD_USER: '',
        DAT_RETURN: ''
    });

    const handleInputChange = (e) => {
        setFormAddSalesReturn({
            ...formAddSalesReturn,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitSalesReturn = (e) => {
        e.preventDefault();
        axios.post('/sales-returns', formAddSalesReturn, token())
            .then(res => console.log(res))
    }


    // Estados que manejaran el nombre del producto y del usuario 
    const [productName, setProductName] = useState('');
    const [userName, setUserName] = useState('');

    const getProductInput = () => {
        axios.get(`/inventory/${formAddSalesReturn.COD_PRODUCT}`, token())
           .then(res => {
               const {NAM_PRODUCT} = res.data[0];
               setProductName(`${NAM_PRODUCT}`)
           })
           .catch(err => {
               setProductName('Producto no encontrado.')
           })
    }

    const getUserInput = () => {
        axios.get(`/user/${formAddSalesReturn.COD_USER}`, token())
           .then(res => {
               const {FIRST_NAME, LAST_NAME} = res.data[0];
               setUserName(`${FIRST_NAME} ${LAST_NAME}`)
           })
           .catch(err => {
               setUserName('Usuario no encontrado.')
           })
    }

    return(
        <form id='addFormSalesReturn' onSubmit={handleSubmitSalesReturn} action='#'>
            <div className="row mb-4">
                <div className="col-md-3">
                    <label className='form-label' htmlFor="COD_PRODUCT">Código del Producto</label>
                    <input className='form-control' onBlur={() => getProductInput()} onChange={handleInputChange} name='COD_PRODUCT' type="number" required/>
                </div>
                <div className="col-md-3">
                    <label className='form-label' htmlFor="PRODUCT">Producto</label>
                    <input className='form-control' value={productName} name='PRODUCT' type="text" required disabled/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                    <textarea className='form-control' onChange={handleInputChange} name='DESCRIPTION' type="text" required/>
                </div>
                <div className="col-md-2">
                    <label className='form-label' htmlFor="CANT">Cantidad</label>
                    <input className='form-control' onChange={handleInputChange} name='CANT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NAM_TYPE_PRODUCT">Tipo</label>
                    <input className='form-control' onChange={handleInputChange} name='NAM_TYPE_PRODUCT' type="text" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="AMOUNT">Monto</label>
                    <input className='form-control' onChange={handleInputChange} name='AMOUNT' type="number" required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="COD_USER">Código del Usuario</label>
                    <input className='form-control' onBlur={() => getUserInput()} onChange={handleInputChange} name='COD_USER' type="number" required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="USER">Usuario</label>
                    <input className='form-control' value={userName} name='USER' type="text" required disabled/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="DAT_RETURN">Fecha</label>
                    <input className='form-control' onChange={handleInputChange} name='DAT_RETURN' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idClose' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
} 

export default AddSalesReturn;