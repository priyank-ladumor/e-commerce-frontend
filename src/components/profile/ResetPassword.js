import { CFormCheck, CFormInput, CFormLabel } from '@coreui/react'
import { Button, FilledInput, FormControl, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../store/action/userAction';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';


const schema = yup.object({
    newPassword: yup
        .string()
        .min(6, "new password must be above 6 characters")
        .max(20, "new password must be with in 20 characters")
        .matches(/^\S*$/, "No whitespaces allowed")
        .required("please enter new password"),
    oldPassword: yup
        .string()
        .min(6, "old password must be above 6 characters")
        .max(20, "old password must be with in 20 characters")
        .matches(/^\S*$/, "No whitespaces allowed")
        .required("please enter old password"),
});

const ResetPassword = ({ userProfile }) => {
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
    const dispatch = useDispatch()
    const [resetPassPopUp, setresetPassPopUp] = useState(false)
    const [showPass, setshowPass] = useState(false)
    const { resetPasswordMSG, resetPasswordPENDING, resetPasswordERROR } = useSelector((state) => state.user)

    const onSubmit = (data) => {

        if (userProfile) {
            const item = {
                id: userProfile._id,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            }
            dispatch(resetPasswordAction(item))
            reset();
            setresetPassPopUp(true)
        }
    }

    useEffect(() => {
        if (resetPassPopUp && resetPasswordMSG) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: resetPasswordMSG?.msg,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setresetPassPopUp(false)
        }
    }, [resetPasswordMSG])

    useEffect(() => {
        if (resetPassPopUp && resetPasswordERROR) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Old password is wrong",
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setresetPassPopUp(false)
        }
    }, [resetPasswordERROR])

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='block mt-6' style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }} >
                    <div className='grid grid-cols-12 gap-4 p-6 '  >
                        <div className=' col-span-12 ' >
                            <h2 className="text-3xl text-gray-900 font-semibold pb-4">Reset Password</h2>
                        </div>
                        <div className=' col-span-6 ' >
                            <CFormLabel className='text-xl font-medium' >Old Password</CFormLabel>
                            <CFormInput
                                className=' w-[100%] mt-2 rounded-md'
                                type={showPass ? "text" : "password"}
                                id="exampleFormControlInput1"
                                placeholder="Enter your old password"
                                text={errors && <p style={{ color: "red" }} >{errors.oldPassword?.message}</p>}
                                {...register("oldPassword")}
                                aria-describedby="exampleFormControlInputHelpInline"
                                size="sm"
                            />
                        </div>
                        <div className='col-span-6 ' >
                            <CFormLabel className='text-xl font-medium' >New  Password</CFormLabel>
                            <CFormInput
                                className=' w-[100%] mt-2 rounded-md'
                                type={showPass ? "text" : "password"}
                                id="exampleFormControlInput1"
                                placeholder="Enter your new password"
                                text={errors && <p style={{ color: "red" }} >{errors.newPassword?.message}</p>}
                                {...register("newPassword")}
                                aria-describedby="exampleFormControlInputHelpInline"
                                size="sm"
                            />
                        </div>
                        <div className='col-span-12 ' >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={"Show password"}
                                    name="check"
                                    id="showpass"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() => setshowPass(!showPass)}
                                />
                                <label
                                    htmlFor={`showpass`}
                                    className="ml-3 text-lg cursor-pointer text-black-900"
                                >
                                    Show Password
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 flex justify-between' >
                        <div className='' >
                            <Button type='submit' color='success' variant="contained">
                                {
                                    resetPasswordPENDING ?
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
                                        "Save Password"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
