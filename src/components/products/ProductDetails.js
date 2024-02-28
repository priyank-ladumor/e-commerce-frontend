import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByIDAction } from '../../store/action/productsAction'
import { FaRupeeSign } from "react-icons/fa";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
  0: { items: 1 },
  376: { items: 1 },
  520: { items: 1 },
  770: { items: 2 },
  1024: { items: 2 },
};

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const dispatch = useDispatch()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const { productsDetails } = useSelector((state) => state.products)
  const { id } = useParams()
  const [pdetails, setPdetails] = useState([])

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

  return (
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
                            <p className='p-5 me-2 rounded-full w-10 border-black border-2' style={{ background: color, cursor: "pointer" }} >{""}</p>
                          </>
                        )
                      })
                    }
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            {/* <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{pdetails?.description}</p>
              </div>
            </div> */}

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
      </div >
    </div >
  )
}
