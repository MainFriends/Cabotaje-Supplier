import DataTable from 'react-data-table-component';
import {paginationComponentOptions} from '../../helpers/datatablesOptions';

import { useEffect } from 'react';

import axios from '../../config/axios';
import token from '../../helpers/getToken';

const CuotaCobrar = ({rowCOD}) => {

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_FEES,
        },
        {
            name: 'FACTURA',
            selector: row => row.COD_ACC_RECEIVABLE,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    useEffect(() => {
        // GET
        axios.get(`/fees-receivable/${rowCOD}`, token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
            })
    })

  return (
    <DataTable
        columns={columns}
        data={data}
        responsive
        pagination
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        striped
        persistTableHead 
    />
  )
}

export default CuotaCobrar