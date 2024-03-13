import React, { useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import HomeCarousel from '../components/home/HomeCarousel.js'
import ProductList from "../components/products/ProductList.js"
import HomeSectionCarousel from '../components/home/MenSectionCarousel.js'
import { useDispatch } from 'react-redux'
import HomeWomenSectionCarousel from '../components/home/WomenSectionCarousel.js'
import HomeKidsSectionCarousel from '../components/home/KidsSectionCarousel.js'
// import { findUserRole } from '../store/action/authAction.js'

const Home = () => {
    const dispatch = useDispatch()
    const auth = localStorage.getItem("token")
    // useEffect(() => {
    //     dispatch(findUserRole(auth))
    // }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='bg-white'>
            <Navbar>
                <div className="">
                    <HomeCarousel />
                    <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                        <HomeSectionCarousel />
                        <HomeWomenSectionCarousel />
                        <HomeKidsSectionCarousel />
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Home
