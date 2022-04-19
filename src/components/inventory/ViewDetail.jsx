import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import {paginationComponentOptions} from '../../helpers/datatablesOptions'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const ViewDetail = ({rowCOD}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(rowCOD){
            axios.get(`/inventoryDetail/${rowCOD}`, token())
                .then(res => setRows(res.data))
        }
    }, [rowCOD])

    const columns = [
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'FECHA DE COMPRA',
            selector: row => row.DAT_PURCHASE,
            format: row => moment(row.DAT_PURCHASE).format('DD-MM-YYYY')
        },
        {
            name: 'FECHA DE EXPIRACIÓN',
            selector: row => row.DAT_EXP,
            format: row => moment(row.DAT_EXP).format('DD-MM-YYYY')
        },
        {
            name: 'NÚMERO DE LOTE',
            selector: row => row.NUM_LOT,
        },
        {
            name: 'ESTADO',
            selector: row => row.NAM_STATUS,
        },
        {
            name: '# ORDEN',
            selector: row => row.COD_ORDER,
            format: row => row.COD_ORDER === null ? ('Sin orden relacionada') : (row.COD_ORDER)
        },
    ];

  return (
    <DataTable
        columns={columns}
        data={rows}
        responsive
        pagination
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        striped
        persistTableHead 
    />
  )
}

export default ViewDetail