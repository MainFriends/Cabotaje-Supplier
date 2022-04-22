import { useState } from "react"
import axios from '../../config/axios'
import token from '../../../src/helpers/getToken'

const AddDecreaseForm = ({setSendRequest, setMessageError}) => {
 
         const [formAddDecreas, setFormAddDecreas] = useState({
            COD_PRODUCT:'',
            CONCEPT: '',
            CANT_PRODUCTS:'',
            NUM_LOT:'',
            COD_USER:'',
            DATE_DECREASE:''
         })

    const handleInputChange=(e)=>{
        setFormAddDecreas({
            ...formAddDecreas,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitDecrease = (e) => {
        e.preventDefault();
        axios.post('/decrease', formAddDecreas, token())
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
        <form id='addFormDecrease' onSubmit={handleSubmitDecrease} action='#'>
        <div className="row mb-4">
            <div className="col-md-6">
                <label className='form-label' htmlFor="COD_PRODUCT">Código producto</label>
                <input onChange={handleInputChange} className='form-control' name='COD_PRODUCT' type="number" required/>
            </div>
            <div className="col-md-6">
                <label className='form-label' htmlFor="CONCEPT">Concepto</label>
                <textarea onChange={handleInputChange} className='form-control' name='CONCEPT' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad Productos</label>
                <input onChange={handleInputChange} className='form-control' name='CANT_PRODUCTS' type="number" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NUM_LOT">Número de lote</label>
                <input onChange={handleInputChange} className='form-control' name='NUM_LOT' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="COD_USER">Codigo usuario</label>
                <input onChange={handleInputChange} className='form-control' name='COD_USER' type="number" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="DAT_DECREASE">Fecha merma</label>
                <input  onChange={handleInputChange} className='form-control' name='DAT_DECREASE' type="date" required/>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default AddDecreaseForm