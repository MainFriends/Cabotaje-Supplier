import React, { useState } from 'react'
import { PaymentMethod } from '../../../components/invoice-sale/PaymentMethod';
import ProductsList from '../../../components/invoice-sale/ProductsList';
import SaleInformation from '../../../components/invoice-sale/SaleInformation'

const Facturar = () => {
  document.title = "Cabotaje Supplier - Facturar"

  const [currentPage, setCurrentPage] = useState(1);
  const [correlativeInvoice, setCorrelativeInvoice] = useState('');
  const [productListSale, setproductListSale] = useState([]);
  const [saleInvoice, setsaleInvoice] = useState({
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {
            currentPage === 1 && 
            <SaleInformation 
              setsaleInvoice={setsaleInvoice} 
              saleInvoice={saleInvoice}
              setCurrentPage={setCurrentPage}
              setCorrelativeInvoice={setCorrelativeInvoice}
              correlativeInvoice={correlativeInvoice}
              currentPage={currentPage}
            />
          }
          {
          currentPage === 2 && 
            <ProductsList 
              saleInvoice={saleInvoice}
              setsaleInvoice={setsaleInvoice}
              setCurrentPage={setCurrentPage}
              correlativeInvoice={correlativeInvoice}
              productListSale={productListSale}
              setproductListSale={setproductListSale}
            />
          }
          {
            currentPage === 3 &&
            <PaymentMethod 
              saleInvoice={saleInvoice}
              setsaleInvoice={setsaleInvoice}
              setCurrentPage={setCurrentPage}
              correlativeInvoice={correlativeInvoice}
              productListSale={productListSale}
              setproductListSale={setproductListSale}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Facturar