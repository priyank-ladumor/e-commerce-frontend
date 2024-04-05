import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileAction, updateUserProfileAction } from '../../store/action/userAction'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, FormControl, colors } from '@mui/material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from 'sweetalert2';
import { ThreeDots } from "react-loader-spinner"
import Address from './Address';
import ResetPassword from './ResetPassword';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

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
    mobile: yup
        .string()
        .required("please enter your contact number")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
    email: yup.string().email().required("Please enter your email"),
});

const PersonalInformation = () => {
    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
        reset,
        setValue,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch()
    const { getUserProfileDATA, updateUserProfileMSG, updateUserProfilePENDING, getUserProfilePENDING } = useSelector((state) => state.user)
    const [userProfile, setUserProfile] = useState("")
    const [profileImg, setprofileImg] = useState([])
    const [updateProfilePopUp, setupdateProfilePopUp] = useState(false)

    useEffect(() => {
        dispatch(getUserProfileAction())
    }, [updateUserProfileMSG])

    useEffect(() => {
        setUserProfile(getUserProfileDATA)
    }, [getUserProfileDATA])

    useEffect(() => {
        if (userProfile) {
            setprofileImg(userProfile.profileImg && userProfile.profileImg)
            setValue("firstName", userProfile?.firstName);
            setValue("lastName", userProfile?.lastName);
            setValue("mobile", userProfile?.mobile);
            setValue("email", userProfile?.email);
        }
    }, [userProfile])

    const uploadprofileImg = (e) => {
        const files = e.target.files;

        const imagePromises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const reader = new FileReader();
                imagePromises.push(
                    new Promise((resolve) => {
                        reader.onload = (e) => {
                            resolve(e.target.result);
                        };
                        reader.readAsDataURL(file);
                    })
                );
            }
        }


        Promise.all(imagePromises).then((results) => {
            setprofileImg(results);
        });
    }

    const onSubmit = (data) => {
        const item = {
            firstName: data.firstName,
            mobile: data.mobile,
            lastName: data.lastName,
            email: data.email,
            profileImg: profileImg
        }
        dispatch(updateUserProfileAction(item))
        setupdateProfilePopUp(true)
        setprofileImg([])
    }
    useEffect(() => {
        if (updateProfilePopUp && updateUserProfileMSG) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: updateUserProfileMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setupdateProfilePopUp(false)
            setprofileImg([])
        }
    }, [updateUserProfileMSG])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='block'>
                    <div className='grid grid-cols-12 gap-4 p-6 '  >
                        <div className=' col-span-12 ' >
                            <h2 className="text-3xl text-gray-900 font-semibold tracking-tighter pb-4">Personal Information</h2>
                        </div>
                        <div className='lg:col-span-6 lg:order-1 order-2 col-span-12 ' >
                            <div className='mt-4' >
                                <CFormLabel className='text-xl font-medium' >First Name</CFormLabel>
                                {getUserProfilePENDING || updateUserProfilePENDING?
                                 <Skeleton count={1} className='w-[100%] mt-2 rounded-md block' style={{ height: "40px" }} /> :
                                    <CFormInput
                                        className=' w-[100%] mt-2 rounded-md'
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter your first name"
                                        text={errors && <p style={{ color: "red" }} >{errors.firstName?.message}</p>}
                                        {...register("firstName")}
                                        aria-describedby="exampleFormControlInputHelpInline"
                                        defaultValue={userProfile && userProfile.firstName}
                                        size="sm"
                                    />
                                }
                            </div>
                            <div className='mt-4' >
                                <CFormLabel className='text-xl font-medium' >Last Name</CFormLabel>
                                {getUserProfilePENDING || updateUserProfilePENDING?
                                 <Skeleton count={1} className='w-[100%] mt-2 rounded-md block' style={{ height: "40px" }} /> :
                                <CFormInput
                                    className=' w-[100%] mt-2 rounded-md'
                                    type="text"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter your last name"
                                    text={errors && <p style={{ color: "red" }} >{errors.lastName?.message}</p>}
                                    {...register("lastName")}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    defaultValue={userProfile && userProfile.lastName}
                                    size="sm"
                                />}
                            </div>
                            <div className='mt-4' >
                                <CFormLabel className='text-xl font-medium' >Email Address</CFormLabel>
                                {getUserProfilePENDING || updateUserProfilePENDING?
                                 <Skeleton count={1} className='w-[100%] mt-2 rounded-md block' style={{ height: "40px" }} /> :
                                <CFormInput
                                    className=' w-[100%] mt-2 rounded-md'
                                    type="email"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter your email address"
                                    text={errors && <p style={{ color: "red" }} >{errors.email?.message}</p>}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    {...register("email")}
                                    defaultValue={userProfile && userProfile.email}
                                    size="sm"
                                />}
                            </div>
                            <div className='mt-4' >
                                <CFormLabel className='text-xl font-medium' >Mobile No</CFormLabel>
                                {getUserProfilePENDING || updateUserProfilePENDING?
                                 <Skeleton count={1} className='w-[100%] mt-2 rounded-md block' style={{ height: "40px" }} /> :
                                <CFormInput
                                    className=' w-[100%] mt-2 rounded-md'
                                    type="number"
                                    id="exampleFormControlInput1"
                                    placeholder="Enter your Mobile No."
                                    text={errors && <p style={{ color: "red" }} >{errors.mobile?.message}</p>}
                                    {...register("mobile")}
                                    aria-describedby="exampleFormControlInputHelpInline"
                                    defaultValue={userProfile && userProfile.mobile}
                                    size="sm"
                                />}
                            </div>
                        </div>
                        <div className='lg:col-span-6 lg:order-2 order-1 col-span-12 flex justify-center items-center' >
                            <div className=' block' >
                                {
                                    profileImg && profileImg[0] ?
                                        <img src={profileImg && profileImg[0]} width="230px" style={{ height: "230px" }} alt='' className='rounded-full border-2 border-black' />
                                        :
                                        <img src='https://res.cloudinary.com/dstojqsjz/image/upload/v1710313766/keraqryyz9xme8gguh0h.png' width="230px" style={{ height: "230px" }} alt='' className='rounded-full border-2 border-black' />
                                }
                                <div className="sm:col-span-6">
                                    <label htmlFor="uploadimg" style={{ minHeight: "42px", cursor: "pointer", display: "flex", border: "1px solid black", justifyContent: "center", marginTop: "10px", alignItems: "center", fontWeight: "bold", color: "black", }} className=" btn-img d-flex-align-items-center rounded-md hover:bg-slate-300 text-black hover:text-white justify-content-center btn btn-outline-secondary col-12">Upload Profile</label>
                                    {
                                        profileImg && profileImg[0] &&
                                        <label htmlFor="" onClick={() => [setprofileImg([])]} style={{ minHeight: "42px", cursor: "pointer", display: "flex", border: "1px solid black", justifyContent: "center", marginTop: "10px", alignItems: "center", fontWeight: "bold", color: "black", }} className=" btn-img d-flex-align-items-center rounded-md hover:bg-red-300 text-black hover:text-white justify-content-center btn btn-outline-secondary col-12">Remove Profile</label>
                                    }
                                    <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                        <input
                                            id="uploadimg"
                                            accept="image/png, image/gif, image/jpeg, image/webp"
                                            type="file"
                                            name="photoo"
                                            onChange={(e) => [uploadprofileImg(e)]}
                                            style={{ display: "none" }}
                                            className="form-control"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 flex justify-between' >
                        <div className='' >
                            <Button type='submit' color='success' variant="contained">
                                {
                                    updateUserProfilePENDING ?
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
                                        "Save"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformation
