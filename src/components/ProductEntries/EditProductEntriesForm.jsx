import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';

const EditProductEntriesForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditProductEntries, setFormEditProductEntries] = useState({
        NAM_PRODUCT: '',
        NUM_LOT: '',
        DES_RETURN: '',
        CANT_PRODUCT: '',
        COD_TYPE: '',
        DAT_ENTRIES: '',
        NAM_SUPPLIER: ''
    })

    const [typeEntries, setTypeEntries] = useState([]);

    const handleInputChange = (e) => {
        setFormEditProductEntries({
            ...formEditProductEntries,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get('/type-entries', token())
        .then(res => setTypeEntries(res.data))
    }, [])

    useEffect(() => {
        if(rowCOD){
            axios.get(`/product-entries/${rowCOD}`, token())
            .then(res => {
                const {DAT_ENTRIES} = res.data[0]
                setFormEditProductEntries({
                    ...res.data[0],
                    DAT_ENTRIES: moment(DAT_ENTRIES).format('YYYY-MM-DD')
                })
            })
        }
    }, [rowCOD])

    const handleSubmitReturnProduct = (e) => {
        e.preventDefault();
        axios.put(`/product-entries/${rowCOD}`,formEditProductEntries, token())
            .then(res => {
                document.querySelector('#idCloseEditForm').click();
                e.target.reset();
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
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Producto</label>
                    <input value = {formEditProductEntries.NAM_PRODUCT} className='form-control' name='NAM_PRODUCT' type="text" required disabled/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NUM_LOT">Número de lote</label>
                    <input value = {formEditProductEntries.NUM_LOT} className='form-control' name='NUM_LOT' type="text" required disabled/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NAM_SUPPLIER">Proveedor</label>
                    <input value = {formEditProductEntries.NAM_SUPPLIER} className='form-control' name='NAM_SUPPLIER' type="text" required disabled/>
                </div>
                <div className="col-md-2 mt-2">
                    <label className='form-label' htmlFor="CANT_PRODUCT">Cantidad</label>
                    <input onChange={handleInputChange} value = {formEditProductEntries.CANT_PRODUCT} className='form-control' name='CANT_PRODUCT' type="number" required disabled/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DES_RETURN">Descripción</label>
                    <textarea onChange={handleInputChange} value = {formEditProductEntries.DES_RETURN} className='form-control' name='DES_RETURN' type="text"  wrap="hard"  required/>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="COD_TYPE">Tipo de entrada <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} value={formEditProductEntries.COD_TYPE} className='form-control' name='COD_TYPE' required>
                    <option value=''>-Seleccionar-</option>
                        {
                            typeEntries.map(element => {
                                return <option key={element.COD_TYPE} value={element.COD_TYPE}>{element.NAM_TYPE}</option>
                            })
                        }
                     </select>         
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="DAT_ENTRIES">Fecha <span className="text-danger"> *</span></label>
                    <input max={moment().format('YYYY-MM-DD')} onChange={handleInputChange} value = {moment(formEditProductEntries?.DAT_ENTRIES).format('YYYY-MM-DD')} className='form-control' name='DAT_ENTRIES' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
               
            </div>
        </form>
    )
}



export default EditProductEntriesForm;