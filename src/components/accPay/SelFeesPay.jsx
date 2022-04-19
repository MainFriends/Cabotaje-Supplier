import DataTable from 'react-data-table-component';

import { useEffect, useState } from 'react';

import {paginationComponentOptions} from '../../helpers/datatablesOptions';
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from 'moment';

const CuotasCobrar = ({rowCOD}) => {
    const [rowsCuotas, setRowsCuotas] = useState([]);
    const [rowCODCuotas, setRowCODCuotas] = useState(null);

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_FEES,
        },
        {
            name: 'MONTO',
            selector: row => row.AMOUNT,
        },
        {
            name: 'FECHA',
            selector: row => row.DATE_PAY,
            format: row => moment(row.DATE_PAY).format('DD-MM-YYYY')
        },
        {
            name: 'METODO',
            selector: row => row.NAM_TYPE_PAY,
        },
        {
            name: 'ELIMINAR',
            button: true,
            cell: row => (
                <>
                    <button className='btn btn-sm btn-danger' onClick={() => setRowCODCuotas(row.COD_FEES)}><i className="fa-solid fa-trash"></i></button>
                </>
            )
        },
    ];
    
    useEffect(() => {
        console.log(rowCODCuotas)
    }, [rowCODCuotas])
    
    useEffect(() => {
        if(rowCOD){
            axios.get(`/fees-pay/${rowCOD}`, token())
           .then(res => setRowsCuotas(res.data))
        }
    }, [rowCOD])

  return (
    <DataTable
        columns={columns}
        data={rowsCuotas}
        responsive
        pagination
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        striped
        persistTableHead 
    />
  )
}

export default CuotasCobrar