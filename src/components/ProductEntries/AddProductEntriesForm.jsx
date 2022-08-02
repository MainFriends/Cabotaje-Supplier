import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from "moment";

const AddProductEntriesForm = ({setSendRequest, setMessageError}) => {

    const [formAddProductEntries, setFormAddProductEntries] = useState({
        COD_PRODUCT: '',
        DES_ENTRIE: '',
        COD_TYPE: '',
        CANT_PRODUCT: '',
        NUM_LOT: '',
        DAT_ENTRIES: ''
    })

    const [typeEntries, setTypeEntries] = useState([]);
    const [nameProduct, setNameProduct] = useState('');
    const [nameSupplier, setNameSupplier] = useState('');
    const [setLotes, setNameLotes] = useState([]);

    const handleInputChange = (e) => {
        setFormAddProductEntries({
            ...formAddProductEntries,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const input = document.querySelector('#nameProductValue');
        const inputSupplier = document.querySelector('#nameSupplierValue');

        if(formAddProductEntries.COD_PRODUCT){
            axios.get(`/inventory/${formAddProductEntries.COD_PRODUCT}`, token())
                .then(res => {
                    input.classList.remove('is-invalid')
                    inputSupplier.classList.remove('is-invalid')
                    setNameProduct(res.data[0].NAM_PRODUCT);
                    setNameSupplier(res.data[0].NAM_SUPPLIER);
                })
                .catch(err => {
                    input.classList.add('is-invalid')
                    inputSupplier.classList.add('is-invalid')
                    setNameProduct('Producto no encontrado')
                    setNameSupplier('Sin resultados');
                })
        }
    }, [formAddProductEntries.COD_PRODUCT])

    useEffect(() => {
        axios.get('/type-entries', token())
        .then(res => setTypeEntries(res.data))
    }, [])

    useEffect(() => {
        if(formAddProductEntries.COD_PRODUCT){
            axios.get(`/find-lotes/${formAddProductEntries.COD_PRODUCT}`, token())
            .then(res => setNameLotes(res.data))
        }
    }, [formAddProductEntries.COD_PRODUCT])

    const handleSubmitReturnProduc = (e) => {
        e.preventDefault();
        axios.post('/product-entries', formAddProductEntries, token())
            .then(res => {
                document.querySelector('#idCloseAddForm').click();
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
        <form id='addFormReturnProduct' onSubmit={handleSubmitReturnProduc} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="COD_PRODUCT">SKU <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='COD_PRODUCT' type="text" required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Producto <span className="text-danger"> *</span></label>
                    <input id='nameProductValue' value={nameProduct} className='form-control' type="text" disabled/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Proveedor <span className="text-danger"> *</span></label>
                    <input id='nameSupplierValue' value={nameSupplier} className='form-control' type="text" disabled/>
                </div>
                <div className="col-md-8 mt-2">
                    <label className='form-label' htmlFor="DES_ENTRIE">Descripción</label>
                    <textarea onChange={handleInputChange} className='form-control' name='DES_ENTRIE' type="text" rows={3}  wrap="hard"  required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="CANT_PRODUCT">Cantidad <span className="text-danger"> *</span></label>
                    <input min={1} onChange={handleInputChange} className='form-control' name='CANT_PRODUCT' type="number" required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NUM_LOT">Número de lote  <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={''} className='form-control' name='NUM_LOT' required>
                        <option value=''>-Seleccionar-</option>
                        {
                            setLotes.map(element => {
                                return <option key={element.NUM_LOT} value={element.NUM_LOT}>{element.NUM_LOT}</option>
                            })
                        }
                     </select>  
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="COD_TYPE">Tipo de entrada  <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={''} className='form-control' name='COD_TYPE' required>
                        <option value=''>-Seleccionar-</option>
                        {
                            typeEntries.map(element => {
                                return <option key={element.COD_TYPE} value={element.COD_TYPE}>{element.NAM_TYPE}</option>
                            })
                        }
                     </select>         
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="DAT_ENTRIES">Fecha<span className="text-danger"> *</span></label>
                    <input max={moment().format('YYYY-MM-DD')} onChange={handleInputChange} className='form-control' name='DAT_ENTRIES' type="date" required/>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseAddForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default AddProductEntriesForm;