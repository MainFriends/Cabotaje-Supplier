import React from 'react'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react/cjs/react.development';
import Modal from '../Modal';
import Inventory from './Inventory';9
import moment from 'moment';
import AlertError from '../AlertError';

const ProductsList = ({saleInvoice, setsaleInvoice, setCurrentPage, correlativeInvoice, productListSale, setproductListSale}) => {
    const [errorMessage, setErrorMessage] = useState('');

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
    
    const columns = [
        {
            name: 'CÓDIGO',
            selector: row => row.COD_PRODUCT,
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
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_PRODUCT)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    const handleDelete = cod => {
        const findProduct = productListSale.filter(product => product.COD_PRODUCT !== cod);

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
                    value={moment().format('DD-MM-YYYY')}
                    />
                </div>
            </div>
        </div>
        <hr className='mt-0'/>
        <div className="row">
            <div className="col-6">
                <h6 className='ml-3 text-gray-700'>Lista de productos</h6>
            </div>
            <div className="col-6 text-right">
                <button autoFocus className="btn btn-success mr-2" data-toggle="modal" data-target='#sale-inventory' data-placement="bottom" title="Agregar producto"><i className="fa-solid fa-plus"></i></button>
                <button onClick={() => clearProductsList()} className="btn btn-info mr-3" data-toggle="tooltip" data-placement="bottom" title="Limpiar lista"><i class="fa-solid fa-broom"></i></button>
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