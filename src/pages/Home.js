import React from 'react'
import Navbar from '../components/navbar/Navbar'
import HomeCarousel from '../components/home/HomeCarousel.js'
import HomeSectionCarousel from '../components/home/HomeSectionCarousel.js'
import ProductList from "../components/products/ProductList.js"

const Home = () => {
    return (
        <div className='bg-white'>
            <Navbar>
                <HomeCarousel />
                <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                    <HomeSectionCarousel />
                </div>
                <ProductList />
            </Navbar>
        </div>
    )
}

export default Home
