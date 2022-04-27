import React, { useEffect, useState } from 'react'
import token from '../../helpers/getToken';
import axios from '../../config/axios';



const CardSalesDay = () => {
    const [salesDay, setSalesDay] = useState(0);

    useEffect(() => {
        axios.get('/sales-day', token())
        .then(({data}) => {
          const {SALES_DAY} = data[0];
          if(SALES_DAY){
            setSalesDay(SALES_DAY)
          }
        })
    }, [])

    return (
        <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-header p-0">
            <div className="row">
                <div className="col-8">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1 ml-2">
                    Ventas del dia
                  </div>
                </div>
                <div className="col-4 text-right">
                  <div className="dropdown no-arrow">
                      <a className="dropdown-toggle" href="#" role="button" id="salesRank"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                      </a>
                  </div>
                </div>
            </div>
          </div>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        
                        <h5 className="mb-0 font-weight-bold text-gray-800 ml-2">
                          {`L. ${salesDay.toFixed(2)}`}
                          </h5>
                    </div>
                    <div className="col-auto">
                    <i class="fa-solid fa-calendar-check fa-2x mr-2 mt-2"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CardSalesDay
