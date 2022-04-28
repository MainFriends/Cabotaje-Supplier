import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddCategoryForm from '../../../components/inventoryCategory/AddCategoryForm';
import EditCategoryForm from '../../../components/inventoryCategory/EditCategoryForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'


import token from '../../../../src/helpers/getToken';

const Categoria = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState('false');
    const [rowCOD, setRowCOD] = useState(null)
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_CATEGORY,
            sortable: true,
        },
         {
            name: 'NOMBRE',
            selector: row => row.NAM_CATEGORY,
            sortable: true,
        },
         {
            name: 'DESCRIPCIÓN',
            selector: row => row.DESCRIPTION,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_CATEGORY)}} data-toggle="modal" data-target='#editFormCategory'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_CATEGORY) }><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/inventoryCategory', token())
            .then(res => {
                const {data} = res;
                console.log(data)
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })

    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/inventoryCategory/${cod}`, token())
        .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Categorias de inventario
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addFormCategory'><i className="fas fa-plus mr-2"></i>Agregar Categoria</button>
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
                        idModal='addFormCategory'
                        title='Agregar categoria de inventario'
                        messageError={messageError}
                        content={<AddCategoryForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editFormCategory'
                        title='Actualizar categoria de inventario'
                        messageError={messageError}
                        content={<EditCategoryForm rowCOD ={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />
                </div>
            </div> 
    )
}

export default Categoria;
