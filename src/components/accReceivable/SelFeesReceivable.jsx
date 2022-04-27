import DataTable from 'react-data-table-component';

import { useEffect, useState } from 'react';

import {paginationComponentOptions} from '../../helpers/datatablesOptions';
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from 'moment';


const CuotasCobrar = ({rowCOD, sendRequest, setSendRequest}) => {
    const [rowsCuotas, setRowsCuotas] = useState([]);

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_FEES,
        },
        {
            name: 'MONTO',
            selector: row => row.AMOUNT,
            format: row => `L ${row.AMOUNT.toFixed(2)}`
        },
        {
            name: 'FECHA',
            selector: row => row.DAT_PAY,
            format: row => moment(row.DAT_PAY).format('DD-MM-YYYY')
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
                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_FEES)}><i className="fa-solid fa-trash"></i></button>
                </>
            )
        },
    ];
    
    useEffect(() => {
        if(rowCOD){
            axios.get(`/fees-receivable/${rowCOD}`, token())
            .then(res => setRowsCuotas(res.data))
            setSendRequest(false);
        }
    }, [rowCOD, sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/fees-receivable/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    const closeModal = () => {
        document.querySelector('#idCloseSelCuotas').click();
    }

  return (
    <>  
    <div className="row">
            <div className="col-12 text-right">
                <button onClick={() => closeModal()} className='btn btn-sm btn-success' data-toggle="modal" data-target='#addCuota'>+</button>
            </div>
    </div>
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
        <div className="modal-footer">
                <button type="button" id='idCloseSelCuotas' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
        </div>
    </>
  )
}

export default CuotasCobrar