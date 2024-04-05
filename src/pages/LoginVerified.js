import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { userAccountVerified } from '../store/action/authAction'
import { getLogoAction } from '../store/action/bannerLogoAction'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const LoginVerified = () => {
    const { token } = useParams()
    const dispatch = useDispatch()

    const [getLogo, setgetLogo] = useState("")
    const { getLogoDATA, addLogoMSG, getLogoPENDING } = useSelector((state) => state.bannerLogo)
  
    useEffect(() => {
      dispatch(getLogoAction())
    }, [addLogoMSG])
  
    useEffect(() => {
      if (getLogoDATA) {
        setgetLogo(getLogoDATA)
      }
    }, [getLogoDATA])
    if (token) {
        dispatch(userAccountVerified(token))
    }

    const name = localStorage.getItem("name")

    return (
        <>
            <div className=" min-h-full h-screen  px-6 py-12  grid place-content-center md:me-[200px]">
                <div className="border-2 border-gray-300 bg-white py-12 px-8 w-[100%] md:w-[150%] ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {getLogoPENDING
                            ?
                            <SkeletonTheme baseColor="whitesmoke" highlightColor="#fff">
                                <p className='p-2 flex justify-center' >
                                    <Skeleton count={1} className='rounded-lg' width={70} height={70} />
                                </p>
                            </SkeletonTheme>
                            : <img
                                className="mx-auto h-16 rounded-lg w-auto"
                                src={getLogo?.logo}
                                alt="Your Company"
                            />}
                        <h2 className="mt-2 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Shoppy.io
                        </h2>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                            hello, {name}
                        </h2>
                        <h2 className="mt-3 text-center text-lg font-bold leading-9 tracking-tight text-gray-500">
                            your account is successfully verified, now you can login to the shoppy.io
                        </h2>
                        <h5 className="mt-4 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                            <NavLink className="text-blue-700 mx-2" to="/login">Go back to login page</NavLink>
                        </h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginVerified
