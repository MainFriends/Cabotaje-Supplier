import React, { useEffect, useState } from 'react'
import token from '../../helpers/getToken';
import axios from '../../config/axios';



const PurchaseCard = () => {
    const [dateRankSelected, setDateRankSelected] = useState('week');
    const [week, setWeek] = useState(0);
    const [month, setMonth] = useState(0);

    useEffect(() => {
      axios.get('/purchase-invoice-week', token())
        .then(({data}) => {
          const {TOTAL_COMPRAS} = data[0];
          if(TOTAL_COMPRAS){
            setWeek(TOTAL_COMPRAS)
          }
        })

        axios.get('/purchase-invoice-month', token())
        .then(({data}) => {
          const {TOTAL_COMPRAS} = data[0];
          if(TOTAL_COMPRAS){
            setMonth(TOTAL_COMPRAS)
          }
        })
    }, [])

    return (
        <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-danger shadow h-100 py-2">
          <div className="card-header p-0">
            <div className="row">
                <div className="col-8">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1 ml-2">
                    Compras {dateRankSelected === 'week' ? ('semanales') : ('mensuales')}
                  </div>
                </div>
                <div className="col-4 text-right">
                  <div className="dropdown no-arrow">
                      <a className="dropdown-toggle" href="#" role="button" id="salesRank"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="salesRank">
                          <div className="dropdown-header">Selecciona un rango:</div>
                          <a onClick={() => setDateRankSelected('week')} className="dropdown-item" href="#">Ultima semana</a>
                          <a onClick={() => setDateRankSelected('month')} className="dropdown-item" href="#">Ultimo mes</a>
                      </div>
                  </div>
                </div>
            </div>
          </div>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        
                        <h5 className="mb-0 font-weight-bold text-gray-800 ml-2">
                          {dateRankSelected === 'week' && `L. ${week.toFixed(2)}`}
                          {dateRankSelected === 'month' && `L. ${month.toFixed(2)}`}
                          </h5>
                    </div>
                    <div className="col-auto">
                      <i className="fa-solid fa-bag-shopping fa-2x mr-2 mt-2"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PurchaseCard
