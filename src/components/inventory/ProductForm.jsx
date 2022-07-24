import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import AlertSuccess from "../AlertSuccess";
import { toUpperCase } from "../../helpers/Mayusculas";


const ProductForm = ({setSendRequest, setMessageError}) => {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [formData, setFormData] = useState({
        COD_PRODUCT: '',
        NAM_PRODUCT: '',
        DES_PRODUCT: '',
        COD_SUPPLIER: '',
        COD_CATEGORY: '',
        COD_TYP_PRODUCT: 1,
    })

    useEffect(() => {
        axios.get('/supplier', token())
            .then(res => {
                const namSuppliers = res.data.map(({COD_SUPPLIER, NAM_SUPPLIER}) => ({ COD_SUPPLIER, NAM_SUPPLIER }));
                setSuppliers(namSuppliers);
            });
    },[])

    useEffect(() => {
        axios.get('/list-categories', token())
            .then(res => setCategories(res.data));
    },[])

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/inventory', formData, token())
            .then(res => {
                e.target.reset();
                setSendRequest(true);
                setMessageSuccess('Producto agregado correctamente.');
                setTimeout(() => {
                    setMessageSuccess('')
                }, 3000);
                setFormData({
                    COD_PRODUCT: '',
                    NAM_PRODUCT: '',
                    DES_PRODUCT: '',
                    COD_SUPPLIER: '',
                    COD_CATEGORY: '',
                    COD_TYP_PRODUCT: 1,
                })
            })
            .catch(err => {
                console.log(err)
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }

    return (
        <form onSubmit={handleSubmit} action='#' className="p-2">
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label' htmlFor="COD_PRODUCT">SKU <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='COD_PRODUCT' type="text" title="Solamente se pueden ingresar letras" required/>
                </div>
                <div className="col-4">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Nombre del producto <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_PRODUCT' type="text" pattern="^[a-zA-ZñÑ_ ]+$" title="Solamente se pueden ingresar letras" onInput={toUpperCase}required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Proveedor <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={'default'} name="COD_SUPPLIER" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {suppliers.map(supplier => {
                            return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-7">
                    <label className='form-label' htmlFor="DES_PRODUCT">Descripción</label>
                    <textarea onChange={handleInputChange} className='form-control' rows='2' name='DES_PRODUCT' type="text" pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase} maxLength={50}  wrap="hard" required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Categoria <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={'default'} name="COD_CATEGORY" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {categories.map(category => {
                            return <option key={category.COD_CATEGORY} value={category.COD_CATEGORY}>{category.NAM_CATEGORY}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-5">
                    <label htmlFor="COD_TYP_PRODUCT">Tipo de producto <span className="text-danger"> *</span></label><br />
                    <label htmlFor="unidad">
                        <input onChange={handleInputChange} className="mr-2" id='unidad' type="radio" value={1} name='COD_TYP_PRODUCT' required/>Unidad
                    </label>
                    <label htmlFor="peso/volumen">
                        <input onChange={handleInputChange} className="ml-4 mr-2" id='peso/volumen' value={2} type="radio" name='COD_TYP_PRODUCT' />Peso/Volumen
                    </label>
                </div>
            </div>
            <div className="modal-footer">
                <button id="addProductInventory" data-toggle="modal" data-target='#addDetailProduct' type="button" className="btn btn-primary" data-dismiss="modal">Volver</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
            {messageSuccess ? <AlertSuccess message={messageSuccess}/> : null}
        </form>
    )
} 

export default ProductForm;