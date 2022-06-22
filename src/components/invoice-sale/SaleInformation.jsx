import React, {useState, useEffect} from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment'
import AlertError from "../AlertError";

const SaleInformation = ({setsaleInvoice, saleInvoice, setCurrentPage, setCorrelativeInvoice, correlativeInvoice, currentPage }) => {

  const [errorMessage, setErrorMessage] = useState('');

  const {RTN} = saleInvoice;

  useEffect(() => {
    if(saleInvoice.COD_USER){
      axios.get(`/user/${saleInvoice.COD_USER}`, token())
        .then(res => {
          const {FIRST_NAME, LAST_NAME} = res.data[0];
          setsaleInvoice({
            ...saleInvoice,
            NAM_USER: `${FIRST_NAME} ${LAST_NAME}`
          })
        })
        .catch(err => {
          setsaleInvoice({
            ...saleInvoice,
            NAM_USER: `Usuario no encontrado`
          })
        })
    }
  }, [saleInvoice.COD_USER])

  useEffect(() => {
    axios.get('/correlative', token())
      .then(res => {
        const {CORRELATIVO} = res.data[0];
        if(CORRELATIVO){
          setCorrelativeInvoice(CORRELATIVO + 1)
        }else{
          setCorrelativeInvoice(1)
        }
      })
  }, [currentPage])

  useEffect(() => {
    if(RTN.length === 14){
      axios.get(`/find-client/${RTN}`, token())
        .then(res => {
          const {COD_CLIENT, FIRST_NAME, LAST_NAME} = res.data[0];
          setsaleInvoice({
            ...saleInvoice,
            COD_CLIENT,
            NAM_CLIENT: `${FIRST_NAME} ${LAST_NAME}`
          })
        })
        .catch(err => {
          setsaleInvoice({
            ...saleInvoice,
            NAM_CLIENT: `Cliente no encontrado`
          })
        })
    }
    
    if(RTN.length === 0){
      setsaleInvoice({
        ...saleInvoice,
        COD_CLIENT: 1,
        NAM_CLIENT: 'CF'
      })
    }
  }, [RTN])


  const handleInputChange = ({target}) => {
    setsaleInvoice({
      ...saleInvoice,
      [target.name]: target.value
    })
  }

  const handleClick = () => {
    if(saleInvoice.NAM_USER === ''){
      setErrorMessage('Ingrese su código de usuario.');

      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      
      return;
    }

    if(saleInvoice.NAM_USER === `Usuario no encontrado`){
      setErrorMessage('Ingrese un código de usuario válido.');

      setTimeout(() => {
        setErrorMessage('')
      }, 3000);

      return;
    }

    if(saleInvoice.NAM_CLIENT === `Cliente no encontrado`){
      setErrorMessage('Ingrese un RTN válido.');

      setTimeout(() => {
        setErrorMessage('')
      }, 3000);

      return;
    }

    if(RTN.length >= 1 && RTN.length < 14){
      setErrorMessage('Ingrese un RTN Válido.');

      setTimeout(() => {
        setErrorMessage('')
      }, 3000);

      return;
    }

    setCurrentPage(2)
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
                  value={correlativeInvoice}
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
                  onChange={handleInputChange}
                  value={saleInvoice.COD_USER}
                  autoFocus
                  name='COD_USER'
                  min={1}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control form-control form-control-sm"
                  type="text"
                  disabled
                  value={saleInvoice.NAM_USER}
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
            onChange={handleInputChange}
            className="form-control form-control" 
            type="text" 
            value={saleInvoice.NAM_CLIENT}
            name='NAM_CLIENT'
            disabled
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 text-right">
            <label className="mt-2">RTN</label>
          </div>
          <div className="col-4">
            <input 
            onChange={handleInputChange}
            className="form-control form-control" 
            type="number" 
            value={saleInvoice.RTN}
            name='RTN'
            pattern="^[0][0-9]{13}" 
            minLength={14}
            maxLength={14}
            />
            <small className="form-text text-muted">En caso de tener registrado al cliente, ingrese su RTN para vincularlo a la venta.</small>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={() => handleClick()} className="btn btn-dark">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      {errorMessage ? <AlertError message={errorMessage}/> : null}
    </div>
  );
};

export default SaleInformation;
