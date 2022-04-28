import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import moment from 'moment';

export const PaymentMethod = ({saleInvoice, setsaleInvoice, setCurrentPage, correlativeInvoice, productListSale, setproductListSale}) => {
    const [efectivoRecibido, setEfectivoRecibido] = useState(0);
    const [cambio, setCambio] = useState(0);

    const {
        SUBTOTAL,
        TOT_ISV,
        TOT_SALE
    } = saleInvoice

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
        }
    ];

    const handleInputChange = (e) => {
        setEfectivoRecibido(e.target.value)
    }

    const handleStateChange = (e) => {
        setsaleInvoice({
            ...saleInvoice,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setCambio(saleInvoice.TOT_SALE - efectivoRecibido)
    }, [efectivoRecibido])

  return (
    <div className="card text-dark card-facturar shadow">
    <div className="card-header">Finalizar venta</div>
    <div className="card-body p-3">
        <div className="form-group row small mb-3">
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
        <hr className='mt-0'/>
        <div className="row">
            <h7 className='ml-4 text-gray-700'>Detalle de venta</h7>
        </div>
        <DataTable
            columns={columns}
            data={productListSale}
            persistTableHead
            striped
        />
        <div className="row mt-3">
            <div className="col-10 text-right text-bold">
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
        <hr />
        <h7 className='ml-2 text-gray-700'>Información de cobro</h7>
        <div className="row mt-2">
        <div className="col-3 ml-2">
                <label className="form-label">Tipo de venta</label>
                <select onChange={handleStateChange}  name='TYP_TO_SALE' defaultValue={'Contado'} className="form-control" required>
                    <option value="Contado">Contado</option>
                    <option value="Crédito">Crédito</option>
                </select>
            </div>
            <div className="col-3">
                <label className="form-label">Método de pago</label>
                <select onChange={handleStateChange} name='COD_TYP_PAY' defaultValue={'Contado'} className="form-control" required>
                    <option value="1">Efectivo</option>
                    <option value="2">Tarjeta</option>
                </select>
            </div>
            <div className="col-3">
                <label className="form-label">Cantidad recibida</label>
                <input autoFocus onChange={handleInputChange} className='form-control' type="number" />
            </div>
            <div className="col-2">
                <label className="form-label">Cambio</label>
                <input value={`L. ${cambio.toFixed(2)}`} className='form-control' type="text" disabled/>
            </div>
        </div>
    </div>
    <div className="modal-footer">
        <button onClick={() => setCurrentPage(2)} className="btn btn-dark">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="btn btn-primary">
            <i class="fa-solid fa-circle-check mr-2"></i>Finalizar venta
        </button>
    </div>
  </div>
  )
}
