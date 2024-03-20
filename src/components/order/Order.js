import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findAllUserOrderAction } from '../../store/action/orderAction'
import { Box, Slider, Typography, styled } from '@mui/material'
import { FaIndianRupeeSign, FaRupeeSign } from 'react-icons/fa6'

const Order = () => {
    const dispatch = useDispatch()
    const { getAllOrderPENDING, getAllOrderData } = useSelector((state) => state.order)

    const [orderData, setorderData] = useState("")

    useEffect(() => {
        dispatch(findAllUserOrderAction())
    }, [])

    useEffect(() => {
        if (getAllOrderData) {
            setorderData(getAllOrderData)
        }
    }, [getAllOrderData])

    return (
        <div>
            <div className='hide w-100 bg-white mt-10 rounded-lg p-6' >
                <h2 className="text-3xl p-4 text-gray-900 font-bold tracking-tighter">My Order</h2>
                {/* <h2 className="text-3xl text-gray-900 font-bold tracking-tighter pb-4">My Order</h2> */}
                <div className='m-3' >
                    <div className='' >
                        {
                            orderData && orderData?.map((ele) => {
                                return (
                                    <div className='grid grid-cols-12 gap-3 p-4 my-8' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}  >
                                        <ol class="track-progress col-span-12">
                                            <li class="done">
                                                <em>1</em>
                                                <span>Placed</span>
                                            </li>
                                            <li class="done">
                                                <em>2</em>
                                                <span>Confirmed</span>
                                            </li>
                                            <li class="done">
                                                <em>3</em>
                                                <span>Packed</span>
                                            </li>
                                            <li class="done">
                                                <em>4</em>
                                                <span>Shipped</span>
                                            </li>
                                            <li class="todo">
                                                <em>5</em>
                                                <span>Delivered</span>
                                            </li>
                                        </ol>
                                        {ele && ele?.orderItem?.map((item) => {
                                            return (
                                                <>
                                                    <div className='col-span-12 flex py-4  border-b border-gray-300'>
                                                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md ">
                                                            <img
                                                                src={item?.product[0]?.thumbnail[0]}
                                                                alt={item?.product[0]?.thumbnail[0]}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="displayBlock flex justify-between text-base font-medium text-gray-900 mb-1 ">
                                                                    <h3>
                                                                        <span className='text-lg font-semibold me-2' >Title:</span>
                                                                        {
                                                                            <a href={item?.product[0]?.title.href}>{item?.product[0]?.title}</a>
                                                                        }
                                                                    </h3>
                                                                </div>
                                                                <div className='flex items-center mb-1' >
                                                                    <span className='text-lg font-semibold me-2' >Size:</span>
                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800">{item?.size}</p>
                                                                </div>
                                                                {/* <div className='flex items-center' >
                                                                    <span className=' text-lg font-semibold me-2' >Color:</span>
                                                                    <p className=" p-4 w-8 rounded-full mt-[2px] text-sm text-gray-500 border-[1px] border-black " style={{ background: item?.color }} >{""}</p>
                                                                </div> */}
                                                                <div className='flex items-center mb-1' >
                                                                    <span className='text-lg font-semibold me-2' >Quantity:</span>
                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800">{item?.quantity}</p>
                                                                </div>
                                                                <div className='flex items-center mb-1' >
                                                                    <span className='text-lg font-semibold me-2' >Price:</span>
                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800">{item?.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        })}
                                        <div className='col-span-12 flex justify-between' >
                                            <button type="button"
                                                className="font-medium text-[#F44E3B] hover:text-[#D33115] ms-1" >
                                                Cancel Order
                                            </button>
                                            <div className='flex' >
                                                <span className='text-lg font-semibold me-1 ' style={{ fontSize: "16px" }} >Total Price:</span>
                                                <p className="rounded-full mt-[2px] text-lg flex justify-center items-center text-gray-800">
                                                    <span><FaIndianRupeeSign className='' /></span>
                                                    <span className='font-bold -mt-[2px]' >{ele?.totalPrice}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
