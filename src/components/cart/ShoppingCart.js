import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

const ShoppingCart = () => {
    const [open, setOpen] = useState(true)
    return (
        <div>
            {/* <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0"> */}
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl p-4 text-gray-900 font-bold tracking-tighter">Cart</h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={product.href}>{product.name}</a>
                                                </h3>
                                                <p className="ml-4">{product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="text-gray-500 flex items-center justify-center gap-[5px]">Qty
                                                {/* <select>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select> */}
                                                <div className="hover:text-blue-900 hover:border-blue-900 cursor-pointer border-2 border-gray-400 p-[1px]">
                                                    <FaMinus />
                                                </div>
                                                <span className="font-medium text-black text-[20px]">{product.quantity}</span>
                                                <div className="hover:text-blue-900  hover:border-blue-900 cursor-pointer border-2 border-gray-400 p-[1px]">
                                                    <FaPlus />
                                                </div>

                                            </div>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remove
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
                        <p>$262.00</p>
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
