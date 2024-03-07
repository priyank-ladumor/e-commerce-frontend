import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileAction } from '../../store/action/userAction'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, FormControl, colors } from '@mui/material';

const MyProfile = () => {
    const dispatch = useDispatch()
    const { getUserProfileDATA } = useSelector((state) => state.user)
    const [userProfile, setUserProfile] = useState("")
    useEffect(() => {
        dispatch(getUserProfileAction())
    }, [])

    useEffect(() => {
        setUserProfile(getUserProfileDATA)
    }, [getUserProfileDATA])
    return (
        <div>
            <div className='w-100 bg-white mt-10 rounded-lg p-6' >
                <h2 className="text-3xl text-gray-900 font-bold tracking-tighter pb-4">My Profile</h2>
                <div className='block' style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }} >
                    <div className='grid grid-cols-12 gap-4 p-6 '  >
                        <div className='lg:col-span-6 lg:order-1 order-2 col-span-12 ' >
                            <CForm>
                                <div className='mt-4' >
                                    <CFormLabel className='text-xl font-medium' >First Name</CFormLabel>
                                    <CFormInput
                                        className=' w-[100%] mt-2 rounded-md'
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter your first name"
                                        // text="Must be 8-20 characters long."
                                        aria-describedby="exampleFormControlInputHelpInline"
                                        defaultValue={userProfile && userProfile.firstName}
                                        size="sm"
                                    />
                                </div>
                                <div className='mt-4' >
                                    <CFormLabel className='text-xl font-medium' >Last Name</CFormLabel>
                                    <CFormInput
                                        className=' w-[100%] mt-2 rounded-md'
                                        type="text"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter your last name"
                                        // text="Must be 8-20 characters long."
                                        aria-describedby="exampleFormControlInputHelpInline"
                                        defaultValue={userProfile && userProfile.lastName}
                                        size="sm"
                                    />
                                </div>
                                <div className='mt-4' >
                                    <CFormLabel className='text-xl font-medium' >Email Address</CFormLabel>
                                    <CFormInput
                                        className=' w-[100%] mt-2 rounded-md'
                                        type="email"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter your email address"
                                        // text="Must be 8-20 characters long."
                                        aria-describedby="exampleFormControlInputHelpInline"
                                        defaultValue={userProfile && userProfile.email}
                                        size="sm"
                                    />
                                </div>
                                <div className='mt-4' >
                                    <CFormLabel className='text-xl font-medium' >Mobile No</CFormLabel>
                                    <CFormInput
                                        className=' w-[100%] mt-2 rounded-md'
                                        type="number"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter your Mobile No."
                                        // text="Must be 8-20 characters long."
                                        aria-describedby="exampleFormControlInputHelpInline"
                                        defaultValue={userProfile && userProfile.mobileNo}
                                        size="sm"
                                    />
                                </div>
                            </CForm>
                        </div>
                        <div className='lg:col-span-6 lg:order-2 order-1 col-span-12 flex justify-center items-center' >
                            <div className=' block' >
                                <img src='https://res.cloudinary.com/dstojqsjz/image/upload/v1709815064/fg5svjtn56sido4zqt7f.png' width={300} alt='' className='rounded-full border-2 border-black' />
                                <div className="sm:col-span-6">
                                    <label htmlFor="uploadimg" style={{ minHeight: "42px", cursor: "pointer", display: "flex", border: "1px solid black", justifyContent: "center", marginTop: "10px", alignItems: "center", fontWeight: "bold", color: "black", }} className=" btn-img d-flex-align-items-center rounded-md hover:bg-slate-300 text-black hover:text-white justify-content-center btn btn-outline-secondary col-12">Upload Profile</label>
                                    <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                        <input
                                            id="uploadimg"
                                            accept="image/png, image/gif, image/jpeg, image/webp"
                                            type="file"
                                            name="photoo"
                                            // onChange={(e) => [uploadthumbnail(e)]}
                                            style={{ display: "none" }}
                                            className="form-control"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* address  */}
                    <div className='grid grid-cols-12 gap-4 p-6 '  >
                        <div className='order-3 col-span-12 ' >
                            <CFormLabel className='text-xl font-medium' >Street Address</CFormLabel>
                            <CFormInput
                                className=' w-[100%] mt-2 rounded-md'
                                type="text"
                                id="exampleFormControlInput1"
                                placeholder="Enter your street address"
                                // text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                                defaultValue={userProfile && userProfile.address}
                                size="sm"
                            />
                        </div>
                        <div className='md:col-span-4 order-3 col-span-12 ' >
                            <CFormLabel className='text-xl font-medium' >City</CFormLabel>
                            <CFormInput
                                className=' w-[100%] mt-2 rounded-md'
                                type="text"
                                id="exampleFormControlInput1"
                                placeholder="Enter your city name"
                                // text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                                defaultValue={userProfile && userProfile.address}
                                size="sm"
                            />
                        </div>
                        <div className='md:col-span-4 order-3 col-span-12 ' >
                            <CFormLabel className='text-xl font-medium' >State</CFormLabel>
                            <CFormInput
                                className=' w-[100%] mt-2 rounded-md'
                                type="text"
                                id="exampleFormControlInput1"
                                placeholder="Enter your state name"
                                // text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                                defaultValue={userProfile && userProfile.address}
                                size="sm"
                            />
                        </div>
                        <div className='md:col-span-4 order-3 col-span-12 ' >
                            <CFormLabel className='text-xl font-medium' >Pin Code</CFormLabel>
                            <CFormInput
                                className=' w-[100%] mt-2 rounded-md'
                                type="number"
                                id="exampleFormControlInput1"
                                placeholder="Enter your pin code"
                                // text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                                defaultValue={userProfile && userProfile.address}
                                size="sm"
                            />
                        </div>
                    </div>
                    <div className='p-6 flex justify-between' >
                        <div className='w-[10%]' >
                            <Button fullWidth className='' color='error' variant="contained">Reset</Button>
                        </div>
                        <div className='w-[10%]' >
                            <Button fullWidth className='' color='success' variant="contained">Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
