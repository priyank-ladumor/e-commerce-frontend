// import React, { useEffect, useState } from 'react'
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import HomeSection from './HomeSection';
// import { Button } from '@mui/material';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts } from '../../store/action/productsAction';


// const HomeSectionCarousel = () => {
//     const responsive = {
//         0: { items: 1 },
//         376: { items: 1.5 },
//         520: { items: 2 },
//         770: { items: 3 },
//         1024: { items: 4 },
//     };

//     // const items = <HomeSection newproduct={products && products} />
//     const items = products && products?.slice(0,10).map((ele) => <HomeSection newproduct={ele && ele} />)
//     console.log(items && items,"itemsitems");
//     return (
//         <div className="relative lg:px-8 px-4">
//             <div className="relative p-5">
//                 <AliceCarousel
//                 mouseTracking
//                 items={items}
//                 disableButtonsControls={false}
//                 disableDotsControls={true}
//                 autoPlay
//                 infinite
//                 responsive={responsive}
//                 autoPlayInterval={2500}
//                 />
//             </div>
//         </div>
//     )
// }

// export default HomeSectionCarousel















import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSection from './HomeSection';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/action/productsAction';

const images = [
    "https://pbs.twimg.com/media/Ec20SmEX0AUTXCo?format=png&name=medium",
    "https://cdna.artstation.com/p/assets/images/images/040/183/038/large/sonam-saxena-ntcc-8.jpg?1628098115",
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202109/242473827_10160157467293221_2645921924837005982_n-sixteen_nine.jpg?size=948:533"
];
const mens_kurta = [
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Printed Pure Cotton Straight Kurta",
        "color": "Green",
        "discountedPrice": 499,
        "price": 1499,
        "discountPersent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70",
        "brand": "SG LEMAN",
        "title": "Men Embroidered Jacquard Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 799,
        "price": 2499,
        "discountPersent": 68,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70",
        "brand": "FUBAR",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Blue",
        "discountedPrice": 399,
        "price": 1499,
        "discountPersent": 73,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/i/v/x/xxl-br-ad-kt-105-adwyn-peter-original-imagj4zyd2q7t6cg.jpeg?q=70",
        "brand": "ALY JOHN",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "White",
        "discountedPrice": 474,
        "price": 1999,
        "discountPersent": 76,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/j/a/r/l-poch521835-peter-england-original-imag7jg47g7cxhg3-bb.jpeg?q=70",
        "brand": "PETER ENGLAND",
        "title": "Men Woven Design Pure Cotton Straight Kurta",
        "color": "Grey",
        "discountedPrice": 524,
        "price": 1049,
        "discountPersent": 50,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/y/c/x/xl-kast107hp-majestic-man-original-imafw49u5uty4agx-bb.jpeg?q=70",
        "brand": "Majestic Man",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Pink",
        "discountedPrice": 499,
        "price": 1499,
        "discountPersent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kpodocw0/t-shirt/x/o/4/xl-wr-64-wrodss-original-imag3upwgq9n9fbv.jpeg?q=70",
        "brand": "WRODSS",
        "title": "Men Solid Cotton Blend Straight Kurta",
        "color": "Black",
        "discountedPrice": 277,
        "price": 999,
        "discountPersent": 72,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l4zxn680/kurta/i/g/u/s-mtml0039-341-manthan-original-imagfrz3gwgdtczm.jpeg?q=70",
        "brand": "Manthan",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Blue",
        "discountedPrice": 765,
        "price": 1049,
        "discountPersent": 27,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/m/e/e/s-kurta-rahul-look-original-imaga2g6qmhbywdf-bb.jpeg?q=70",
        "brand": "RAHUL LOOK",
        "title": "Men Solid Pure Cotton Straight Kurta",
        "color": "Green",
        "discountedPrice": 499,
        "price": 1599,
        "discountPersent": 68,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/u/v/m/l-grey-106-yellow-freluro-original-imagc26vdpwxgztu-bb.jpeg?q=70",
        "brand": "FRELURO",
        "title": "Men Printed Cotton Blend Straight Kurta",
        "color": "Yellow",
        "discountedPrice": 429,
        "price": 999,
        "discountPersent": 57,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/jsj90280/kurta/j/z/g/l-mtmkos0004-326-manthan-original-imafe35wha5ry36p.jpeg?q=70",
        "brand": "Manthan",
        "title": "Men Self Design Cotton Blend Straight Kurta",
        "color": "Light Blue",
        "discountedPrice": 729,
        "price": 909,
        "discountPersent": 27,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "mens_kurta",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    }]

const HomeSectionCarousel = () => {
    const responsive = {
        0: { items: 1 },
        376: { items: 1.5 },
        520: { items: 2 },
        770: { items: 3 },
        1024: { items: 4 },
    };

    const dispatch = useDispatch()
    const { products, getFilterProductPENDING } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getProducts())
    }, [])

    // const [activeIndex, setActiveIndex] = useState(0)
    // const SyncActiveIndex = ({ items }) => setActiveIndex(items)
    const items = products && Array.from(products)?.slice(0, 10).map((ele) => <HomeSection product={ele} />)
    console.log(products && products,"products");
    return (
        <div className="relative lg:px-8 px-4">
            <div className="relative p-5">
                <AliceCarousel
                    items={items}
                    // disableButtonsControls
                    disableDotsControls
                    infinite
                    autoPlay
                    autoPlayInterval={4000}
                    // activeItemIndex={activeIndex}
                    // onSlideChanged={SyncActiveIndex}
                    // activeIndex={activeIndex}
                    responsive={responsive}
                />
            </div>
            {/* {activeIndex !== (items.length - 4) &&
                <Button variant="contained" onClick={() => setActiveIndex(activeIndex + 1)} className="z-50 bg-white" sx={{ position: "absolute", top: "8rem", right: "0rem", transform: "translateX(50%) rotate(90deg)", bgcolor: "white" }} aria-label='next'>
                    <KeyboardArrowLeftIcon sx={{ color: "black", transform: "rotate(90deg)" }} />
                </Button>}
            {activeIndex !== 0 &&
                <Button variant="contained" onClick={() => setActiveIndex(activeIndex - 1)} className="z-50 bg-white" sx={{ position: "absolute", top: "8rem", left: "0rem", transform: "translateX(-50%) rotate(90deg)", bgcolor: "white" }} aria-label='prv'>
                    <KeyboardArrowLeftIcon sx={{ color: "black", transform: "rotate(-90deg)" }} />
                </Button>} */}
        </div>
    )
}

export default HomeSectionCarousel
