import { useEffect,useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import DataTable from "react-data-table-component";
import AlertError from "../AlertError";
import moment from "moment";


const AddFacturaForm = ({setSendRequest}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [inputProduct, setinputProduct] = useState({
        userCodProduct: '',
        userCantProduct: ''
    })

    const [formAddFactura, setformAddFactura] = useState({
        SUBTOTAL: 0,
        TOT_ISV: 0,
        TOT_PURCHASE: 0,
        TYP_TO_PURCHASE: '',
        COD_TYP_PAY: '',
        DAT_INVOICE: '',
        DESCRIPTION: '',
        DATE_LIMIT: ''
    });

    const {
        SUBTOTAL,
        TOT_ISV,
        TOT_PURCHASE,
        TYP_TO_PURCHASE,
        COD_TYP_PAY,
        DAT_INVOICE,
        DESCRIPTION,
        DATE_LIMIT
    } = formAddFactura

    const {
        userCodProduct,
        userCantProduct
    } = inputProduct

    //producto seleccionado
    const [product, setProduct] = useState({
        COD_PRODUCT: '',
        NAM_PRODUCT: ''
    });

    //lista de productos
    const [productList, setProductList] = useState([]);

    const columns = [
        {
            name: 'CÓDIGO',
            selector: row => row.COD_PRODUCT,
        },
        {
            name: 'NOMBRE',
            selector: row => row.NAM_PRODUCT,
        },
        {
            name: 'PRECIO UNITARIO',
            selector: row => row.PRICE,
            format: row => `L. ${row.PRICE.toFixed(2)}`
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'ISV',
            selector: row => row.ISV,
            format: row => `L. ${row.ISV.toFixed(2)}`
        },
        {
            name: 'TOTAL',
            selector: row => row.TOTAL,
            format: row => `L. ${row.TOTAL.toFixed(2)}`
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-danger'onClick={() => handleDelete(row.COD_PRODUCT)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    useEffect(() => {
        if(userCodProduct){
            axios.get(`/inventory/${userCodProduct}`, token())
                .then(res => {
                    console.log(res.data[0])
                    if(res.data[0]){
                        setProduct(res.data[0])
                    }else{
                        setProduct({
                            NAM_PRODUCT: 'Producto no encontrado'
                        })
                    }
                })
        }
    }, [userCodProduct])

    useEffect(() => {

        setformAddFactura({
            ...formAddFactura,
            SUBTOTAL: productList.reduce((acum, current) => acum + current.PRICE, 0),
            TOT_ISV: productList.reduce((acum, current) => acum + current.ISV, 0),
            TOT_PURCHASE: productList.reduce((acum, current) => acum + current.TOTAL, 0),
        })
    }, [productList])

    const handleInputChange = e => {
        setformAddFactura({
            ...formAddFactura,
            [e.target.name]: e.target.value
        })
    }

    const handleInputProduct = e => {
        setinputProduct({
            ...inputProduct,
            [e.target.name]: e.target.value
        })
    }

    const addProduct = () => {
        const {COD_PRODUCT, NAM_PRODUCT, PURCHASE_PRICE, ISV} = product

        if(!userCodProduct || NAM_PRODUCT === 'Producto no encontrado'){
            setErrorMessage('Ingrese un código de producto válido.')
            
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);

            return;
        }

        const isExistProduct = productList.some(row => row.COD_PRODUCT === COD_PRODUCT);

        if(isExistProduct){
            setErrorMessage('El producto ya se encuentra agregado en la lista.')
            
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);

            return;
        }

        if(userCantProduct === ''){
            setErrorMessage('Ingrese una cantidad.');

            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
            return;
        }

        const item = {
            COD_PRODUCT,
            NAM_PRODUCT,
            PRICE: PURCHASE_PRICE - (ISV * PURCHASE_PRICE),
            ISV: ISV * (PURCHASE_PRICE * userCantProduct),
            CANT_PRODUCTS: userCantProduct,
            TOTAL: PURCHASE_PRICE * userCantProduct
        }

        setProductList([
            ...productList,
            item
        ])

        resetState()
    }

    const resetState = () => {
        setinputProduct({
            userCodProduct: '',
            userCantProduct: ''
        })

        setProduct({
            COD_PRODUCT: '',
            NAM_PRODUCT: ''
        })
    }

    const handleDelete = (cod) => {
        const newArray = productList.filter(row => row.COD_PRODUCT !== cod);

        setProductList(newArray);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!productList.length){
            setErrorMessage('Debe agregar al menos un producto a la lista.');

            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
            return;
        }

        if(formAddFactura.COD_ORDER === ''){
            delete formAddFactura['COD_ORDER'];
        }
        if(DESCRIPTION === ''){
            delete formAddFactura['DESCRIPTION'];
        }
        if(DATE_LIMIT === ''){
            delete formAddFactura['DATE_LIMIT'];
        }
        axios.post('/purchase-invoice', formAddFactura, token())
            .then(res => {
                sendDetail();
            })
            .catch(res => {
                const {message} = res.response.data
                setErrorMessage(message)
            
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            })
    }

    const sendDetail = () => {
        axios.post('/purchase-detail', productList, token())
            .then(res => {
                setformAddFactura({
                    SUBTOTAL: 0,
                    TOT_ISV: 0,
                    TOT_PURCHASE: 0,
                    TYP_TO_PURCHASE: '',
                    COD_TYP_PAY: '',
                    DAT_INVOICE: '',
                    DESCRIPTION: '',
                    DATE_LIMIT: ''
                })
                setSendRequest(true);
                document.querySelector('#closeModalAddPurchase').click()
                setProductList([]);
            })
    }
    
    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="COD_ORDER">Código del pedido</label>
                    <input onChange={handleInputChange} className='form-control' name='COD_ORDER' type="number" />
                    <small className="text-muted text-sm">Opcional</small>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="COD_PRODUCT">Código del producto<span className="text-danger"> *</span></label>
                    <input value={userCodProduct} onChange={handleInputProduct} className='form-control' name='userCodProduct' type="number"/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="NAM_PRODUCT">Nombre del producto </label>
                    <input value={product.NAM_PRODUCT} className='form-control' name='NAM_PRODUCT' type="text" disabled/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad de productos<span className="text-danger"> *</span></label>
                    <input value={userCantProduct} onChange={handleInputProduct} className='form-control' name='userCantProduct' type="number"min="1" />
                </div>
                <div className="col-md-4 mt-2">
                    <label className="form-label" htmlFor="TYP_TO_PURCHASE">Tipo de compra<span className="text-danger"> *</span></label>
                    <select value={TYP_TO_PURCHASE} onChange={handleInputChange} className="form-control" name="TYP_TO_PURCHASE" type="text" required>
                        <option value={''}>-Seleccionar-</option>
                        <option value="Contado">Contado</option>
                        <option value="Crédito">Crédito</option>
                    </select>
                </div>
                <div className="col-md-4 mt-2">
                    <label className="form-label" htmlFor="COD_TYP_PAY">Forma de pago<span className="text-danger"> *</span></label>
                    <select value={COD_TYP_PAY} onChange={handleInputChange} className="form-control" name="COD_TYP_PAY" type="text" required>
                            <option value={''}>-Seleccionar-</option>
                            <option value={1}>Efectivo</option>
                            <option value={2}>Tarjeta</option>
                            <option value={3}>Transferencia</option>
                    </select>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="DAT_INVOICE">Fecha<span className="text-danger"> *</span></label>
                    <input max={moment().format('YYYY-MM-DD')} value={DAT_INVOICE} onChange={handleInputChange} className='form-control' name='DAT_INVOICE' type="date" required/>
                </div>
                <div className="col-md-1">
                    <div className="mt-3">
                        <button onClick={() => addProduct()} type="button" className="btn btn-success mt-4" title="Agregar producto">+</button>
                    </div>
                </div>
                {
                    TYP_TO_PURCHASE === 'Crédito'
                    ?
                    <>
                        <div className="col-md-4 mt-2">
                            <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                            <textarea onChange={handleInputChange} value={DESCRIPTION} rows={3} className='form-control' name='DESCRIPTION' type="text" placeholder="Descripción de la cuenta por pagar" required/>
                        </div>
                        <div className="col-md-3 mt-2">
                            <label className='form-label' htmlFor="DATE_LIMIT">Fecha limite CP</label>
                            <input value={DATE_LIMIT} onChange={handleInputChange} className='form-control' name='DATE_LIMIT' type="date" required/>
                        </div>
                    </>
                    :
                    null
                }
                <DataTable
                    columns={columns}
                    data={productList}
                    responsive
                    highlightOnHover
                    striped
                    persistTableHead 
                />
            </div>
            
            <div className="row mt-2">
                    <div className="col-10 text-right">
                        <h6>Subtotal</h6>
                        <h6>ISV total</h6>
                        <h5>Total</h5>
                    </div>
                    <div className="col-2">
                        <h6>{`L. ${SUBTOTAL.toFixed(2)}`}</h6>
                        <h6>{`L. ${TOT_ISV.toFixed(2)}`}</h6>
                        <h5>{`L. ${TOT_PURCHASE.toFixed(2)}`}</h5>
                    </div>
                </div>
            <div className="modal-footer">
                <button type="button" id='closeModalAddPurchase' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
            {errorMessage ? <AlertError message={errorMessage}/> : null}
        </form>
    )
} 
        
export default AddFacturaForm;