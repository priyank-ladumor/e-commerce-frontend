/* eslint-disable no-unused-expressions */
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
import { CompactPicker } from 'react-color'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { IoFilter } from "react-icons/io5";
import { getSizesAction } from '../../store/action/sizeAction'
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { MdClearAll } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
// import Label from 'src/components/label';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaRupeeSign } from "react-icons/fa";
import { alpha } from '@mui/material/styles';
import { Bars } from 'react-loader-spinner'



const ProductList = () => {

    const [searchparam, setsearchparam] = useSearchParams()
    const location = useLocation()

    const { categoryThirdFilter, categoryThird } = useSelector((state) => state.category)
    const { getSizesDATA } = useSelector((state) => state.size)

    const { topCategory } = useParams()
    const [FilterOpne, setFilterOpne] = useState(false)
    const [newproduct, setnewproduct] = useState()
    const [thirdparent, setthirdparent] = useState()
    const [third, setthird] = useState()
    const [categoryThirdData, setcategoryThirdData] = useState()
    const { products, getFilterProductPENDING } = useSelector((state) => state.products)
    const [filter, setfilter] = useState([])
    const [getsizedata, setgetsizedata] = useState("")
    const [MIN, SetMIN] = React.useState(0)
    const [MAX, SetMAX] = React.useState(10000)
    let thirdCategory = []

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const dispatch = useDispatch()

    const locationSort = searchparam.get("sort") === null ? "" : searchparam.get("sort")
    const locationColor = searchparam.get("color") === null ? "" : searchparam.get("color")
    const locationPageSize = +searchparam.get("pageSize") === 0 ? 12 : +searchparam.get("pageSize")
    const locationPageNumber = +searchparam.get("pageNumber") === 0 ? 1 : +searchparam.get("pageNumber")
    const locationMaxPrice = +searchparam.get("maxPrice") === 0 ? "" : searchparam.get("maxPrice")
    const locationMinPrice = +searchparam.get("minPrice") === 0 ? "" : searchparam.get("minPrice")
    const locationSizes = (searchparam.get("sizes") === 0 || searchparam.get("sizes") === null) ? "" : searchparam.get("sizes")
    const locationMinDiscount = +searchparam.get("minDiscount") === 0 ? "" : searchparam.get("minDiscount")
    const locationAvailable = searchparam.get("available") === null ? "" : searchparam.get("available")



    const [sort, setsort] = useState(locationSort);
    const [pageSize, setpageSize] = useState(locationPageSize);
    const [color, setcolor] = useState(locationColor);
    const [minPrice, setminPrice] = React.useState(locationMinPrice)
    const [maxPrice, setmaxPrice] = React.useState(locationMaxPrice)
    const [pageNumber, setpageNumber] = React.useState(locationPageNumber)
    const [sizes, setsizes] = useState(locationSizes);
    const [minDiscount, setminDiscount] = useState(locationMinDiscount);
    const [available, setavailable] = useState(locationAvailable);


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
                            , sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                        }
                        :
                        // one selected category filter 
                        {
                            category: searchparam.get('category'), "thirdCategoryCheckBox": "on", 'thirdCategory[0]': thirdCategory, "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                            , sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                        })
                    :
                    //one category select from navbar
                    {
                        category: searchparam.get('category'), "thirdCategoryCheckBox": "off", 'thirdCategory[0]': searchparam.get('thirdCategory[0]'), "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                        , sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                    }
            )
        } else {
            setsearchparam(location.search)
        }
    }, [sort, pageSize, color, minPrice, maxPrice, available, sizes, pageNumber, location.search, minDiscount, filter])

    useEffect(() => {
        // setsearchparam({color})
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
                        , sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                    }
                    :
                    // one selected category filter 
                    {
                        category: searchparam.get('category'), "thirdCategoryCheckBox": "on", 'thirdCategory[0]': thirdCategory, "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                        , sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                    })
                :
                //one category select from navbar
                {
                    category: searchparam.get('category'), "thirdCategoryCheckBox": "off", 'thirdCategory[0]': searchparam.get('thirdCategory[0]'), "resetThird": (searchparam.get('thirdCategory[0]') || searchparam.get('thirdCategory')) ? "false" : "true"
                    , sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                }
        )
    }, [sort, pageSize, color, minPrice, maxPrice, available, pageNumber, sizes, minDiscount])


    useEffect(() => {
        dispatch(getProducts(location.search))
    }, [location.search])

    useEffect(() => {
        dispatch(getSizesAction())
    }, [])

    useEffect(() => {
        if (getSizesDATA) {
            setgetsizedata(getSizesDATA)
        }
    }, [getSizesDATA])

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
            setnewproduct(products?.content)
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

        setsearchparam(thirdCategory.length > 1 ? { category: searchparam.get('category'), "thirdCategoryCheckBox": "on", thirdCategory: thirdCategory, "resetThird": "false", sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available } : { category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "thirdCategory[0]": thirdCategory, "resetThird": "false", sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available })
    }

    const thirdCategoryCngViaNavBar = searchparam.get('NewProduct')

    useEffect(() => {
        if (thirdCategoryCngViaNavBar === "true") {
            setminPrice(0)
            setmaxPrice(10000)
            setcolor("")
            SetMAX(10000)
            SetMIN(0)
            setavailable("")
            setsizes("")
            setpageSize(12)
            setpageNumber(1)
            setminDiscount("")
            setsort("")
            setsort("")
            setfilter([])
            setpageSize(12)
        }
    }, [thirdCategoryCngViaNavBar])

    useEffect(() => {
        setfilter([])
    }, [thirdparent]);

    useEffect(() => {
        //refresh page
        if (searchparam.get('resetThird') === "false") {
            setminPrice(0)
            setmaxPrice(10000)
            setcolor("")
            SetMAX(10000)
            SetMIN(0)
            setavailable("")
            setsizes("")
            setpageSize(12)
            setpageNumber(1)
            setminDiscount("")
            setsort("")
            setsort("")
            setfilter([])
            setpageSize(12)
        }
    }, [])

    const handleChangeSort = (event) => {
        setsort(event.target.value)
        setFilterOpne(true)
    }
    const handleChangePageSize = (event, value) => {
        setpageSize(event.target.value)
        setFilterOpne(true)
    }

    const [reloadSet, setreloadSet] = useState()
    useEffect(() => {
        const thirdURLData = (searchparam.get('thirdCategory') || searchparam.get('thirdCategory[0]'))
        setreloadSet(thirdURLData)
    }, [])

    const handleChangePageNumber = (event, value) => {
        setpageNumber(value)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [getFilterProductPENDING])

    return (
        <div>
            <div className="bg-[#fff] mt-10">
                <div>
                    {/* Mobile filter dialog */}
                    <MobileScreenFilter handleFilter={handleFilter} setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen} third={third} thirdparent={thirdparent}
                        searchparam={searchparam} setfilter={setfilter} filter={filter} setsearchparam={setsearchparam} pageSize={pageSize} reloadSet={reloadSet}
                        sort={sort} setcolor={setcolor} color={color} setmaxPrice={setmaxPrice} setminPrice={setminPrice} setpageNumber={setpageNumber} minPrice={minPrice} maxPrice={maxPrice}
                        pageNumber={pageNumber} setsizes={setsizes} sizes={sizes} getsizedata={getsizedata} minDiscount={minDiscount} setminDiscount={setminDiscount}
                        available={available} setavailable={setavailable} setsort={setsort} setpageSize={setpageSize} MIN={MIN} MAX={MAX} SetMIN={SetMIN} SetMAX={SetMAX} />

                    {/* desktop screen filter sort and pagesize  */}
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                            <h1 className="md:text-4xl text-xl font-semibold tracking-tight text-gray-700">Products</h1>

                            <div className="flex justify-center items-center">
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
                                            <MenuItem value="9">
                                                <em>9</em>
                                            </MenuItem>
                                            <MenuItem value="12">
                                                <em>12</em>
                                            </MenuItem>
                                            <MenuItem value="15">
                                                <em>15</em>
                                            </MenuItem>
                                            <MenuItem value="18">
                                                <em>18</em>
                                            </MenuItem>
                                            <MenuItem value="21">
                                                <em>21</em>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </span>

                                {/* sort search */}
                                <div className='hidesort p-0 font-semibold mx-3 flex items-center '>
                                    <span className='p-0' >Sort By:</span>
                                    <span>
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
                                </div>

                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => searchparam.get('thirdCategoryCheckBox') === "on" ?
                                        [setMobileFiltersOpen(true), setfilter([]), setminPrice(0), setmaxPrice(10000), setsearchparam({
                                            category: searchparam.get('category'), "thirdCategoryCheckBox": "on", thirdCategory, "resetThird": "true",
                                            sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available
                                        })
                                        ]
                                        : setMobileFiltersOpen(true)
                                        }
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
                                    searchparam={searchparam} setfilter={setfilter} filter={filter} setsearchparam={setsearchparam} pageSize={pageSize} reloadSet={reloadSet}
                                    sort={sort} setcolor={setcolor} color={color} setmaxPrice={setmaxPrice} setminPrice={setminPrice} setpageNumber={setpageNumber} minPrice={minPrice} maxPrice={maxPrice}
                                    pageNumber={pageNumber} setsizes={setsizes} sizes={sizes} getsizedata={getsizedata} minDiscount={minDiscount} setminDiscount={setminDiscount}
                                    available={available} setavailable={setavailable} setsort={setsort} setpageSize={setpageSize} MIN={MIN} MAX={MAX} SetMIN={SetMIN} SetMAX={SetMAX}
                                />

                                {/* Product grid */}
                                {
                                    getFilterProductPENDING ?
                                        <div className='flex justify-center items-center  m-[50px]  h-[600px] col-span-3'>
                                            <Bars
                                                visible={true}
                                                height="80"
                                                width="80"
                                                ariaLabel="magnifying-glass-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="magnifying-glass-wrapper"
                                                glassColor="#c0efff"
                                                color="blue"
                                            />
                                        </div>
                                        :
                                        newproduct?.length > 0 ?
                                            <ProductGrid newproduct={newproduct} topCategory={topCategory} location={location} />
                                            :
                                            getFilterProductPENDING === false &&
                                            <div className='flex m-[50px] justify-center items-center bg-red-100 h-[200px] col-span-3'>
                                                <span className='font-bold' style={{ fontSize: "35px" }} >No filtered product found</span>
                                            </div>
                                }
                            </div>
                        </section>

                        <PaginationFun handleChangePageNumber={handleChangePageNumber} pageNumber={pageNumber} products={products} />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ProductList

function PaginationFun({ handleChangePageNumber, pageNumber, products }) {
    return (
        <>
            <Stack spacing={2} className='flex items-center justify-center pb-12' >
                <Pagination count={products && products?.totalPages} page={pageNumber} onChange={handleChangePageNumber} showFirstButton showLastButton />
            </Stack>
        </>
    );
}

function MobileScreenFilter({ handleFilter, mobileFiltersOpen, setMobileFiltersOpen, third, thirdparent, searchparam, setfilter, filter, setsearchparam, pageSize, sort, setcolor, color,
    setmaxPrice, setminPrice, setpageNumber, minPrice, maxPrice, pageNumber, setsizes, sizes, getsizedata, minDiscount, setminDiscount, available, setavailable,
    setsort, setpageSize, MIN, MAX, SetMIN, SetMAX }) {
    const [price, setprice] = React.useState([MIN, MAX])
    const marks = [
        {
            value: MIN,
            label: '',
        },
        {
            value: MAX,
            label: '',
        },
    ];

    const handleChange = (_, newValue) => {
        setprice(newValue);
        SetMIN(newValue[0]);
        SetMAX(newValue[1]);
        setminPrice(newValue[0])
        setmaxPrice(newValue[1])
        setpageNumber(1)
    };

    React.useEffect(() => {
        setprice([MIN, MAX])
    }, [MIN, MAX])

    const handlecngMIN = (e) => {
        setminPrice(e.target.value.trim())
        SetMIN(e.target.value.trim())
        setprice([MIN, MAX])
    }

    const handlecngMAX = (e) => {
        setmaxPrice(e.target.value.trim())
        SetMAX(e.target.value.trim())
        setprice([MIN, MAX])
    }

    useEffect(() => {
        if (minPrice < 0) {
            setminPrice(0)
        }
        if (maxPrice <= 10) {
            setmaxPrice(10000)
        }
        if (MAX <= 10) {
            SetMAX(10000)
        }
        if (MIN < 0) {
            SetMIN(0)
        }
    }, [maxPrice, minPrice, MAX, MIN])

    const renderPrice = (
        <Stack spacing={1}>
            {/* <FormLabel id="demo-radio-buttons-group-label">Price:</FormLabel> */}
            <Box sx={{ width: 240 }}>
                <Slider
                    marks={marks}
                    step={10}
                    value={price}
                    valueLabelDisplay="auto"
                    min={0}
                    max={MAX > 10000 ? MAX : 10000}
                    onChange={handleChange}
                    style={{ boxShadow: "none" }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='flex items-center'>
                        <input className=' rmv-shadow  ' inputProps={{ min: 0 }}
                            type='number' onChange={e => [handlecngMIN(e), setpageNumber(1)]} label="Min" value={MIN} style={{ width: "75px", borderBottom: "1px solid black", display: "flex", justifyContent: "center", textAlign: "center" }} id="standard-basic" variant="standard" />
                    </div>
                    <div className='flex items-center'>
                        <input className=' rmv-shadow '
                            inputProps={{
                                min: 10,
                            }}
                            type='number'
                            inputmode="numeric" onChange={e => [handlecngMAX(e), setpageNumber(1)]} value={MAX} style={{ width: "75px", borderBottom: "1px solid black", display: "flex", justifyContent: "center", textAlign: "center" }} id="standard-basic" label="Max" variant="standard" />
                    </div>
                </Box>
            </Box>
        </Stack>
    );

    const renderSizes = (
        <Stack spacing={1}>
            {/* <FormLabel id="demo-radio-buttons-group-label">Size:</FormLabel> */}
            <div className=" grid grid-cols-4 ">
                {getsizedata && getsizedata.map((name) => (
                    name.options.map((opt) => (
                        <div onClick={() => [setsizes(opt), setpageNumber(1)]}
                            className='flex m-2 cursor-pointer font-semibold rounded-full justify-center items-center p-[10px]'
                            style={{ width: "50px", fontSize: "16px", border: sizes === opt ? "3px black solid" : "1px gray solid", }} >
                            {opt.split("_")[0]}
                        </div>
                    ))
                ))}
            </div>
        </Stack>
    );

    useEffect(() => {
        if (minDiscount < 0) {
            setminDiscount(0)
        }
        if (minDiscount >= 99) {
            setminDiscount(99)
        }
    }, [minDiscount])

    const renderminDiscount = (
        <Stack spacing={1}>
            <div className='flex items-center' >
                <FormLabel id="demo-radio-buttons-group-label">Min Discount:</FormLabel>
                <input className='ms-2 rmv-shadow ' type='number'
                    min="0" minLength={2} max="99" onChange={e => [setminDiscount(e.target.value), setpageNumber(1)]} value={minDiscount} style={{ width: "45px", borderBottom: "1px solid black", }} id="standard-basic" variant="standard" />
            </div>
        </Stack>
    )
    const renderAvailable = (
        <Stack spacing={1}>
            <FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label">Available</FormLabel> */}
                <RadioGroup
                    defaultValue="female"
                    aria-labelledby="demo-customized-radios"
                    name="customized-radios"
                    value={available}
                    onChange={(e) => [setavailable(e.target.value), setpageNumber(1)]}
                >
                    <div className='flex text-black font-semibold'>
                        <FormControlLabel value="in_stock" control={<Radio />} label="In stock" />
                        <FormControlLabel value="out_of_stock" control={<Radio />} label="Out of stock" />
                    </div>
                </RadioGroup>
            </FormControl>
        </Stack>
    )
    return (<>
        <Transition.Root show={mobileFiltersOpen} as={Fragment} className="z-[1000]" >
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
                            <form className="mt-4 border-t border-gray-200 p-3">
                                {(thirdparent && thirdparent.length > 0 && searchparam.get('thirdCategoryCheckBox') === "on") &&
                                    <Accordion defaultExpanded style={{ minWidth: "278px" }} >
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
                                                    <Button variant="outlined" style={{ minWidth: "100%", marginTop: "20px", borderColor: "gray" }} color='error' onClick={() => [setfilter([]), setminPrice(0), setmaxPrice(10000), setsearchparam({ category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "resetThird": "true", sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available })]} >clear</Button>
                                                }
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                }
                                <Accordion defaultExpanded style={{ minWidth: "278px" }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Colors</spam> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <CompactPicker color={color} onChange={(clr) => setcolor(clr.hex)} />
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion defaultExpanded style={{ minWidth: "278px" }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Price Range</spam> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {renderPrice}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ minWidth: "278px" }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Sizes</spam> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {renderSizes}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ minWidth: "278px" }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Discount</spam> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {renderminDiscount}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ minWidth: "278px" }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                        <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Available</spam> </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {renderAvailable}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Box sx={{ minWidth: "278px", marginTop: "35px" }}>
                                    <Button
                                        fullWidth
                                        size="large"
                                        // type="button"
                                        color="inherit"
                                        variant="outlined"
                                        onClick={() => [setfilter([]), setminPrice(0), setmaxPrice(10000), setcolor(""), SetMAX(10000), SetMIN(0), setavailable(""), setsizes(""), setpageSize(12), setpageNumber(1), setminDiscount(""), setsort(""), setsearchparam({ category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "resetThird": "true", sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available })]}
                                        startIcon={<MdClearAll icon="ic:round-clear-all" />}
                                    >
                                        Clear All
                                    </Button>
                                </Box>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    </>);
}

function ProductGrid({ newproduct, topCategory, location }) {
    function ColorPreview({ product, limit = 3, sx }) {
        const Pcolors = product && product.sizesAndColor.map((clr) => clr.color)
        const rmvSameClr = [...new Set(Pcolors)];
        const renderColors = rmvSameClr && rmvSameClr.slice(0, limit);
        const remainingColor = rmvSameClr && rmvSameClr.length - limit;
        return (
            <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
                {renderColors && renderColors.map((color, index) => (
                    <Box
                        key={color + index}
                        sx={{
                            ml: -0.75,
                            width: 16,
                            height: 16,
                            bgcolor: color,
                            borderRadius: '50%',
                            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
                            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
                        }}
                    />
                ))}

                {rmvSameClr && rmvSameClr.length > limit && (
                    <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${remainingColor}`}</Box>
                )}
            </Stack>
        );
    }

    return (<>
        <div className="lg:col-span-3 p-6 ">
            <div className="bg-[#fff] ">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {newproduct && Array.from(newproduct)?.map((product) =>
                        (
                            <>
                                <NavLink to={`/products/${topCategory}/${location.search && location.search.split("?category=")[1].split("&")[0]}/${location.search?.split("&thirdCategory[0]=" || "&thirdCategory=")[1] ? location.search?.split("&thirdCategory[0]=" || "&thirdCategory=")[1] : newproduct[0]?.category?.name}/${product._id}`}>
                                    <Card>
                                        <Box sx={{ pt: '100%', position: 'relative' }}>
                                            {product &&
                                                <Box
                                                    component="img"
                                                    alt={product?.title}
                                                    src={product?.thumbnail[0]}
                                                    sx={{
                                                        top: 0,
                                                        width: 1,
                                                        height: 1,
                                                        objectFit: 'cover',
                                                        position: 'absolute',
                                                    }}
                                                />}
                                        </Box>
                                        <Stack spacing={2} sx={{ p: 3 }}>
                                            <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                                                {product.title}
                                            </Link>

                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <ColorPreview product={product} />
                                                <Typography variant="subtitle1 flex justify-center items-center">
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        sx={{
                                                            color: 'text.disabled',
                                                            textDecoration: 'line-through',
                                                        }}
                                                    >
                                                        <div className='flex items-center justify-center'>
                                                            <FaRupeeSign style={{ fontSize: "16px" }} />{product?.price}
                                                        </div>
                                                    </Typography>
                                                    &nbsp;
                                                    <div className='flex  items-center justify-center'>
                                                        <FaRupeeSign style={{ fontSize: "16px" }} />{product?.discountPrice}
                                                    </div>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Card>
                                </NavLink>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>);
}

function DesktopScreenFilter({ handleFilter, third, thirdparent, searchparam, setfilter, filter, setsearchparam, pageSize, sort, setcolor, color,
    setmaxPrice, setminPrice, setpageNumber, minPrice, maxPrice, pageNumber, setsizes, sizes, getsizedata, minDiscount, setminDiscount, available, setavailable,
    setsort, setpageSize, MIN, MAX, SetMIN, SetMAX }) {

    const [price, setprice] = React.useState([MIN, MAX])
    const marks = [
        {
            value: MIN,
            label: '',
        },
        {
            value: MAX,
            label: '',
        },
    ];

    const handleChange = (_, newValue) => {
        setprice(newValue);
        SetMIN(newValue[0]);
        SetMAX(newValue[1]);
        setminPrice(newValue[0])
        setmaxPrice(newValue[1])
        setpageNumber(1)
    };

    React.useEffect(() => {
        setprice([MIN, MAX])
    }, [MIN, MAX])

    const handlecngMIN = (e) => {
        setminPrice(e.target.value.trim())
        SetMIN(e.target.value.trim())
        setprice([MIN, MAX])
    }

    const handlecngMAX = (e) => {
        setmaxPrice(e.target.value.trim())
        SetMAX(e.target.value.trim())
        setprice([MIN, MAX])
    }

    useEffect(() => {
        if (minPrice < 0) {
            setminPrice(0)
        }
        if (maxPrice <= 10) {
            setmaxPrice(10000)
        }
        if (MAX <= 10) {
            SetMAX(10000)
        }
        if (MIN < 0) {
            SetMIN(0)
        }
    }, [maxPrice, minPrice, MAX, MIN])

    const renderPrice = (
        <Stack spacing={1}>
            {/* <FormLabel id="demo-radio-buttons-group-label">Price:</FormLabel> */}
            <Box sx={{ width: 240 }}>
                <Slider
                    marks={marks}
                    step={10}
                    value={price}
                    valueLabelDisplay="auto"
                    min={0}
                    max={MAX > 10000 ? MAX : 10000}
                    onChange={handleChange}
                    style={{ boxShadow: "none" }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='flex items-center'>
                        <input className=' rmv-shadow  ' inputProps={{ min: 0 }}
                            type='number' onChange={e => [handlecngMIN(e), setpageNumber(1)]} label="Min" value={MIN} style={{ width: "75px", borderBottom: "1px solid black", display: "flex", justifyContent: "center", textAlign: "center" }} id="standard-basic" variant="standard" />
                    </div>
                    <div className='flex items-center'>
                        <input className=' rmv-shadow '
                            inputProps={{
                                min: 10,
                            }}
                            type='number'
                            inputmode="numeric" onChange={e => [handlecngMAX(e), setpageNumber(1)]} value={MAX} style={{ width: "75px", borderBottom: "1px solid black", display: "flex", justifyContent: "center", textAlign: "center" }} id="standard-basic" label="Max" variant="standard" />
                    </div>
                </Box>
            </Box>
        </Stack>
    );

    const renderSizes = (
        <Stack spacing={1}>
            {/* <FormLabel id="demo-radio-buttons-group-label">Size:</FormLabel> */}
            <div className=" grid grid-cols-4 ">
                {getsizedata && getsizedata.map((name) => (
                    name.options.map((opt) => (
                        <div onClick={() => [setsizes(opt), setpageNumber(1)]}
                            className='flex m-2 cursor-pointer font-semibold rounded-full justify-center items-center p-[10px]'
                            style={{ width: "50px", fontSize: "16px", border: sizes === opt ? "3px black solid" : "1px gray solid", }} >
                            {opt.split("_")[0]}
                        </div>
                    ))
                ))}
            </div>
        </Stack>
    );

    useEffect(() => {
        if (minDiscount < 0) {
            setminDiscount(0)
        }
        if (minDiscount >= 99) {
            setminDiscount(99)
        }
    }, [minDiscount])

    const renderminDiscount = (
        <Stack spacing={1}>
            <div className='flex items-center' >
                <FormLabel id="demo-radio-buttons-group-label">Min Discount:</FormLabel>
                <input className='ms-2 rmv-shadow ' type='number'
                    min="0" minLength={2} max="99" onChange={e => [setminDiscount(e.target.value), setpageNumber(1)]} value={minDiscount} style={{ width: "45px", borderBottom: "1px solid black", }} id="standard-basic" variant="standard" />
            </div>
        </Stack>
    )
    const renderAvailable = (
        <Stack spacing={1}>
            <FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label">Available</FormLabel> */}
                <RadioGroup
                    defaultValue="female"
                    aria-labelledby="demo-customized-radios"
                    name="customized-radios"
                    value={available}
                    onChange={(e) => [setavailable(e.target.value), setpageNumber(1)]}
                >
                    <div className='flex text-black font-semibold'>
                        <FormControlLabel value="in_stock" control={<Radio />} label="In stock" />
                        <FormControlLabel value="out_of_stock" control={<Radio />} label="Out of stock" />
                    </div>
                </RadioGroup>
            </FormControl>
        </Stack>
    )
    return (<>
        <form className="hidden lg:block">
            <div className='flex justify-between items-center w-[280px] border-b-4 pb-4' style={{ minWidth: "278px" }} >
                <span className='text-2xl font-semibold ms-1' >Filter</span>
                <div className='' >
                    <IoFilter className='text-2xl font-bold' />
                </div>
            </div>
            {(thirdparent && thirdparent.length > 0 && searchparam.get('thirdCategoryCheckBox') === "on") &&
                <Accordion defaultExpanded style={{ minWidth: "278px" }} >
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
                                <Button variant="outlined" style={{ minWidth: "100%", marginTop: "20px", borderColor: "gray" }} color='error' onClick={() => [setfilter([]), setminPrice(0), setmaxPrice(10000), setsearchparam({ category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "resetThird": "true", sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available })]} >clear</Button>
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
            <Accordion defaultExpanded style={{ minWidth: "278px" }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Colors</spam> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <CompactPicker color={color} onChange={(clr) => setcolor(clr.hex)} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded style={{ minWidth: "278px" }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Price Range</spam> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {renderPrice}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ minWidth: "278px" }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Sizes</spam> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {renderSizes}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ minWidth: "278px" }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Discount</spam> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {renderminDiscount}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ minWidth: "278px" }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography > <spam className='text-xl font-semibold tracking-tight text-gray-600' >Available</spam> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {renderAvailable}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Box sx={{ minWidth: "278px", marginTop: "35px" }}>
                <Button
                    fullWidth
                    size="large"
                    // type="button"
                    color="inherit"
                    variant="outlined"
                    onClick={() => [setfilter([]), setminPrice(0), setmaxPrice(10000), setcolor(""), SetMAX(10000), SetMIN(0), setavailable(""), setsizes(""), setpageSize(12), setpageNumber(1), setminDiscount(""), setsort(""), setsearchparam({ category: searchparam.get('category'), "thirdCategoryCheckBox": "on", "resetThird": "true", sort, pageSize, color, minPrice, maxPrice, pageNumber, sizes, minDiscount, available })]}
                    startIcon={<MdClearAll icon="ic:round-clear-all" />}
                >
                    Clear All
                </Button>
            </Box>
        </form>
    </>);
}

