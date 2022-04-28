import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../config/axios';
import token from '../../helpers/getToken';


const ViewDetail = ({rowCOD, sendRequest}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(rowCOD){
            axios.get(`/order-detail/${rowCOD}`,token())
            .then(res => setRows(res.data))
        }
    }, [rowCOD, sendRequest])

    const columns = [
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.DES_ORDER,
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
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