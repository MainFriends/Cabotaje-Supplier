import DataTable from 'react-data-table-component';
import moment from 'moment';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import { getInvoices } from '../../../services/sale-invoice';
import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import SaleDetail from '../../../components/sale-detail/SaleDetail';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const doc = new jsPDF()

const Facturas = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [pending, setPending] = useState(true);
    const [rowCOD, setRowCOD] = useState(null);

    useEffect(() => {
        if(rows){
            const row = rows.map(fila => [
                fila.COD_INVOICE,
                fila.CLIENT
            ])  
            doc.autoTable({
                head: [['FACTURA', 'CLIENTE']],
                body: row.sort()
            })
        }
    }, [rows])
    
    //definir las columnas
    const columns = [
        {
            name: '# FACTURA',
            selector: row => row.COD_INVOICE,
            sortable: true,
        },
        {
            name: 'CLIENTE',
            selector: row => row.CLIENT,
            sortable: true,
            allowOverflow: true
        },
        {
            name: 'SUBTOTAL',
            selector: row => row.SUBTOTAL,
            sortable: true,
            format: row => `L ${row.SUBTOTAL.toFixed(2)}`
        },
        {
            name: 'TOTAL DESCUENTO',
            selector: row => row.TOT_DISCOUNT,
            sortable: true,
            format: row => `L ${row.TOT_DISCOUNT.toFixed(2)}`
        },
        {
            name: 'TOTAL ISV',
            selector: row => row.TOT_ISV,
            sortable: true,
            format: row => `L ${row.TOT_ISV.toFixed(2)}`
        },
        {
            name: 'TOTAL VENTA',
            selector: row => row.TOT_SALE,
            sortable: true,
            format: row => `L ${row.TOT_SALE.toFixed(2)}`
        },
        {
            name: 'TIPO DE TRANSACCIÓN',
            selector: row => row.TYP_TO_SALE,
            sortable: true,
        },
        {
            name: 'FORMA DE PAGO',
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
            name: 'FECHA',
            selector: row => row.DAT_INVOICE,
            sortable: true,
            allowOverflow: true,
            format: row => moment(row.DAT_INVOICE).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-primary me-1' data-toggle="modal" data-target='#viewDetail' onClick={() => setRowCOD(row.COD_INVOICE)}><i className="fa-solid fa-eye"></i></button>
            </>
        },
    ];

    const filteredItems = rows.filter(item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

    const subHeaderComponentMemo = useMemo(() => {
    	return (
                <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} />
        	);
    }, [filterText]);

    useEffect(async () => {
        const data = await getInvoices();
        setRows(data);
        setPending(false);
    },[]);

    return (
            pending
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Detalle de venta
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
                        actions={<button onClick={() => doc.save('ventas.pdf')} className='btn btn-danger btn-sm'><i class="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='viewDetail'
                        title='Detalle de venta'
                        content={<SaleDetail rowCOD={rowCOD}/>}
                        modalSize='xl'
                    />
                </div>
            </div> 
    )
}

export default Facturas;