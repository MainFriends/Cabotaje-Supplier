import React, { useState } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddRoleForm = ({setSendRequest, setMessageError}) => {
    const [formData, setFormData] = useState({
        NAM_ROLE: '',
        DES_ROLE: '',
        COD_MODULE: '',
        QUE: 0,
        INS: 0,
        UPD: 0,
        DEL: 0
    });

    const handleInputChange = (e) => {
        if(e.target.name === 'INS' || e.target.name === 'QUE' || e.target.name === 'UPD' || e.target.name === 'DEL'){
            if(e.target.checked){
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                })
            }else{
                setFormData({
                    ...formData,
                    [e.target.name]: 0
                })
            }
        }else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/roles', formData, token())
            .then(res => {
                e.target.reset();
                document.querySelector('#idCloseAddRole').click();
                setSendRequest(true)
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
        <h6 className='text-muted mb-4'>Agregar nuevo rol</h6>
        <div className="row mb-4">
            <div className="col-md-5">
                <label className='form-label'>Nombre del rol</label>
                <input onChange={handleInputChange} className='form-control' name='NAM_ROLE' type="text" required/>
            </div>
            <div className="col-md-7">
                <label className='form-label'>Descripción del rol</label>
                <textarea onChange={handleInputChange} className='form-control' rows={2} name='DES_ROLE' type="text" required/>
            </div>
        </div>
        <h6 className='text-muted mb-4'>Otorgar permisos</h6>
        <div className="row">
            <div className="col-6">
                <select onChange={handleInputChange} class="custom-select" name='COD_MODULE' defaultValue={'default'} required>
                    <option value={'default'}>Seleccionar...</option>
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
                    <label class="form-check-label" for="QUE">Lectura</label>
                </div>
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='INS' id="INS"/>
                    <label class="form-check-label" for="INS">Insertar</label>
                </div>
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='UPD' id="UPD"/>
                    <label class="form-check-label" for="UPD">Actualizar</label>
                </div>
                <div className="form-group form-check">
                    <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='DEL' id="DEL"/>
                    <label class="form-check-label" for="DEL">Eliminar</label>
                </div>
            </div>
        </div>

        <div className="modal-footer">
            <button type="button" id='idCloseAddRole' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
  )
}

export default AddRoleForm