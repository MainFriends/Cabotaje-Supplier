import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import DataTable from 'react-data-table-component';


const AddOrder = ({setSendRequest,setMessageError}) => {
    const [FormAddOrder, setFormAddOrder] = useState({
        COD_SUPPLIER:'',
        DAT_REQUIRED: ''
    })

    const [formAddOrderDetail, setFormAddOrderDetail] = useState({
        COD_PRODUCT: '',
        DES_ORDER: '',
        CANT_PRODUCTS: ''
    })

    const [suppliers, setSuppliers] = useState([]);

    const {
        DAT_REQUIRED
    } = FormAddOrder

    const {
        COD_PRODUCT,
        DES_ORDER,
        CANT_PRODUCTS
    } = formAddOrderDetail


    const resetStates = () => {
        setFormAddOrderDetail({
            COD_PRODUCT: '',
            DES_ORDER: '',
            CANT_PRODUCTS: ''
        })

        setProduct({
            COD_PRODUCT: '',
            NAM_PRODUCT: '',
        })
    }

    const [product, setProduct] = useState({
        COD_PRODUCT: '',
        NAM_PRODUCT: '',
    });

    const [productsAdd, setProductsAdd] = useState([]);

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
                <button type='button' className='btn btn-sm btn-danger'onClick={() => handleDelete(row.COD_PRODUCT)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    useEffect(() => {
        if(formAddOrderDetail.COD_PRODUCT){
            axios.get(`/inventory/${formAddOrderDetail.COD_PRODUCT}`, token())
            .then(res => {
                if(res.data[0]){
                    setProduct(res.data[0])
                }else{
                    setProduct({
                        ...product,
                        COD_PRODUCT: '',
                        NAM_PRODUCT: 'Producto no encontrado',
                    })
                }
            })
        }

    }, [formAddOrderDetail.COD_PRODUCT])

    useEffect(() => {
        axios.get('/supplier', token())
            .then(res => setSuppliers(res.data))
    }, [])

    const handleInputChange = (e) => {
        setFormAddOrder({
            ...FormAddOrder,
            [e.target.name]: e.target.value
        })
    }

    const handleInputChangeDetail = e => {
        setFormAddOrderDetail({
            ...formAddOrderDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleAddProduct = () => {
        const {COD_PRODUCT, NAM_PRODUCT} = product
        const {DES_ORDER, CANT_PRODUCTS} = formAddOrderDetail

        if(formAddOrderDetail.COD_PRODUCT === ''){
            setMessageError('Inserte un producto');

            setTimeout(() => {
                setMessageError("")
            }, 3000);

            return
        }

        const isItemAdd = productsAdd.some(item => item.COD_PRODUCT === COD_PRODUCT);

        if(isItemAdd){
            setMessageError('El producto ya se encuentra agregado en la lista.');

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

        setProductsAdd([...productsAdd, item])
        resetStates();
    }

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        axios.post('/order', FormAddOrder, token())
            .then(res => {
                document.querySelector('#idCloseForm').click();
                e.target.reset();
                setSendRequest(true);
                submitDetail();

                resetStates();
                setProductsAdd([]);
                setFormAddOrder({
                    COD_SUPPLIER:'',
                    DAT_REQUIRED: ''
                })
            })

    }

    const submitDetail = () => {
        axios.post('/order-detail', productsAdd, token())
    }

    const handleDelete = (cod) => {
        const elemento = productsAdd.filter(product => product.COD_PRODUCT !== cod)
        setProductsAdd([...elemento])
    }

            return (
                <form onSubmit={handleSubmitOrder} action='#'>
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <label className='form-label' htmlFor="COD_SUPPLIER">Proveedor</label>
                            <select onChange={handleInputChange} defaultValue={'default'} className="form-control" name="COD_SUPPLIER" type="text" required>
                                <option value=''>-Seleccionar-</option>
                                {suppliers.map(supplier => {
                                    return <option key={supplier.COD_SUPPLIER} value={supplier.COD_SUPPLIER}>{supplier.NAM_SUPPLIER}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className='form-label' htmlFor="COD_PRODUCT">Codigo del producto</label>
                            <input onChange={handleInputChangeDetail} value={COD_PRODUCT} className='form-control' name='COD_PRODUCT' type="number"min="1"/>
                        </div>
                        <div className="col-md-4">
                            <label className='form-label' htmlFor="NAME_PRODUCT">Nombre del Producto</label>
                            <input value={product.NAM_PRODUCT} className='form-control' name='NAME_PRODUCT' disabled />
                        </div>
                        <div className="col-md-4 mt-2">
                            <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad</label>
                            <input onChange={handleInputChangeDetail} value={CANT_PRODUCTS} className='form-control' name='CANT_PRODUCTS' type="number"min="1"/>
                        </div>
                        <div className="col-md-4 mt-2">
                            <label className='form-label' htmlFor="DAT_REQUIRED">Fecha requerida</label>
                            <input onChange={handleInputChange} value={DAT_REQUIRED} className='form-control' name='DAT_REQUIRED' type="date" required/>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="mt-2">
                                <button onClick={() => handleAddProduct()} type="button" className="btn btn-success mt-4" title="Agregar producto"><i className="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <label className='form-label' htmlFor="DES_ORDER">Descripcion</label>
                            <textarea onChange={handleInputChangeDetail} value={DES_ORDER} rows={3} className='form-control' name='DES_ORDER' type="text"/>
                        </div>

                        <DataTable
                            columns={columns}
                            data={productsAdd}
                            responsive
                            highlightOnHover
                            striped
                            persistTableHead 
                        />
        
                    </div>
                    <div className="modal-footer">
                        <button type="button" id='idCloseForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                        <button type='submit' className="btn btn-success">Guardar</button>
                    </div>
                </form>
            )
        } 
export default AddOrder;