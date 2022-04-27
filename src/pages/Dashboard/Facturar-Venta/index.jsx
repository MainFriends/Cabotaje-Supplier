import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductsList from '../../../components/invoice-sale/ProductsList';
import SaleInformation from '../../../components/invoice-sale/SaleInformation'

const Facturar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [correlativeInvoice, setCorrelativeInvoice] = useState('');
  const [saleInvoice, setsaleInvoice] = useState({
    COD_CLIENT: '',
    NAM_CLIENT: 'CF',
    COD_USER: '', 
    NAM_USER: '',
    SUBTOTAL: 0,
    TOT_DISCOUNT: 0,
    TOT_ISV: 0,
    TOT_SALE: 0,
    TYP_TO_SALE: '',
    COD_TYP_PAY: '',
    RTN: 0
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {currentPage === 1 && 
          <SaleInformation 
          setsaleInvoice={setsaleInvoice} 
          saleInvoice={saleInvoice}
          setCurrentPage={setCurrentPage}
          setCorrelativeInvoice={setCorrelativeInvoice}
          correlativeInvoice={correlativeInvoice}
          />}
          {currentPage === 2 && 
          <ProductsList 
          saleInvoice={saleInvoice}
          setsaleInvoice={setsaleInvoice}
          setCurrentPage={setCurrentPage}
          correlativeInvoice={correlativeInvoice}
          />}
        </div>
        <div className="col-12 text-right">
            <Link to='/dashboard' className='btn btn-danger'><i className="mr-2 fa-solid fa-circle-chevron-left"></i>Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Facturar