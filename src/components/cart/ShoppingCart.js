import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAction } from '../../store/action/cartAction';
import { FaRupeeSign } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";


const ShoppingCart = () => {
    const [open, setOpen] = useState(true)

    const { getCartItemsPENDING, getCartItemsData } = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const [cartItemData, setcartItemData] = useState()

    useEffect(() => {
        dispatch(getCartItemsAction())
    }, [])

    useEffect(() => {
        if (getCartItemsData) {
            const cartItem = getCartItemsData.map((ele) => ele.cartItem)
            setcartItemData(cartItem)
        }
    }, [getCartItemsData])

    return (
        <div>
            {/* <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0"> */}
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl p-4 text-gray-900 font-bold tracking-tighter">Cart</h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItemData && cartItemData[0].map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        {
                                            product && product?.product.map((ele) =>
                                                <img
                                                    src={ele.thumbnail[0]}
                                                    alt={ele.thumbnail[0]}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            )
                                        }
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="displayBlock flex justify-between text-base font-medium text-gray-900 mb-1 ">
                                                <h3>
                                                    <span className='text-lg font-semibold me-2' >Title:</span>
                                                    {
                                                        product && product?.product.map((ele) =>
                                                            <a href={ele.href}>{ele.title}</a>
                                                        )
                                                    }
                                                </h3>
                                                <div className='flex mt-1 items-center ' >
                                                    <FaRupeeSign />
                                                    <p className="">{product.price}</p>
                                                </div>
                                            </div>
                                            <div className='flex items-center mb-1' >
                                                <span className='text-lg font-semibold me-2' >Size:</span>
                                                <p className="rounded-full mt-[2px] text-lg text-gray-800">{product.size}</p>
                                            </div>
                                            <div className='flex items-center mb-2' >
                                                <span className=' text-lg font-semibold me-2' >Color:</span>
                                                <p className=" p-4 w-8 rounded-full mt-[2px] text-sm text-gray-500" style={{ background: product.color }} >{""}</p>
                                            </div>
                                        </div>
                                        <div className=" flex flex-1 items-end justify-between text-sm">
                                            <div className="text-gray-500 flex items-center justify-center gap-[5px]">Qty:
                                                <div className="hover:text-blue-900 hover:border-blue-900 cursor-pointer border-2 border-gray-400 p-[1px]">
                                                    <FaMinus />
                                                </div>
                                                <span className="font-medium text-black text-[20px]">{product.quantity}</span>
                                                <div className="hover:text-blue-900  hover:border-blue-900 cursor-pointer border-2 border-gray-400 p-[1px]">
                                                    <FaPlus />
                                                </div>
                                            </div>

                                            <div className="flex text-2xl ">
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    <TbTrashXFilled />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-5 border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <div className='flex justify-center items-center text-2xl ' >
                            <FaRupeeSign />
                            <p className='' >{getCartItemsData && getCartItemsData[0].totalPrice}</p>
                        </div>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <NavLink
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </NavLink>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or
                            <NavLink to="/">
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 ms-1"
                                    onClick={() => setOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
