import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddRoleForm = ({setSendRequest, setMessageError}) => {
    const [formData, setFormData] = useState({
        NAM_ROLE: '',
        DES_ROLE: '',
        COD_MODULE: '',
        COD_TABLE: '',
        QUE: 0,
        INS: 0,
        UPD: 0,
        DEL: 0
    });

    const [modules, setModules] = useState([]);
    const [tables, setTables] = useState([]);

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

    useEffect(() => {
        axios.get('/modules', token())
            .then(res => {
                setModules(res.data)
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }, [])

    useEffect(() => {
        if(formData.COD_MODULE){
            setFormData({
                ...formData,
                COD_TABLE: ''
            })
            axios.get(`/tables/${formData.COD_MODULE}`, token())
            .then(res => {
                setTables(res.data)
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)
    
                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
        }
    }, [formData.COD_MODULE])

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
                <textarea onChange={handleInputChange} className='form-control' rows={2} name='DES_ROLE' type="text"  maxLength={50}  wrap="hard"  required/>
            </div>
        </div>
        <h6 className='text-muted mb-4'>Otorgar permisos</h6>
        <div className="row mb-3">
            <div className="col-4">
                <select onChange={handleInputChange} defaultValue='' className="custom-select" name='COD_MODULE' required>
                    <option value='' disabled>Seleccionar...</option>
                    {
                        modules.map(modulo => {
                            return <option key={modulo.COD_MODULE} value={modulo.COD_MODULE}>{modulo.NAM_MODULE}</option>
                        })
                    }
                </select>
            </div>
            {
                formData.COD_MODULE !== ""
                ?
                <div className="col-4">
                    <select onChange={handleInputChange} defaultValue='' className="custom-select" name='COD_TABLE' required>
                        <option value=''>Seleccionar...</option>
                        {
                            tables.map(table => {
                                return <option key={table.COD_TABLE} value={table.COD_TABLE}>{table.NAM_TABLE}</option>
                            })
                        }
                    </select>
                </div>
                : 
                null
            }
            {
                formData.COD_TABLE !== ''
                ?
                <div className="col-4">
                    <div className="form-group form-check">
                        <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='QUE' id="QUE"/>
                        <label className="form-check-label" htmlFor="QUE"><i className="fa-solid fa-eye"></i> Visualizar</label>
                    </div>
                    {
                        formData.COD_TABLE != 10 &&
                        formData.COD_TABLE != 20 &&
                        formData.COD_TABLE != 1 &&
                        formData.COD_TABLE != 3 &&
                        formData.COD_TABLE != 21 &&
                        formData.COD_TABLE != 16
                        ?
                        <>
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
                        </>
                        :
                        null
                    }
                </div>
                :
                null
            }
        </div>

        <div className="modal-footer">
            <button type="button" id='idCloseAddRole' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
  )
}

export default AddRoleForm