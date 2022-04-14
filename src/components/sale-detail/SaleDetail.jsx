import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {paginationComponentOptions} from '../../helpers/datatablesOptions'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const SaleDetail = ({rowCOD}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(rowCOD){
            axios.get(`/sale-detail/${rowCOD}`, token())
            .then(res => setRows(res.data))
        }

    }, [rowCOD])

    const columns = [
        {
            name: 'CÓDIGO DEL PRODUCTO',
            selector: row => row.COD_PRODUCT,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            allowOverflow: true
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'PRECIO',
            selector: row => row.PRICE,
            format: row => `L ${row.PRICE.toFixed(2)}`
        },
        {
            name: 'DESCUENTO',
            selector: row => row.DISCOUNT,
            format: row => `L ${row.DISCOUNT.toFixed(2)}`
        },
        {
            name: 'TOTAL',
            selector: row => row.TOTAL,
            format: row => `L ${row.TOTAL.toFixed(2)}`
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

export default SaleDetail