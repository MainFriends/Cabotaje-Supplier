import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import AlertError from '../AlertError';
import moment from 'moment';


const ProductFilter = ({wholosalePriceCheck, setproductListSale, productListSale}) => {
    const [loteFilter, setLoteFilter] = useState('');
    const [stocksLote, setStocksLote] = useState(0);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [stocks, setStocks] = useState(0);
    const [productList, setProductList] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [SKU, setSKU] = useState('');
    const [productsInventory, setProductsInventory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [productSelected, setProductSelected] = useState({
        NUM_LOT: '',
        COD_PRODUCT: '',
        NAM_PRODUCT: '',
        DES_PRODUCT: '',
        NORMAL_UNIT_PRICE: '',
        WHOLESALE_PRICE: '',
        WHOLESALE_CANT: '',
        NAM_TYPE_PRODUCT: '',
        ISV: '',
        CANT_PRODUCTS: ''
    })

    const [productFilters, setProductFilters] = useState({
        COD_SUPPLIER: '',
        COD_CATEGORY: ''
    });

    useEffect(() => {
        let products;

        if(productFilters.COD_SUPPLIER && !productFilters.COD_CATEGORY){
            products = productList.filter(product => product.COD_SUPPLIER == productFilters.COD_SUPPLIER);
        }

        if(!productFilters.COD_SUPPLIER && productFilters.COD_CATEGORY){
            products = productList.filter(product => product.COD_CATEGORY == productFilters.COD_CATEGORY);
        }
        
        if(productFilters.COD_SUPPLIER && productFilters.COD_CATEGORY){
            products = productList.filter(product => product.COD_SUPPLIER == productFilters.COD_SUPPLIER && product.COD_CATEGORY == productFilters.COD_CATEGORY);
        }

        if(!productFilters.COD_SUPPLIER && !productFilters.COD_CATEGORY){
            products = productList;
        }

        setFilterProduct(products);

    }, [productFilters.COD_SUPPLIER, productFilters.COD_CATEGORY]);

    const handleChange = (e) => {
        setProductFilters({
            ...productFilters,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(loteFilter){
            const [product] = productsInventory.filter(row => row.NUM_LOT === loteFilter);
            setStocksLote(product.CANT_PRODUCTS);
            setProductSelected(product);
        }
    }, [loteFilter])

    useEffect(() => {
        axios.get('/categories', token())
            .then(res => setCategories(res.data))
    }, [])

    useEffect(() => {
        axios.get('/Supplier', token())
            .then(res => setSuppliers(res.data))
    }, [])

    useEffect(() => {
        axios.get('/inventory', token())
        .then(res => {
            setProductList(res.data);
            setFilterProduct(res.data)
        })
    }, [])

    useEffect(() => {
        if(SKU){
            axios.get(`/inventoryDetail/${SKU}`, token())
            .then(res => {
                setProductsInventory(res.data);
                const calculeStocks = res.data.reduce((acum, current) => acum + current.CANT_PRODUCTS, 0);
                setStocks(calculeStocks);
            });
        }

        if(SKU===''){
            setLoteFilter('')
            setProductsInventory([]);
        }
    }, [SKU]);
    

    const handleProductSelected = (e) => {
        setLoteFilter('')
        setSKU(e.target.value);
    }

    const handleProductAdd = () => {

        const isExistProduct = productListSale.some(row => row.SKU === SKU && row.NUM_LOT === loteFilter);

        if(SKU===''){
            setErrorMessage('Seleccione un producto');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if(!loteFilter){
            setErrorMessage('Seleccione un lote');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if(isExistProduct){
            setErrorMessage('El lote seleccionado ya se ha agregado a la lista');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        let PRICE;

        const {
            NUM_LOT,
            COD_PRODUCT,
            NAM_PRODUCT,
            DES_PRODUCT,
            NORMAL_UNIT_PRICE,
            WHOLESALE_PRICE,
            WHOLESALE_CANT,
            NAM_TYPE_PRODUCT,
            ISV,
            CANT_PRODUCTS
        } = productSelected;

        if(wholosalePriceCheck){
            if(WHOLESALE_PRICE){
                PRICE = WHOLESALE_PRICE;
            }else{
                setErrorMessage('No hay precio mayorista para el lote seleccionado.');

                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
                return;
            }
        }else{
            PRICE = NORMAL_UNIT_PRICE;
        }

        const product = {
            ID: moment().format('hh:mm:ss'),
            NUM_LOT,
            SKU: COD_PRODUCT,
            NAM_PRODUCT,
            DES_PRODUCT,
            PRICE: PRICE - (PRICE * ISV),
            CANT_PRODUCTS: 1,
            ISV: ISV * PRICE,
            TOTAL: 1 * PRICE
        }

        setproductListSale([
            ...productListSale,
            product
        ])

        setLoteFilter('');
        setSKU('')
        setProductFilters({
            COD_SUPPLIER: '',
            COD_CATEGORY: ''
        })
        document.querySelector("#addProductSale").click();
    }
  return (
    <>
    <div className="row">
        <div className="col-2">
            <label className='form-label small'>Proveedores </label>
            <select autoFocus onChange={handleChange} defaultValue={''} name="COD_SUPPLIER" className="form-control form-control-sm" required>
                <option value={''}>Seleccionar</option>
                {suppliers.map(supplier => {
                    return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                })}
            </select>
        </div>
        <div className="col-2">
            <label className='form-label small'>Categorias </label>
            <select onChange={handleChange} defaultValue={''} name="COD_CATEGORY" className="form-control form-control-sm" required>
                <option value={''}>Seleccionar</option>
                {categories.map(category => {
                    return <option key={category.COD_CATEGORY} value={category.COD_CATEGORY}>{category.NAM_CATEGORY}</option>
                })}
            </select>
        </div>
        <div className="col-3">
            <label className='form-label small'>Seleccionar producto </label>
            <select onChange={handleProductSelected} defaultValue={''} name="COD_PRODUCT" className="form-control form-control-sm" required>
                <option value={''}>Seleccionar</option>
                {filterProduct.map(product => {
                    return <option key={product.COD_PRODUCT} value={product.COD_PRODUCT}>{product.NAM_PRODUCT}</option>
                })}
            </select>
            {SKU ? <small className='text-small text-secondary'>Existencias totales: {stocks}</small> : null }
        </div>
        <div className="col-2">
            <label className='form-label small'>Seleccionar lote </label>
            <select onChange={(e) => setLoteFilter(e.target.value)} tabIndex="4" value={loteFilter} name="NUM_LOT" className="form-control form-control-sm" required>
                <option value={''}>Seleccionar</option>
                {productsInventory.map(product => {
                    return <option key={product.NUM_LOT} value={product.NUM_LOT}>{product.NUM_LOT}</option>
                })}
            </select>
            {loteFilter ? <small className='text-small text-secondary'>Existencias en lote: {stocksLote}</small> : null }
        </div>
        <div className="col-12">
            <div className="modal-footer mt-3 px-0">
                <button onClick={handleProductAdd} className={'btn btn-success'}>Agregar</button>
                <button id='addProductSale' className={'btn btn-danger'} data-dismiss="modal">Cancelar</button>
            </div>
            {errorMessage ? <AlertError message={errorMessage}/> : null}
        </div>
    </div>
    </>
  )
}

export default ProductFilter