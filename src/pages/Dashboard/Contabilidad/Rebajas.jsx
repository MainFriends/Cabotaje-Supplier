import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';
import moment from 'moment';

const dowlandPdfRebates = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Rebajas - Cabotaje Supplier',55,30);
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => [
        fila.COD_DISCOUNT,
        fila.COD_INVOICE,
        fila.CLIENT_NAME,
        fila.DESCRIPTION,
        fila.AMOUNT,
        fila.NAM_TYPE_PAY,
        fila.USER_NAME
    ])  
    doc.autoTable({
        head: [['#', 'Factura', 'Cliente', 'Descrip.', 'Monto', 'Tipo de pago', 'Usuario']],
        body: row.sort(),
        startY: 45
    })

    doc.save('Rebajas - Cabotaje Supplier.pdf')
}

const Rebajas = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    
    //definir las columnas
    const columns = [
        {
            id: "id",
            name: 'CODIGO',
            selector: row => row.COD_DISCOUNT,
            sortable: true,
        },
        {
            name: 'FACTURA',
            selector: row => row.COD_INVOICE,
            sortable: true,
        },
        {
            name: 'CLIENTE',
            selector: row => row.CLIENT_NAME,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DESCRIPTION,
            sortable: true,
        },
        {
            name: 'MONTO',
            selector: row => row.AMOUNT,
            sortable: true,
            format: row => `L ${row.AMOUNT.toFixed(2)}`
        },
        {
            name: 'TIPO DE PAGO',
            selector: row => row.NAM_TYPE_PAY,
            sortable: true,
        },
        {
            name: 'USUARIO',
            selector: row => row.USER_NAME,
            sortable: true,
            allowOverflow: true
        },
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
        axios.get('/sales-discounts', token())
           .then(res => {
               const {data} = res;
               setRows(data);
               setLoading(false);
           })
    },[]);

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Rebajas
                </div>
                <div className="card-body">
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
                        actions={<button onClick={() => dowlandPdfRebates(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}

                    />

                    <Modal 
                        idModal='idModal'
                        title='Titulo'
                        messageError={messageError}
                    />
                </div>
            </div> 
    )
}

export default Rebajas;