import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddPayForm from '../../../components/payForm/AddPayForm';
import EditPayForm from '../../../components/payForm/EditPayForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import token from '../../../helpers/getToken';
import moment from 'moment';

import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';

const PlanillaPago = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);

    const dowlandPdfPayment = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Planilla de Pago - Cabotaje Supplier',45,30);   
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');
        
        const row = rows.map(fila => {
            const fecha = fila.DAT_PAYMENT
            return [
                fila.COD_PAY_FORM,
                fila.FIRST_NAME,
                fila.LAST_NAME,
                fila.HOURS_WORKED,
                fila.AMO_GROSS,
                fila.BONUS,
                fila.TOT_DEDUCTIONS,
                fila.NET_SALARY,
                moment(fecha).format('DD-MM-YYYY')
            ]
        })  
        doc.autoTable({
            head: [['#', 'Nombre', 'Apellido', 'H. Trabajadas', 'Salario Base', 'Bonificaiones', 'Deduciones', 'S. Neto', 'Fecha de pago']],
            body: row.sort(),
            startY: 45,
            styles: {
                fontSize: 8
            }
        })

        doc.save('Planilla de Pago - Cabotaje Supplier.pdf');
    }
    
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
            format: row => `L ${row.AMO_GROSS.toFixed(2)}`
        },
        {
            name: 'BONIFICACIONES',
            selector: row => row.BONUS,
            sortable: true,
            format: row => `L ${row.BONUS.toFixed(2)}`
        },
        {
            name: 'DEDUCCIONES',
            selector: row => row.TOT_DEDUCTIONS,
            sortable: true,
            format: row => `L ${row.TOT_DEDUCTIONS.toFixed(2)}`
        },
        {
            name: 'SALARIO NETO',
            selector: row => row.NET_SALARY,
            sortable: true,
            format: row => `L ${row.NET_SALARY.toFixed(2)}`
        },
        {
            name: 'FECHA DE PAGO',
            selector: row => row.DAT_PAYMENT,
            sortable: true,
            format: row => moment(row.DAT_PAYMENT).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_PAY_FORM)}} data-toggle="modal" data-target='#editPayForm'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_PAY_FORM)}><i className="fa-solid fa-trash"></i></button>
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
                setRows(data);
                setLoading(false);
                setSendRequest(false)
            })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/pay-form/${cod}`, token())
           .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Planillas de Pago
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
                        actions={<button onClick={() => dowlandPdfPayment()} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addPayForm'
                        title='Agregar planilla'
                        messageError={messageError}
                        content={<AddPayForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />

                    <Modal 
                        idModal='editPayForm'
                        title='Editar planilla'
                        messageError={messageError}
                        content={<EditPayForm rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />
                </div>
            </div> 
    )
}

export default PlanillaPago;