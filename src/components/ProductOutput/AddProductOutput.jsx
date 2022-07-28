import { useEffect, useState } from "react"
import axios from '../../config/axios'
import token from '../../../src/helpers/getToken'
import { toUpperCase } from "../../helpers/Mayusculas";
import moment from "moment";

const AddProductOutput = ({setSendRequest, setMessageError}) => {
 
    const [formAddProductOutput, setAddProductOutput] = useState({
        COD_PRODUCT: '',
        DES_OUTPUT: '',
        COD_TYPE: '',
        CANT_PRODUCT: '',
        NUM_LOT: '',
        DAT_OUTPUT: ''
    })

    const [typeOutputs, setTypeOutputs] = useState([]);
    const [nameProduct, setNameProduct] = useState('');

    const handleInputChange=(e)=>{
        setAddProductOutput({
            ...formAddProductOutput,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const input = document.querySelector('#nameProductoOutputValue');

        if(formAddProductOutput.COD_PRODUCT){
            axios.get(`/inventory/${formAddProductOutput.COD_PRODUCT}`, token())
                .then(res => {
                    input.classList.remove('is-invalid')
                    setNameProduct(res.data[0].NAM_PRODUCT);
                })
                .catch(err => {
                    input.classList.add('is-invalid')
                    setNameProduct('Producto no encontrado')
                })
        }
    }, [formAddProductOutput.COD_PRODUCT])

    useEffect(() => {
        axios.get('/type-outputs', token())
        .then(res => setTypeOutputs(res.data))
    }, [])

    const handleSubmitDecrease = (e) => {
        e.preventDefault();
        axios.post('/product-outputs', formAddProductOutput, token())
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
                <label className='form-label' htmlFor="COD_PRODUCT">SKU <span className="text-danger"> *</span></label>
                <input onChange={handleInputChange} className='form-control' name='COD_PRODUCT' type="text" required/>
            </div>
            <div className="col-4">
                <label className='form-label'>Producto <span className="text-danger"> *</span></label>
                <input id='nameProductoOutputValue' value={nameProduct} className='form-control' type="text" disabled/>
            </div>
            <div className="col-md-8 mt-2">
                    <label className='form-label' htmlFor="DES_OUTPUT">Descripción</label>
                    <textarea onChange={handleInputChange} className='form-control' name='DES_OUTPUT' type="text" rows={3}  wrap="hard"  required/>
                </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="CANT_PRODUCT">Cantidad <span className="text-danger"> *</span></label>
                <input min={1} onChange={handleInputChange} className='form-control' name='CANT_PRODUCT' type="number" required/>
            </div>
            <div className="col-md-3 mt-2">
                <label className='form-label' htmlFor="NUM_LOT">Número de lote <span className="text-danger"> *</span></label>
                <input onChange={handleInputChange} className='form-control' name='NUM_LOT' type="text" required/>
            </div>
            <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="COD_TYPE">Tipo de salida  <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={''} className='form-control' name='COD_TYPE' required>
                        <option value=''>-Seleccionar-</option>
                        {
                            typeOutputs.map(element => {
                                return <option key={element.COD_TYPE} value={element.COD_TYPE}>{element.NAM_TYPE}</option>
                            })
                        }
                     </select>         
                </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="DAT_OUTPUT">Fecha <span className="text-danger"> *</span></label>
                <input max={moment().format('YYYY-MM-DD')} onChange={handleInputChange} className='form-control' name='DAT_OUTPUT' type="date" required/>
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
}

export default AddProductOutput