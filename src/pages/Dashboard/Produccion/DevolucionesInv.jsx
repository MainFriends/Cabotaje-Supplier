
import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddReturnProductForm from '../../../components/ReturnProduct/AddReturnProductForm'
import EditReturnProductForm from '../../../components/ReturnProduct/EditReturnProductForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';

const DevolucionesInv = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);
    
    //definir las columnas
    const columns = [
        {
            name: 'CÓDIGO',
            selector: row => row.COD_RETURN,
            sortable: true,
        },
        {
            name: 'CÓDIGO PRODUCTO',
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
        {
            name: 'CONCEPTO',
            selector: row => row.CONCEPT,
            sortable: true,
        },
        {
            name: 'CANTIDAD PRODUCTO',
            selector: row => row.CANT_PRODUCT,
            sortable: true,
        },
        {
            name: 'NÚMERO DE LOTE',
            selector: row => row.NUM_LOT,
            sortable: true,
        },
        {
            name: 'CÓDIGO USUARIO',
            selector: row => row.COD_USER,
            sortable: true,
        },
        {
            name: 'MOVIMIENTO',
            selector: row => row.MOVEMENT,
            sortable: true,
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.DES_RETURN,
            sortable: true,
        },
        {
            name: 'FECHA DEVOLUCIÓN',
            selector: row => row.DAT_RETURN,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_RETURN)}} data-toggle="modal" data-target='#editFormReturnProduct'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_RETURN)}><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/returnProduct', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/returnProduct/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Devoluciones
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addFormReturnProduct'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        idModal='addFormReturnProduct'
                        title='Agregar devolución'
                        messageError={messageError}
                        content={<AddReturnProductForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editFormReturnProduct'
                        title='Actualizar devolución'
                        messageError={messageError}
                        content={<EditReturnProductForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />  
                </div>
            </div> 
    )
}

export default DevolucionesInv;