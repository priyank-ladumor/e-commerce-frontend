import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import ShoppingCart from '../components/cart/ShoppingCart';
import { CFormInput, CFormLabel } from '@coreui/react';
import { Button } from '@mui/material';

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

const addresses = [
    {
        name: 'Leslie Alexander',
        street: '11th chowk',
        city: "mubai",
        pincode: 475865,
        phone: '923-000-1234',
        state: "gujarat"
    },
    {
        name: 'Leslie ',
        street: '11th chowk',
        city: "mubai",
        pincode: 475865,
        phone: '923-000-1234',
        state: "gujarat"
    },
    {
        name: 'Leslie k  Alexander',
        street: '11th chowk',
        city: "mubai",
        pincode: 475865,
        phone: '923-000-1234',
        state: "gujarat"
    },
]
const CheckOut = () => {
    const [open, setOpen] = useState(true)
    return (
        <div>
            <Navbar>
                {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
                {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5"> */}

                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <form className="bg-white p-5">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className='block mt-4' >
                                    <div className='grid grid-cols-12 gap-4 '  >
                                        <div className=' col-span-6 ' >
                                            <CFormLabel className='text-lg' >First Name</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your first name"
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                        <div className=' col-span-6 ' >
                                            <CFormLabel className='text-lg ' >Last Name</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your last name"
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                        <div className='order-3 col-span-12 ' >
                                            <CFormLabel className='text-lg ' >Street Address</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your street address"
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                        <div className='md:col-span-6 order-3 col-span-12 ' >
                                            <CFormLabel className='text-lg ' >Mobile No</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your mobile no."
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                        <div className='md:col-span-6 order-3 col-span-12 ' >
                                            <CFormLabel className='text-lg ' >City</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your city name"
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                        <div className='md:col-span-6 order-3 col-span-12 ' >
                                            <CFormLabel className='text-lg ' >State</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your state name"
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                        <div className='md:col-span-6 order-3 col-span-12 ' >
                                            <CFormLabel className='text-lg ' >Pin Code</CFormLabel>
                                            <CFormInput
                                                className=' w-[100%] mt-2 rounded-md'
                                                type="number"
                                                id="exampleFormControlInput1"
                                                placeholder="Enter your pin code"
                                                // text="Must be 8-20 characters long."
                                                aria-describedby="exampleFormControlInputHelpInline"
                                                // defaultValue={userProfile && userProfile.address}
                                                size="sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Existing Address</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from existing address
                                </p>
                                <ul role="list" className="">

                                    {addresses.map((address) => (
                                        <li key={address.name} className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-300 focus:text-red my-5 p-4 items-center rounded-md">
                                            <div className="flex min-w-0 gap-x-4">
                                                <input
                                                    name="address"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pincode}</p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                                                <p className="text-sm leading-6 text-gray-500">{address.city}</p>
                                                <p className="text-sm leading-6 text-gray-500">{address.state}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Payment methods</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash"
                                                    name="payments"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card"
                                                    name="payments"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Card payment
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="lg:col-span-12">
                    <ShoppingCart />
                </div>
                {/* </div> */}

                {/* </div> */}
            </Navbar>
        </div>
    )
}

export default CheckOut
