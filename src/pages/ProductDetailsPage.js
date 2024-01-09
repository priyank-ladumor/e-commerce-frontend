import React from 'react'
import ProductDetails from '../components/ProductDetails'
import Navbar from '../components/Navbar'

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
