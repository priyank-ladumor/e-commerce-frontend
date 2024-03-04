/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-restricted-globals */

import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { getsecondlevelCategoryAction, getthirdlevelCategoryAction, gettoplevelCategoryAction } from '../../store/action/categoryAction'
import { useSearchParams } from 'react-router-dom';
import { getCartItemsAction } from '../../store/action/cartAction'


const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        // { name: 'Company', href: '#' },
        // { name: 'Stores', href: '#' },
    ],
}

const userNavigation = [
    { name: 'Your Profile', navPath: '' },
    { name: 'My orders', navPath: '#' },
    { name: 'Sign out', navPath: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
    const location = useLocation()
    const [searchparam, setsearchparam] = useSearchParams()

    const { topCategory, thirdCategory } = useParams()

    const [open, setOpen] = useState(false)
    const { categoryTop, categorySecond, categoryThird } = useSelector((state) => state.category)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const auth = localStorage.getItem("token")

    const [navOpen, setNavOpen] = useState(true)
    const [selectNavOp, setselectNavOp] = useState(false)

    const [top, settop] = useState("")
    const [second, setsecond] = useState("")
    const [third, setthird] = useState("")
    const [All, setAll] = useState("")
    const [secondParent, setsecondParent] = useState("")
    const [parentId, setparentId] = React.useState("");

    const { getCartItemsPENDING, getCartItemsData } = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(getCartItemsAction())
    }, [])



    const logOutFunc = (name) => {
        if (name === "Sign out") {
            localStorage.clear()
        }
    }

    const handleShadow = () => {
        navigate("/", { replace: true })
    }

    useEffect(() => {
        dispatch(gettoplevelCategoryAction())
    }, [])

    useEffect(() => {
        dispatch(getthirdlevelCategoryAction())
    }, [])

    useEffect(() => {
        const query = `?parentCategory=${parentId}`
        dispatch(getsecondlevelCategoryAction(query))
    }, [parentId])

    useEffect(() => {
        if (categoryTop) {
            settop(categoryTop)
        }
    }, [categoryTop])

    useEffect(() => {
        if (categorySecond) {
            setsecond(categorySecond)
        }
    }, [categorySecond])

    useEffect(() => {
        if (categoryThird) {
            setthird(categoryThird)
        }
    }, [categoryThird])

    useEffect(() => {
        const parent = top && secondParent && top.filter((data) => data.name.toString().toLowerCase() === secondParent.toString().toLowerCase())
        if (parent) {
            setparentId(parent[0]?._id)
        }
    }, [secondParent])

    useEffect(() => {
        if (top) {
            const parent = top && secondParent && top.filter((data) => data.name.toString().toLowerCase() === secondParent.toString().toLowerCase())
            if (parent) {
                setparentId(parent[0]?._id)
            }
        }
    }, [top])

    useEffect(() => {
        if (topCategory?.length > 0) {
            setsecondParent(topCategory)
        }
    }, [])
    return (
        <div className="bg-[#F5F5F5]"  >
            {/* Mobile menu */}
            {
                navOpen && <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    {/* for mobile btn  */}
                                    <div className="flex px-4 pb-2 pt-5">
                                        <button
                                            type="button"
                                            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Links */}
                                    <Tab.Group as="div" className="mt-2">
                                        {/* top categories  */}
                                        <div className="border-b border-gray-200">
                                            <Tab.List className="-mb-px flex space-x-8 px-4">
                                                {top && top.length > 0 && top.map((category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({ selected }) =>
                                                            classNames(
                                                                'flex-1 whitespace-nowrap border-b-1 px-1 py-4 text-base font-medium'
                                                            )}
                                                        onClick={() => [setsecondParent(category.name), setNavOpen(true), setselectNavOp(category.name)]}
                                                        style={{ color: (topCategory === category.name ? "blue" : selectNavOp === category.name && "red"), borderBottom: topCategory === category.name && "2px solid blue" }}
                                                    >
                                                        {category.name.charAt(0).toUpperCase()}{category.name.slice(1)}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                        </div>
                                        {secondParent && top && top.length > 0 && top.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                                {second && second.map((section) =>
                                                (
                                                    <div key={section.name}>
                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-950">
                                                            {section.name.includes("kids_") ? section.name.split("kids_")[1].charAt(0).toUpperCase() + section.name.split("kids_")[1].slice(1) : section.name.split("men_" && "_")[1].charAt(0).toUpperCase() + section.name.split("men_" && "_")[1].slice(1)}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${section.name}-heading`}
                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                        >
                                                            <li className="flex cursor-pointer" onClick={() => [setAll(section.name)]}>
                                                                <NavLink to={`/products/${secondParent}/?category=${section.name}&thirdCategoryCheckBox=on`} onClick={() => setNavOpen(false)} className="hover:text-gray-800" style={{ color: section.name === (location.search.split("category=")[1]?.split("&thirdCategoryCheckBox=on")[0] || location.search.split("category=")[1]?.split("&thirdCategoryCheckBox=on")[0]?.split('&')[0]) && "blue" }} >
                                                                    All
                                                                </NavLink>
                                                            </li>
                                                            {third && third.filter((ele) => (ele.parentCategory?.name === section.name)).map((thirdCat) => (
                                                                <>
                                                                    <li key={thirdCat.name} className="flex cursor-pointer" >
                                                                        <NavLink to={`/products/${secondParent}/?category=${section.name}&thirdCategory[0]=${thirdCat.name}`} onClick={() => [setNavOpen(false)]} style={{ color: (thirdCategory === thirdCat.name || location.search.split("thirdCategory[0]=")[1] === thirdCat.name) && "blue" }} className="hover:text-gray-800">
                                                                            {thirdCat.name.includes("kids_") ? thirdCat.name.split("kids_")[1].charAt(0).toUpperCase() + thirdCat.name.split("kids_" && "_")[1].slice(1) + " " + (thirdCat.name.split("_")[2] ? thirdCat.name.split("_")[2].charAt(0).toUpperCase() + thirdCat.name.split("_")[2].slice(1) : "") : thirdCat.name.split("men_" && "_")[1].charAt(0).toUpperCase() + thirdCat.name.split("men_" && "_")[1].slice(1) + " " + (thirdCat.name.split("_")[2] ? thirdCat.name.split("_")[2].charAt(0).toUpperCase() + thirdCat.name.split("_")[2].slice(1) : "")}
                                                                        </NavLink>
                                                                    </li>
                                                                </>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Group>

                                    {/* mobile  */}
                                    {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6 ">
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root">
                                                <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                    {page.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div> */}
                                    {!auth &&
                                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                            <div className="flow-root">
                                                <NavLink to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Login
                                                </NavLink>
                                            </div>
                                            <div className="flow-root">
                                                <NavLink to="/register" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Create account
                                                </NavLink>
                                            </div>
                                        </div>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
            }

            {/* tab z-ind-999  */}
            {/* big screen  */}
            <header className="relative bg-white z-[999]" style={{ boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => [setOpen(true), setNavOpen(true)]}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0" onClick={handleShadow} >
                                <NavLink to="/">
                                    <img
                                        className="h-15 w-12 rounded-xl"
                                        src="https://i.imgur.com/d7MoWpc.png"
                                        alt="Your Company"
                                    />
                                </NavLink>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch rmv-shadow " >
                                <div className="flex h-full space-x-8  rmv-shadow">
                                    {top && top.length > 0 && top.map((category) => (
                                        <Popover key={category.name} className="flex" >
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex"  >
                                                        <Popover.Button
                                                            onClick={() => [setNavOpen(true), setsecondParent(category.name), setselectNavOp(category.name)]}
                                                            className={classNames(
                                                                open
                                                                    ? 'text-black-950 border-b-2 border-gray-600 outline-none focus-visible:outline-none font-medium  rmv-shadow shadow-none	'
                                                                    : 'border-transparent text-gray-600  outline-none focus-visible:outline-none hover:text-red-800 focus:text-red-800',
                                                                'relative z-10 -mb-px flex   items-center outline-none focus-visible:outline-none font-medium pt-px text-sm transition-colors duration-200 ease-out '
                                                            )}
                                                            style={{ color: topCategory === category.name && "blue", borderBottom: topCategory === category.name && "3px solid blue", fontWeight: topCategory === category.name && "bold", fontSize: "20px" }}
                                                        >
                                                            {category.name.charAt(0).toUpperCase()}{category.name.slice(1)}
                                                        </Popover.Button>
                                                    </div>
                                                    {
                                                        navOpen ?
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-200"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="transition ease-in duration-150"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                                style={{ boxShadow: " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
                                                            >
                                                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 ">
                                                                    <div className="relative bg-white" >
                                                                        <div className="mx-auto max-w-7xl px-8">
                                                                            <div className="row-start-1 grid gap-x-8 gap-y-10 py-16 grid-cols-7 text-sm">
                                                                                {second && second.map((section) =>
                                                                                (
                                                                                    <div key={section.name}>
                                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-950" style={{ fontSize: "18px" }}  >
                                                                                            {section.name.includes("kids_") ? section.name.split("kids_")[1].charAt(0).toUpperCase() + section.name.split("kids_")[1].slice(1) : section.name.split("men_" && "_")[1].charAt(0).toUpperCase() + section.name.split("men_" && "_")[1].slice(1)}
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${section.name}-heading`}
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            <li className="flex cursor-pointer" onClick={() => [setAll(section.name)]} style={{ fontSize: "18px" }}  >
                                                                                                <NavLink to={`/products/${category.name}/?category=${section.name}&thirdCategoryCheckBox=on&NewProduct=true`} onClick={() => setNavOpen(false)} className="hover:text-gray-800" style={{ color: section.name === (location.search.split("category=")[1]?.split("&thirdCategoryCheckBox=on")[0] || location.search.split("category=")[1]?.split("&thirdCategoryCheckBox=on")[0]?.split('&')[0]) && "blue" }}  >
                                                                                                    All
                                                                                                </NavLink>
                                                                                            </li>
                                                                                            {third && third.filter((ele) => (ele.parentCategory?.name === section.name)).map((thirdCat) => (
                                                                                                <>
                                                                                                    <li key={thirdCat.name} className="flex cursor-pointer" style={{ fontSize: "18px" }}  >
                                                                                                        <NavLink to={`/products/${category.name}/?category=${section.name}&thirdCategory[0]=${thirdCat.name}&thirdCategoryCheckBox=off&NewProduct=true`} onClick={() => setNavOpen(false)} style={{ color: (thirdCat.name === searchparam.get("thirdCategory[0]") && searchparam.get("thirdCategoryCheckBox") === "off" || thirdCat.name === thirdCategory) && "blue" }} className="hover:text-gray-800">
                                                                                                            {thirdCat.name.includes("kids_") ? thirdCat.name.split("kids_")[1].charAt(0).toUpperCase() + thirdCat.name.split("kids_" && "_")[1].slice(1) + " " + (thirdCat.name.split("_")[2] ? thirdCat.name.split("_")[2].charAt(0).toUpperCase() + thirdCat.name.split("_")[2].slice(1) : "") : thirdCat.name.split("men_" && "_")[1].charAt(0).toUpperCase() + thirdCat.name.split("men_" && "_")[1].slice(1) + " " + (thirdCat.name.split("_")[2] ? thirdCat.name.split("_")[2].charAt(0).toUpperCase() + thirdCat.name.split("_")[2].slice(1) : "")}
                                                                                                        </NavLink>
                                                                                                    </li>
                                                                                                </>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </Transition>
                                                            : ""
                                                    }
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            {/* big screen  */}
                            {/* login and register page link and user profile  */}
                            <div className="ml-auto flex items-center">
                                {auth ?
                                    <>
                                        {/* {role === "ADMIN" && <Button variant="contained" size='sm'><NavLink to="/dashboard">Admin</NavLink></Button>} */}

                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        // logout //profile 
                                                        <Menu.Item key={item.name} onClick={() => logOutFunc(item.name)}>
                                                            {({ active }) => (
                                                                <NavLink
                                                                    to="/"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </NavLink>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </>

                                    : <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <NavLink to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                            Login
                                        </NavLink>
                                        <NavLink to="/register" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create account
                                        </NavLink>
                                    </div>
                                }


                                {/* <div className="hidden lg:ml-8 lg:flex">
                                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                        <img
                                            src="https://tailwindui.com/img/flags/flag-canada.svg"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </a>
                                </div> */}

                                {/* Search */}
                                {/* <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div> */}

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <NavLink to="/cart" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{getCartItemsData ? getCartItemsData[0].totalItem : 0}</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="mx-auto max-w-7xl pt-3 pb-16 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
