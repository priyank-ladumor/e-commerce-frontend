
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSection from './MenSection';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from 'react-redux';
import { getMensProductAction, getProducts } from '../../store/action/productsAction';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const HomeSectionCarousel = () => {
    const responsive = {
        0: { items: 1 },
        520: { items: 2 },
        770: { items: 3 },
        1024: { items: 4 },
    };

    const dispatch = useDispatch()
    const { menProducts } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getMensProductAction())
    }, [])

    const items = menProducts && menProducts?.slice(0, 10).map((ele) => <HomeSection product={ele} />)
    return (
        <>
            <p className='flex justify-center text-3xl font-bold  ' > Men's Products</p>
            <div className="relative lg:px-8 px-4">
                <div className="relative p-5">
                    <AliceCarousel
                        items={items?.length > 0 ? items : [1, 2, 3, 4].map((ele) =>
                            <div className='grid grid-cols-4 w-[25%] p-2 ' >
                                <SkeletonTheme baseColor="white" highlightColor="#f0f0f0">
                                    <p className='p-2' >
                                        <Skeleton count={1} style={{ height: "180px", width: "220px" }} />
                                        <Skeleton count={2} className='mt-3' style={{ width: "220px" }} />
                                    </p>
                                </SkeletonTheme>
                            </div>
                        )}
                        disableDotsControls
                        infinite
                        autoPlay
                        autoPlayInterval={2000}
                        responsive={responsive}
                        renderPrevButton={() => {
                            return <p className="p-4 absolute left-[-40px] top-0"><Button variant="contained" className="z-50 bg-white" sx={{ position: "absolute", top: "8rem", left: "0rem", transform: "translateX(-50%) rotate(90deg)", bgcolor: "white" }} aria-label='prv'>
                                <KeyboardArrowLeftIcon sx={{ color: "black", transform: "rotate(-90deg)" }} />
                            </Button></p>
                        }}
                        renderNextButton={() => {
                            return <p className="p-4 absolute right-[-40px] top-0"> <Button variant="contained" className="z-50 bg-white" sx={{ position: "absolute", top: "8rem", right: "0rem", transform: "translateX(50%) rotate(90deg)", bgcolor: "white" }} aria-label='next'>
                                <KeyboardArrowLeftIcon sx={{ color: "black", transform: "rotate(90deg)" }} />
                            </Button></p>
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default HomeSectionCarousel
