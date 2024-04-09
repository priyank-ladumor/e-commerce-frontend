import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { getLogoAction } from '../store/action/bannerLogoAction'
import { getUserProfileAction } from '../store/action/userAction'



const PaymentDone = () => {
  const dispatch = useDispatch()

  const [getLogo, setgetLogo] = useState("")
  const { getLogoDATA, addLogoMSG, getLogoPENDING } = useSelector((state) => state.bannerLogo)
  const { getUserProfileDATA } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getLogoAction())
  }, [addLogoMSG])

  useEffect(() => {
    dispatch(getUserProfileAction())
  }, [])

  useEffect(() => {
    if (getLogoDATA) {
      setgetLogo(getLogoDATA)
    }
  }, [getLogoDATA])

  return (
    <div>
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
              hello, {getUserProfileDATA && getUserProfileDATA?.firstName + " " + getUserProfileDATA?.lastName}
            </h2>
            <h2 className="mt-3 text-center text-lg font-bold leading-9 tracking-tight text-gray-500">
              your order payment is done, now you can see your order on my order page
            </h2>
            <h5 className="mt-4 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
              <NavLink className="text-blue-700 mx-2" to="/myorder">Go back to my order page</NavLink>
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDone
