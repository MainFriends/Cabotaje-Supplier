import React, { useState, useEffect } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const AddPermissions = ({rowCOD, setSendRequestPermissions, setMessageError}) => {
    const [formDataPermissions, setFormDataPermissions] = useState({
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

        axios.post(`/permissions/${rowCOD}`, formDataPermissions, token())
            .then(res => {
                e.target.reset();
                document.querySelector('#closeModalPermissions').click();
                setSendRequestPermissions(true);
                setFormDataPermissions({
                    COD_MODULE: '',
                    COD_TABLE: '',
                    QUE: 0,
                    INS: 0,
                    UPD: 0,
                    DEL: 0
                });
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
        if(formDataPermissions.COD_MODULE){
            axios.get(`/tables/${formDataPermissions.COD_MODULE}`, token())
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
    }, [formDataPermissions.COD_MODULE])


  return (
    <form onSubmit={handleSubmit} action='#'>
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
                formDataPermissions.COD_MODULE !== ""
                ?
                <div className="col-4">
                    <select onChange={handleInputChange} defaultValue='' className="custom-select" name='COD_TABLE' required>
                        <option value='' disabled>Seleccionar...</option>
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
                formDataPermissions.COD_TABLE !== ''
                ?
                <div className="col-4">
                    <div className="form-group form-check">
                        <input onChange={handleInputChange} value={1} type="checkbox" className="form-check-input" name='QUE' id="QUE"/>
                        <label className="form-check-label" htmlFor="QUE"><i className="fa-solid fa-eye"></i> Visualizar</label>
                    </div>
                    {
                        formDataPermissions.COD_MODULE !== "1" && formDataPermissions.COD_MODULE !== "9"
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
            <button type="button" id='closeModalPermissions' data-toggle="modal" data-target='#viewModules' className="btn btn-primary" data-dismiss="modal">Atrás</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
  )
}

export default AddPermissions