import React from 'react'
import ProductList from '../components/products/ProductList'
import Navbar from '../components/navbar/Navbar'

const FilterProductList = () => {
    return (
        <div style={{background:"#F5F5F5", minHeight:"100vh"}} >
            <Navbar>
                <ProductList />
            </Navbar>
        </div>
    )
}

export default FilterProductList
