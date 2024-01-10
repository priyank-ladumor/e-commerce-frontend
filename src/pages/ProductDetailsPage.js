import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProductDetails from '../components/products/ProductDetails'

const ProductDetailsPage = () => {
  return (
    <div>
         <div>
            <Navbar>
                <ProductDetails />
            </Navbar>
        </div>
    </div>
  )
}

export default ProductDetailsPage
