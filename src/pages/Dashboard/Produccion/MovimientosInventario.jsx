import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';


import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'


import token from '../../../../src/helpers/getToken';

const MovimientosInventario = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState('false');
    const [rowCOD, setRowCOD] = useState(null)
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_TRANSACTIONS,
            sortable: true,
        },
         {
            name: 'CODIGO PRODUCTO',
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
         {
            name: 'TIPO DE TRANSACCION',
            selector: row => row.TYP_TRANSACTION,
            sortable: true,
        },
        {
            name: 'CANTIDAD PRODUCTOS',
            selector: row => row.CANT,
            sortable: true,
        },
        {
            name: 'NUMERO DE LOTE',
            selector: row => row.NUM_LOT,
            sortable: true,
        },
        {
            name: 'FECHA MERMA',
            selector: row => row.DAT_TRANSACTION,
            sortable: true,
        },
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
        axios.get('/inventoryTransactions', token())
            .then(res => {
                const {data} = res;
                console.log(data)
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })

    },[sendRequest]);


    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                   Movimientos Inventario
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                
                    </div>
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
                </div>
            </div> 
    )
}

export default MovimientosInventario;