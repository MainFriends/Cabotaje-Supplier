import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddUserForm from '../../../components/User/AddUserForm';
import EditUserForm from '../../../components/User/EditUserForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';

const Usuarios = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);


    
    
    //definir las columnas
    const columns = [
       
        {
            name: 'IDENTIDAD',
            selector: row => row.IDENTITY,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.FIRST_NAME,
            sortable: true,
        },
        {
            name: 'SEGUNDO NOMBRE',
            selector: row => row.MIDDLE_NAME,
            sortable: true,
        },
        {
            name: 'APELLIDO',
            selector: row => row.LAST_NAME,
            sortable: true,
        },
        {
            name: 'GENDER',
            selector: row => row.GENDER,
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
            name: 'REFERENCIA',
            selector: row => row.NUM_REFERENCE,
            sortable: true,
        },
        {
            name: 'FECHA DE NACIMIENTO',
            selector: row => row.DAT_BIRTHDAY,
            sortable: true,
        },
        {
            name: 'CIUDAD',
            selector: row => row.NAM_CITY,
            sortable: true,
        },
        {
            name: 'DIRECCIÓN',
            selector: row => row.ADDRESS,
            sortable: true,
        },
        {
            name: 'ROL',
            selector: row => row.NAM_ROLE,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.USER_EMAIL,
            sortable: true,
            wrap: true
        },
 
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_USER)}} data-toggle="modal" data-target='#editUser'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_USER)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/User', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/User/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Usuarios
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addUser'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        idModal='addUser'
                        title='Agregar Usuario'
                        messageError={messageError}
                        content={<AddUserForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editUser'
                        title='Actualizar Usuario'
                        messageError={messageError}
                        content={<EditUserForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />  
                </div>
            </div> 
    )
}

export default Usuarios;