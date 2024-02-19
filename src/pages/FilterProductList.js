import React from 'react'
import ProductList from '../components/products/ProductList'
import Navbar from '../components/navbar/Navbar'

const FilterProductList = () => {
    return (
        <div style={{background:"whitesmoke", minHeight:"100vh"}} >
            <Navbar>
                <ProductList />
            </Navbar>
        </div>
    )
}

export default FilterProductList
