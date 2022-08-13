import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import Inventory from './Inventory';
import moment from 'moment';
import AlertError from '../AlertError';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const ProductsList = ({saleInvoice, setsaleInvoice, setCurrentPage, correlativeInvoice, productListSale, setproductListSale}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [filterCheck, setFilterCheck] = useState(false);
    const [SKU, setSKU] = useState('');
    const [productsInventory, setProductsInventory] = useState([]);
    const [wholosalePriceCheck, setWholosalePriceCheck] = useState(false);
    const [stocks, setStocks] = useState(0);
    const [stocksLote, setStocksLote] = useState(0);
    const [cantUser, setCantUser] = useState('');
    const [numLote, setNumLote] = useState('');
    const [productSelected, setProductSelected] = useState({
        SKU: '',
        NAM_PRODUCT: '',
        DES_PRODUCT: '',
        NORMAL_UNIT_PRICE: '',
        WHOLESALE_PRICE: '',
        WHOLESALE_CANT: '',
        NAM_TYPE_PRODUCT: '',
        ISV: '',
        CANT_TOTAL: '',
        NAM_LOT: ''
    })

    const [productFilters, setProductFilters] = useState({
        COD_SUPPLIER: '',
        COD_CATEGORY: ''
    });

    const handleChange = (e) => {
        setProductFilters({
            ...productFilters,
            [e.target.name]: e.target.value
        })
    }

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

    useEffect(() => {
        setsaleInvoice({
            ...saleInvoice,
            SUBTOTAL: productListSale.reduce((acum, current) => acum + (current.PRICE * current.CANT_PRODUCTS), 0),
            TOT_ISV: productListSale.reduce((acum, current) => acum + (current.ISV * current.CANT_PRODUCTS), 0),
            TOT_SALE: productListSale.reduce((acum, current) => acum + current.TOTAL, 0)
        })
    }, [productListSale]);

    useEffect(() => {
        axios.get('/inventory', token())
        .then(res => {
            setProductList(res.data);
            setFilterProduct(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('/categories', token())
            .then(res => setCategories(res.data))
    }, [])

    useEffect(() => {
        axios.get('/Supplier', token())
            .then(res => setSuppliers(res.data))
    }, [])

    const {
        SUBTOTAL,
        TOT_ISV,
        TOT_SALE
    } = saleInvoice;
    
    const columns = [
        {
            name: 'SKU',
            selector: row => row.SKU,
        },
        {
            name: 'LOTE',
            selector: row => row.NUM_LOT,
        },
        {   
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            wrap: true
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.DES_PRODUCT,
            wrap: true
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'PRECIO',
            selector: row => row.PRICE,
            format: row => `L ${row.PRICE.toFixed(2)}`
        },
        {
            name: 'ISV',
            selector: row => row.ISV,
            format: row => `L ${row.ISV.toFixed(2)}`
        },
        {
            name: 'TOTAL',
            selector: row => row.TOTAL,
            format: row => `L ${row.TOTAL.toFixed(2)}`
        },
        {
            name: 'ELIMINAR',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.NUM_LOT)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    const handleFilterCheck = () => {
        setFilterCheck(filterCheck ? (false) : (true));
        setSKU('')
    }

    const handleDelete = NUM_LOT => {
        const findProduct = productListSale.filter(product => product.NUM_LOT !== NUM_LOT);

        setproductListSale(findProduct);
    }

    const handleNextComponent = () => {
        if(!productListSale.length){
            setErrorMessage('No se ha ingresado ningún producto en la lista.');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        setCurrentPage(3)
    }
    
    const clearProductsList = () => {
        setproductListSale([])
    }

    const handleProductSelected = (e) => {
        setSKU(e.target.value);
    }

    useEffect(() => {
        if(SKU){
            axios.get(`/inventoryDetail/${SKU}`, token())
            .then(res => {
                setProductsInventory(res.data);
                const calculeStocks = res.data.reduce((acum, current) => acum + current.CANT_PRODUCTS, 0);
                setStocks(calculeStocks);
            });
        }
    }, [SKU]);

    useEffect(() => {
        if(numLote){
            const [product] = productsInventory.filter(row => row.NUM_LOT === numLote);
            setStocksLote(product.CANT_PRODUCTS);
            setProductSelected(product);
        }
    }, [numLote])

    const handleProductAdd = () => {

        if(!numLote){
            setErrorMessage('Seleccione un lote');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if(!cantUser){
            setErrorMessage('Digite una cantidad válida');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if(cantUser > stocksLote){
            setErrorMessage('No hay suficientes unidades');

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
            NUM_LOT,
            SKU: COD_PRODUCT,
            NAM_PRODUCT,
            DES_PRODUCT,
            PRICE: PRICE - (PRICE * ISV),
            CANT_PRODUCTS: cantUser,
            ISV: ISV * PRICE,
            TOTAL: cantUser * PRICE
        }

        setproductListSale([
            ...productListSale,
            product
        ])

        setCantUser('');
        setNumLote('');
    }

  return (
    <div className="card text-dark card-facturar shadow">
        <div className="card-header">Detalle de productos</div>
        <div className="card-body p-3">
            <div className="form-group row small mb-0">
                <label className="col-sm-1 col-form-label pr-0">Factura</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="number" 
                    className="form-control form-control-sm" 
                    value={correlativeInvoice}
                    disabled
                    />
                </div>
                <label className="col-sm-1 col-form-label pr-0">Usuario</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    disabled
                    value={saleInvoice.NAM_USER}
                    />
                </div>
                <label className="col-sm-1 col-form-label pr-0">Cliente</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    disabled
                    value={saleInvoice.NAM_CLIENT}
                    />
                </div>
                <label className="col-sm-1 col-form-label pr-0">Fecha</label>
                <div className="col-sm-2 pl-0 pr-4">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    disabled
                    value={moment().format('DD-MM-YYYY hh:mm')}
                    />
                </div>
            </div>
        </div>
        <hr className='mt-0'/>
        <div className="row">
            <div className="col-6">
                <h6 className='ml-3 text-gray-700'>Lista de productos</h6>
            </div>
        </div>
        <div className="row pl-3">
            {
                filterCheck 
                ?
                <>
                    <div className="col-2">
                        <label className='form-label small'>Proveedores </label>
                        <select tabIndex="1" onChange={handleChange} defaultValue={''} name="COD_SUPPLIER" className="form-control form-control-sm" required>
                            <option value={''}>Seleccionar</option>
                            {suppliers.map(supplier => {
                                return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-2">
                        <label className='form-label small'>Categorias </label>
                        <select tabIndex="2" onChange={handleChange} defaultValue={''} name="COD_CATEGORY" className="form-control form-control-sm" required>
                            <option value={''}>Seleccionar</option>
                            {categories.map(category => {
                                return <option key={category.COD_CATEGORY} value={category.COD_CATEGORY}>{category.NAM_CATEGORY}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-3">
                        <label className='form-label small'>Seleccionar producto </label>
                        <select onChange={handleProductSelected} tabIndex="3" defaultValue={''} name="COD_PRODUCT" className="form-control form-control-sm" required>
                            <option value={''}>Seleccionar</option>
                            {filterProduct.map(product => {
                                return <option key={product.NUM_LOT} value={product.COD_PRODUCT}>{product.NAM_PRODUCT}</option>
                            })}
                        </select>
                        {SKU ? <small className='text-small text-secondary'>Existencias totales: {stocks}</small> : null }
                    </div>
                    <div className="col-2">
                        <label className='form-label small'>Seleccionar lote </label>
                        <select onChange={(e) => setNumLote(e.target.value)} tabIndex="4" value={numLote} name="NUM_LOT" className="form-control form-control-sm" required>
                            <option value={''}>Seleccionar</option>
                            {productsInventory.map(product => {
                                return <option key={product.NUM_LOT} value={product.NUM_LOT}>{product.NUM_LOT}</option>
                            })}
                        </select>
                        {numLote ? <small className='text-small text-secondary'>Existencias en lote: {stocksLote}</small> : null }
                    </div>
                    <div className="col-1">
                        <label className="form-label small">Cantidad</label>
                        <input value={cantUser} onChange={(e) => setCantUser(e.target.value)} tabIndex="4" className='form-control form-control-sm' type="text"/>
                    </div>
                </>
                :
                <div className="col-8 mt-4">
                        <button className='btn btn-sm btn-primary' onClick={() => handleFilterCheck()}>Filtrar búsqueda</button>
                </div>
            }
            <div className="col-2 text-right mt-4">
                {/* <button autoFocus className="btn btn-success mr-2" data-toggle="modal" data-target='#sale-inventory' data-placement="bottom" title="Agregar producto"><i className="fa-solid fa-plus"></i></button> */}
                <button onClick={() => clearProductsList()} className="btn btn-info mr-3" data-toggle="tooltip" data-placement="bottom" title="Limpiar lista"><i className="fa-solid fa-broom"></i></button>
            </div>
        </div>
        <div className="row mt-2">
            {
                filterCheck 
                ?
                <>
                <div className="col-2 ml-3">
                    <label className="form-label small">SKU</label>
                    <input className='form-control form-control-sm' value={SKU} type="text" disabled/>
                </div>
                <div className="col-3 mt-4 py-2 px-0 mx-0">
                    <div class="form-check form-check-inline">
                        <input onChange={() => setWholosalePriceCheck(wholosalePriceCheck ? false : true)} class="form-check-input" type="checkbox" id="wholosalePrice" value="option1"/>
                        <label class="form-check-label small" for="wholosalePrice">Aplicar precios mayoristas</label>
                    </div>
                </div>
                <div className="col-1 custom-margin pr-0 mr-0">
                    <button tabIndex="5" className='btn btn-sm btn-success' onClick={() => handleProductAdd()}>Agregar</button>
                </div>
                <div className="col-3 ml-1 custom-margin pl-0 ml-0">
                    <button tabIndex="6" className='btn btn-sm btn-primary' onClick={() => handleFilterCheck()}>Cancelar filtro</button>
                </div>
                </>
                :
                null
            }
        </div>
        <div className="row justify-content-end mt-2 mr-2">

        </div>
        <DataTable
            columns={columns}
            data={productListSale}
            persistTableHead
            striped
            className='bg-light'
        />
        <Modal 
            idModal='sale-inventory'
            title='Inventario'
            content={<Inventory
                productListSale={productListSale} 
                setproductListSale={setproductListSale}
            />}
            modalSize='xl'
        />
        <hr />
        <div className="row">
            <div className="col-10 text-right">
                <h6>Subtotal</h6>
                <h6>ISV 15%</h6>
                <h4>Total</h4>
            </div>
            <div className="col-2">
                <h6>{`L. ${SUBTOTAL.toFixed(2)}`}</h6>
                <h6>{`L. ${TOT_ISV.toFixed(2)}`}</h6>
                <h4>{`L. ${TOT_SALE.toFixed(2)}`}</h4>
            </div>
        </div>
        <div className="modal-footer">
        <button onClick={() => setCurrentPage(1)} className="btn btn-dark">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={() => handleNextComponent()} className="btn btn-dark">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
        {errorMessage ? <AlertError message={errorMessage}/> : null}
    </div>
  )
}

export default ProductsList