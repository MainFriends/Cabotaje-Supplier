import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddClientForm from '../../../components/client/AddClientForm';
import EditClientForm from '../../../components/client/EditClientForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';
import moment from 'moment';

const dowlandPDFClient = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Clientes - Cabotaje Supplier',55,30);
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje')

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)
    
    const row = filteredItems.map(fila => {
        return [
            fila.IDENTITY,
            fila.FIRST_NAME,
            fila.LAST_NAME,
            fila.NUM_PHONE_ONE,
            fila.NUM_PHONE_TWO === 0 ? "Sin número" : fila.NUM_PHONE_TWO,
            fila.ADDRESS,
            fila.RTN,
        ]
    })  
    doc.autoTable({
        head: [['Identidad', 'Nombre', 'Apellido', 'Numero 1', 'Numero 2', 'Direccion', 'RTN']],
        body: row.sort(),
        startY: 45
    })

    doc.save('Clientes - Cabotaje Supplier.pdf');
}

const Clientes = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);
    const [permissions, setPermissions] = useState({});
    
    //definir las columnas
    const columns = [
        {
            name: 'IDENTIDAD',
            selector: row => row.IDENTITY,
            sortable: true,
            grow: 2
        },
        {
            id: 'id',
            name: 'NOMBRE',
            selector: row => row.FIRST_NAME,
            sortable: true,
        },
        {
            name: 'APELLIDO',
            selector: row => row.LAST_NAME,
            sortable: true,
        },
        {
            name: 'TEL 1',
            selector: row => row.NUM_PHONE_ONE,
            sortable: true,
        },
        {
            name: 'TEL 2',
            selector: row => row.NUM_PHONE_TWO,
            sortable: true,
            format: row => row.NUM_PHONE_TWO === 0 ? ('Sin número') : row.NUM_PHONE_TWO
        },
        {
            name: 'DIRECCIÓN',
            selector: row => row.ADDRESS,
            sortable: true,
        },
        {
            name: 'RTN',
            selector: row => row.RTN,
            sortable: true,
            grow: 2
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className={'btn btn-sm btn-warning mr-1 ' + (!permissions.UPD ? ' disabled' : null)} onClick={() => {setRowCOD(row.COD_CLIENT)}} data-toggle="modal" data-target='#editClient'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className={'btn btn-sm btn-danger ' + (!permissions.DEL ? 'disabled' : null)} onClick={() => handleDelete(row.COD_CLIENT)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/client', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/client/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 5 && row.COD_TABLE === 6)
            setPermissions(result)
        })
    },[])

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Clientes
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className={'btn btn-sm btn-primary ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addClient'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        defaultSortFieldId="id"
                        actions={<button onClick={() => dowlandPDFClient(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addClient'
                        title='Agregar cliente'
                        messageError={messageError}
                        content={<AddClientForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editClient'
                        title='Editar cliente'
                        messageError={messageError}
                        content={<EditClientForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />  
                </div>
            </div> 
    )
}

export default Clientes;