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
            name: 'PRECIO DE VENTA',
            selector: row => row.NORMAL_UNIT_PRICE,
            sortable: true,
            format: row => `L ${row.NORMAL_UNIT_PRICE.toFixed(2)}`
        },
        {
            name: 'COSTO',
            selector: row => row.PURCHASE_PRICE,
            sortable: true,
            format: row => `L ${row.PURCHASE_PRICE.toFixed(2)}`
        },
        {
            name: 'CANTIDAD AL POR MAYOR',
            selector: row => row.WHOLESALE_CANT,
            format: row => row.WHOLESALE_CANT ? row.WHOLESALE_CANT : `No aplica`,
            sortable: true,
        },
        {
            name: 'PRECIO AL POR MAYOR',
            selector: row => row.WHOLESALE_PRICE,
            sortable: true,
            format: row => row.WHOLESALE_CANT ? `L ${row.WHOLESALE_PRICE.toFixed(2)}` : `No aplica`
        },
        {
            name: 'ISV',
            selector: row => row.ISV,
        },
        {
            name: 'CANTIDAD',
            sortable: true,
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'FECHA DE COMPRA',
            selector: row => row.DAT_PURCHASE,
            sortable: true,
            format: row => moment(row.DAT_PURCHASE).format('DD-MM-YYYY')
        },
        {
            id:'id',
            name: 'FECHA DE EXPIRACIÓN',
            sortable: true,
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
        defaultSortFieldId="id"
    />
  )
}

export default ViewDetail