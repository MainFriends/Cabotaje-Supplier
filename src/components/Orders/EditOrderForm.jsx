import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import DataTable from 'react-data-table-component';
import moment from "moment";


const EditOrder = ({rowCOD,setSendRequest,setMessageError}) => {
    const [formEditOrder, setFormEditOrder] = useState({
        COD_SUPPLIER:'',
        DAT_REQUIRED: '',
        DES_ORDER:'',
        COD_STATUS:''
    })

    const [formEditOrderDetail, setFormEditOrderDetail] = useState({
        COD_PRODUCT: '',
        DES_ORDER: '',
        CANT_PRODUCTS: ''
    });

    const [product, setProduct] = useState({
        NAM_PRODUCT: '',
    });

    const {
        COD_PRODUCT,
        DES_ORDER
    } = formEditOrderDetail

    
    const [productsEdit, setProductsEdit] = useState([]);

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_PRODUCT,
        },
        {
            name: 'NOMBRE',
            selector: row => row.NAM_PRODUCT,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DES_ORDER,
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button type='button' className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_PRODUCT)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    useEffect(() => {
        if(formEditOrderDetail.COD_PRODUCT){
            axios.get(`/inventory/${formEditOrderDetail.COD_PRODUCT}`, token())
            .then(res => {
                if(res.data[0]){
                    setProduct(res.data[0])
                }else{
                    setProduct({
                        ...product,
                        NAM_PRODUCT: 'Producto no encontrado',
                    })
                }
            })
        }

    }, [formEditOrderDetail.COD_PRODUCT])

    useEffect(() => {
        if(rowCOD){
            axios.get(`/order/${rowCOD}`, token())
            .then(res => {
                const {DAT_REQUIRED} = res.data[0];
                setFormEditOrder({
                    ...res.data[0],
                    DAT_REQUIRED: moment(DAT_REQUIRED).format('YYYY-MM-DD')
                })
            })
        }
    }, [rowCOD])

    useEffect(() => {
        if(rowCOD){
            axios.get(`/order-detail/${rowCOD}`, token())
            .then(res => setProductsEdit(res.data))
        }
    }, [rowCOD])

    const handleInputChange = (e) => {
        setFormEditOrder({
            ...formEditOrder,
            [e.target.name]: e.target.value
        })
    }

    const handleInputChangeDetail = e => {
        setFormEditOrderDetail({
            ...formEditOrderDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleEditProduct = () => {
        const {COD_PRODUCT, NAM_PRODUCT} = product
        const {DES_ORDER, CANT_PRODUCTS} = formEditOrderDetail

        if(NAM_PRODUCT === "" || NAM_PRODUCT === "Producto no encontrado"){
            setMessageError('Ingrese un producto válido.')

                setTimeout(() => {
                    setMessageError("")
                }, 3000);
            return
        }   

        const isItemEdit = productsEdit.some(item => item.COD_PRODUCT === COD_PRODUCT);

        if(isItemEdit){
                setMessageError('El producto ya se encuentra agregado a la lista')

                setTimeout(() => {
                    setMessageError("")
                }, 3000);
            return
        }

        if(CANT_PRODUCTS === ''){
            setMessageError('Ingrese una cantidad.');

            setTimeout(() => {
                setMessageError('')
            }, 3000);
            return;
        }

        const item = {
            COD_PRODUCT,
            NAM_PRODUCT,
            DES_ORDER,
            CANT_PRODUCTS
        }

        setProductsEdit([...productsEdit, item])
        setFormEditOrderDetail({
            COD_PRODUCT: '',
            DES_ORDER: '',
            CANT_PRODUCTS: ''
        })
        setProduct({
            NAM_PRODUCT: ''
        })
    }

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        axios.put(`/order/${rowCOD}`, formEditOrder, token())
            .then(res => {
                document.querySelector('#idCloseFormEdit').click();
                e.target.reset();
                setSendRequest(true);
                submitDetail();
            })
    }

    const submitDetail = () => {
        axios.put(`/order-detail/${rowCOD}`, productsEdit, token())
    }

    const handleDelete = (cod) => {
        const elemento = productsEdit.filter(product => product.COD_PRODUCT !== cod);
        setProductsEdit([...elemento])
    }
            return (
                <form onSubmit={handleSubmitOrder} action='#'>
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label className='form-label' htmlFor="COD_SUPPLIER">Proveedor</label>
                            <input value={`${formEditOrder.NAM_SUPPLIER}`} className='form-control' name='COD_SUPPLIER' type="text" disabled />
                        </div>
                        <div className="col-md-4">
                            <label className='form-label' htmlFor="COD_PRODUCT">Codigo del producto</label>
                            <input onChange={handleInputChangeDetail} value={formEditOrderDetail.COD_PRODUCT} value={COD_PRODUCT} className='form-control' name='COD_PRODUCT' type="number"min="1"/>
                        </div>
                        <div className="col-md-4">
                            <label className='form-label' htmlFor="NAME_PRODUCT">Nombre del Producto</label>
                            <input value={product.NAM_PRODUCT} className='form-control' name='NAME_PRODUCT' disabled />
                        </div>
                        <div className="col-md-4 mt-2">
                            <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad</label>
                            <input onChange={handleInputChangeDetail} value={formEditOrderDetail.CANT_PRODUCTS}  className='form-control' name='CANT_PRODUCTS' type="number"min="1"/>
                        </div>
                        <div className="col-md-4 mt-2">
                            <label className='form-label' htmlFor="DAT_REQUIRED">Fecha requerida</label>
                            <input onChange={handleInputChange} value={moment(formEditOrder.DAT_REQUIRED).format('YYYY-MM-DD')} className='form-control' name='DAT_REQUIRED' type="date" />
                        </div>
                        <div className="col-md-4">
                            <div className="mt-3">
                                <button onClick={() => handleEditProduct()} type="button" className="btn btn-success mt-4" title="Agregar producto"><i className="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <label className="form-label" htmlFor="COD_STATUS">Estado del pedido</label>
                            <select onChange={handleInputChange} value={formEditOrder.COD_STATUS} className="form-control" name="COD_STATUS" type="text" required>
                                    <option value={''}>-Seleccionar-</option>
                                    <option value={5}>En proceso</option>
                                    <option value={6}>Recibido</option>
                            </select>
                        </div>
                        <div className="col-md-6 mt-2">
                            <label className='form-label' htmlFor="DES_ORDER">Descripcion</label>
                            <textarea onChange={handleInputChangeDetail} value={DES_ORDER} rows={3} className='form-control' name='DES_ORDER' type="text"/>
                        </div>

                        <DataTable
                            columns={columns}
                            data={productsEdit}
                            responsive
                            highlightOnHover
                            striped
                            persistTableHead 
                        />
        
                    </div>
                    <div className="modal-footer">
                        <button type="button" id='idCloseFormEdit' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                        <button type='submit' className="btn btn-success">Guardar</button>
                    </div>
                </form>
            )
        } 
export default EditOrder;