import React, { useState } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddPermissions = ({rowCOD, setSendRequestPermissions, setMessageError}) => {
    const [formDataPermissions, setFormDataPermissions] = useState({
        COD_MODULE: '',
        QUE: 0,
        INS: 0,
        UPD: 0,
        DEL: 0
    });

    const handleInputChange = (e) => {
        if(e.target.name === 'INS' || e.target.name === 'QUE' || e.target.name === 'UPD' || e.target.name === 'DEL'){
            if(e.target.checked){
                setFormDataPermissions({
                    ...formDataPermissions,
                    [e.target.name]: e.target.value
                })
            }else{
                setFormDataPermissions({
                    ...formDataPermissions,
                    [e.target.name]: 0
                })
            }
        }else{
            setFormDataPermissions({
                ...formDataPermissions,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rowCOD)

        axios.post(`/permissions/${rowCOD}`, formDataPermissions, token())
            .then(res => {
                e.target.reset();
                document.querySelector('#closeModalPermissions').click();
                setSendRequestPermissions(true);
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }

  return (
    <form onSubmit={handleSubmit} action='#'>
        <div className="row">
            <div className="col-6">
            <select onChange={handleInputChange} defaultValue='' className="custom-select" name='COD_MODULE' required>
                    <option value='' disabled>Seleccionar...</option>
                    <option value="1">Módulo de ventas</option>
                    <option value="2">Módulo de compras</option>
                    <option value="3">Módulo de personas</option>
                    <option value="4">Módulo de producción</option>
                    <option value="5">Módulo de contabilidad</option>
                </select>
            </div>
            <div className="col-4 ml-3">
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='QUE' id="QUE"/>
                    <label className="form-check-label" htmlFor="QUE"><i className="fa-solid fa-eye"></i> Visualizar</label>
                </div>
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='INS' id="INS"/>
                    <label className="form-check-label" htmlFor="INS"><i className="fa-solid fa-square-plus"></i> Agregar</label>
                </div>
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='UPD' id="UPD"/>
                    <label className="form-check-label" htmlFor="UPD"><i className="fa-solid fa-pen-to-square"></i> Editar</label>
                </div>
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='DEL' id="DEL"/>
                    <label className="form-check-label" htmlFor="DEL"><i className="fa-solid fa-trash"></i> Borrar</label>
                </div>
            </div>
        </div>

        <div className="modal-footer">
            <button type="button" id='closeModalPermissions' data-toggle="modal" data-target='#viewModules' className="btn btn-primary" data-dismiss="modal">Atrás</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
  )
}

export default AddPermissions