import DataTable from 'react-data-table-component';
import {useEffect, useState, useMemo} from 'react';
import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddSupplierForm from '../../../components/Supplier/AddSupplierForm';
import EditSupplierForm from '../../../components/Supplier/EditSupplierForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';
import moment from 'moment';  

const dowlandPdfSupplier = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Proveedores - Cabotaje Supplier',50,30);
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)
    
    const row = filteredItems.map(fila => [
        fila.NAM_SUPPLIER,
        fila.NAM_CONTACT,
        fila.LAST_NAM_CONTACT,
        fila.ADDRESS,
        fila.NUM_PHONE_ONE,
        fila.NUM_PHONE_TWO,
        fila.EMAIL,
        fila.NAM_CITY,
        fila.ZIP_CODE
    ])  
    doc.autoTable({
        head: [['Proveedor', 'Nombre del contacto', 'Apellido del contacto', 'Direccion', 'Tel 1', 'Tel 2', 'Email', 'Ciudad', 'Codigo postal']],
        body: row.sort(),
        startY: 45,
    })

    doc.save('Proveedores - Cabotaje Supplier.pdf')
}

const Proveedor= () => {
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
            id: "id",
            name: 'NOMBRE DEL PROVEEDOR ',
            selector: row => row.NAM_SUPPLIER,
            sortable: true,
            grow: 2
        },
        {
            name: 'NOMBRE DEL CONTACTO',
            selector: row => row.NAM_CONTACT,
            sortable: true,
        },
        {
            name: 'APELLIDO DEL CONTACTO',
            selector: row => row.LAST_NAM_CONTACT,
            sortable: true,
        },
        {
            name: 'DIRECCIÓN',
            selector: row => row.ADDRESS,
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
            name: 'EMAIL',
            selector: row => row.EMAIL,
            sortable: true,
        },
        {
            name: 'CIUDAD',
            selector: row => row.NAM_CITY,
            sortable: true,
        },
        {
            name: 'CÓDIGO POSTAL',
            selector: row => row.ZIP_CODE,
            sortable: true,
        },
      
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className={'btn btn-sm btn-warning mr-1 ' + (!permissions.UPD ? ' disabled' : null)} onClick={() => {setRowCOD(row.COD_SUPPLIER)}} data-toggle="modal" data-target='#editSupplier'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className={'btn btn-sm btn-danger ' + (!permissions.DEL ? 'disabled' : null)} onClick={() => handleDelete(row.COD_SUPPLIER)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/Supplier', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/Supplier/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 5 && row.COD_TABLE === 7)
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
                    Proveedores
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className={'btn btn-sm btn-primary ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addSupplier'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions={<button onClick={() => dowlandPdfSupplier(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addSupplier'
                        title='Agregar proveedor'
                        messageError={messageError}
                        content={<AddSupplierForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editSupplier'
                        title='Editar proveedor'
                        messageError={messageError}
                        content={<EditSupplierForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />  
                </div>
            </div> 
    )
}

export default Proveedor;