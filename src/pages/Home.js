import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import HomeCarousel from '../components/home/HomeCarousel.js'
import ProductList from "../components/products/ProductList.js"
import HomeSectionCarousel from '../components/home/HomeSectionCarousel.js'
import { useDispatch } from 'react-redux'
import { findUserRole } from '../store/action/authAction.js'

const Home = () => {
    const dispatch = useDispatch()
    const auth = localStorage.getItem("token")
    useEffect(() => {
        dispatch(findUserRole(auth))
    }, [])
    return (
        <div className='bg-white'>
            <Navbar>
                <div className="">
                    <HomeCarousel />
                    <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                        <HomeSectionCarousel />
                    </div>
                    <ProductList />
                </div>
            </Navbar>
        </div>
    )
}

export default Home
