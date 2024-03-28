import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBannerAction } from '../../store/action/bannerLogoAction';


const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};
const HomeCarousel = () => {
    const dispatch = useDispatch()
    const { getBannerDATA } = useSelector((state) => state.bannerLogo)
    const [banner, setbanner] = useState();

    useEffect(() => {
        dispatch(getBannerAction())
    }, [])

    useEffect(() => {
        if (getBannerDATA) {
            setbanner(getBannerDATA)
        }
    }, [getBannerDATA])

    const items =
        banner && banner.map((ele) => {
            return <img className="h-[650px] w-[100%]" src={ele.img[0]} alt={ele.img[0]} />
        })
    return (
        <div className=''>
            <AliceCarousel
                mouseTracking
                items={items}
                disableButtonsControls
                autoPlay
                infinite
                responsive={responsive}
                autoPlayInterval={2000}
            />
        </div>
    )
}

export default HomeCarousel
