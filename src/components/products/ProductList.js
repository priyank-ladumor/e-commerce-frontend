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
import {
    MenuItem,
    Select,
} from "@mui/material";
import FormControl from '@mui/material/FormControl';

// const sortOptions = [
//     { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
//     { name: 'Price: Low to High', sort: 'price', order: 'ase', current: false },
//     { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

const ProductList = () => {

    const [searchparam, setsearchparam] = useSearchParams()
    const location = useLocation()

    const { categoryThirdFilter, categoryThird } = useSelector((state) => state.category)
    const { topCategory } = useParams()
    const [FilterOpne, setFilterOpne] = useState(false)
    const [newproduct, setnewproduct] = useState()
    const [thirdparent, setthirdparent] = useState()
    const [third, setthird] = useState()
    const [categoryThirdData, setcategoryThirdData] = useState()
    const { products } = useSelector((state) => state.products)
    const [filter, setfilter] = useState([])
    let thirdCategory = []

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const dispatch = useDispatch()

    const locationSort = searchparam.get("sort") === null ? "" : searchparam.get("sort")
    const locationPageSize = +searchparam.get("pageSize") === 0 ? 12 : +searchparam.get("pageSize")


    const [sort, setsort] = useState(locationSort);
    const [pageSize, setpageSize] = useState(locationPageSize);

    useEffect(() => {
        if (FilterOpne) {
            for (let key in filter) {
                thirdCategory.push(filter[key])
            }
            setsearchparam(
                searchparam.get('thirdCategoryCheckBox') === "on"
                    ?
                    (thirdCategory.length > 1 ?
                        //multiple select category filter
                        {
                            category: searchparam.get('category'), "thirdCategoryCheckBox": "on", thirdCategory, "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                            , sort, pageSize
                        }
                        :
                        // one selected category filter 
                        {
                            category: searchparam.get('category'), "thirdCategoryCheckBox": "on", 'thirdCategory[0]': thirdCategory, "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                            , sort, pageSize
                        })
                    :
                    //one category select from navbar
                    {
                        category: searchparam.get('category'), "thirdCategoryCheckBox": "off", 'thirdCategory[0]': searchparam.get('thirdCategory[0]'), "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                        , sort, pageSize
                    }
            )
        } else {
            setsearchparam(location.search)
        }
    }, [sort, pageSize, location.search, filter])


    useEffect(() => {
        dispatch(getProducts(location.search))
    }, [location.search])

    useEffect(() => {
        if (thirdparent) {
            dispatch(getthirdlevelCategoryFilterAction({ parentCategory: thirdparent }))
        }
    }, [location.search, thirdparent])

    useEffect(() => {
        const parent = categoryThirdData && location.search && categoryThirdData.filter((data) => data.parentCategory?.name === (location.search.split("?category=")[1].split('&')[0] || location.search.split("?category=")[1]))
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
        const parent = location.search && categoryThirdData && categoryThirdData.filter((data) => data.parentCategory?.name === (location.search.split("?category=")[1].split('&')[0] || location.search.split("?category=")[1]))
        if (parent) {
            setthirdparent(parent[0]?.parentCategory?._id)
        }
    }, [categoryThirdData])

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

    const handleFilter = async (e, option, section) => {

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

        setsearchparam(thirdCategory.length > 1 ? { category: searchparam.get('category'), "thirdCategoryCheckBox": "on", thirdCategory: thirdCategory, "resetThird": "false", sort, pageSize } : { category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "thirdCategory[0]": thirdCategory, "resetThird": "false", sort, pageSize })
    }

    useEffect(() => {
        setfilter([])
    }, [thirdparent]);

    // useEffect(() => {
    //     if(searchparam.get('resetThird') === "true" && !searchparam.get('thirdCategory[0]')){
    //         setsearchparam({ category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "resetThird": "true", sort, pageSize })
    //         setsort("")
    //         setfilter([])
    //         setpageSize(12)
    //     }
    // }, [])

    const handleChangeSort = (event) => {
        setsort(event.target.value)
        setFilterOpne(true)
    }
    const handleChangePageSize = (event, value) => {
        setpageSize(event.target.value)
        setFilterOpne(true)
    }
    return (
        <div>
            <div className="bg-[#fff] mt-10">
                <div>
                    {/* Mobile filter dialog */}
                    <MobileScreenFilter handleFilter={handleFilter} setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen} />

                    {/* desktop screen filter sort and pagesize  */}
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                            <h1 className="md:text-4xl text-xl font-semibold tracking-tight text-gray-700">Products</h1>

                            <div className="flex items-center">
                                {/* page size set  */}
                                <span className='hide2 font-semibold flex items-center'>Products per page:
                                    <FormControl variant="standard" sx={{ m: 0 }}>
                                        <Select
                                            id="demo-simple-select-standard"
                                            value={pageSize}
                                            onChange={handleChangePageSize}
                                            displayEmpty
                                            style={{ padding: "0px", width: "45px" }}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className='ms-2'
                                        >
                                            <MenuItem value="8">
                                                <em>8</em>
                                            </MenuItem>
                                            <MenuItem value="12">
                                                <em>12</em>
                                            </MenuItem>
                                            <MenuItem value="16">
                                                <em>16</em>
                                            </MenuItem>
                                            <MenuItem value="20">
                                                <em>20</em>
                                            </MenuItem>
                                            <MenuItem value="24">
                                                <em>24</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </span>

                                {/* sort search */}
                                <span className=' font-semibold mx-3 flex items-center'>Sort By:
                                    <FormControl variant="standard" sx={{ m: 0 }}>
                                        <Select
                                            id="demo-simple-select-standard"
                                            value={sort}
                                            onChange={handleChangeSort}
                                            displayEmpty
                                            style={{ padding: "0px", width: sort.length > 0 ? "145px" : "61px" }}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className='ms-2'
                                        >
                                            <MenuItem value="">
                                                <em>none</em>
                                            </MenuItem>
                                            <MenuItem value="high_to_low">
                                                <em>Price: High-Low</em>
                                            </MenuItem>
                                            <MenuItem value="low_to_high">
                                                <em>Price: Low-High</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </span>

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
                                <DesktopScreenFilter handleFilter={handleFilter} third={third} thirdparent={thirdparent}
                                    searchparam={searchparam} setfilter={setfilter} filter={filter} setsearchparam={setsearchparam} pageSize={pageSize} sort={sort} />

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
            <div className="bg-[#fff] ">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {newproduct && Array.from(newproduct)?.map((product) => (
                            <NavLink to={`/products/${topCategory}/${location.search && location.search.split("?category=")[1].split("&")[0]}/${location.search?.split("&thirdCategory[0]=" || "&thirdCategory=")[1] ? location.search?.split("&thirdCategory[0]=" || "&thirdCategory=")[1] : newproduct[0]?.category?.name}/${product._id}`}>
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

function DesktopScreenFilter({ handleFilter, third, thirdparent, searchparam, setfilter, filter, setsearchparam, pageSize, sort }) {
    return (<>
        <form className="hidden lg:block">
            {(thirdparent && thirdparent.length > 0 && searchparam.get('thirdCategoryCheckBox') === "on") &&
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Categories</spam>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='' >
                            {third && third.map((section, id) => (
                                <div key={section.name} className="flex items-center">
                                    <input
                                        id={`filter-${section.id}-${id}`}
                                        name={`${section.name}`}
                                        value={section.name}
                                        // checked={section.name ? section.name.checked : false}
                                        checked={searchparam.get('thirdCategory') ? searchparam.get('thirdCategory').checked : searchparam.get('thirdCategory[0]') ? searchparam.get('thirdCategory[0]').checked : searchparam.get('resetThird') === "false" ? section.name ? section.name.checked : false : false}
                                        type="checkbox"
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
                            {
                                searchparam.get('resetThird') === "false" &&
                                <Button variant="outlined" style={{ minWidth: "100%", marginTop: "20px", borderColor: "gray" }} color='error' onClick={() => [setfilter([]), setsearchparam({ category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "resetThird": "true", sort, pageSize })]} >clear</Button>
                            }
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

