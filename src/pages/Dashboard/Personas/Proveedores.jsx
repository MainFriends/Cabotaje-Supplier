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

const Proveedor= () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);
    
    //definir las columnas
    const columns = [
        {
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
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_SUPPLIER)}} data-toggle="modal" data-target='#editSupplier'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_SUPPLIER)}><i className="fa-solid fa-trash"></i></button>
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

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Proveedor
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addSupplier'><i className="fas fa-plus mr-2"></i>Agregar</button>
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