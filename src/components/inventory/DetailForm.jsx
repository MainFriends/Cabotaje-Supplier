import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";


const DetailForm = ({setSendRequest, setMessageError}) => {
    const [formData, setFormData] = useState({
        COD_PRODUCT: '',
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

    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className="row mb-4">
                <div className="col-2">
                    <label className='form-label' htmlFor="COD_PRODUCT">Código</label>
                    <input onChange={handleInputChange} name='COD_PRODUCT' className='form-control' type="number" min='1' required/>
                </div>
                <div className="col-6">
                    <label className='form-label'>Producto</label>
                    <input id='nameProduct' value={nameProduct} className='form-control' type="text" onInput={toUpperCase} disabled/>
                </div>
                <div className="col-4 text-right">
                    <small className='form-label text-secondary'><i className="mr-1 fa-solid fa-circle-info"></i>¿No encuentras el producto?</small><br />
                    <button onClick={() => closeModal()} type="button" data-toggle="modal" data-target='#addProduct' className="btn btn-success mt-1"><i className="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-2">
                    <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad</label>
                    <input onChange={handleInputChange} className='form-control' name='CANT_PRODUCTS' type="number" min='1' required/>
                </div>
                <div className="col-3">
                    <label className='form-label' htmlFor="NUM_LOT">Número de Lote</label>
                    <input onChange={handleInputChange} className='form-control' name='NUM_LOT' type="number" min='1' required/>
                </div>
                <div className="col-4">
                    <label className='form-label'>Estado</label>
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
                    <label className='form-label' htmlFor="DAT_PURCHASE">Fecha de compra</label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_PURCHASE' type="date" required/>
                </div>
                <div className="col-4">
                    <label className='form-label' htmlFor="DAT_EXP">Fecha de expiración</label>
                    <input onChange={handleInputChange} className='form-control' name='DAT_EXP' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseAddDetail' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
} 

export default DetailForm;