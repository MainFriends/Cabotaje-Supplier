import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";
import moment from 'moment';


const DetailForm = ({setSendRequest, setMessageError}) => {
    const [btnWholesale, setBtnWholesale] = useState(false);
    const [formData, setFormData] = useState({
        COD_PRODUCT: '',
        NORMAL_UNIT_PRICE: '',
        PURCHASE_PRICE: '',
        WHOLESALE_CANT: 0,
        WHOLESALE_PRICE: 0,
        ISV: '',
        CANT_PRODUCTS: '',
        NUM_LOT: '',
        COD_STATUS: '',
        DAT_PURCHASE: '',
        DAT_EXP: ''
    });
    const [nameProduct, setNameProduct] = useState('');

    const {
        COD_PRODUCT,
        COD_STATUS
    } = formData;

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const input = document.querySelector('#nameProduct');

        if(COD_PRODUCT){
            axios.get(`/inventory/${COD_PRODUCT}`, token())
                .then(res => {
                    input.classList.remove('is-invalid')
                    setNameProduct(res.data[0].NAM_PRODUCT);
                })
                .catch(err => {
                    input.classList.add('is-invalid')
                    setNameProduct('Producto no encontrado')
                })
        }
    }, [COD_PRODUCT])

    const closeModal = () => {
        document.querySelector('#idCloseAddDetail').click();
    }

    const handleSubmit = e =>{
        e.preventDefault();

        if(COD_STATUS === '' || COD_STATUS === 'default'){
            setMessageError('Seleccione un estado del producto.')

            setTimeout(() => {
                setMessageError('')
            }, 3000);
            return
        }
        axios.post('/inventoryDetail', formData, token())
            .then(res => {
                handleOptionClose()
                e.target.reset();
                closeModal();
                setNameProduct('')
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

    const handleOrder = (e) => {
        if(e.target.value){
            setFormData({
                ...formData,
                COD_ORDER: e.target.value
            })
        }else{
            delete formData.COD_ORDER
        }
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
            <div className="row mb-6">
                <div className="col-4">
                    <label className='form-label' htmlFor="COD_PRODUCT">SKU <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} name='COD_PRODUCT' className='form-control' type="text" required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Producto <span className="text-danger"> *</span></label>
                    <input id='nameProduct' value={nameProduct} className='form-control' type="text" onInput={toUpperCase} disabled/>
                </div>
                <div className="col-4 text-right">
                    <small className='form-label text-secondary'><i className="mr-1 fa-solid fa-circle-info"></i>¿No encuentras el producto?</small><br />
                    <button onClick={() => closeModal()} type="button" data-toggle="modal" data-target='#addProduct' className="btn btn-success mt-1"><i className="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
            <div className="row mb-4 mt-2">
                <div className="col-2">
                    <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='CANT_PRODUCTS' type="number" min='1' required/>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="PURCHASE_PRICE">Precio de compra <span className="text-danger"> *</span></label>
                    <input min={0} onChange={handleInputChange} className='form-control' name='PURCHASE_PRICE' type="number" required/>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="NORMAL_UNIT_PRICE">Precio de venta <span className="text-danger"> *</span></label>
                    <input min={formData.PURCHASE_PRICE} onChange={handleInputChange} className='form-control' name='NORMAL_UNIT_PRICE' type="number" required/>
                </div>
                <div className="col-2">
                    <label className='form-label' htmlFor="ISV">ISV <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' step="0.01" min={0} max={1} name='ISV' type="number" required/>
                </div>
            </div>
            <div className="row mb-4 mt-2">
                <div className="col-3">
                    <label className='form-label' htmlFor="NUM_LOT">Número de Lote <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_LOT' type="text" required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Estado <span className="text-danger"> *</span></label>
                    <select onChange={handleInputChange} defaultValue={'default'} name="COD_STATUS" className="custom-select" required>
                        <option value={'default'}>Seleccionar</option>
                        <option value="3">Revisado</option>
                        <option value="4">Sin revisar</option>
                    </select>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="COD_ORDER">Código de orden</label>
                    <input onChange={handleOrder} className='form-control' name='COD_ORDER' type="number" min='1'/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-4">
                    <label className='form-label' htmlFor="DAT_PURCHASE">Fecha de compra <span className="text-danger"> *</span></label>
                    <input max={moment().format('YYYY-MM-DD')} onChange={handleInputChange} className='form-control' name='DAT_PURCHASE' type="date" required/>
                </div>
                <div className="col-4">
                    <label className='form-label' htmlFor="DAT_EXP">Fecha de expiración <span className="text-danger"> *</span></label>
                    <input min={moment().format('YYYY-MM-DD')} onChange={handleInputChange} className='form-control' name='DAT_EXP' type="date" required/>
                </div>
            </div>
            {btnWholesale 
                ?
                <div className="row mb-4">
                    <div className="col-4">
                        <label className='form-label' htmlFor="WHOLESALE_CANT">Cantidad <span className="text-danger"> *</span></label>
                        <input onChange={handleInputChange} className='form-control' min={0} name='WHOLESALE_CANT' type="number" required/>
                        <small className="form-text text-muted">Establezca a partir de qué cantidad se determinará una venta al por mayor de este producto.</small>
                    </div>
                    <div className="col-4">
                        <label className='form-label' htmlFor="WHOLESALE_PRICE">Precio unitario <span className="text-danger"> *</span></label>
                        <input onChange={handleInputChange} className='form-control' min={0} name='WHOLESALE_PRICE' type="number" required/>
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
                <button type="button" id='idCloseAddDetail' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
} 

export default DetailForm;