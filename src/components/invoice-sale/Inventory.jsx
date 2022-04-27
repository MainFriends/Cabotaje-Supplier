import React, { useEffect, useState } from 'react'
import AlertError from '../AlertError';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const Inventory = ({productListSale, setproductListSale}) => {
    const [categories, setCategories] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cant, setCant] = useState(0);
    const [codProduct, setCodProduct] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectProduct, setSelectedProduct] = useState({
        COD_PRODUCT: 0,
        NAM_PRODUCT: '',
        DES_PRODUCT: '',
        NORMAL_UNIT_PRICE: 0,
        WHOLESALE_PRICE: 0,
        WHOLESALE_CANT: 0,
        NAM_TYPE_PRODUCT: ''
    });

    const {
        COD_PRODUCT,
        NAM_PRODUCT,
        DES_PRODUCT,
        NORMAL_UNIT_PRICE,
        WHOLESALE_PRICE,
        WHOLESALE_CANT,
        NAM_TYPE_PRODUCT,
        ISV
    } = selectProduct

    useEffect(() => {
        axios.get('/categories', token())
            .then(res => setCategories(res.data))
    }, [])

    useEffect(() => {
        if(selectedCategory){
            axios.get(`/products/${selectedCategory}`, token())
            .then(res => setProductsList(res.data))
        }
    }, [selectedCategory])

    useEffect(() => {
        if(codProduct){
            axios.get(`/inventory/${codProduct}`, token())
            .then(res => setSelectedProduct(res.data[0]))
        }
    }, [codProduct]);

    const handleCant = e => {
        setCant(e.target.value)
    }
    
    const addProduct = () => {
        let PRICE;

        const isExistProduct = productListSale.some(product => product.COD_PRODUCT === COD_PRODUCT);
        console.log(isExistProduct)
        if(isExistProduct){
            setErrorMessage('El producto ya ha sido agregado a lista.');

            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
            
            return;
        }

        if(cant < WHOLESALE_CANT){
            PRICE = NORMAL_UNIT_PRICE
        }else{
            PRICE = WHOLESALE_PRICE
        }

        const product = {
            COD_PRODUCT,
            NAM_PRODUCT,
            DES_PRODUCT,
            PRICE: PRICE - (PRICE * ISV),
            CANT_PRODUCT: cant,
            ISV: ISV * PRICE,
            TOTAL: cant * PRICE
        }

        setproductListSale([
            ...productListSale,
            product
        ])

        clearStates()
    }

    const clearStates = () => {
        setSelectedCategory(null);
        setCant(0);
        setCodProduct(null);
        setSelectedProduct({
            COD_PRODUCT: 0,
            NAM_PRODUCT: '',
            DES_PRODUCT: '',
            NORMAL_UNIT_PRICE: 0,
            WHOLESALE_PRICE: 0,
            WHOLESALE_CANT: 0,
            NAM_TYPE_PRODUCT: ''
        })
    }
    
  return (
    <>
        <div className="row">
            <div className="col-8">
                <h6>Productos</h6>
                <div className="row">
                    {categories.map(({COD_CATEGORY, NAM_CATEGORY}) => <div key={COD_CATEGORY} className="col-3 mt-1 px-1"><div onClick={() => setSelectedCategory(COD_CATEGORY)} className="btn btn-success btn-block">{NAM_CATEGORY}</div></div>)}
                </div>
                <div className="row">
                    {productsList.map(({COD_PRODUCT, NAM_PRODUCT}) => <div key={COD_PRODUCT} className="col-3 mt-1 px-1"><div onClick={() => setCodProduct(COD_PRODUCT)} className="btn btn-danger btn-block">{NAM_PRODUCT}</div></div>)}
                </div>
            </div>
            {
                codProduct
                ?
                <div className="col-4 px-1">
                    <div className="row">
                        <div className="col-12">
                            <h3 className='mb-0'>{NAM_PRODUCT}</h3>
                        </div>
                        <div className="col-6">
                            <small className='text-small text-secondary'>{DES_PRODUCT}</small>
                        </div>
                        <div className="col-6 text-right">
                            <small className='text-small text-secondary'>{NAM_TYPE_PRODUCT}</small>
                        </div>
                    </div>
                    <hr className='mt-0'/>
                    <div className="row mt-3">
                        <div className="col-6">
                            <h6 className='mb-1'>Cantidad</h6>
                            <input onChange={handleCant} min={0} value={cant} className='form-control form-control-lg' type="number" />
                        </div>
                        <div className="col-6">
                            <h6 className='mb-1'>Precio</h6>
                            <input className='form-control form-control-lg' value={cant < WHOLESALE_CANT ? `L. ${NORMAL_UNIT_PRICE.toFixed(2)}` : `L. ${WHOLESALE_PRICE.toFixed(2)}`} disabled/>
                        </div>
                    </div>
                    <div className="modal-footer mt-3 px-0">
                        <button onClick={() => addProduct()} className={'btn btn-primary btn-block mx-0 ' + (cant < 1 ? ' disabled' : '')}>Agregar</button>
                        {errorMessage ? <AlertError message={errorMessage}/> : null}
                    </div>
                </div>
                :
                null
            }
        </div>
    </>
    
  )
}

export default Inventory