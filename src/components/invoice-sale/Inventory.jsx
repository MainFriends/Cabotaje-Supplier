import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';
import token from '../../helpers/getToken';

const Inventory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [selectProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get('/categories', token())
            .then(res => setCategories(res.data))
    }, [])

    useEffect(() => {
        if(selectedCategory){
            axios.get(`/products/${selectedCategory}`, token())
            .then(res => setProductsList(res.data))
        }
    }, [selectedCategory])

    useEffect(() => {
        if(selectProduct){
            axios.get(`/inventory/${selectProduct}`, token())
            .then(res => console.log(res.data))
        }
    }, [selectProduct])
    

  return (
    <>
        <div className="row">
            <div className="col-8">
                <h6>Productos</h6>
                <div className="row">
                    {categories.map(({COD_CATEGORY, NAM_CATEGORY}) => <div key={COD_CATEGORY} className="col-3 mt-1 px-1"><div onClick={() => setSelectedCategory(COD_CATEGORY)} className="btn btn-success btn-block">{NAM_CATEGORY}</div></div>)}
                </div>
                <div className="row">
                    {productsList.map(({COD_PRODUCT, NAM_PRODUCT}) => <div key={COD_PRODUCT} className="col-3 mt-1 px-1"><div onClick={() => setSelectedProduct(COD_PRODUCT)} className="btn btn-danger btn-block">{NAM_PRODUCT}</div></div>)}
                </div>
            </div>
            <div className="col-4 px-1">
                <h6 className='mb-1'>Cantidad</h6>
                <input className='form-control form-control-lg' type="number" />
            </div>
        </div>
    </>
    
  )
}

export default Inventory