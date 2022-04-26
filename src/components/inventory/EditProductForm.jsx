import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import AlertSuccess from "../AlertSuccess";

const EditProductForm = ({sendRequest, rowCOD, setSendRequest, setMessageError}) => {
    const [btnWhosaleEdit, setBtnWhosaleEdit] = useState(false);
    const [suppliersEdit, setSuppliersEdit] = useState([]);
    const [categoriesEdit, setCategoriesEdit] = useState([]);
    const [messageSuccessEdit, setMessageSuccessEdit] = useState('');
    const [formDataEdit, setFormDataEdit] = useState({
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

    const {
        NAM_PRODUCT,
        DES_PRODUCT,
        COD_SUPPLIER,
        ISV,
        NORMAL_UNIT_PRICE,
        PURCHASE_PRICE,
        COD_CATEGORY,
        COD_TYP_PRODUCT,
        WHOLESALE_CANT,
        WHOLESALE_PRICE
    } = formDataEdit;

    useEffect(() => {
        axios.get('/supplier', token())
            .then(res => {
                const namSuppliers = res.data.map(({COD_SUPPLIER, NAM_SUPPLIER}) => ({ COD_SUPPLIER, NAM_SUPPLIER }));
                setSuppliersEdit(namSuppliers);
            });
    },[])

    useEffect(() => {
        axios.get('/list-categories', token())
            .then(res => setCategoriesEdit(res.data));
    },[])

    useEffect(() => {
        if(rowCOD){
            axios.get(`/inventory/${rowCOD}`, token())
                .then(res => {
                    setFormDataEdit(res.data[0])
                    if(res.data[0]?.WHOLESALE_CANT > 0){
                        setBtnWhosaleEdit(true)
                    }else{
                        setBtnWhosaleEdit(false)
                    }
                })
        }
    }, [rowCOD, sendRequest])

    const handleInputChange = e => {
        setFormDataEdit({
            ...formDataEdit,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/inventory/${rowCOD}`, formDataEdit, token())
            .then(res => {
                handleOptionClose()
                e.target.reset();
                setSendRequest(true);
                setMessageSuccessEdit('Producto actualizado correctamente.');
                setTimeout(() => {
                    setMessageSuccessEdit('')
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
        setFormDataEdit({
            ...formDataEdit,
            WHOLESALE_CANT: 0,
            WHOLESALE_PRICE: 0
        })
        setBtnWhosaleEdit(false)
    }

    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Nombre del producto</label>
                    <input value={NAM_PRODUCT} onChange={handleInputChange} className='form-control' name='NAM_PRODUCT' type="text" required/>
                </div>
                <div className="col-8">
                    <label className='form-label' htmlFor="DES_PRODUCT">Descripción</label>
                    <textarea value={DES_PRODUCT} onChange={handleInputChange} className='form-control' rows='2' name='DES_PRODUCT' type="text" required/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label'>Proveedor</label>
                    <select onChange={handleInputChange} value={COD_SUPPLIER} name="COD_SUPPLIER" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {suppliersEdit.map(supplier => {
                            return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                        })}
                    </select>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="NORMAL_UNIT_PRICE">Precio de venta</label>
                    <input value={NORMAL_UNIT_PRICE} onChange={handleInputChange} className='form-control' min={0} name='NORMAL_UNIT_PRICE' type="number" required/>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="PURCHASE_PRICE">Precio de compra</label>
                    <input value={PURCHASE_PRICE} onChange={handleInputChange} className='form-control' min={0} name='PURCHASE_PRICE' type="number" required/>
                </div>
                <div className="col-2">
                    <label className='form-label' htmlFor="ISV">ISV</label>
                    <input value={ISV} onChange={handleInputChange} className='form-control' step="0.01" min={0} max={1} name='ISV' type="number" required/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label'>Categoria</label>
                    <select onChange={handleInputChange} value={COD_CATEGORY} name="COD_CATEGORY" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {categoriesEdit.map(category => {
                            return <option key={category.COD_CATEGORY} value={category.COD_CATEGORY}>{category.NAM_CATEGORY}</option>
                        })}
                    </select>
                </div>
                <div className="col-5">
                    <label htmlFor="COD_TYP_PRODUCT">Tipo de producto</label><br />
                    <label htmlFor="unidadEdit">
                        <input onChange={handleInputChange} className="mr-2" id='unidadEdit' type="radio" value={1} name='COD_TYP_PRODUCT' required/>Unidad
                    </label>
                    <label htmlFor="peso/volumenEdit">
                        <input onChange={handleInputChange} className="ml-4 mr-2" id='peso/volumenEdit' value={2} type="radio" name='COD_TYP_PRODUCT'/>Peso/Volumen
                    </label>
                </div>
            </div>
            {btnWhosaleEdit 
                ?
                <div className="row mb-4">
                    <div className="col-4">
                        <label className='form-label' htmlFor="WHOLESALE_CANT">Cantidad</label>
                        <input value={WHOLESALE_CANT} onChange={handleInputChange} className='form-control' min={0} name='WHOLESALE_CANT' type="number" required/>
                        <small className="form-text text-muted">Establezca a partir de qué cantidad se determinará una venta al por mayor de este producto.</small>
                    </div>
                    <div className="col-4">
                        <label className='form-label' htmlFor="WHOLESALE_PRICE">Precio unitario</label>
                        <input value={WHOLESALE_PRICE} onChange={handleInputChange} className='form-control' min={0} name='WHOLESALE_PRICE' type="number" required/>
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
                !btnWhosaleEdit 
                &&
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <button onClick={() => setBtnWhosaleEdit(true)} type="button" className="btn btn-sm btn-warning mr-2"><i className="fa-solid fa-plus"></i></button>
                        <small className="text-muted">Agregar cantidad y precio de venta al por mayor</small>
                    </div>
                </div>
            }
            <div className="modal-footer">
                <button id="addProductInventory" data-toggle="modal" data-target='#addDetailProduct' type="button" className="btn btn-primary" data-dismiss="modal">Volver</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
            {messageSuccessEdit ? <AlertSuccess message={messageSuccessEdit}/> : null}
        </form>
    )
} 

export default EditProductForm;