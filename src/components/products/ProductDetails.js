import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByIDAction } from '../../store/action/productsAction'
import { FaRupeeSign } from "react-icons/fa";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Bars, ThreeDots } from 'react-loader-spinner'
import Swal from 'sweetalert2'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCartAction } from '../../store/action/cartAction'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const responsive = {
  0: { items: 1 },
  376: { items: 1 },
  520: { items: 1 },
  770: { items: 2 },
  1024: { items: 2 },
};


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const { productsDetails, productsDetailsPENDING } = useSelector((state) => state.products)
  const { addToCartMSG, addToCartERROR, addToCartPENDING } = useSelector((state) => state.cart)
  const { id } = useParams()
  const [pdetails, setPdetails] = useState([])

  const [addtocartpopup, setaddtocartpopup] = useState(false)

  useEffect(() => {
    dispatch(getProductsByIDAction({ id }))
  }, [])

  useEffect(() => {
    if (productsDetails) {
      setPdetails(productsDetails)
    }
  }, [productsDetails])

  const items =
    pdetails.images?.map((ele) => {
      return (
        <div className='p-2' >
          <img className="imgRes rounded-xl h-[650px] w-[100%]" src={ele} alt={ele} />
        </div>
      )
    })

  const rmvSameColor = pdetails?.sizesAndColor?.map((ele) => ele.color)
  const availableColor = [...new Set(rmvSameColor)];

  const rmvSameSize = pdetails?.sizesAndColor?.map((ele) => ele.size)
  const AllSizesrmvSameSize = [...new Set(rmvSameSize)];

  const selectedrmvSameSize = pdetails?.sizesAndColor?.filter((ele) => ele.color === selectedColor)
  const availableSize = [...new Set(selectedrmvSameSize)];

  const handleAddToCart = (pdetails) => {
    const auth = localStorage.getItem('token');
    if (auth) {
      if (selectedColor && selectedSize) {
        const item = {
          productId: pdetails._id,
          size: selectedSize,
          color: selectedColor
        }
        dispatch(addToCartAction(item))
        setaddtocartpopup(true)
      } else {
        toast.error('please select color and size', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      !auth &&
        Swal.fire({
          title: "Are you sure Login?",
          text: "You won't be able to cart the items without login!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go to login page"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login")
          }
        })
    }
  }

  //msg add to cart success
  useEffect(() => {
    if (addToCartMSG && addtocartpopup) {
      <div className='swal2-container'>
        {Swal.fire({
          position: "top-end",
          icon: "success",
          title: addToCartMSG,
          showConfirmButton: false,
          timer: 2500
        })}
      </div>
      setaddtocartpopup(false)
      setSelectedColor("")
      setSelectedSize("")
    }
  }, [addToCartMSG])

  //error msg add to cart success
  useEffect(() => {
    if (addToCartERROR && addtocartpopup) {
      <div className='swal2-container'>
        {Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Item already added to cart",
          showConfirmButton: false,
          timer: 2500
        })}
      </div>
      setaddtocartpopup(false)
      setSelectedColor("")
      setSelectedSize("")
    }
  }, [addToCartERROR])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {productsDetailsPENDING === true ?
        <>
          <div className="bg-white  mt-10">
            <div className="p-1 rounded-2xl">
              <div className=''>
                <AliceCarousel
                  mouseTracking
                  items={[1, 2, 3, 4].map((ele) =>
                    <SkeletonTheme highlightColor="white" baseColor="#f0f0f0">
                      <p className='p-2' >
                        <Skeleton count={1} className='rounded-lg' style={{ height: "650px", width: "100%" }} />
                      </p>
                    </SkeletonTheme>
                  )}
                  disableButtonsControls={false}
                  disableDotsControls={true}
                  autoPlay
                  infinite
                  responsive={responsive}
                  autoPlayInterval={2500}
                />
              </div>
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <Skeleton count={1} className='rounded-lg' style={{ height: "70px", width: "100%" }} />
                </div>
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <div className='flex  items-center' >
                    Price:
                    <FaRupeeSign className='ms-1 text-2xl' />
                    <p className="text-3xl tracking-tight font-bold text-gray-900"><Skeleton count={1} className='rounded-lg' style={{ height: "50px", width: "150px" }} /></p>
                  </div>
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Skeleton count={1} className='rounded-lg' style={{ height: "35px", width: "220px" }} />
                      </div>
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Color: </h3>
                      <div className="mt-3 flex">
                        <Skeleton count={1} className='rounded-full' style={{ height: "50px", width: "50px" }} />
                        <Skeleton count={1} className='rounded-full ms-4' style={{ height: "50px", width: "50px" }} />
                        <Skeleton count={1} className='rounded-full ms-4' style={{ height: "50px", width: "50px" }} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mt-2 text-gray-900">Size: </h3>
                      <div className="mt-3 flex">
                        <div class="grid grid-cols-12 gap-4">
                          <Skeleton count={1} className='rounded-lg ms-4' style={{ height: "180px", width: "270px" }} />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </form>
                </div>
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                    <div className="mt-4">
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        <li className="text-gray-400"> <span className="text-gray-600">Brand: <Skeleton count={1} className='rounded-lg' style={{ height: "30px", width: "150px" }} /> </span>  </li>
                        <li className="text-gray-400"> <span className="text-gray-600">Fabric: <Skeleton count={1} className='rounded-lg' style={{ height: "30px", width: "150px" }} /> </span>  </li>
                        <li className="text-gray-400"> <span className="text-gray-600">Material: <Skeleton count={1} className='rounded-lg' style={{ height: "30px", width: "150px" }} /> </span>  </li>
                        <li className="text-gray-400"> <span className="text-gray-600">Quantity: <Skeleton count={1} className='rounded-lg' style={{ height: "30px", width: "150px" }} /> </span>  </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600"><Skeleton count={1} className='rounded-lg' style={{ height: "150px", width: "100%" }} /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <div className="bg-white  mt-10">
          <div className="p-1 rounded-2xl">

            {/* Image gallery */}
            <div className=''>
              <AliceCarousel
                mouseTracking
                items={items}
                disableButtonsControls={false}
                disableDotsControls={true}
                autoPlay
                infinite
                responsive={responsive}
                autoPlayInterval={2500}
              />
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{pdetails?.title}</h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <div className='flex  items-center' >
                  Price:
                  <FaRupeeSign className='ms-1 text-2xl' />
                  <p className="text-3xl tracking-tight font-bold text-gray-900">{pdetails?.discountPrice}</p>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>


                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color: </h3>
                    <div className="mt-3 flex">
                      {
                        availableColor && availableColor.map((color) => {
                          return (
                            <>
                              <div className='rounded-full p-[2px] flex justify-center me-2' style={{ border: selectedColor === color && "3px solid blue" }} >
                                <p className='p-5 rounded-full min-w-min w-[40px]' onClick={() => [setSelectedColor(color), setSelectedSize("")]} style={{ background: color, cursor: "pointer", border: "2px solid black" }} >{""}</p>
                              </div>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mt-2 text-gray-900">Size: </h3>
                    <div className="mt-3 flex">
                      <div class="grid grid-cols-12 gap-4">
                        {selectedColor ?
                          availableSize && availableSize.map((ele) => {
                            return (
                              <>
                                {/* for check quantity is available or not  */}
                                {ele?.quantity > 0 &&
                                  <div class="col-span-6">
                                    <p className='p-2 flex rounded-full justify-center w-36 ' style={{ cursor: "pointer", fontSize: "24px", border: selectedSize === ele.size ? "3px solid blue" : "2px solid black" }} onClick={() => setSelectedSize(ele.size)} >{ele.size}</p>
                                  </div>
                                }
                              </>
                            )
                          })
                          :
                          <>
                            {
                              AllSizesrmvSameSize && AllSizesrmvSameSize.map((size) => {
                                return (
                                  <>
                                    <div class="col-span-6">
                                      <p className='p-2 me-2 flex rounded-full justify-center w-36 border-black border-2' style={{ cursor: "no-drop", fontSize: "24px" }} > {size}</p>
                                    </div>
                                  </>
                                )
                              })
                            }
                          </>
                        }
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(pdetails)}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {
                      addToCartPENDING ?
                        <ThreeDots
                          visible={true}
                          height="22"
                          width="60"
                          color="white"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                        :
                        "Add to Cart"
                    }
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                  <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      {pdetails?.brand?.length > 0 && <li className="text-gray-400"> <span className="text-gray-600">Brand: {pdetails?.brand}</span>  </li>}
                      {pdetails?.fabric?.length > 0 && <li className="text-gray-400"> <span className="text-gray-600">Fabric: {pdetails?.fabric}</span>  </li>}
                      {pdetails?.material?.length > 0 && <li className="text-gray-400"> <span className="text-gray-600">Material: {pdetails?.material}</span>  </li>}
                      {pdetails?.quantity && <li className="text-gray-400"> <span className="text-gray-600">Quantity: {pdetails?.quantity} left</span>  </li>}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Description</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{pdetails?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <ToastContainer />
    </>
  )
}
