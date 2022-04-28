import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../config/axios';
import token from '../../helpers/getToken';


const ViewDetail = ({rowCOD, sendRequest}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(rowCOD){
            axios.get(`/purchase-detail/${rowCOD}`,token())
            .then(res => setRows(res.data))
        }
    }, [rowCOD, sendRequest])

    const columns = [
        {
            name: 'CÓDIGO',
            selector: row => row.COD_PRODUCT,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
        },
        {
            name: 'PRECIO',
            selector: row => row.PRICE,
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'TOTAL',
            selector: row => row.TOTAL,
        },
    ];

  return (
    <DataTable
        columns={columns}
        data={rows}
        responsive
        highlightOnHover
        striped
        persistTableHead 
    />
  )
}

export default ViewDetail