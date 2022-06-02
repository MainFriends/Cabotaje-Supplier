import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import moment from 'moment';


import token from '../../../../src/helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo'; 

const Bitacora = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState('false');
    const [rowCOD, setRowCOD] = useState(null)

    const dowlandPdf = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Bitacora- Cabotaje Supplier',50,30); 
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

        const row = rows.map(fila => {
            const fecha = fila.DATE
            return [
                fila.USUARIO,
                fila.ACTION,
                fila.DECRIPTION,
                fila.DATE,
                moment(fecha).format('DD-MM-YYYY h:mm:ss')
            ]
        })  
        doc.autoTable({
            head: [['#', 'Código', 'Código de usuario', 'Acción', 'Descripción','Fecha']],
            body: row.sort(),
            startY: 45
        })

        doc.save('Bitacora de usuarios - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
        {
            name: 'USUARIO',
            selector: row => row.USUARIO,
            sortable: true,
        },
         {
            name: 'ACCION',
            selector: row => row.ACTION,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DESCRIPTION,
            sortable: true,
        },
        {
            name: 'FECHA Y HORA',
            selector: row => row.DATE,
            sortable: true,
            format : row => moment(row.DATE).format('DD-MM-YYYY h:mm:ss')
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
                console.log(data)
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
                   Bitacora
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
                        actions={<button onClick={() => dowlandPdf()} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />
                </div>
            </div> 
    )
}

export default Bitacora;