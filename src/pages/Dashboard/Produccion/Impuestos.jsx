import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddTaxForm from '../../../components/taxes/AddTaxForm';
import EditTaxForm from '../../../components/taxes/EditTaxForm';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'


import token from '../../../../src/helpers/getToken';

const Impuestos = () => {
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
            name: 'IMPUESTO',
            selector: row => row.TAX,
            sortable: true,
        },
        {
            name: 'ESTADO',
            selector: row => row.NAM_STATUS,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className={'btn btn-sm btn-warning mr-1 '} onClick={() => {setRowCOD(row.COD_TAX)}} data-toggle="modal" data-target='#editFormTax'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className={'btn btn-sm btn-danger '} onClick={() => handleDelete(row.COD_TAX) }><i className="fa-solid fa-trash"></i></button>
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
        axios.get('/taxes', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })

    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/taxes/${cod}`, token())
        .then(res => setSendRequest(true))
    }

    useEffect(() => {
        axios.get(`/user-permissions`,token())
        .then(res => {
            const result = res.data.find(row => row.COD_MODULE === 6 && row.COD_TABLE === 24)
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
                    Impuestos
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className={'btn btn-sm btn-primary'} data-toggle="modal" data-target='#addFormTax'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                        actions
                    />

                    <Modal 
                        idModal='addFormTax'
                        title='Agregar Impuesto'
                        messageError={messageError}
                        content={<AddTaxForm setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />
                    <Modal 
                        idModal='editFormTax'
                        title='Editar Impuesto'
                        messageError={messageError}
                        content={<EditTaxForm rowCOD ={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                    />
                </div>
            </div>
    )
}

export default Impuestos;
