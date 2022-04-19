import React from 'react'
import DataTable from 'react-data-table-component';
import Modal from '../Modal';
import Inventory from './Inventory';

const ProductsList = ({user, client, setCurrentPage}) => {

    const columns = [
        {
            name: 'Código',
            selector: row => row.title,
        },
        {
            name: 'Producto',
            selector: row => row.year,
        },
        {
            name: 'Descripción',
            selector: row => row.year,
        },
        {
            name: 'Cantidad',
            selector: row => row.year,
        },
        {
            name: 'Precio',
            selector: row => row.year,
        },
        {
            name: 'Descuento',
            selector: row => row.year,
        },
        {
            name: 'Total',
            selector: row => row.year,
        },
        {
            name: 'Eliminar',
            selector: row => row.year,
        }
    ];

    const data = []

  return (
    <div className="card text-dark card-facturar shadow">
        <div className="card-header">Detalle de productos</div>
        <div className="card-body p-3">
            <div className="form-group row small mb-0">
                <label className="col-sm-1 col-form-label pr-0">Factura</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="number" 
                    className="form-control form-control-sm" 
                    disabled
                    />
                </div>
                <label className="col-sm-1 col-form-label pr-0">Usuario</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    disabled
                    value={user.name}
                    />
                </div>
                <label className="col-sm-1 col-form-label pr-0">Cliente</label>
                <div className="col-sm-2 px-0">
                    <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    disabled
                    value={client.name}
                    />
                </div>
            </div>
        </div>
        <hr className='mt-0'/>
        <div className="row">
            <div className="col-6">
                <h6 className='ml-2'>Productos</h6>
            </div>
            <div className="col-6 text-right">
                <div className="btn btn-success mr-3" data-toggle="modal" data-target='#sale-inventory'><i className="fa-solid fa-plus"></i></div>
            </div>
        </div>
        <DataTable
            columns={columns}
            data={data}
            persistTableHead
            striped
            className='bg-light'
        />
        <Modal 
            idModal='sale-inventory'
            title='Inventario'
            content={<Inventory />}
            modalSize='xl'
        />
        <hr />
        <div className="row">
            <div className="col-10 text-right">
                <h6>Subtotal</h6>
                <h6>Descuento total</h6>
                <h6>ISV 15%</h6>
                <h4>Total</h4>
            </div>
            <div className="col-2">
                <h6>L. 0.00</h6>
                <h6>L. 0.00</h6>
                <h6>L. 0.00</h6>
                <h4>L. 0.00</h4>
            </div>
        </div>
        <div className="modal-footer">
        <button onClick={() => setCurrentPage(1)} className="btn btn-dark">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={() => setCurrentPage(3)} className="btn btn-dark">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export default ProductsList