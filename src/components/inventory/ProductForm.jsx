import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import AlertSuccess from "../AlertSuccess";
import { toUpperCase } from "../../helpers/Mayusculas";


const ProductForm = ({setSendRequest, setMessageError}) => {
    const [btnWholesale, setBtnWholesale] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState('');
    const [formData, setFormData] = useState({
        NAM_PRODUCT: '',
        DES_PRODUCT: '',
        COD_SUPPLIER: '',
        ISV: '',
        NORMAL_UNIT_PRICE: '',
        PURCHASE_PRICE: '',
        COD_CATEGORY: '',
        COD_TYP_PRODUCT: 1,
        WHOLESALE_CANT: 0,
        WHOLESALE_PRICE: 0
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
                handleOptionClose()
                e.target.reset();
                setSendRequest(true);
                setMessageSuccess('Producto agregado correctamente.');
                setTimeout(() => {
                    setMessageSuccess('')
                }, 3000);
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }

    const handleOptionClose = () => {
        setFormData({
            ...formData,
            WHOLESALE_CANT: 0,
            WHOLESALE_PRICE: 0
        })
        setBtnWholesale(false)
    }

    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Nombre del producto <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NAM_PRODUCT' type="text" pattern="^[a-zA-ZñÑ_ ]+$" title="Solamente se pueden ingresar letras" onInput={toUpperCase}required/>
                </div>
                <div className="col-8">
                    <label className='form-label' htmlFor="DES_PRODUCT">Descripción <span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} className='form-control' rows='2' name='DES_PRODUCT' type="text" pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase}required/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label'>Proveedor <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={'default'} name="COD_SUPPLIER" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {suppliers.map(supplier => {
                            return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                        })}
                    </select>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="NORMAL_UNIT_PRICE">Precio de venta <span className="text-danger"> *</span></label>
                    <input min = "0" pattern="[0-9]+" onChange={handleInputChange} className='form-control'  name='NORMAL_UNIT_PRICE' type="number" required/>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="PURCHASE_PRICE">Precio de compra <span className="text-danger"> *</span></label>
                    <input min = "0" pattern="[0-9]+" onChange={handleInputChange} className='form-control' name='PURCHASE_PRICE' type="number" required/>
                </div>
                <div className="col-2">
                    <label className='form-label' htmlFor="ISV">ISV <span className="text-danger"> *</span></label>
                    <input min = "0" pattern="[0-9]+" onChange={handleInputChange} className='form-control' step="0.01" max={1} name='ISV' type="number" required/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label'>Categoria <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={'default'} name="COD_CATEGORY" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {categories.map(category => {
                            return <option key={category.COD_CATEGORY} value={category.COD_CATEGORY}>{category.NAM_CATEGORY}</option>
                        })}
                    </select>
                </div>
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
            {btnWholesale 
                ?
                <div className="row mb-4">
                    <div className="col-4">
                        <label className='form-label' htmlFor="WHOLESALE_CANT">Cantidad <span className="text-danger"> *</span></label>
                        <input min = "1" pattern="[0-9]+" onChange={handleInputChange} className='form-control'  name='WHOLESALE_CANT' type="number" required/>
                        <small className="form-text text-muted">Establezca a partir de qué cantidad se determinará una venta al por mayor de este producto.</small>
                    </div>
                    <div className="col-4">
                        <label className='form-label' htmlFor="WHOLESALE_PRICE">Precio unitario <span className="text-danger"> *</span></label>
                        <input min = "0" pattern="[0-9]+" onChange={handleInputChange} className='form-control'  name='WHOLESALE_PRICE' type="number" required/>
                        <small className="form-text text-muted">Establezca el precio unitario que se determinará en la venta al por mayor.</small>
                    </div>
                    <div className="col-4 text-right mt-4 py-2">
                        <button onClick={() => handleOptionClose()} type="button" className="btn btn-sm btn-danger mr-2"><i className="fa-solid fa-minus"></i></button>
                        <small className="text-muted">Cancelar</small>
                    </div>
                </div>
                :
                null    
            }
            {
                !btnWholesale 
                &&
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <button onClick={() => setBtnWholesale(true)} type="button" className="btn btn-sm btn-warning mr-2"><i className="fa-solid fa-plus"></i></button>
                        <small className="text-muted">Agregar cantidad y precio de venta al por mayor</small>
                    </div>
                </div>
            }
            <div className="modal-footer">
                <button id="addProductInventory" data-toggle="modal" data-target='#addDetailProduct' type="button" className="btn btn-primary" data-dismiss="modal">Volver</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
            {messageSuccess ? <AlertSuccess message={messageSuccess}/> : null}
        </form>
    )
} 

export default ProductForm;