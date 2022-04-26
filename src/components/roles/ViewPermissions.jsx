import {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

import {paginationComponentOptions} from '../../helpers/datatablesOptions'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const ViewPermissions = ({rowCOD, sendRequestPermissions, setSendRequestPermissions}) => {
    const [rowsData, setRowsData] = useState([]);

    const columns = [
        {
            name: 'MÓDULO',
            selector: row => row.NAM_MODULE,
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
                <button onClick={() => handleDelete(row.COD_PERMISSION)} className={'btn btn-sm btn-danger ' + (row.COD_ROLE === 1 && 'disabled')}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    useEffect(() => {
        if(rowCOD){
            axios.get(`/permissions/${rowCOD}`, token())
            .then(res => {
                setRowsData(res.data);
                setSendRequestPermissions(false)
            })
        }
    }, [rowCOD, sendRequestPermissions])

    const handleDelete = (cod) => {
        axios.delete(`/permissions/${cod}`, token())
            .then(res => {
                setSendRequestPermissions(true)
            })
    }

  return (
      <>
      <div className="row">
          <div className="col-12 text-right">
              <button data-dismiss="modal" className='btn btn-sm btn-success' data-toggle="modal" data-target='#addPermissions'><i className="fa-solid fa-plus"></i> Agregar permisos</button>
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