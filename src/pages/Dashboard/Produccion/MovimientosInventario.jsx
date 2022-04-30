import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';


import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import moment from 'moment';


import token from '../../../../src/helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo'; 

const MovimientosInventario = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState('false');
    const [rowCOD, setRowCOD] = useState(null)

    const dowlandPdf = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Movimientos - Cabotaje Supplier',50,30); 
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

        const row = rows.map(fila => {
            const fecha = fila.DAT_TRANSACTION
            return [
                fila.COD_PRODUCT,
                fila.NAM_PRODUCT,
                fila.TYP_TRANSACTION,
                fila.CANT,
                fila.NUM_LOT,
                moment(fecha).format('DD-MM-YYYY')
            ]
        })  
        doc.autoTable({
            head: [['#', 'Producto', 'Tip. de transaccion', 'Cant. productos', 'N. Lote', 'Fecha de merma']],
            body: row.sort(),
            startY: 45
        })

        doc.save('Movimientos de inventario - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
         {
            name: 'CODIGO PRODUCTO',
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
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
            format : row => moment(row.DAT_TRANSACTION).format('DD-MM-YYYY')
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
                        actions={<button onClick={() => dowlandPdf()} className='btn btn-danger btn-sm'><i class="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />
                </div>
            </div> 
    )
}

export default MovimientosInventario;