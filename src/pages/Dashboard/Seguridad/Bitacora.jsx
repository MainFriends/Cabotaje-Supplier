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
            id: 'action',
            name: 'ACCIÓN REALIZADA',
            selector: row => row.ACTION,
            sortable: true,
            format: row => (row.ACTION === 'Agregar' ? <h1 className="badge badge-primary text-module p-2">{row.ACTION}</h1> : 
                            (row.ACTION === 'Eliminar' ? <h1 className="badge badge-danger text-module p-2">{row.ACTION}</h1> :
                            <h1 className="badge badge-warning text-module p-2">{row.ACTION}</h1>))
        },
        {
            id: 'user',
            name: 'USUARIO',
            selector: row => row.USER,
            sortable: true,
        },
        {
            id: 'object',
            name: 'OBJETO',
            selector: row => row.OBJECT,
            sortable: true,
            wrap: true
        },
        {
            id: 'field',
            name: 'CAMPO',
            selector: row => row.FIELD,
            sortable: true,
            wrap: true,
            format: row => (!row.FIELD ? (<i className="fa-solid fa-ban"></i>) : row.FIELD)
        },
        {
            id: 'record',
            name: 'REGISTRO',
            selector: row => row.RECORD,
            sortable: true,
            wrap: true
        },
        {
            id: 'before',
            name: 'ANTES DEL CAMBIO',
            selector: row => row.BEFORE_THE_CHANGE,
            sortable: true,
            wrap: true,
            format: row => (!row.BEFORE_THE_CHANGE ? (<i className="fa-solid fa-ban"></i>) : row.BEFORE_THE_CHANGE)
        },
        {
            id: 'after',
            name: 'DESPUÉS DEL CAMBIO',
            selector: row => row.AFTER_THE_CHANGE,
            sortable: true,
            wrap: true,
            format: row => (!row.AFTER_THE_CHANGE ? (<i className="fa-solid fa-ban"></i>) : row.AFTER_THE_CHANGE)
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