import React, { useState } from 'react'
import {PDFDownloadLink} from '@react-pdf/renderer';
import SaleInvoicePDF from '../SaleInvoicePDF';
import Spinner from '../Spinner';

const SaleSuccess = ({saleMessage, setsaleInvoice, setCurrentPage, setproductListSale, cambio, saleInvoice, productListSale, correlativeInvoice}) => {
    const {message, ok} = saleMessage;
    const onCheck = () => {
        if(ok){
            setsaleInvoice({
                COD_CLIENT: 1,
                NAM_CLIENT: 'CF',
                COD_USER: '', 
                NAM_USER: '',
                SUBTOTAL: 0,
                TOT_DISCOUNT: 0,
                TOT_ISV: 0,
                TOT_SALE: 0,
                TYP_TO_SALE: 'Contado',
                COD_TYP_PAY: 1,
                RTN: 0
            })
            
            setproductListSale([])
            setCurrentPage(1)
        }
    }

  return (
        <div className="modal fade" id="saleSuccess" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-success">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {
                    message
                    ?
                    ok
                        ?
                            <h3 className="alert alert-success text-center mx-0" role="alert">
                                <strong><i className="fa-solid fa-circle-check mr-3"></i></strong>{message}
                            </h3>
                        :
                            <h3 className="alert alert-danger text-center mx-0" role="alert">
                                    <strong><i className="fa-solid fa-circle-check mr-3"></i></strong>{message}
                            </h3>
                    :
                    <Spinner />
                }
                {
                    message && ok
                    ?
                        saleInvoice.TYP_TO_SALE === 'Contado' && saleInvoice.COD_TYP_PAY == '1'
                        ?
                        <div className="row">
                            <div className="col-6 text-right">
                                <h1>Cambio</h1>
                            </div>
                            <div className="col-3">
                                <input value={`L. ${cambio.toLocaleString('es-MX')}`} className='form-control form-control-lg' type="text" disabled/>
                            </div>
                        </div>
                        :
                        null
                    :
                    null
                }
            </div>
                <div className="modal-footer">
                    <button onClick={() => onCheck()} type="button" className="btn btn-primary" data-dismiss="modal">Listo</button>
                    {message ? ok ? <PDFDownloadLink document={<SaleInvoicePDF correlativeInvoice={correlativeInvoice} saleInvoice={saleInvoice} productListSale={productListSale}/>} fileName="factura.pdf">{({ blob, url, loading, error }) => <button type="button" className="btn btn-danger">Descargar factura</button>}</PDFDownloadLink> : null  : null}
                </div>
            </div>
        </div>
        </div>
  )
}

export default SaleSuccess