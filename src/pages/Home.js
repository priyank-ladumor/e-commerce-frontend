import React from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'
import Login from './Login'
import Register from './Register'

const Home = () => {
    return (
        <div>
            <Navbar>
                <ProductList />
            </Navbar>
        </div>
    )
}

export default Home
