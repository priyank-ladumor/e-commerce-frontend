import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import ShoppingCart from '../components/cart/ShoppingCart';
import { CForm, CFormInput, CFormLabel } from '@coreui/react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from '../store/action/userAction';
import { createAddressAction, deleteAddressAction, getUserAddressAction } from '../store/action/addressAction';
import { MdLocationOn, MdOutlineLocalPhone, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCartItemsAction } from '../store/action/cartAction';
import { checkAvailableQuantityAction } from '../store/action/orderAction';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const schema = yup.object({
    firstName: yup
        .string()
        .min(2, "First Name must be above 2 characters")
        .max(20, "First Name must be with in 20 characters")
        // .matches(/^\S*$/, "No whitespaces allowed")
        .required("please enter First Name"),
    lastName: yup
        .string()
        .min(2, "Last Name must be above 2 characters")
        .max(20, "Last Name must be with in 20 characters")
        // .matches(/^\S*$/, "No whitespaces allowed")
        .required("please enter Last Name"),
    streetAddress: yup
        .string()
        .min(4, "street address must be above 4 characters")
        .max(25, "street address must be with in 25 characters")
        .required("please enter street address"),
    city: yup
        .string()
        .required("please enter your city"),
    state: yup
        .string()
        .required("please enter your state"),
    phone: yup
        .string()
        .required("please enter your contact number")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
    zipCode: yup
        .string()
        .required("please enter your zip code")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Must be exactly 6 digits")
        .max(6, "Must be exactly 6 digits"),

});

const CheckOut = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { getCartItemsPENDING, getCartItemsData, addToCartMSG, removeCartItemsMSG, updateCartItemsMSG } = useSelector((state) => state.cart)
    const { checkAvailableQuantityERROR, checkAvailableQuantityPENDING, checkAvailableQuantityMSG } = useSelector((state) => state.order)

    const [createAddressPopUp, setcreateAddressPopUp] = useState(false)
    const [open, setOpen] = useState(true)
    const { createAddressPENDING, createAddressMSG, UserAddressPENDING, UserAddress, deleteAddressMSG } = useSelector((state) => state.address)
    const [address, setaddress] = useState()
    const dispatch = useDispatch()
    const { getUserProfileDATA, updateUserProfileMSG, updateUserProfilePENDING, UserAddressSuccess } = useSelector((state) => state.user)
    const [userProfile, setUserProfile] = useState("")

    const [selectedAddress, setselectedAddress] = useState("")
    const [paymentSys, setPaymentSys] = useState("")

    useEffect(() => {
        dispatch(getCartItemsAction())
    }, [])

    useEffect(() => {
        const cartItem = getCartItemsData && getCartItemsData.map((ele) => ele.cartItem)
        if ((cartItem && cartItem[0]?.length === 0) || (getCartItemsData && getCartItemsData.length === 0)) {
            Swal.fire({
                title: "Not available cart items",
                text: "You won't be able to see this page with zero cart items!",
                icon: "warning",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/")
                } else {
                    navigate("/")
                }
            })
        }
    }, [getCartItemsData])

    useEffect(() => {
        dispatch(getUserProfileAction())
    }, [updateUserProfileMSG])

    useEffect(() => {
        setUserProfile(getUserProfileDATA)
    }, [getUserProfileDATA])

    useEffect(() => {
        if (userProfile) {
            dispatch(getUserAddressAction(userProfile))
        }
    }, [userProfile, createAddressMSG, deleteAddressMSG])

    useEffect(() => {
        if (UserAddress) {
            setaddress(UserAddress);
        }
    }, [UserAddress])

    const onSubmit = (data, e) => {
        e.preventDefault();
        dispatch(createAddressAction(data))
        reset();
        setcreateAddressPopUp(true)
    }

    useEffect(() => {
        if (createAddressPopUp && createAddressMSG) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createAddressMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setcreateAddressPopUp(false)
        }
    }, [createAddressMSG])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [cartItemDetails, setcartItemDetails] = useState([])

    useEffect(() => {
        let cartArray = []
        const findCartItems = getCartItemsData && getCartItemsData[0].cartItem?.map((ele) => ele.product[0])
        const findsizesAndColor = findCartItems?.map((ele) => ele.sizesAndColor)
        if (findsizesAndColor && findsizesAndColor?.length > 0) {
            for (let quantity of findsizesAndColor) {
                const findSameProductAndCart = quantity?.map((ele) =>
                    getCartItemsData && getCartItemsData[0].cartItem?.filter((cartItem) => cartItem.color === ele.color && cartItem.size === ele.size)
                )
                const rmvEmptyfindSameProductAndCart = findSameProductAndCart?.filter((ele) => ele?.length > 0)

                for (let product of rmvEmptyfindSameProductAndCart) {
                    const bothsizeAndQuantity = product?.map((ele) => getCartItemsData && getCartItemsData[0].cartItem?.filter((cartItem) => cartItem.color === ele.color && cartItem.size === ele.size))
                    const cartData = bothsizeAndQuantity &&
                        bothsizeAndQuantity[0]?.map((ele) =>
                            [{
                                size: ele.size,
                                color: ele.color,
                                quantity: ele.quantity,
                                pid: ele.product[0]._id,
                                thumbnail: ele.product[0].thumbnail,
                                title: ele.product[0].title,
                                price: ele.product[0].price,
                                id: Math.floor(Math.random() * 100)
                            }]
                        )
                    cartArray.push(cartData[0][0]);
                    setcartItemDetails(cartArray);
                }
            }
        }
    }, [getCartItemsData])

    return (
        <div>
            <Navbar>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-5">
                        <div className="space-y-12">
                            <div className="">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                                <form onSubmit={handleSubmit(onSubmit)}  >
                                    <div className='block mt-4 border-b border-gray-900/10 pb-12' >
                                        <div className='grid grid-cols-12 gap-4'  >
                                            <div className=' col-span-6 ' >
                                                <CFormLabel className='text-xl font-medium' >First Name</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your first name"
                                                    {...register("firstName")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.firstName?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                            <div className=' col-span-6 ' >
                                                <CFormLabel className='text-xl font-medium' >Last Name</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your last name"
                                                    {...register("lastName")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.lastName?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                            <div className='order-3 col-span-12 ' >
                                                <CFormLabel className='text-xl font-medium' >Street Address</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your street address"
                                                    {...register("streetAddress")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.streetAddress?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                            <div className='md:col-span-6 order-3 col-span-12 ' >
                                                <CFormLabel className='text-xl font-medium' >Mobile No</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your mobile no."
                                                    {...register("phone")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.phone?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                            <div className='md:col-span-6 order-3 col-span-12 ' >
                                                <CFormLabel className='text-xl font-medium' >City</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your city name"
                                                    {...register("city")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.city?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                            <div className='md:col-span-6 order-3 col-span-12 ' >
                                                <CFormLabel className='text-xl font-medium' >State</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your state name"
                                                    {...register("state")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.state?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                            <div className='md:col-span-6 order-3 col-span-12 ' >
                                                <CFormLabel className='text-xl font-medium' >Pin Code</CFormLabel>
                                                <CFormInput
                                                    className=' w-[100%] mt-2 rounded-md'
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Enter your pin code"
                                                    {...register("zipCode")}
                                                    text={errors && <p style={{ color: "red" }} >{errors.zipCode?.message}</p>}
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                    size="sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => [reset(), clearErrors]} >
                                            Reset
                                        </button>
                                        <Button type='submit' color='success' variant="contained">
                                            {
                                                createAddressPENDING ?
                                                    <div className='flex justify-center items-center' >
                                                        <ThreeDots
                                                            visible={true}
                                                            height="20"
                                                            width="40"
                                                            color="#fff"
                                                            radius="9"
                                                            ariaLabel="three-dots-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                        />
                                                    </div>
                                                    :
                                                    "Add Address"
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Existing Address</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from existing address
                                </p>
                                <ul role="list" className="">
                                    {
                                        UserAddressPENDING === false && address && address?.length > 0 ?
                                            <div className='grid grid-cols-12 gap-4 mt-4'  >
                                                {
                                                    address && address?.map((ele) => {
                                                        return (
                                                            <>
                                                                <div className=' col-span-12 p-3 sm:col-span-6 lg:col-span-4 cursor-pointer rounded-md  relative' style={{ border: selectedAddress === ele._id ? "3px solid blue" : "1px solid gray" }} onClick={() => setselectedAddress(ele._id)} >
                                                                    <p className='capitalize font-semibold mb-4'><span style={{ fontSize: "18px" }} >{ele.firstName}</span>{" "}<span style={{ fontSize: "18px" }} >{ele.lastName}</span></p>
                                                                    <p className='capitalize flex items-center mb-2'><span className='border-[1px] border-black rounded-full p-1 mr-2' ><MdOutlineLocalPhone /></span><span>+91</span>{" "}<span>{ele.phone}</span></p>
                                                                    <div className='flex mb-2' >
                                                                        <div className='' >
                                                                            <span className='border-[1px] border-black rounded-full flex justify-center items-center p-1' ><MdLocationOn /></span>
                                                                        </div>
                                                                        <div className='ml-2' >
                                                                            <div className='flex items-center '>
                                                                                <span className='capitalize'>{ele.streetAddress}</span>{", "}
                                                                            </div>
                                                                            <span className='capitalize'>{ele.city}</span>{", "}<span className='capitalize'>{ele.state}{", "}<span className='capitalize'>{ele.zipCode}</span></span>
                                                                        </div>
                                                                    </div>
                                                                    {/* <span className='absolute inset-y-0 cursor-pointer right-3 top-3' ><MdOutlineRemoveCircleOutline onClick={() => handleAddressDelete(ele._id)} style={{ fontSize: "20px", color: "red" }} /> </span> */}
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            :
                                            UserAddressPENDING === true ?
                                                <div className='grid grid-cols-12 gap-3 ' >
                                                    {
                                                        [0, 1, 2]?.map((ele) => {
                                                            return (
                                                                <>
                                                                    <div className=' col-span-12 p-3 sm:col-span-6 lg:col-span-4  rounded-md border-[1px] border-gray-400 relative' >
                                                                        <SkeletonTheme baseColor="#f0f0f0" highlightColor="whitesmoke" >
                                                                            <p className='p-1' >
                                                                                <div className='flex justify-between' >
                                                                                    <Skeleton count={1} className='rounded-lg' style={{ width: "200px", height: "25px" }} />
                                                                                    <Skeleton count={1} className='rounded-full' style={{ width: "30px", height: "30px" }} />
                                                                                </div>
                                                                                <div className='flex justify-start mt-4' >
                                                                                    <Skeleton count={1} className='rounded-full' style={{ width: "30px", height: "30px" }} />
                                                                                    <Skeleton count={1} className='ms-4 rounded-lg' style={{ width: "200px", height: "25px" }} />
                                                                                </div>
                                                                                <div className='flex justify-start mt-4' >
                                                                                    <Skeleton count={1} className='rounded-full' style={{ width: "30px", height: "25px" }} />
                                                                                    <Skeleton count={1} className='ms-4 rounded-lg' style={{ width: "200px", height: "50px" }} />
                                                                                </div>
                                                                            </p>
                                                                        </SkeletonTheme>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                :
                                                UserAddressPENDING === false && address && address?.length === 0 && UserAddressSuccess &&
                                                <div className='grid grid-cols-12 gap-4 p-6 ' >
                                                    <div className='flex justify-center items-center bg-red-100 h-[100px] col-span-12'>
                                                        <span className='font-bold' style={{ fontSize: "35px" }} >No Available Address</span>
                                                    </div>
                                                </div>

                                    }
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
                                                    value={"CASH"}
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 cursor-pointer focus:ring-indigo-600"
                                                    onClick={(e) => setPaymentSys(e.target.value)}
                                                />
                                                <label htmlFor="cash" className="block text-sm font-medium cursor-pointer leading-6 text-gray-900">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3 ">
                                                <input
                                                    id="card"
                                                    name="payments"
                                                    value={"ONLINE"}
                                                    type="radio"
                                                    onClick={(e) => setPaymentSys(e.target.value)}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 cursor-pointer focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card" className="block text-sm font-medium cursor-pointer leading-6 text-gray-900">
                                                    Pay now
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-12">
                    <ShoppingCart paymentSys={paymentSys} selectedAddress={selectedAddress} cartItemDetails={cartItemDetails} />
                </div>
            </Navbar>
        </div>
    )
}

export default CheckOut
