import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddProductOutput from '../../../components/ProductOutput/AddProductOutput';
import EditProductOutput from '../../../components/ProductOutput/EditProductOutput';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import token from '../../../../src/helpers/getToken';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';

const dowlandPdfLosses = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Salidas - Cabotaje Supplier',50,30); 
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => {
        const fecha = fila.DAT_DECREASE
        return [
            fila.COD_PRODUCT,
            fila.NAM_PRODUCT,
            fila.NAM_SUPPLIER,
            fila.DES_OUTPUT,
            fila.NAM_TYPE,
            fila.CANT_PRODUCT,
            fila.NUM_LOT,
            fila.USER_NAME,
            moment(fecha).format('DD-MM-YYYY')
        ]
    })  
    doc.autoTable({
        head: [['SKU', 'Producto', 'Proveedor', 'Descripción', 'Tipo de Salida', 'Cantidad', 'Lote', 'Usuario', 'Fecha']],
        body: row.sort(),
        startY: 45
    })

    doc.save('Salidas de inventario - Cabotaje Supplier.pdf')
}

const ProductOutput = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState('false');
    const [rowCOD, setRowCOD] = useState(null);
    const [permissions, setPermissions] = useState({});
    
    //definir las columnas
    const columns = [
         {
            name: 'SKU',
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            sortable: true,
        },
        {
            name: 'PROVEEDOR',
            selector: row => row.NAM_SUPPLIER,
            sortable: true,
        },
        {
            name: 'DESCRIPCIÓN',
            selector: row => row.DES_OUTPUT,
            sortable: true,
        },
        {
            name: 'TIPO DE SALIDA',
            selector: row => row.NAM_TYPE,
            sortable: true,
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCT,
            sortable: true,
        },
        {
            name: 'NÚMERO DE LOTE',
            selector: row => row.NUM_LOT,
            sortable: true,
        },
        {
            name: 'USUARIO',
            selector: row => row.USER_NAME,
            sortable: true,
        },
        {
            id: "id",
            name: 'FECHA',
            selector: row => row.DAT_OUTPUT,
            sortable: true,
            format : row => moment(row.DAT_OUTPUT).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className={'btn btn-sm btn-warning mr-1 ' + (!permissions.UPD ? 'disabled' : null)} onClick={() => {setRowCOD(row.COD_OUTPUT)}} data-toggle="modal" data-target='#editProductOutput'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className={'btn btn-sm btn-danger ' + (!permissions.DEL ? 'disabled' : null)} onClick={() => handleDelete(row.COD_OUTPUT) }><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/product-outputs', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })

    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/product-outputs/${cod}`, token())
        .then(res => setSendRequest(true))
    }

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 6 && row.COD_TABLE === 12)
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
                    Salidas de inventario
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className={'btn btn-sm btn-primary ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addProductOutput'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions={<button onClick={() => dowlandPdfLosses(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addProductOutput'
                        title='Agregar salida'
                        messageError={messageError}
                        content={<AddProductOutput setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editProductOutput'
                        title='Actualizar salida'
                        messageError={messageError}
                        content={<EditProductOutput rowCOD ={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />
                </div>
            </div> 
    )
}

export default ProductOutput;