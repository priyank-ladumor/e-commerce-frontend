import { CFormInput, CFormLabel } from '@coreui/react'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { createAddressAction, getUserAddressAction } from '../../store/action/addressAction';
import { ThreeDots } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineClose } from 'react-icons/md';

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
        .max(20, "street address must be with in 20 characters")
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

const Address = ({ userProfile }) => {
    const dispatch = useDispatch()
    const [createAddressPopUp, setcreateAddressPopUp] = useState(false)
    const [showForm, setshowForm] = useState(false)
    const [address, setaddress] = useState()
    const { createAddressPENDING, createAddressMSG, UserAddressPENDING, UserAddress } = useSelector((state) => state.address)
    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
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
        if (userProfile) {
            dispatch(getUserAddressAction(userProfile))
        }
    }, [userProfile])

    useEffect(() => {
        if (UserAddress) {
            setaddress(UserAddress);
        }
    }, [UserAddress])
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='block mt-6' style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }} >
                    <div className='grid grid-cols-12 gap-4 p-6 '  >
                        <div className='flex justify-between items-center col-span-12 ' >
                            <h2 className="text-3xl text-gray-900 font-semibold tracking-tighter pb-4">Address</h2>
                            {showForm ?
                                <h2 onClick={() => setshowForm(!showForm)} className=' flex justify-center items-center border-2 border-black p-2 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white ' ><MdOutlineClose className='size-[22px]' /><span className='ms-2 text-xl font-semibold' >Close</span></h2>
                                :
                                <h2 onClick={() => setshowForm(!showForm)} className=' flex justify-center items-center border-2 border-black p-2 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white ' ><FaPlus className='size-[22px]' /><span className='ms-2 text-xl font-semibold' >Add Address</span></h2>
                            }
                        </div>
                    </div>
                    {showForm &&
                        <div className='block -mt-8' >
                            <div className='grid grid-cols-12 gap-4 p-6 '  >
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
                            <div className='p-6 flex justify-between' >
                                <div className='' >
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
                            </div>
                        </div>
                    }
                    {
                        address && address?.map((ele) => {
                            return (
                                <>
                                    <div>
                                        {ele.firstName}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </form>
        </div>
    )
}

export default Address
