import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import DataTable from "react-data-table-component";
import moment from "moment";
import AlertError from "../AlertError";


const EditFacturaForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const columns = [
        {
            name: 'NOMBRE',
            selector: row => row.NAM_PRODUCT,
        },
        {
            name: 'PRECIO',
            selector: row => row.PRICE,
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT_PRODUCTS,
        },
        {
            name: 'TOTAL',
            selector: row => row.TOTAL,
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-danger'><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];
    
    return (
        <form id='AddFormFactura' action='#'>
        <div className="row mb-4">
            <div className="col-md-3">
                <label className='form-label' htmlFor="COD_ORDER">Codigo del pedido</label>
                <input className='form-control' name='COD_ORDER' type="number" />
            </div>
            <div className="col-md-3">
                <label className='form-label' htmlFor="COD_PRODUCT">Codigo del producto</label>
                <input className='form-control' name='COD_PRODUCT' type="number" />
            </div>
            <div className="col-md-4">
                <label className='form-label' htmlFor="NAM_PRODUCT">Nombre del producto</label>
                <input className='form-control' name='NAM_PRODUCT' type="text" disabled/>
            </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="CANT_PRODUCTS">Cantidad de productos</label>
                <input className='form-control' name='CANT_PRODUCTS' type="number"min="1" />
            </div>
            <div className="col-md-4 mt-2">
                <label className="form-label" htmlFor="TYP_TO_PURCHASE">Tipo de compra</label>
                <select defaultValue={''} className="form-control" name="TYP_TO_PURCHASE" type="text" required>
                    <option value={''}>-Seleccionar-</option>
                    <option value="1">Contado</option>
                    <option value="2">Credito</option>
                </select>
            </div>
            <div className="col-md-4 mt-2">
                <label className="form-label" htmlFor="COD_TYP_PAY">Forma de pago</label>
                <select defaultValue={''} className="form-control" name="COD_TYP_PAY" type="text" required>
                        <option value={''}>-Seleccionar-</option>
                        <option value={1}>Efectivo</option>
                        <option value={2}>Tarjeta</option>
                        <option value={3}>Transferencia</option>
                </select>
            </div>
            <div className="col-md-4 mt-2">
                <label className='form-label' htmlFor="DAT_INVOICE">Fecha</label>
                <input  className='form-control' name='DAT_INVOICE' type="date" required/>
            </div>
            <div className="col-md-4">
                <div className="mt-3">
                    <button type="button" className="btn btn-success mt-4" title="Agregar producto">+</button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={[]}
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
                    <h3>Total</h3>
                </div>
                <div className="col-2">
                    <h6>L. 0.00</h6>
                    <h6>L. 0.00</h6>
                    <h3>L. 0.00</h3>
                </div>
            </div>
        <div className="modal-footer">
            <button type="button" id='idCloseForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
            <button type='submit' className="btn btn-success">Guardar</button>
        </div>
    </form>
    )
        } 
        
export default EditFacturaForm;