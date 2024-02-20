import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { NavLink, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { MdStarRate } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../store/action/productsAction'
import { getthirdlevelCategoryAction, getthirdlevelCategoryFilterAction } from '../../store/action/categoryAction'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const sortOptions = [
    { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
    { name: 'Price: Low to High', sort: 'price', order: 'ase', current: false },
    { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductList = () => {
    const { categoryThirdFilter, categoryThird } = useSelector((state) => state.category)
    const location = useLocation()
    const [searchparam, setsearchparam] = useSearchParams()
    const { topCategory } = useParams()
    const [newproduct, setnewproduct] = useState()
    const [thirdparent, setthirdparent] = useState()
    const [third, setthird] = useState()
    const [categoryThirdData, setcategoryThirdData] = useState()
    const { products } = useSelector((state) => state.products)
    const [filter, setfilter] = useState([])

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (thirdparent) {
            dispatch(getthirdlevelCategoryFilterAction({ parentCategory: thirdparent }))
        }
    }, [location.search, thirdparent])

    useEffect(() => {
        const parent = categoryThirdData && categoryThirdData.filter((data) => data.parentCategory?.name === (location.search.split("?category=")[1].split('&')[0] || location.search.split("?category=")[1]))
        if (parent) {
            setthirdparent(parent[0]?.parentCategory?._id)
        }
    }, [third, location.search])

    useEffect(() => {
        if (thirdparent) {
            dispatch(getthirdlevelCategoryFilterAction({ parentCategory: thirdparent }))
        }
    }, [thirdparent])

    useEffect(() => {
        dispatch(getthirdlevelCategoryAction())
    }, [])

    useEffect(() => {
        const parent = categoryThirdData && categoryThirdData.filter((data) => data.parentCategory?.name === (location.search.split("?category=")[1].split('&')[0] || location.search.split("?category=")[1]))
        if (parent) {
            setthirdparent(parent[0]?.parentCategory?._id)
        }
    }, [categoryThirdData])

    useEffect(() => {
        dispatch(getProducts(location.search))
    }, [location.search])

    useEffect(() => {
        if (categoryThirdFilter) {
            setthird(categoryThirdFilter)
        }
    }, [categoryThirdFilter])

    useEffect(() => {
        if (categoryThird) {
            setcategoryThirdData(categoryThird)
        }
    }, [categoryThird])

    useEffect(() => {
        if (products) {
            setnewproduct(products)
        }
    }, [products])


    let thirdCategory = []



    const handleFilter = async (e, option, section) => {
        const parent2 = searchparam.get("thirdCategory[0]") && categoryThirdData && categoryThirdData.filter((data) => data.name === searchparam.get("thirdCategory[0]"))
        console.log(parent2[0]._id,"parent2[0]._id");
        parent2 && searchparam.get("thirdCategory[0]") && filter[parent2[0]._id].push(searchparam.get("thirdCategory[0]"))

        if (e.target.checked) {
            if (filter[section._id]) {
                filter[section._id].push(option);
            } else {
                filter[section._id] = option;
            }
        } else {
            delete filter[section._id]
        }

        for (let key in filter) {
            thirdCategory.push(filter[key])
        }
        setsearchparam(thirdCategory.length > 1 ? { category: searchparam.get('category'), thirdCategory: thirdCategory } : { category: searchparam.get('category'), "thirdCategory[0]": thirdCategory })

        //    const thirdArr = thirdCategory.map((ele, id) => `&thirdCategory[${id}]=${ele}`)
    }

    return (
        <div>
            <div className="bg-[#fff]">
                <div>
                    {/* Mobile filter dialog */}
                    <MobileScreenFilter handleFilter={handleFilter} setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen} />

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                            <h1 className="md:text-4xl text-3xl font-bold tracking-tight text-gray-900">All Products</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
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
                                        {/* sort search */}
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <div
                                                                // onClick={(e) => handleSort(e, option)}
                                                                className={classNames(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                {/* full screen */}
                                <DesktopScreenFilter handleFilter={handleFilter} third={third} thirdparent={thirdparent} thirdCategory={thirdCategory} searchparam={searchparam} setsearchparam={setsearchparam} />

                                {/* Product grid */}
                                <ProductGrid newproduct={newproduct} topCategory={topCategory} location={location} />
                            </div>
                        </section>

                        {/* pagination */}
                        <Pagination />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ProductList

function Pagination() {
    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            <a
                                href="#"
                                aria-current="page"
                                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                1
                            </a>
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                ...
                            </span>
                            <a
                                href="#"
                                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

function MobileScreenFilter({ handleFilter, mobileFiltersOpen, setMobileFiltersOpen }) {
    return (<>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            {/* mobile screen */}
                            <form className="mt-4 border-t border-gray-200">
                                {/* {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    onChange={(e) => handleFilter(e, option, section)}
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))} */}
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    </>);
}

function ProductGrid({ newproduct, topCategory, location }) {
    return (<>
        <div className="lg:col-span-3">
            <div className="bg-[#fff]">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {newproduct && Array.from(newproduct)?.map((product) => (
                            <NavLink to={`/products/${topCategory}/${location.search.split("?category=")[1].split("&")[0]}/${location.search.split("&thirdCategory[0]=" || "&thirdCategory=")[1] ? location.search.split("&thirdCategory[0]=" || "&thirdCategory=")[1] : newproduct[0]?.category?.name}/${product._id}`}>
                                <div key={product.id} className="group relative border-solid border-[1px] p-2 border-gray-300 rounded-md">
                                    <div className="aspect-h-1 min-h-60 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.thumbnail}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div className="inline">
                                            <h3 className="text-sm text-black-900 font-bold">
                                                <a href={product.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                </a>
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-700">
                                                <MdStarRate className="w-6 h-6  inline" />
                                                <span className="align-bottom">
                                                    {product.rating}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="inline">
                                            <p className="text-sm font-bold  text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                                            <p className="text-sm font-medium line-through text-gray-400">${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>);
}

function DesktopScreenFilter({ handleFilter, third, thirdparent, thirdCategory, searchparam, setsearchparam }) {
    console.log(searchparam.get("thirdCategory[0]"), "drftgyhuji");
    return (<>
        <form className="hidden lg:block">
            {(thirdparent && thirdparent.length > 0) &&
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Categories</spam> </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {third && third.map((section, id) => (
                                <div key={section.value} className="flex items-center">
                                    <input
                                        id={`filter-${section.id}-${id}`}
                                        name={`${section.name}`}
                                        // name={`${section.name}[]`}
                                        defaultValue={searchparam.get("thirdCategory[0]") === section.name ? searchparam.get("thirdCategory[0]") === section.name : section.name}
                                        type="checkbox"
                                        // value={section.name}
                                        defaultChecked={searchparam.get("thirdCategory[0]") === section.name ? searchparam.get("thirdCategory[0]") === section.name : section.name.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={(e) => handleFilter(e, section.name, section)}
                                    />
                                    <label
                                        htmlFor={`filter-${section.id}-${id}`}
                                        className="ml-3 text-lg cursor-pointer text-black-900"
                                    >
                                        {section.name.includes("kids_") ? section.name.split("kids_")[1].charAt(0).toUpperCase() + section.name.split("kids_" && "_")[1].slice(1) + " " + (section.name.split("_")[2] ? section.name.split("_")[2].charAt(0).toUpperCase() + section.name.split("_")[2].slice(1) : "") : section.name.split("men_" && "_")[1].charAt(0).toUpperCase() + section.name.split("men_" && "_")[1].slice(1) + " " + (section.name.split("_")[2] ? section.name.split("_")[2].charAt(0).toUpperCase() + section.name.split("_")[2].slice(1) : "")}
                                    </label>
                                </div>
                            ))}
                            <Button variant="outlined" size='sm' onClick={() => [setsearchparam(thirdCategory.length > 1 ? { category: searchparam.get('category'), thirdCategory: thirdCategory } : { category: searchparam.get('category'), "thirdCategory[0]": thirdCategory })]} >clear</Button>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography>Header</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </form>
    </>);
}

