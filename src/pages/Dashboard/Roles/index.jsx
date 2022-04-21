import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import AddRoleForm from '../../../components/roles/AddRoleForm';

const Roles = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    
    //definir las columnas
    const columns = [
        {
            name: 'NOMBRE',
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
            name: 'MÓDULO',
            selector: row => row.NAM_MODULE,
            sortable: true,
        },
        {
            name: 'LECTURA',
            selector: row => row.QUE,
            sortable: true,
            format: row => (row.QUE ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-ban"></i>)
        },
        {
            name: 'INSERTAR',
            selector: row => row.INS,
            sortable: true,
            format: row => (row.INS ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-ban"></i>)
        },
        {
            name: 'ACTUALIZAR',
            selector: row => row.UPD,
            sortable: true,
            format: row => (row.UPD ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-ban"></i>)
        },
        {
            name: 'ELIMINAR',
            selector: row => row.DEL,
            sortable: true,
            format: row => (row.DEL ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-ban"></i>)
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' data-toggle="modal" data-target='#'><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => handleDelete(row.COD_ROLE)} className='btn btn-sm btn-danger'><i className="fa-solid fa-trash"></i></button>
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
                const admin = {
                    NAM_ROLE: res.data[0].NAM_ROLE,
                    DES_ROLE: res.data[0].DES_ROLE,
                    NAM_MODULE: 'Todos',
                    INS: 1,
                    QUE: 1,
                    UPD: 1,
                    DEL: 1
                }
                const rolesDatabase = res.data.filter(row => row.COD_ROLE != 1 && (row));
                const roles = [admin, ...rolesDatabase]
                setRows(roles);
                setLoading(false);
                setSendRequest(false);
            })
    }, [sendRequest])

    const handleDelete = (cod) => {
        
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
                </div>
            </div> 
    )
}

export default Roles;