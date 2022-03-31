import {useEffect, useState, useMemo} from 'react';
import DataTable from 'react-data-table-component';
import Spinner from '../../../components/Spinner';
import { getInvoices } from '../../../services/sale-invoice';
import moment from 'moment';


const FilterComponent = ({ filterText, onFilter}) => (
	<>
		<input
			id="search"
            className='form-control form-control-sm filterInput'
			type="text"
			placeholder="Buscar cliente"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}>
		</input>
	</>
);

const Facturas = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [pending, setPending] = useState(true);
  
    useEffect(async () => {
        const data = await getInvoices();

        //agregar botones de accion a las filas
        const rows = data.map(invoice => {
            const {COD_INVOICE} = invoice;
            return {
                ...invoice,
                ACTIONS: <>
                        <button className='btn btn-sm btn-primary me-1' onClick={() => handleDetail(COD_INVOICE)}><i className="fa-solid fa-eye"></i></button>
                </>
            }
        });

        
        setRows(rows);
        setPending(false);
    },[]);

    const handleDetail = (COD_INVOICE) => {
        console.log(COD_INVOICE);
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const columns = [
        {
            name: '# Factura',
            selector: row => row.COD_INVOICE,
            sortable: true,
        },
        {
            name: 'CLIENTE',
            selector: row => row.CLIENT,
            sortable: true,
        },
        {
            name: 'SUBTOTAL',
            selector: row => row.SUBTOTAL,
            sortable: true,
            format: row => `L ${row.SUBTOTAL.toFixed(2)}`
        },
        {
            name: 'TOTAL DESCUENTO',
            selector: row => row.TOT_DISCOUNT,
            sortable: true,
            format: row => `L ${row.TOT_DISCOUNT.toFixed(2)}`
        },
        {
            name: 'TOTAL ISV',
            selector: row => row.TOT_ISV,
            sortable: true,
            format: row => `L ${row.TOT_ISV.toFixed(2)}`
        },
        {
            name: 'TIPO DE TRANSACCIÓN',
            selector: row => row.TYP_TO_SALE,
            sortable: true,
        },
        {
            name: 'FORMA DE PAGO',
            selector: row => row.NAM_TYPE_PAY,
            sortable: true,
        },
        {
            name: 'USUARIO',
            selector: row => row.USER_NAME,
            sortable: true,
            allowOverflow: true
        },
        {
            name: 'FECHA',
            selector: row => row.DAT_INVOICE,
            sortable: true,
            allowOverflow: true,
            format: row => moment(row.DAT_INVOICE).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            selector: row => row.ACTIONS,
        },
    ];

    const filteredItems = rows.filter(
        invoice => invoice.CLIENT && invoice.CLIENT.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
    	return (
        		<FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} />
        	);
    }, [filterText]);

    return (
            pending
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <DataTable
                    title="Transacciones de venta"
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
            </div> 
    )
}

export default Facturas;