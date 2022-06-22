import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import moment from 'moment';


import token from '../../../../src/helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo'; 

const dowlandPdf = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Bitacora - Cabotaje Supplier',50,30); 
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => {
        const fecha = fila.DATE
        return [
            fila.USUARIO,
            fila.ACTION,
            fila.DESCRIPTION,
            moment(fecha).format('DD-MM-YYYY h:mm:ss')
        ]
    })  
    doc.autoTable({
        head: [['Usuario', 'Acción realizada', 'Descripción','Fecha y hora']],
        body: row.sort(),
        startY: 45
    })

    doc.save('Bitacora de usuarios - Cabotaje Supplier.pdf')
}

const Bitacora = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sendRequest, setSendRequest] = useState('false');
    
    //definir las columnas
    const columns = [
        {
            id: 'user',
            name: 'USUARIO',
            selector: row => row.USUARIO,
            sortable: true,
        },
         {
            id: 'action',
            name: 'ACCIÓN REALIZADA',
            selector: row => row.ACTION,
            sortable: true,
        },
        {
            id: 'description',
            name: 'DESCRIPCIÓN',
            selector: row => row.DESCRIPTION,
            sortable: true,
            wrap: true
        },
        {
            id: 'date',
            name: 'FECHA Y HORA',
            selector: row => row.DATE,
            sortable: true,
            format : row => moment(row.DATE).format('DD-MM-YYYY h:mm:ss A'),
            wrap: true
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
        axios.get('/bitacora', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })

    },[sendRequest]);


    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                   Bitacora de usuarios
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                
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
                        defaultSortFieldId="date"
                        defaultSortAsc={false}
                        actions={<button onClick={() => dowlandPdf(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />
                </div>
            </div> 
    )
}

export default Bitacora;