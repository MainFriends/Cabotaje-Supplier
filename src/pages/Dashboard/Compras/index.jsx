import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';


import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AddFacturaForm from '../../../components/PurchaseInvoice/AddPurchaseInvoiceForm';
import EditFacturaForm from '../../../components/PurchaseInvoice/EditPurchaseInvoiceForm';
import moment from 'moment';

const Compras = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);
    
    
    //definir las columnas
    const columns = [
        {
            name: '# DE FACTURA',
            selector: row => row.COD_INVOICE,
            sortable: true,
        },
        {
            name: 'TIPO DE TRANSACCION',
            selector: row => row.TYP_TO_PURCHASE,
            sortable: true,
        },
        {
            name: 'FORMA DE PAGO',
            selector: row => row.NAM_TYPE_PAY,
            sortable: true,
        },
        {
            name: 'SUBTOTAL',
            selector: row => row.SUBTOTAL,
            sortable: true,
            format: row => `L. ${row.SUBTOTAL.toFixed(2)}`
        },
        {
            name: 'ISV TOTAL',
            selector: row => row.TOT_ISV,
            sortable: true,
            format: row => `L. ${row.TOT_ISV.toFixed(2)}`
            
        },
        {
            name: 'TOTAL COMPRA',
            selector: row => row.TOT_PURCHASE,
            sortable: true,
            format: row => `L. ${row.TOT_PURCHASE.toFixed(2)}`
        },
        {
            name: 'FECHA',
            selector: row => row.DAT_INVOICE,
            sortable: true,
            format: row => moment(row.DAT_ORDER).format('DD-MM-YYYY')
        },
        {
            name: '# PEDIDO',
            selector: row => row.COD_ORDER,
            sortable: true,
            format: row => row.COD_ORDER === null ? 'Sin orden relacionada' : row.COD_ORDER,
            grow: 2
        },
        {
            name: 'EMPLEADO',
            selector: row => row.USER_NAME,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_INVOICE)}} data-toggle="modal" data-target='#editFactura'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_INVOICE)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/purchase-invoice', token())
        .then(res => {
            const {data} = res;
            setRows(data);
            setLoading(false);
            setSendRequest(false)
        })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/purchase-invoice/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Factura de compras
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addFactura'><i className="fas fa-plus mr-2"></i>Agregar</button>
                        </div>
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

                    <Modal 
                        idModal='addFactura'
                        title='Agregar factura'
                        messageError={messageError}
                        content={<AddFacturaForm setSendRequest={setSendRequest} />}
                    />
                    <Modal 
                        idModal='editFactura'
                        title='Actulizar factura'
                        messageError={messageError}
                        content={<EditFacturaForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError} />}
                    />
                    
                </div>
            </div> 
    )
}

export default Compras;