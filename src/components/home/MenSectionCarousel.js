
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSection from './MenSection';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from 'react-redux';
import { getMensProductAction, getProducts } from '../../store/action/productsAction';


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
            <p className='flex justify-center text-2xl font-bold  ' > <span className='bg-[white] p-3 w-[25%] flex justify-center rounded-full '  style={{boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}  >Men's Products</span></p>
            <div className="relative lg:px-8 px-4">
                {menProducts && menProducts?.length > 0 && <div className="relative p-5">
                    <AliceCarousel
                        items={items && items}
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
                </div>}
            </div>
        </>
    )
}

export default HomeSectionCarousel
