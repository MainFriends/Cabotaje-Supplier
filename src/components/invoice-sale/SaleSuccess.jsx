import React, { useState, useEffect } from 'react'
import Spinner from '../Spinner';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/js/logo';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const dowlandPdfReceivable = (productListSale, saleInvoice, correlativeInvoice, companyData) => {
    const doc = new jsPDF();   
    const image = logo
    doc.addImage(image, 'PNG', 10, 9,20,30,'Cabotaje');
  
    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`;

    doc.setFontSize(10)
    doc.text(`Factura proforma`, 170, 7)
    doc.setFontSize(22)
    doc.text(`${companyData.COMPANY_NAM.toUpperCase()}`,35,15);
    doc.setFontSize(10)
    doc.text(`Direccion: ${companyData.COMPANY_ADDRESS}`, 35,25);
    doc.text(`Teléfono: ${companyData.COMPANY_PHONE}`, 35,32);
    doc.text(`Correo: ${companyData.COMPANY_EMAIL}`, 35, 39);
    doc.text(`RTN: ${companyData.COMPANY_RTN}`, 35, 46);
    doc.setFontSize(10)
    doc.text(`Nombre: ${saleInvoice.NAM_CLIENT}`, 15, 58);
    doc.text(`RTN: ${saleInvoice.RTN}`,15, 65);
    doc.text(`Fecha: ${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,143, 58)
    doc.text(`N° de factura: ${correlativeInvoice}`, 143, 65);
    doc.setFontSize(12)
    doc.text(`SUBTOTAL:`, 150, 250);
    doc.text(`TOTAL ISV:`, 151, 260);
    doc.text(`TOTAL A PAGAR:`, 139,270)
    doc.text(`_________________________________________________________________________________`,103, 240, {align: 'center'} )
    doc.text(`L. ${saleInvoice.SUBTOTAL.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,200,250, {align: 'right'})
    doc.text(`L.${saleInvoice.TOT_ISV.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,200,260, {align: 'right'})
    doc.text(`L. ${saleInvoice.TOT_SALE.toLocaleString('es-MX', {minimumFractionDigits: 2})}`, 200, 270, {align: 'right'});
    doc.setFontSize(8)
    doc.text(`${companyData.COMPANY_LOCATION}`, 15, 270)
    doc.text(`Pago al ${saleInvoice.TYP_TO_SALE.toLowerCase()}`,15,266);
    
    

    

    
    const row = productListSale.map(fila => {
        return [
            fila.NAM_PRODUCT,
            fila.DES_PRODUCT,
            fila.CANT_PRODUCTS,
            `L. ${fila.PRICE.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            `L. ${fila.ISV.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            `L. ${fila.TOTAL.toLocaleString('es-MX', {minimumFractionDigits: 2})}`
        ]
    })  

    doc.autoTable({
        head: [['PRODUCTO', 'DESCRIPCIÓN', 'CANTIDAD', 'PRECIO', 'ISV', 'TOTAL']],
        body: row.sort(),
        startY: 70,
        columnStyles: {
            3: {
                halign: 'right'
            },
            4: {
                halign: 'right'
            },
            5: {
                halign: 'right'
            }
        } 
    })
  
    doc.save('Factura.pdf')
  }

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
                RTN: ''
            })
            
            setproductListSale([])
            setCurrentPage(1)
        }
    }

    const [companyData, setCompanyData] = useState({
        COMPANY_NAM: '',
        COMPANY_ADDRESS: '',
        COMPANY_EMAIL: '',
        COMPANY_RTN: '',
        COMPANY_PHONE: '',
        COMPANY_LOCATION: '',
        COMPANY_FACEBOOK: '',
        COMPANY_INSTAGRAM: '',
        COMPANY_WHATSAPP: '',
        USER_LAST_UPDATE: '',
    });

    useEffect(() => {
        axios.get('/company-information', token())
        .then(res => setCompanyData(res.data[0]))
    }, [])

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
                                <input value={`L. ${cambio.toLocaleString('es-MX', {minimumFractionDigits: 2})}`} className='form-control form-control-lg' type="text" disabled/>
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
                    {message ? ok ? <button onClick={() => dowlandPdfReceivable(productListSale, saleInvoice, correlativeInvoice,companyData)} type="button" className="btn btn-danger">Descargar factura</button> : null  : null}
                </div>
            </div>
        </div>
        </div>
  )
}

export default SaleSuccess