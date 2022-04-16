import React, { useState } from 'react'

const Inventory = () => {
    const productsType = ['Carnes', 'Lacteos', 'Jugos', 'Embutidos'];
    const productsList = [
        {
            codigo: 1,
            producto: 'Carne molida',
            descripcion: 'libra',
            cantidad: 20,
            precio: 50,
            descuento: 0,
            tipo: 'Carnes'
        },
        {
            codigo: 2,
            producto: 'Bistep',
            descripcion: 'libra',
            cantidad: 15,
            precio: 75,
            descuento: 0,
            tipo: 'Carnes'
        },
        {
            codigo: 3,
            producto: 'Coca-Cola',
            descripcion: '1 litro',
            cantidad: 45,
            precio: 35,
            descuento: 0,
            tipo: 'Jugos'
        },
        {
            codigo: 4,
            producto: 'Pepsi',
            descripcion: '3 litros',
            cantidad: 12,
            precio: 50,
            descuento: 0,
            tipo: 'Jugos'
        },
        {
            codigo: 5,
            producto: 'Leche',
            descripcion: '1 Litro',
            cantidad: 20,
            precio: 25,
            descuento: 0,
            tipo: 'Lacteos'
        },
        {
            codigo: 6,
            producto: 'Mantequilla',
            descripcion: 'libra',
            cantidad: 20,
            precio: 10,
            descuento: 0,
            tipo: 'Lacteos'
        },
    ]
    const [productTypeSelected, setProductTypeSelected] = useState(null);
    

  return (
    <>
        <div className="row">
            <div className="col-10">
                <div className="row">
                    {productsType.map(product => <div onClick={() => setProductTypeSelected(product)} className="col-2 btn btn-success btn-lg mt-1 mr-1">{product}</div>)}
                </div>
                <div className="row">
                    {productsList.map(product => product.tipo === productTypeSelected && (<div className="col-2 btn btn-danger btn-lg mt-1 mr-1">{product.producto}</div>))}
                </div>
            </div>
            <div className="col-2">
                
            </div>
        </div>
    </>
    
  )
}

export default Inventory