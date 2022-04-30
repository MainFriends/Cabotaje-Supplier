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
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const doc = new jsPDF()

const Usuarios = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);

    const dowlandPDFUser = () => {
        if(rows){
            const row = rows.map(fila => {
                const fecha = fila.DAT_BIRTHDAY;
                const identidad = fila.IDENTITY
               return [
                    fila.COD_USER,
                    `0${identidad}`,
                    fila.FIRST_NAME,
                    fila.LAST_NAME,
                    fila.USER_EMAIL,
                    fila.NAM_ROLE,
                    fila.GENDER,
                    fila.NUM_PHONE_ONE,
                    fila.NUM_PHONE_TWO,
                    fila.NUM_REFERENCE,
                    moment(fecha).format('DD-MM-YYYY'),
                    fila.NAM_CITY,
                    fila.ADDRESS
                ]
            })  
            doc.autoTable({
                head: [['#', 'ID', 'Nombre', 'Apellido', 'Email', 'Rol', 'Genero', 'Tel. 1', 'Tel. 2', 'Tel. Ref', 'Fecha de nacimiento', 'Ciudad','Direccion']],
                body: row.sort()
            })
        }

        doc.save('usuarios.pdf')
    }


    
    
    //definir las columnas
    const columns = [
        {
            name: 'CÓDIGO',
            selector: row => row.COD_USER,
            sortable: true
        },
        {
            name: 'IDENTIDAD',
            selector: row => row.IDENTITY,
            sortable: true,
            grow: 2,
            format: row => `0${row.IDENTITY}`
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
            name: 'EMAIL',
            selector: row => row.USER_EMAIL,
            sortable: true,
            wrap: true,
            grow: 2
        },
        {
            name: 'ROL',
            selector: row => row.NAM_ROLE,
            sortable: true,
        },
        {
            name: 'GÉNERO',
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
            name: 'TEL REF',
            selector: row => row.NUM_REFERENCE,
            sortable: true,
        },
        {
            name: 'FECHA DE NACIMIENTO',
            selector: row => row.DAT_BIRTHDAY,
            sortable: true,
            grow: 2,
            format: row => moment(row.DAT_BIRTHDAY).format('YYYY-MM-DD')
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
                        actions={<button onClick={() => dowlandPDFUser()} className='btn btn-danger btn-sm'><i class="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}

                    />

                    <Modal 
                        idModal='addUser'
                        title='Agregar usuario'
                        messageError={messageError}
                        content={<AddUserForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editUser'
                        title='Editar usuario'
                        messageError={messageError}
                        content={<EditUserForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />  
                </div>
            </div> 
    )
}

export default Usuarios;