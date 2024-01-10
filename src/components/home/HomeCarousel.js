import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const images = [
    "https://pbs.twimg.com/media/Ec20SmEX0AUTXCo?format=png&name=medium",
    "https://cdna.artstation.com/p/assets/images/images/040/183/038/large/sonam-saxena-ntcc-8.jpg?1628098115",
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202109/242473827_10160157467293221_2645921924837005982_n-sixteen_nine.jpg?size=948:533"
];
const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};
const HomeCarousel = () => {
    const items =
        images.map((ele) => {
            return <img className="h-[650px] w-[100%]" src={ele} alt={ele} />
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
