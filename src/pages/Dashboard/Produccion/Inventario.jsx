import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import DetailForm from '../../../components/inventory/DetailForm';
import ViewDetail from '../../../components/inventory/ViewDetail';
import ProductForm from '../../../components/inventory/ProductForm';
import EditProductForm from '../../../components/inventory/EditProductForm';

const Inventario = () => {
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
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
        {
            name: 'PROVEEDOR',
            selector: row => row.NAM_SUPPLIER,
            sortable: true,
            grow: 2
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            sortable: true,
            allowOverflow: true,
            wrap: true
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.DES_PRODUCT,
            wrap: true
        },
        {
            name: 'CANTIDAD TOTAL',
            selector: row => row.CANT_TOTAL,
            sortable: true,
        },
        {
            name: 'ISV',
            selector: row => row.ISV,
        },
        {
            name: 'PRECIO',
            selector: row => row.NORMAL_UNIT_PRICE,
            sortable: true,
            format: row => `L ${row.NORMAL_UNIT_PRICE.toFixed(2)}`
        },
        {
            name: 'COSTO',
            selector: row => row.PURCHASE_PRICE,
            sortable: true,
            format: row => `L ${row.PURCHASE_PRICE.toFixed(2)}`
        },
        {
            name: 'CANTIDAD AL POR MAYOR',
            selector: row => row.WHOLESALE_CANT,
            sortable: true,
        },
        {
            name: 'PRECIO AL POR MAYOR',
            selector: row => row.WHOLESALE_PRICE,
            sortable: true,
            format: row => `L ${row.WHOLESALE_PRICE.toFixed(2)}`
        },
        {
            name: 'CATEGORIA',
            selector: row => row.NAM_CATEGORY,
            sortable: true,
        },
        {
            name: 'TIPO DE PRODUCTO',
            selector: row => row.NAM_TYPE_PRODUCT,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-primary mr-1' data-toggle="modal" data-target='#viewDetailProduct' onClick={() => setRowCOD(row.COD_PRODUCT)}><i className="fa-solid fa-eye"></i></button>
                <button onClick={() => setRowCOD(row.COD_PRODUCT)} className='btn btn-sm btn-warning mr-1' data-toggle="modal" data-target='#editProduct'><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => handleDelete(row.COD_PRODUCT)} className='btn btn-sm btn-danger'><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/inventory', token())
            .then(res => {
                setRows(res.data);
                setLoading(false);
                setSendRequest(false);
            })
    },[sendRequest]);
    
    const handleDelete = (cod) => {
        axios.delete(`/inventory/${cod}`, token())
            .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Inventario
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addDetailProduct'><i className="fas fa-plus mr-2"></i>Agregar a inventario</button>
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
                        idModal='addDetailProduct'
                        title='Agregar detalle'
                        messageError={messageError}
                        content={<DetailForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='viewDetailProduct'
                        title='Detalle de producto'
                        messageError={messageError}
                        content={<ViewDetail rowCOD={rowCOD}/>}
                        modalSize='xl'
                    />

                    <Modal 
                        idModal='addProduct'
                        title='Agregar nuevo producto'
                        messageError={messageError}
                        content={<ProductForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editProduct'
                        title='Editar producto'
                        messageError={messageError}
                        content={<EditProductForm sendRequest={sendRequest} rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    /> 
                </div>
            </div> 
    )
}

export default Inventario;