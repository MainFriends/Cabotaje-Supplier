import {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

import {paginationComponentOptions} from '../../helpers/datatablesOptions'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const ViewPermissions = ({rowCOD, sendRequestPermissions, setSendRequestPermissions}) => {
    const [rowsData, setRowsData] = useState([]);
    const [permissions, setPermissions] = useState({});

    const columns = [
        {
            name: 'MÓDULO',
            selector: row => row.COD_MODULE,
            sortable: true,
            format: row => (<h1 className="badge badge-dark text-module">{row.NAM_MODULE.toUpperCase()}</h1>)
        },
        {
            name: 'ITEM',
            selector: row => row.NAM_TABLE,
            sortable: true,
        },
        {
            name: 'VISUALIZAR',
            selector: row => row.QUE,
            center: true,
            format: row => (row.QUE ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-ban"></i>)
        },
        {
            name: 'AGREGAR',
            selector: row => row.INS,
            center: true,
            format: row => (row.INS ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-ban"></i>)
        },
        {
            name: 'EDITAR',
            selector: row => row.UPD,
            center: true,
            format: row => (row.UPD ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-ban"></i>)
        },
        {
            name: 'BORRAR',
            center: true,
            selector: row => row.DEL,
            format: row => (row.DEL ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-ban"></i>)
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button onClick={() => handleDelete(row.COD_PERMISSION)} className={'btn btn-sm btn-danger ' + (row.COD_ROLE === 1 && 'disabled') + (!permissions.DEL ? ' disabled' : null)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    useEffect(() => {
        if(rowCOD?.COD_ROLE){
            axios.get(`/permissions/${rowCOD.COD_ROLE}`, token())
            .then(res => {
                setRowsData(res.data);
                console.log(res.data)
                setSendRequestPermissions(false)
            })
        }
    }, [rowCOD?.COD_ROLE, sendRequestPermissions])

    const handleDelete = (cod) => {
        axios.delete(`/permissions/${cod}`, token())
            .then(res => {
                setSendRequestPermissions(true)
            })
    }

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 8 && row.COD_TABLE === 19)
            setPermissions(result)
        })
    },[])

  return (
      <>
      <div className="row">
          <div className="col-12 text-right">
              {
                rowCOD?.COD_ROLE > 2
                ?
                <button data-dismiss="modal" className={'btn btn-sm btn-success ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addPermissions'><i className="fa-solid fa-plus"></i> Agregar permisos</button>
                :
                null
              }
          </div>
      </div>
        <DataTable
            columns={columns}
            data={rowsData}
            responsive
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            striped
            persistTableHead 
        />
      </>
  )
}

export default ViewPermissions