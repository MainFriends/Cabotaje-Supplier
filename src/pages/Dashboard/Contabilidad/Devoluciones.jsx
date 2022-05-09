import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddSalesReturn from '../../../components/salesReturn/AddSalesReturn';
import EditSalesReturn from '../../../components/salesReturn/EditSalesReturn';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';

const Devoluciones = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);

    const dowlandPdfReturns = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Devoluciones - Cabotaje Supplier',50,30);   
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');

        const row = rows.map(fila => {
            const fecha = fila.DAT_RETURN
            return [
                fila.COD_RETURN,
                fila.NAM_PRODUCT,
                fila.DESCRIPTION,
                fila.CANT,
                fila.NAM_TYPE_PRODUCT,
                fila.AMOUNT,
                fila.USER_NAME,
                moment(fecha).format('DD-MM-YYYY'),
            ]
        })  
        doc.autoTable({
            head: [['Codigo', 'Producto', 'Descripcion', 'Cantidad', 'Tipo', 'Monto', 'Usuario', 'Fecha']],
            body: row.sort(),
            startY: 45
        })

        doc.save('Devoluciones - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_RETURN,
            sortable: true,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DESCRIPTION,
            sortable: true,
            allowOverflow: true
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT,
            sortable: true,
        },
        {
            name: 'TIPO',
            selector: row => row.NAM_TYPE_PRODUCT,
            sortable: true,
        },
        {
            name: 'MONTO',
            selector: row => row.AMOUNT,
            sortable: true,
            format: row => `L ${row.AMOUNT.toFixed(2)}`
        },
        {
            name: 'USUARIO',
            selector: row => row.USER_NAME,
            sortable: true,
        },
        {
            name: 'FECHA',
            selector: row => row.DAT_RETURN,
            sortable: true,
            format: row => moment(row.DAT_RETURN).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_RETURN)}} data-toggle="modal" data-target='#editSalesReturn'><i className="fa-solid fa-pen-to-square"></i></button>
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
        axios.get('/sales-returns', token())
           .then(res => {
               const {data} = res;
               setRows(data);
               setLoading(false);
               setSendRequest(false);
           })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/sales-returns/${cod}`, token())
           .then(res => setSendRequest(true));
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
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addSalesReturn'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions={<button onClick={() => dowlandPdfReturns()} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addSalesReturn'
                        title='Agregar Devolución'
                        messageError={messageError}
                        content={<AddSalesReturn setSendRequest={setSendRequest} setMessageError={setMessageError} />}
                    />
                    <Modal 
                        idModal='editSalesReturn'
                        title='Actualizar Devolución'
                        messageError={messageError}
                        content={<EditSalesReturn rowCOD={rowCOD} setSendRequest={setSendRequest} />}
                    />
                </div>
            </div> 
    )
}

export default Devoluciones;