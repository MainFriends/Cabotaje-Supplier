import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddPayForm from '../../../components/payForm/AddPayForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import token from '../../../helpers/getToken';


const PlanillaPago = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_PAY_FORM,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.FIRST_NAME,
            sortable: true,
        },
        {
            name: 'APELLIDO',
            selector: row => row.LAST_NAME,
            sortable: true,
        },
        {
            name: 'HORAS TRABAJADAS',
            selector: row => row.HOURS_WORKED,
            sortable: true,
        },
        {
            name: 'SALARIO BASE',
            selector: row => row.AMO_GROSS,
            sortable: true,
        },
        {
            name: 'BONIFICACIONES',
            selector: row => row.BONUS,
            sortable: true,
        },
        {
            name: 'DEDUCCIONES',
            selector: row => row.TOT_DEDUCTIONS,
            sortable: true,
        },
        {
            name: 'SALARIO NETO',
            selector: row => row.NET_SALARY,
            sortable: true,
        },
        {
            name: 'FECHA DE PAGO',
            selector: row => row.DAT_PAYMENT,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' data-toggle="modal" data-target='#'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger'><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/pay-form', token())
            .then(res => {
                const {data} = res;
                console.log(data);
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
                    Clientes
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addPayForm'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        idModal='addPayForm'
                        title='Agregar Planilla'
                        messageError={messageError}
                        content={<AddPayForm />}
                    />
                </div>
            </div> 
    )
}

export default PlanillaPago;