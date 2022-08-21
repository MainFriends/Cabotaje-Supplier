import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import Inventory from './Inventory';
import moment from 'moment';
import AlertError from '../AlertError';
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import ProductFilter from './ProductFilter';

const ProductsList = ({saleInvoice, setsaleInvoice, setCurrentPage, correlativeInvoice, productListSale, setproductListSale}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [wholosalePriceCheck, setWholosalePriceCheck] = useState(false);
    const [cantUser, setCantUser] = useState(1);
    const [numLote, setNumLote] = useState('');
    const [skuDigited, setSkuDigited] = useState('');
    const [productDetail, setProductDetail] = useState([])
    const [handleInputCant, setHandleInputCant] = useState({
        id: '',
        state: false
    });
    const [handleInputLote, setHandleInputLote] = useState({
        id: '',
        state: false
    });

    useEffect(() => {
        setsaleInvoice({
            ...saleInvoice,
            SUBTOTAL: productListSale.reduce((acum, current) => acum + (current.PRICE * current.CANT_PRODUCTS), 0),
            TOT_ISV: productListSale.reduce((acum, current) => acum + (current.ISV * current.CANT_PRODUCTS), 0),
            TOT_SALE: productListSale.reduce((acum, current) => acum + current.TOTAL, 0)
        })
    }, [productListSale]);

    const {
        SUBTOTAL,
        TOT_ISV,
        TOT_SALE
    } = saleInvoice;

    useEffect(() => {
        const inputSKU = document.querySelector('#sku');
        if(skuDigited){
            let isProductExist = false;
            const findProduct = productDetail.find(row => row.COD_PRODUCT == skuDigited);

            if(findProduct){
                if(wholosalePriceCheck){
                    isProductExist = productListSale.some(row => row.NUM_LOT === findProduct.NUM_LOT && row.PRICE === findProduct.WHOLESALE_PRICE)
                }else{
                    isProductExist = productListSale.some(row => row.NUM_LOT === findProduct.NUM_LOT && row.PRICE === findProduct.NORMAL_UNIT_PRICE)
                }

                if(isProductExist){
                    setErrorMessage('Producto ya se encuentra agregado');
        
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 3000);
                    return;
                }

                inputSKU.classList.remove('is-invalid');
                inputSKU.classList.add('is-valid');

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
                } = findProduct;
        
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
                setNumLote('');
                setCantUser(1);
            }else{
                inputSKU.classList.remove('is-valid');
                inputSKU.classList.add('is-invalid');
            }
        }

        if(skuDigited === ''){
            inputSKU.classList.remove('is-valid');
            inputSKU.classList.remove('is-invalid');
        }
    },[skuDigited])

    const columns = [
        {
            name: 'SKU',
            selector: row => row.SKU,
        },
        {
            name: 'LOTE',
            selector: row => row.NUM_LOT,
            format: row => {
                if(handleInputLote.id === row.ID && handleInputLote.state){
                    return <>
                        <select autoFocus defaultValue={numLote} onChange={(e) => handleSelectLote(e, row.ID)} onBlur={() => setHandleInputLote({id: '', state: false})} className="form-control form-control-sm">
                        {
                            productDetail.map(product => {
                                if(product.COD_PRODUCT === row.SKU){
                                    return <option key={product.NUM_LOT} value={product.NUM_LOT}>{product.NUM_LOT}</option>
                                }
                            })
                        } 
                        </select>
                    </>
                }else{
                    return <div onClick={() => handleClickInputLote(row.ID, row.NUM_LOT)}><i className="fa-solid fa-pen-to-square mr-3 text-primary"></i>{row.NUM_LOT}</div>
                }
            }
        
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
            format: row => (handleInputCant.id === row.ID && handleInputCant.state ? <input autoFocus min={1} value={cantUser} onChange={(e) => handleCantUser(e, row.ID, row.SKU, row.NUM_LOT)} onBlur={() => setHandleInputCant({id: '', state: false})} className="form-control form-control-sm" type="number" /> : <div onClick={() => handleClickInput(row.ID, row.CANT_PRODUCTS)}><i className="fa-solid fa-pen-to-square mr-3 text-primary"></i>{row.CANT_PRODUCTS}</div>)
        },
        {
            name: 'PRECIO',
            selector: row => row.PRICE,
            format: row => `L ${row.PRICE.toLocaleString('es-MX')}`
        },
        {
            name: 'ISV',
            selector: row => row.ISV,
            format: row => `L ${row.ISV.toLocaleString('es-MX')}`
        },
        {
            name: 'TOTAL',
            selector: row => row.TOTAL,
            format: row => `L ${row.TOTAL.toLocaleString('es-MX')}`
        },
        {
            name: 'ELIMINAR',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.ID)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    const handleClickInputLote = (id, lote) => {
        setHandleInputLote({id, state: true})
        setNumLote(lote);
    }

    const handleClickInput = (id, cant) => {
        setHandleInputCant({id, state: true})
        setCantUser(cant);
    }

    const handleDelete = ID => {
        const findProduct = productListSale.filter(product => product.ID !== ID);

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

    useEffect(() => {
            axios.get(`/inventoryDetail`, token())
            .then(res => {
                setProductDetail(res.data)
            });
    }, []);

    const handleCantUser = (e, id, SKU, lote) => {
        const findProduct = productDetail.find(row => row.COD_PRODUCT === SKU && row.NUM_LOT === lote);
        if(e.target.value > findProduct.CANT_PRODUCTS){
            setErrorMessage('No hay suficientes unidades de este lote');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        if(e.target.value <= 0 && e.target.value !== ''){
            setErrorMessage('La cantidad mínima es 1');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        const pos = productListSale.findIndex(row => row.ID === id);
        setCantUser(e.target.value);
        productListSale[pos].CANT_PRODUCTS = e.target.value
        productListSale[pos].TOTAL = e.target.value * productListSale[pos].PRICE
        setproductListSale([
            ...productListSale
        ])
    }

    const handleSelectLote = (e, id) => {
        const isLoteExist = productListSale.some(row => row.NUM_LOT === e.target.value);
        if(isLoteExist){
            setErrorMessage('El lote seleccionado ya se ha agregado a la lista');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }
        const pos = productListSale.findIndex(row => row.ID === id);
        productListSale[pos].NUM_LOT = e.target.value
        productListSale[pos].CANT_PRODUCTS = 1
        setproductListSale([
            ...productListSale
        ])
    }

  return (
    <div className="card text-dark card-facturar shadow">
        <div className="card-header">Detalle de productos</div>
        <div className="card-body p-3">
            <div className="form-group row small mb-0">
                <label className="col-sm-1 col-form-label pr-0">Factura</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="text" 
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
        <div className="row px-3">
            <div className="col-3">
                <label className="form-label small">SKU</label>
                <input autoFocus id='sku' onChange={(e) => setSkuDigited(e.target.value.toUpperCase())} className='form-control form-control-sm' value={skuDigited} type="text"/>
            </div>
            <div className="col-4 mt-4 py-2">
                <div className="form-check form-check-inline">
                        <input onChange={() => setWholosalePriceCheck(wholosalePriceCheck ? false : true)} className="form-check-input" type="checkbox" id="wholosalePrice" value="option1"/>
                        <label className="form-check-label small" htmlFor="wholosalePrice">Aplicar precios mayoristas</label>
                </div>
            </div>
            <div className="col-5 text-right mt-3 py-2">
                <button className='btn btn-success mr-2' data-toggle="modal" data-target='#product-filter' data-placement="bottom" title="Agregar producto"><i className="fa-solid fa-magnifying-glass"></i></button>
                {/* <button autoFocus className="btn btn-success mr-2" data-toggle="modal" data-target='#sale-inventory' data-placement="bottom" title="Agregar producto"><i className="fa-solid fa-plus"></i></button> */}
                <button onClick={() => clearProductsList()} className="btn btn-info" data-toggle="tooltip" data-placement="bottom" title="Limpiar lista"><i className="fa-solid fa-broom"></i></button>
            </div>
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
        <Modal 
            idModal='product-filter'
            title='Filtrar búsqueda'
            content={<ProductFilter
            wholosalePriceCheck={wholosalePriceCheck}
            setproductListSale={setproductListSale}
            productListSale={productListSale}
        />}
        />
        <hr />
        <div className="row">
            <div className="col-10 text-right pr-0">
                <h6>Subtotal</h6>
                <h6>Total ISV</h6>
                <h6 className='font-weight-bold'>Total venta</h6>
            </div>
            <div className="col-2 text-right pr-4">
                <h6>{`L. ${SUBTOTAL.toLocaleString('es-MX')}`}</h6>
                <h6>{`L. ${TOT_ISV.toLocaleString('es-MX')}`}</h6>
                <h6 className='font-weight-bold'>{`L. ${TOT_SALE.toLocaleString('es-MX')}`}</h6>
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