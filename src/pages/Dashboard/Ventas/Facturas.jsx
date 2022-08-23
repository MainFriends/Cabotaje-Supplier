import DataTable from 'react-data-table-component';
import moment from 'moment';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';

import { getInvoices } from '../../../services/sale-invoice';
import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import SaleDetail from '../../../components/sale-detail/SaleDetail';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';

const dowlandPdfReceivable = (companyData, salesDetail, COD_INVOICE, CLIENT, SUBTOTAL, TOT_ISV, TOT_SALE, TYP_TO_SALE, DAT_INVOICE, RTN) => {
    const doc = new jsPDF();   
    const image = logo
    doc.addImage(image, 'PNG', 10, 9,20,30,'Cabotaje');
  
    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`;

    doc.setFontSize(10)
    doc.text(`Factura proforma`, 170, 7)
    doc.setFontSize(22)
    doc.text(`${companyData.COMPANY_NAM.toUpperCase()}`,35,15);
    doc.setFontSize(10)
    doc.text(`Direccion: ${companyData.COMPANY_ADDRESS}`, 35,25);
    doc.text(`Teléfono: ${companyData.COMPANY_PHONE}`, 35,32);
    doc.text(`Correo: ${companyData.COMPANY_EMAIL}`, 35, 39);
    doc.text(`RTN: ${companyData.COMPANY_RTN}`, 35, 46);
    doc.setFontSize(10)
    doc.text(`Usuario: ${nombreReporte}`, 15, 58);
    doc.text(`Nombre: ${CLIENT}`, 15, 65);
    doc.text(`RTN: ${RTN}`,15, 72);
    doc.text(`Fecha: ${moment(DAT_INVOICE).format('DD-MM-YYYY')}` ,143, 58)
    doc.text(`N° de factura: ${COD_INVOICE}`, 143, 65);
    doc.setFontSize(12)
    doc.text(`SUBTOTAL:`, 150, 250);
    doc.text(`TOTAL ISV:`, 151, 260);
    doc.text(`TOTAL A PAGAR:`, 139,270)
    doc.text(`_________________________________________________________________________________`,103, 240, {align: 'center'} )
    doc.text(`L. ${SUBTOTAL.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,200,250, {align: 'right'})
    doc.text(`L.${TOT_ISV.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,200,260, {align: 'right'})
    doc.text(`L. ${TOT_SALE.toLocaleString('es-MX', {minimumFractionDigits: 2})}`, 200, 270, {align: 'right'});
    doc.setFontSize(8)
    doc.text(`${companyData.COMPANY_LOCATION}`, 15, 270)
    doc.text(`Pago al ${TYP_TO_SALE.toLowerCase()}`,15,266);
    
    const row = salesDetail.map(fila => {
        return [
            fila.NAM_PRODUCT,
            fila.CANT_PRODUCTS,
            `L. ${fila.PRICE.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            `L. ${fila.TOTAL.toLocaleString('es-MX', {minimumFractionDigits: 2})}`
        ]
    })  

    doc.autoTable({
        head: [['PRODUCTO', 'CANTIDAD', 'PRECIO', 'TOTAL']],
        body: row.sort(),
        startY: 80,
        columnStyles: {
            3: {
                halign: 'right'
            },
            4: {
                halign: 'right'
            },
            5: {
                halign: 'right'
            }
        } 
    })
  
    doc.save('Factura.pdf')
  }

const Facturas = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [pending, setPending] = useState(true);
    const [rowCOD, setRowCOD] = useState(null);
    const [salesDetail, setSalesDetail] = useState([]);
    const [products, setProducts] = useState([])
    const [companyData, setCompanyData] = useState({
        COMPANY_NAM: '',
        COMPANY_ADDRESS: '',
        COMPANY_EMAIL: '',
        COMPANY_RTN: '',
        COMPANY_PHONE: '',
        COMPANY_LOCATION: '',
        COMPANY_FACEBOOK: '',
        COMPANY_INSTAGRAM: '',
        COMPANY_WHATSAPP: '',
        USER_LAST_UPDATE: '',
    });

    useEffect(() => {
        axios.get('/company-information', token())
        .then(res => setCompanyData(res.data[0]))
    }, [])

    const generateReport = async (COD_INVOICE, CLIENT, SUBTOTAL, TOT_ISV, TOT_SALE, TYP_TO_SALE, DAT_INVOICE, RTN) => {
        await axios.get(`/sale-detail/${COD_INVOICE}`, token())
            .then(res => setSalesDetail(res.data))

        dowlandPdfReceivable(companyData, salesDetail, COD_INVOICE, CLIENT, SUBTOTAL, TOT_ISV, TOT_SALE, TYP_TO_SALE, DAT_INVOICE, RTN)
    }
    
    //definir las columnas
    const columns = [
        {
            id: "id",
            name: '# FACTURA',
            selector: row => row.COD_INVOICE,
            sortable: true
        },
        {
            name: 'CLIENTE',
            selector: row => row.CLIENT,
            sortable: true,
            allowOverflow: true
        },
        {
            name: 'SUBTOTAL',
            selector: row => row.SUBTOTAL,
            sortable: true,
            format: row => `L ${row.SUBTOTAL.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            right: true
        },
        {
            name: 'TOTAL DESCUENTO',
            selector: row => row.TOT_DISCOUNT,
            sortable: true,
            format: row => `L ${row.TOT_DISCOUNT.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            right: true
        },
        {
            name: 'TOTAL ISV',
            selector: row => row.TOT_ISV,
            sortable: true,
            format: row => `L ${row.TOT_ISV.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            right: true
        },
        {
            name: 'TOTAL VENTA',
            selector: row => row.TOT_SALE,
            sortable: true,
            format: row => `L ${row.TOT_SALE.toLocaleString('es-MX', {minimumFractionDigits: 2})}`,
            right: true
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
            cell: row => <>
            <button className='btn btn-sm btn-primary mr-2' data-toggle="modal" data-target='#viewDetail' onClick={() => setRowCOD(row.COD_INVOICE)}><i className="fa-solid fa-eye"></i></button>
            <button className='btn btn-sm btn-danger' onClick={() => generateReport(row.COD_INVOICE, row.CLIENT, row.SUBTOTAL, row.TOT_ISV, row.TOT_SALE, row.TYP_TO_SALE, row.DAT_INVOICE, row.RTN)}><i className="fa-solid fa-download"></i></button>
            </>
        },
    ];

    const filteredItems = rows.filter(item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

    const subHeaderComponentMemo = useMemo(() => {
    	return (
                <FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} />
        	);
    }, [filterText]);

    useEffect(async () => {
        const data = await getInvoices();
        setRows(data);
        setPending(false);
    },[]);

    return (
            pending
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Detalle de venta
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
                    />

                    <Modal 
                        idModal='viewDetail'
                        title='Detalle de venta'
                        content={<SaleDetail rowCOD={rowCOD}/>}
                        modalSize='xl'
                    />
                </div>
            </div> 
    )
}

export default Facturas;