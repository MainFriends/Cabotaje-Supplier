import { useEffect, useState } from "react"
import axios from '../../config/axios'
import token from '../../../src/helpers/getToken'
import moment from 'moment'
import { toUpperCase } from "../../helpers/Mayusculas";

const EditDecreaseForm = ({rowCOD, setSendRequest, setMessageError}) => {
 
         const [formEditDecreas, setFormEditDecreas] = useState({
            COD_PRODUCT:'',
            CONCEPT: '',
            CANT_PRODUCTS:'',
            NUM_LOT:'',
            DAT_DECREASE:''
         })

    const handleInputChange=(e)=>{
        setFormEditDecreas({
            ...formEditDecreas,
            [e.target.name]: e.target.value
        })
    }

     useEffect(() => {
        if(rowCOD){
            axios.get(`/decrease/${rowCOD}`, token())
            .then(res => {
                const { DAT_DECREASE } = res.data[0]
                setFormEditDecreas({
                    ...res.data[0],
                    DAT_DECREASE: moment(DAT_DECREASE).format('YYYY-MM-DD')
                })
            })
        }
    }, [rowCOD])

    const handleSubmitDecrease = (e) => {
        e.preventDefault();       
        axios.put(`/decrease/${rowCOD}`, formEditDecreas, token())
        .then(res => {
                document.querySelector('#idCloseEditForm').click();
                e.target.reset();
                setSendRequest(true)
        })
        .catch(err => {
            console.log(err.response)
            const {message} = err.response.data;
            setMessageError(message)
            setTimeout(()=>{
                setMessageError('')
            }, 3000)
        })

    }
    return(
        <form id='editDecrease' onSubmit={handleSubmitDecrease} action='#'>
        <div className="row mb-4">
        <div className="col-md-6">
                <label className='form-label' htmlFor="COD_PRODUCT">Código producto</label>
                <input onChange={handleInputChange} value = {formEditDecreas.COD_PRODUCT} className='form-control' name='COD_PRODUCT' type="number" required/>
            </div>
            <div className="col-md-6">
                <label className='form-label' htmlFor="CONCEPT">Concepto</label>
                <textarea onChange={handleInputChange} value = {formEditDecreas.CONCEPT} className='form-control' name='CONCEPT' type="text" onInput={toUpperCase} required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad Productos</label>
                <input onChange={handleInputChange} value = {formEditDecreas.CANT_PRODUCTS} className='form-control' name='CANT_PRODUCTS' type="number" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NUM_LOT">Número de lote</label>
                <input onChange={handleInputChange} value = {formEditDecreas.NUM_LOT} className='form-control' name='NUM_LOT' type="number" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="DAT_DECREASE">Fecha merma</label>
                <input onChange={handleInputChange} value = {moment(formEditDecreas?.DAT_DECREASE).format('YYYY-MM-DD')} className='form-control' name='DAT_DECREASE' type="date" required/>
            </div>
        </div>
        
        <div className="modal-footer">
            <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default EditDecreaseForm