import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';

const Rebajas = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_DISCOUNT,
            sortable: true,
        },
        {
            name: 'FACTURA',
            selector: row => row.COD_INVOICE,
            sortable: true,
        },
        {
            name: 'CLIENTE',
            selector: row => row.CLIENT_NAME,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DESCRIPTION,
            sortable: true,
        },
        {
            name: 'MONTO',
            selector: row => row.AMOUNT,
            sortable: true,
            format: row => `L ${row.AMOUNT.toFixed(2)}`
        },
        {
            name: 'TIPO DE PAGO',
            selector: row => row.NAM_TYPE_PAY,
            sortable: true,
        },
        {
            name: 'USUARIO',
            selector: row => row.USER_NAME,
            sortable: true,
            allowOverflow: true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-primary me-1' data-toggle="modal" data-target='#'><i className="fa-solid fa-eye"></i></button>
            </>
        }
    ];

    //datos
    const filteredItems = rows.filter(item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

    //Componente del buscador
    const subHeaderComponentMemo = useMemo(() => {
    	return (
        		<FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} />
        	);
    }, [filterText]);

    useEffect(() => {
        //PETICION GET
        axios.get('/sales-discounts', token())
           .then(res => {
               const {data} = res;
               setRows(data);
               setLoading(false);
           })
    },[]);

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Rebajas
                </div>
                <div className="card-body">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        responsive
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        highlightOnHover
                        striped
                        persistTableHead 
                    />

                    <Modal 
                        idModal='idModal'
                        title='Titulo'
                        messageError={messageError}
                    />
                </div>
            </div> 
    )
}

export default Rebajas;