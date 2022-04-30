import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddDecreaseForm from '../../../components/decrease/AddDecreaseForm';
import EditDecreaseForm from '../../../components/decrease/EditDecreaseForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import token from '../../../../src/helpers/getToken';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';

const mermas = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState('false');
    const [rowCOD, setRowCOD] = useState(null)

    const dowlandPdfLosses = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Mermas - Cabotaje Supplier',50,30); 
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

        const row = rows.map(fila => {
            const fecha = fila.DAT_DECREASE
            return [
                fila.COD_PRODUCT,
                fila.NAM_PRODUCT,
                fila.CONCEPT,
                fila.CANT_PRODUCTS,
                fila.NUM_LOT,
                fila.USER_NAME,
                moment(fecha).format('DD-MM-YYYY')
            ]
        })  
        doc.autoTable({
            head: [['Codigo', 'Producto', 'Concepto', 'Cantidad de productos', 'Numero de lote', 'Usuario', 'Fecha de merma']],
            body: row.sort(),
            startY: 45
        })

        doc.save('Mermas de inventario - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
         {
            name: 'CODIGO PRODUCTO',
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            sortable: true,
        },
         {
            name: 'CONCEPTO',
            selector: row => row.CONCEPT,
            sortable: true,
        },
        {
            name: 'CANTIDAD PRODUCTOS',
            selector: row => row.CANT_PRODUCTS,
            sortable: true,
        },
        {
            name: 'NUMERO DE LOTE',
            selector: row => row.NUM_LOT,
            sortable: true,
        },
        {
            name: 'USUARIO',
            selector: row => row.USER_NAME,
            sortable: true,
        },
        {
            name: 'FECHA MERMA',
            selector: row => row.DAT_DECREASE,
            sortable: true,
            format : row => moment(row.DAT_DECREASE).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_DECREASE)}} data-toggle="modal" data-target='#editDecrease'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_DECREASE) }><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/decrease', token())
            .then(res => {
                const {data} = res;
                console.log(data)
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })

    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/decrease/${cod}`, token())
        .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Mermas
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addDecrease'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions={<button onClick={() => dowlandPdfLosses()} className='btn btn-danger btn-sm'><i class="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addDecrease'
                        title='Agregar Merma'
                        messageError={messageError}
                        content={<AddDecreaseForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editDecrease'
                        title='Actualizar Merma'
                        messageError={messageError}
                        content={<EditDecreaseForm rowCOD ={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />
                </div>
            </div> 
    )
}

export default mermas;