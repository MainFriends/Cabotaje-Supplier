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

const Roles = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [sendRequestPermissions, setSendRequestPermissions] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);
    
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
                <button onClick={() => setRowCOD(row.COD_ROLE)} className='btn btn-sm btn-primary mr-1' data-toggle="modal" data-target='#viewModules'><i className="fa-solid fa-eye"></i></button>
                <button onClick={() => handleDelete(row.COD_ROLE)} className={'btn btn-sm btn-danger ' + ((row.COD_ROLE === 1 || row.COD_ROLE === 2) && 'disabled')}><i className="fa-solid fa-trash"></i></button>
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
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addRole'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        idModal='addRole'
                        title='Gestión de roles'
                        messageError={messageError}
                        content={<AddRoleForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='viewModules'
                        title='Permisos'
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