import { useState } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";

const AddSalesReturn = ({setSendRequest, setMessageError}) => {
    const [formAddSalesReturn, setFormAddSalesReturn] = useState({
        COD_PRODUCT: '',
        CANT: 0,
        NAM_TYPE_PRODUCT: '',
        AMOUNT: 0,
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
            .then(res => {
                document.querySelector('#idCloseAddSalesReturn').click();
                e.target.reset();
                setSendRequest(true);
                setProductName('');
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message);
                setTimeout(() => {
                    setMessageError('');
                }, 3000);
            })
    }


    // Estados que manejaran el nombre del producto y del usuario 
    const [productName, setProductName] = useState('');

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

    return(
        <form id='addFormSalesReturn' onSubmit={handleSubmitSalesReturn} action='#'>
            <div className="row mb-4">
                <div className="col-md-3">
                    <label className='form-label' htmlFor="COD_PRODUCT">Código del Producto</label>
                    <input onChange={() => getProductInput()} onInput={handleInputChange} className='form-control'  name='COD_PRODUCT' type="number" required/>
                </div>
                <div className="col-md-5">
                    <label className='form-label' htmlFor="PRODUCT">Producto</label>
                    <input className='form-control' value={productName} name='PRODUCT' type="text" required disabled/>
                </div>
                <div className="col-md-5 mt-2">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                    <textarea className='form-control' onChange={handleInputChange} name='DESCRIPTION' type="text" required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="CANT">Cantidad</label>
                    <input className='form-control' onChange={handleInputChange} name='CANT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="AMOUNT">Monto</label>
                    <input className='form-control' onChange={handleInputChange} name='AMOUNT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="DAT_RETURN">Fecha</label>
                    <input className='form-control' onChange={handleInputChange} name='DAT_RETURN' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseAddSalesReturn' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
} 

export default AddSalesReturn;