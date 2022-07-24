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
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';
import moment from 'moment';

const dowlandPdfInventory = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Inventario - Cabotaje Supplier',55,30);   
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => [
        fila.COD_PRODUCT,
        fila.NAM_SUPPLIER,
        fila.NAM_PRODUCT,
        fila.DES_PRODUCT,
        fila.CANT_TOTAL,
        fila.ISV,
        fila.NORMAL_UNIT_PRICE,
        fila.PURCHASE_PRICE,
        fila.WHOLESALE_CANT,
        fila.WHOLESALE_PRICE,
        fila.NAM_CATEGORY,
        fila.NAM_TYPE_PRODUCT
    ])  
    doc.autoTable({
        head: [['Codigo', 'Proveedor', 'Producto', 'Descripcion', 'Cantidad', 'ISV', 'Precio', 'Costo', 'Cantidad', 'Precio al por mayor', 'Categoria', 'Tipo de producto']],
        body: row.sort(),
        startY: 45,
        styles: {
            fontSize: 5
        }
    })

    doc.save('Inventario - Cabotaje Supplier.pdf')
}

const Inventario = () => {
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
            name: 'SKU',
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
                <button onClick={() => setRowCOD(row.COD_PRODUCT)} className={'btn btn-sm btn-warning mr-1 ' + (!permissions.UPD ? 'disabled' : null)} data-toggle="modal" data-target='#editProduct'><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => handleDelete(row.COD_PRODUCT)} className={'btn btn-sm btn-danger ' + (!permissions.DEL ? 'disabled' : null)}><i className="fa-solid fa-trash"></i></button>
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

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 6 && row.COD_TABLE === 8)
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
                    Inventario
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className={'btn btn-sm btn-primary ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addDetailProduct'><i className="fas fa-plus mr-2"></i>Agregar a inventario</button>
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
                        defaultSortAsc={false}
                        actions={<button onClick={() => dowlandPdfInventory(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}     
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