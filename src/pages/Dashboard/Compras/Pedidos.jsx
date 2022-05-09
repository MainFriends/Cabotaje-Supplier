import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';


import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AddOrder from '../../../components/Orders/AddOrdersForm';
import moment from 'moment'
import ViewDetail from '../../../components/Orders/ViewDetail';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';

const Pedidos = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);

    const dowlandPdfOrder = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Pedidos - Cabotaje Supplier',55,30);    
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');
        
        const row = rows.map(fila => {
            const fecha = fila.DAT_ORDER
            const fechaRequired = fila.DAT_REQUIRED
            return  [
                fila.COD_ORDER,
                fila.NAM_SUPPLIER,
                moment(fecha).format('DD-MM-YYYY'),
                moment(fechaRequired).format('DD-MM-YYYY'),
                fila.NAM_STATUS,
                fila.USER_NAME
            ]
        })  
        doc.autoTable({
            head: [['# De pedido', 'Proveedor', 'Fecha de pedido', 'Fecha requerida', 'Estado', 'Empleado']],
            body: row.sort(),
            startY: 45,
        })

        doc.save('Pedidos - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
        {
            name: '# DE PEDIDO',
            selector: row => row.COD_ORDER,
            sortable: true,
        },
        {
            name: 'PROVEEDOR',
            selector: row => row.NAM_SUPPLIER,
            sortable: true,
        },
        {
            name: 'FECHA DEL PEDIDO',
            selector: row => row.DAT_ORDER,
            sortable: true,
            format: row => moment(row.DAT_ORDER).format('DD-MM-YYYY')
        },
        {
            name: 'FECHA REQUERIDA',
            selector: row => row.DAT_REQUIRED,
            sortable: true,
            format: row => moment(row.DAT_REQUIRED).format('DD-MM-YYYY')
        },
        {
            name: 'ESTADO',
            selector: row => row.NAM_STATUS,
            sortable: true,
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
                <button className={'btn btn-sm ' + (row.NAM_STATUS === 'Recibido' ? 'btn-warning ' : 'btn-success ') + 'mr-1'}onClick={() => {handleStatus(row.NAM_STATUS,row.COD_ORDER)}} title={'Marcar como ' + (row.NAM_STATUS === 'Recibido' ? 'En proceso' : 'Recibido')} >{row.NAM_STATUS === 'Recibido' ? <i className="fa-solid fa-truck"></i> : <i className="fa-solid fa-check-to-slot"></i>}</button>
                <button className='btn btn-sm btn-primary mr-1' data-toggle="modal" data-target='#viewOrderDetail' onClick={() => setRowCOD(row.COD_ORDER)}><i className="fa-solid fa-eye"></i></button>
                <button className='btn btn-sm btn-danger'onClick={() => handleDelete(row.COD_ORDER)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/order', token())
        .then(res => {
            const {data} = res;
            setRows(data);
            setLoading(false);
            setSendRequest(false)
        })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/order/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    const handleStatus = (status,cod) => {
        let COD_STATUS;
        if(status === 'Recibido'){
            COD_STATUS = 5;
        }else{
            COD_STATUS = 6;
        }
        axios.put(`order/${cod}`, {COD_STATUS}, token())
            .then(res => {
                setSendRequest(true);
            })
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Pedidos
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addOrder'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions={<button onClick={() => dowlandPdfOrder()} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}

                    />
                    <Modal 
                        idModal='addOrder'
                        title='Añadir Pedido'
                        messageError={messageError}
                        content={<AddOrder rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError} />}
                    />
                    <Modal 
                        idModal='viewOrderDetail'
                        title='Detalle del pedido'
                        messageError={messageError}
                        content={<ViewDetail 
                            rowCOD={rowCOD}
                            sendRequest={sendRequest}
                        />}
                    />
                </div>
            </div> 
    )
    
}

export default Pedidos;