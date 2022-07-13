import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AddRoleForm from '../../../components/roles/AddRoleForm';
import ViewPermissions from '../../../components/roles/ViewPermissions';
import AddPermissions from '../../../components/roles/AddPermissions';

import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';
import moment from 'moment';

const dowlandPdfRoles = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Roles - Cabotaje Supplier',55,30); 
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => {
        return [
            fila.COD_ROLE,
            fila.NAM_ROLE,
            fila.DES_ROLE
        ]
    })  
    doc.autoTable({
        head: [['#', 'Rol', 'Descripcion']],
        body: row.sort(),
        startY: 45,
        styles: {
            fontSize: 8
        }
    })

    doc.save('Roles - Cabotaje Supplier.pdf')
}

const Roles = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [sendRequestPermissions, setSendRequestPermissions] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);
    const [permissions, setPermissions] = useState({});

    
    //definir las columnas
    const columns = [
        {
            name: 'CÓDIGO',
            selector: row => row.COD_ROLE,
            sortable: true,
        },
        {
            name: 'ROL',
            selector: row => row.NAM_ROLE,
            sortable: true,
            format: row => row.NAM_ROLE.toUpperCase()
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.DES_ROLE,
            sortable: true,
            wrap:true
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button onClick={() => setRowCOD({COD_ROLE: row.COD_ROLE, NAM_ROLE: row.NAM_ROLE})} className={'btn btn-sm btn-primary mr-1 '} data-toggle="modal" data-target='#viewModules'><i className="fa-solid fa-eye"></i></button>
                <button onClick={() => handleDelete(row.COD_ROLE)} className={'btn btn-sm btn-danger ' + ((row.COD_ROLE === 1 || row.COD_ROLE === 2) && 'disabled') + (!permissions.DEL ? ' disabled' : null)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/roles', token())
            .then(res => {
                setRows(res.data);
                setLoading(false);
                setSendRequest(false);
            })
    }, [sendRequest])

    const handleDelete = (cod) => {
        axios.delete(`/roles/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 8 && row.COD_TABLE === 19)
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
                    Roles y permisos
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className={'btn btn-sm btn-primary ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addRole'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions={<button onClick={() => dowlandPdfRoles(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addRole'
                        title='Gestión de roles'
                        messageError={messageError}
                        content={<AddRoleForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='viewModules'
                        title={`Permisos de ${rowCOD?.NAM_ROLE}`}
                        content={<ViewPermissions 
                            rowCOD={rowCOD} 
                            sendRequestPermissions={sendRequestPermissions}
                            setSendRequestPermissions={setSendRequestPermissions}
                        />}
                        modalSize='xl'
                    />

                    <Modal 
                        idModal='addPermissions'
                        title='Agregar permisos'
                        messageError={messageError}
                        content={<AddPermissions 
                            rowCOD={rowCOD}
                            setSendRequestPermissions={setSendRequestPermissions}
                            setMessageError={setMessageError}
                        />}
                    />  
                </div>
            </div> 
    )
}

export default Roles;