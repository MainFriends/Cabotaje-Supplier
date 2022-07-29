import { useEffect, useState } from "react"
import axios from '../../config/axios'
import token from '../../../src/helpers/getToken'
import moment from 'moment'

const EditProductOutput = ({rowCOD, setSendRequest, setMessageError}) => {
 
         const [formEditProductOutput, setFormEditProductOutput] = useState({
            NAM_PRODUCT: '',
            NUM_LOT: '',
            DES_OUTPUT: '',
            CANT_PRODUCT: '',
            COD_TYPE: '',
            DAT_OUTPUT: ''
         })

    const [typeOutput, setTypeOutput] = useState([]);

    const handleInputChange=(e)=>{
        setFormEditProductOutput({
            ...formEditProductOutput,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        axios.get('/type-outputs', token())
        .then(res => setTypeOutput(res.data))
    }, [])

    useEffect(() => {
        if(rowCOD){
            axios.get(`/product-outputs/${rowCOD}`, token())
            .then(res => {
                const { DAT_OUTPUT } = res.data[0]
                setFormEditProductOutput({
                    ...res.data[0],
                    DAT_OUTPUT: moment(DAT_OUTPUT).format('YYYY-MM-DD')
                })
            })
        }
    }, [rowCOD])

    const handleSubmitDecrease = (e) => {
        e.preventDefault();       
        axios.put(`/product-outputs/${rowCOD}`, formEditProductOutput, token())
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
            <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Producto</label>
                    <input value = {formEditProductOutput.NAM_PRODUCT} className='form-control' name='NAM_PRODUCT' type="text" required disabled/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NUM_LOT">Número de lote</label>
                    <input value = {formEditProductOutput.NUM_LOT} className='form-control' name='NUM_LOT' type="text" required disabled/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="CANT_PRODUCT">Cantidad <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value = {formEditProductOutput.CANT_PRODUCT} className='form-control' name='CANT_PRODUCT' type="number" required disabled/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DES_OUTPUT">Descripción</label>
                    <textarea onChange={handleInputChange} value = {formEditProductOutput.DES_OUTPUT} className='form-control' name='DES_OUTPUT' type="text"  wrap="hard"  required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="COD_TYPE">Tipo de salida <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} value={formEditProductOutput.COD_TYPE} className='form-control' name='COD_TYPE' required>
                    <option value=''>-Seleccionar-</option>
                        {
                            typeOutput.map(element => {
                                return <option key={element.COD_TYPE} value={element.COD_TYPE}>{element.NAM_TYPE}</option>
                            })
                        }
                     </select>         
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DAT_OUTPUT">Fecha <span className="text-danger"> *</span></label>
                    <input max={moment().format('YYYY-MM-DD')} onChange={handleInputChange} value = {moment(formEditProductOutput?.DAT_OUTPUT).format('YYYY-MM-DD')} className='form-control' name='DAT_OUTPUT' type="date" required/>
                </div>
        </div>
        
        <div className="modal-footer">
            <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default EditProductOutput