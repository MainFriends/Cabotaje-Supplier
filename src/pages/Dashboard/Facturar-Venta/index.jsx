import React from 'react'
import { Link } from 'react-router-dom'

const Facturar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card text-dark card-facturar shadow">
            <div className="card-header">
              Información
            </div>
            <div className="card-body p-3">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-3">
                      <label className='mt-1'><i className="mr-1 fa-solid fa-hashtag"></i> Factura</label>
                    </div>
                    <div className="col-6">
                      <input className="form-control form-control-sm" type="text" disabled/>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-3">
                      <label className='mt-1'><i className="mr-1 fa-solid fa-user"></i>Usuario</label>
                    </div>
                    <div className="col-3">
                      <input className="form-control form-control form-control-sm" type="number"/>
                    </div>
                    <div className="col-6">
                      <input className="form-control form-control form-control-sm" type="text" disabled/>
                    </div>
                  </div>
                </div>
                <div className="col-6">

                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-4 text-right">
                  <label className='mt-2'>Cliente</label>
                </div>
                <div className="col-4">
                  <input className="form-control form-control" type="text"/>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-4 text-right">
                  <label className='mt-2'>RTN</label>
                </div>
                <div className="col-4">
                  <input className="form-control form-control" type="number"/>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary"><i className="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
        <div className="col-12 text-right">
            <Link to='/dashboard' className='btn btn-danger'><i className="mr-2 fa-solid fa-circle-chevron-left"></i>Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default Facturar