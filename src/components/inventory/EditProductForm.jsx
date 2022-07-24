import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import AlertSuccess from "../AlertSuccess";
import { toUpperCase } from "../../helpers/Mayusculas";


const EditProductForm = ({sendRequest, rowCOD, setSendRequest, setMessageError}) => {
    const [suppliersEdit, setSuppliersEdit] = useState([]);
    const [categoriesEdit, setCategoriesEdit] = useState([]);
    const [messageSuccessEdit, setMessageSuccessEdit] = useState('');
    const [formDataEdit, setFormDataEdit] = useState({
        NAM_PRODUCT: '',
        DES_PRODUCT: '',
        COD_SUPPLIER: '',
        COD_CATEGORY: '',
        COD_TYP_PRODUCT: '',
    })

    const {
        NAM_PRODUCT,
        DES_PRODUCT,
        COD_SUPPLIER,
        COD_CATEGORY,
        COD_TYP_PRODUCT,
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

    return (
        <form onSubmit={handleSubmit} action='#' className="p-2">
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Nombre del producto <span className="text-danger"> *</span></label>
                    <input value={NAM_PRODUCT} onChange={handleInputChange} className='form-control' name='NAM_PRODUCT' type="text" onInput={toUpperCase} required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Proveedor <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} value={COD_SUPPLIER} name="COD_SUPPLIER" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {suppliersEdit.map(supplier => {
                            return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row mb-4"> 
                <div className="col-7">
                    <label className='form-label' htmlFor="DES_PRODUCT">Descripción</label>
                    <textarea value={DES_PRODUCT} onChange={handleInputChange} className='form-control' rows='2' name='DES_PRODUCT' type="text" onInput={toUpperCase} maxLength={20}  wrap="hard" required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Categoria <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} value={COD_CATEGORY} name="COD_CATEGORY" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        {categoriesEdit.map(category => {
                            return <option key={category.COD_CATEGORY} value={category.COD_CATEGORY}>{category.NAM_CATEGORY}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-5">
                    <label htmlFor="COD_TYP_PRODUCT">Tipo de producto <span className="text-danger"> *</span></label><br />
                    <label htmlFor="unidadEdit">
                        <input onChange={handleInputChange} className="mr-2" id='unidadEdit' type="radio" value={1} name='COD_TYP_PRODUCT' required checked={COD_TYP_PRODUCT == 1}/>Unidad
                    </label>
                    <label htmlFor="peso/volumenEdit">
                        <input onChange={handleInputChange} className="ml-4 mr-2" id='peso/volumenEdit' value={2} type="radio" name='COD_TYP_PRODUCT' checked={COD_TYP_PRODUCT == 2}/>Peso/Volumen
                    </label>
                </div>
            </div>
            <div className="modal-footer">
                <button id="addProductInventory" type="button" className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
            {messageSuccessEdit ? <AlertSuccess message={messageSuccessEdit}/> : null}
        </form>
    )
} 

export default EditProductForm;