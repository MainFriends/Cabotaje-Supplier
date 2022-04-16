import React, {useState, useEffect} from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment'

const SaleInformation = ({user, setUser, client, setClient, setCurrentPage}) => {

  useEffect(() => {
    if(user.code){
      axios.get(`/user/${user.code}`, token())
        .then(res => {
          const {FIRST_NAME, LAST_NAME} = res.data[0];
          setUser({
            ...user,
            name: `${FIRST_NAME} ${LAST_NAME}`
          })
        })
        .catch(err => {
          setUser({
            ...user,
            name: `Usuario no encontrado`
          })
        })
    }
  }, [user.code])

  const handleUser = ({target}) => {
    setUser({
      ...user,
      code: target.value
    })
  }
  
  const handleClient = ({target}) => {
    setClient({
      ...client,
      [target.name]: target.value
    })
  }

  return (
    <div className="card text-dark card-facturar shadow">
      <div className="card-header">Información</div>
      <div className="card-body p-3">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <label className="mt-1">
                  <i className="mr-1 fa-solid fa-hashtag"></i> Factura
                </label>
              </div>
              <div className="col-6">
                <input
                  className="form-control form-control-sm"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <label className="mt-1">
                  <i className="mr-1 fa-solid fa-user"></i> Usuario
                </label>
              </div>
              <div className="col-3">
                <input
                  className="form-control form-control form-control-sm"
                  type="number"
                  onChange={handleUser}
                  value={user.code}
                  name='code'
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control form-control form-control-sm"
                  type="text"
                  disabled
                  value={user.name}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <label className="mt-1">
                <i className="mr-1 fa-solid fa-calendar-days"></i> Fecha
                </label>
              </div>
              <div className="col-4">
                <input
                  className="form-control form-control form-control-sm"
                  type="text"
                  disabled
                  value={moment().format('DD-MM-YYYY')}
                />
              </div>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
        <hr />
        <div className="row">
          <div className="col-4 text-right">
            <label className="mt-2">Cliente</label>
          </div>
          <div className="col-4">
            <input 
            onChange={handleClient}
            className="form-control form-control" 
            type="text" 
            value={client.name}
            name='name'
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 text-right">
            <label className="mt-2">RTN</label>
          </div>
          <div className="col-4">
            <input 
            onChange={handleClient}
            className="form-control form-control" 
            type="number" 
            value={client.RTN}
            name='RTN'
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={() => setCurrentPage(2)} className="btn btn-dark">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SaleInformation;
