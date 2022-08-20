import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';
import SaleSuccess from './SaleSuccess';
import AlertError from '../AlertError';

export const PaymentMethod = ({saleInvoice, setsaleInvoice, setCurrentPage, correlativeInvoice, productListSale, setproductListSale}) => {
    const [cambio, setCambio] = useState(0);
    const [error, setError] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [saleMessage, setSaleMessage] = useState({
        message: '',
        ok: true
    });

    const {
        SUBTOTAL,
        TOT_ISV,
        TOT_SALE,
        TYP_TO_SALE,
        COD_CLIENT,
        COD_TYP_PAY
    } = saleInvoice;

    useEffect(() => {
        if(COD_CLIENT === 1 && TYP_TO_SALE === 'Crédito'){
            setsaleInvoice({
                ...saleInvoice,
                TYP_TO_SALE: 'Contado'
            })

            setAlertMessage('No es posible vender al crédito a un cliente sin registrar.');
            
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        }
    }, [TYP_TO_SALE])

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
        }
    ];

    const handleInputChange = (e) => {
        setsaleInvoice({
            ...saleInvoice,
            AMOUNT: e.target.value
        })
    }

    const handleStateChange = (e) => {
        setsaleInvoice({
            ...saleInvoice,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setCambio((saleInvoice.TOT_SALE - saleInvoice.AMOUNT)*-1)
    }, [saleInvoice.AMOUNT])
    
    useEffect(() => {
        if(saleInvoice.AMOUNT<saleInvoice.TOT_SALE){
            setCambio(0)
          }
      }, [saleInvoice.AMOUNT])

    useEffect(() => {
        setsaleInvoice({
            ...saleInvoice,
            AMOUNT: ''
        })
    },[TYP_TO_SALE])

    const onSubmit = () => {
        if(COD_TYP_PAY == '1' && TYP_TO_SALE === 'Contado'){
            if(!saleInvoice.AMOUNT){
                setAlertMessage('Debe de introducir la cantidad recibida.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }

            if(saleInvoice.AMOUNT < 0){
                setAlertMessage('La cantidad recibida debe ser mayor a cero.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }

            if(saleInvoice.AMOUNT < TOT_SALE){
                setAlertMessage('Si la venta es al contado, la cantidad recibida no debe ser menor al total de la venta.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }
        }

        if(TYP_TO_SALE === 'Crédito'){
            if(!saleInvoice.AMOUNT){
                setAlertMessage('Debe de introducir la cantidad recibida.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }

            if(saleInvoice.AMOUNT < 0){
                setAlertMessage('La cantidad recibida debe ser cero o mayor a cero.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }

            if(saleInvoice.AMOUNT > TOT_SALE){
            setAlertMessage('La cantidad recibida no puede ser mayor al total de la venta.');
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
            return;
            }

            if(!saleInvoice.DAT_LIMIT){
                setAlertMessage('Debe introducir una fecha límite de cobro.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }

            if(!saleInvoice.DESCRIPTION){
                setAlertMessage('Debe introducir una descripción para la cuentra por cobrar.');
                setTimeout(() => {
                    setAlertMessage('');
                }, 3000);
                return;
            }
        }

        axios.post('/sale-invoice', saleInvoice, token())
            .then(res => {
                sendDetail()
            })
            .catch(res => {
                setSaleMessage({
                    message: 'Algo falló al intentar procesar la venta',
                    ok: false
                });
            })
    }

    const sendDetail = () => {
        axios.post('/sale-detail', productListSale, token())
            .then(res => {
                setSaleMessage({
                    message: 'Venta procesada con éxito.',
                    ok: true
                });
            })
    }

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
                value={moment().format('DD-MM-YYYY hh:mm')}
                />
            </div>
        </div>
        <hr className='mt-0'/>
        <div className="row">
            <p className='ml-4 mb-0 text-gray-700'>Detalle de venta</p>
        </div>
        <DataTable
            columns={columns}
            data={productListSale}
            persistTableHead
            striped
        />
        <div className="row mt-3">
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
        <hr />
        <p className='ml-2 mb-0 text-gray-700'>Información de cobro</p>
        <div className="row mt-2">
            <div className="col-3 ml-2">
                <label className="form-label">Tipo de venta</label>
                <select onChange={handleStateChange}  name='TYP_TO_SALE' value={TYP_TO_SALE} className="form-control" required>
                    <option value="Contado">Contado</option>
                    <option value="Crédito">Crédito</option>
                </select>
            </div>
            <div className="col-3">
                <label className="form-label">Método de pago</label>
                <select onChange={handleStateChange} name='COD_TYP_PAY' defaultValue={'Contado'} className="form-control" required>
                    <option value="1">Efectivo</option>
                    <option value="2">Tarjeta</option>
                    <option value="3">Transferencia</option>
                </select>
            </div>
            {
                COD_TYP_PAY == '1' || TYP_TO_SALE === 'Crédito'
                ?
                <div className="col-3">
                    <label className="form-label">Cantidad recibida</label>
                    <input min={1} max={TOT_SALE} value={saleInvoice.AMOUNT} autoFocus onChange={handleInputChange} className='form-control' type="number" />
                </div>
                :
                null
            }
            {/* <div className="col-2">
                <label className="form-label">Cambio</label>
                <input value={`L. ${cambio.toFixed(2)}`} className='form-control' type="text" disabled/>
            </div> */}
        </div>
        {
            TYP_TO_SALE === 'Crédito'
            ?
            <div className="row mt-3">
                <div className="col-4 ml-1">
                    <label className="form-label">Fecha limite de cobro al crédito</label>
                    <input min={moment().format('YYYY-MM-DD')} onChange={handleStateChange} className='form-control' type="date" name='DAT_LIMIT'/>
                </div>
                <div className="col-6 ml-1">
                    <label className="form-label">Descripción de la cuenta por cobrar</label>
                    <textarea onChange={handleStateChange} className='form-control' rows={3} type="text" name='DESCRIPTION'/>
                </div>
            </div>
            :
            null
        }
    </div>
    <div className="modal-footer">
        <button onClick={() => setCurrentPage(2)} className="btn btn-dark">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {
            (TYP_TO_SALE === 'Contado' && COD_TYP_PAY == 1 && (saleInvoice.AMOUNT < TOT_SALE || !saleInvoice.AMOUNT  || saleInvoice.AMOUNT < 0)) || (TYP_TO_SALE === 'Crédito' && (!saleInvoice.DAT_LIMIT || saleInvoice.AMOUNT < 0 || saleInvoice.AMOUNT > TOT_SALE || !saleInvoice.DESCRIPTION))
            ?
            <button onClick={() => onSubmit()} className="btn btn-primary">
                <i className="fa-solid fa-circle-check mr-2"></i>Finalizar venta
            </button>
            :
            <button onClick={() => onSubmit()} className="btn btn-primary" data-toggle="modal" data-target="#saleSuccess">
                <i className="fa-solid fa-circle-check mr-2"></i>Finalizar venta
            </button>
        }
        <SaleSuccess 
            saleMessage={saleMessage}
            setsaleInvoice={setsaleInvoice}
            setCurrentPage={setCurrentPage}
            setproductListSale={setproductListSale}
            cambio={cambio}
            saleInvoice={saleInvoice}
            productListSale={productListSale}
        />
    </div>
    {alertMessage ? <AlertError message={alertMessage}/> : null}
  </div>
  )
}
