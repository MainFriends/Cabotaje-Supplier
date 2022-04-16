import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductsList from '../../../components/invoice-sale/ProductsList';
import SaleInformation from '../../../components/invoice-sale/SaleInformation'

const Facturar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({
    code: '',
    name: ''
  });
  const [client, setClient] = useState({
    name: 'CF',
    RTN: 0
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {currentPage === 1 && 
          <SaleInformation 
          user={user} 
          setUser={setUser} 
          client={client} 
          setClient={setClient} 
          setCurrentPage={setCurrentPage}
          />}
          {currentPage === 2 && 
          <ProductsList 
          user={user} 
          setUser={setUser} 
          client={client} 
          setClient={setClient} 
          setCurrentPage={setCurrentPage}
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