import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CancelOrderAction, DeleteOrderAction, findAllUserOrderAction } from '../../store/action/orderAction'
import { Box, Slider, Typography, styled } from '@mui/material'
import { FaIndianRupeeSign, FaRupeeSign } from 'react-icons/fa6'
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from 'sweetalert2'

const Order = () => {
    const dispatch = useDispatch()
    const { getAllOrderPENDING, getAllOrderData, DeleteOrderMSG, CancelOrderMSG } = useSelector((state) => state.order)

    const [orderData, setorderData] = useState("")
    const [deleteOrderPopUp, setdeleteOrderPopUp] = useState(false);
    const [cancelOrderPopUp, setcancelOrderPopUp] = useState(false);

    useEffect(() => {
        dispatch(findAllUserOrderAction())
    }, [DeleteOrderMSG, CancelOrderMSG])

    useEffect(() => {
        if (getAllOrderData) {
            setorderData(getAllOrderData)
        }
    }, [getAllOrderData])

    useEffect(() => {
        if (deleteOrderPopUp && DeleteOrderMSG) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: DeleteOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setdeleteOrderPopUp(false)
        }
    }, [DeleteOrderMSG])

    useEffect(() => {
        if (cancelOrderPopUp && CancelOrderMSG) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: CancelOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setcancelOrderPopUp(false)
        }
    }, [CancelOrderMSG])

    return (
        <div>
            <div className='w-100 bg-white mt-10 rounded-lg md:p-4' >
                <h2 className="text-3xl p-4 text-gray-900 font-bold tracking-tighter">My Order</h2>
                {/* <h2 className="text-3xl text-gray-900 font-bold tracking-tighter pb-4">My Order</h2> */}
                <div className='m-3' >
                    <div className='' >
                        {
                            orderData.length > 0 ? orderData?.map((ele) => {
                                return (
                                    <div className='grid  grid-cols-12 gap-3 p-4 my-8' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}  >
                                        <div className='flex justify-end col-span-12' >
                                            {ele?.orderStatus === "CANCELLED" && <RiDeleteBinFill onClick={() => [dispatch(DeleteOrderAction(ele?._id)), setdeleteOrderPopUp(true)]} style={{ fontSize: "20px", color: "red", cursor: "pointer" }} />}
                                        </div>
                                        <ol class="track-progress hidden sm:block col-span-12">
                                            <li class={ele?.orderStatus === "CANCELLED" ? "cancel" : (ele?.orderStatus === "Placed" || ele?.orderStatus === "Confirmed" || ele?.orderStatus === "Packed" || ele?.orderStatus === "Shipped" || ele?.orderStatus === "Delivered") && "done"}>
                                                <em>1</em>
                                                <span>Placed</span>
                                            </li>
                                            <li class={(ele?.orderStatus === "Confirmed" || ele?.orderStatus === "Packed" || ele?.orderStatus === "Shipped" || ele?.orderStatus === "Delivered") ? "done" : ele?.orderStatus === "CANCELLED" ? "cancel" : "todo"}>
                                                <em>2</em>
                                                <span>{ele?.orderStatus === "CANCELLED" ? "Cancelled" : "Confirmed"}</span>
                                            </li>
                                            <li class={(ele?.orderStatus === "Packed" || ele?.orderStatus === "Shipped" || ele?.orderStatus === "Delivered") ? "done" : "todo"} >
                                                <em>3</em>
                                                <span>Packed</span>
                                            </li>
                                            <li class={(ele?.orderStatus === "Shipped" || ele?.orderStatus === "Delivered") ? "done" : "todo"} >
                                                <em>4</em>
                                                <span>Shipped</span>
                                            </li>
                                            <li class={(ele?.orderStatus === "Delivered") ? "done" : "todo"} >
                                                <em>5</em>
                                                <span>Delivered</span>
                                            </li>
                                        </ol>
                                        <p className='block sm:hidden col-span-12' >
                                            <div className='flex' style={{ fontSize: "20px" }} >
                                                <span className='font-semibold' >Order Status:</span>
                                                <span className='ms-2 font-bold' >{ele?.orderStatus}</span>
                                            </div>
                                        </p>
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
                                            {ele?.orderStatus === "Delivered" ?
                                                <button type="button"
                                                    className={ele?.orderStatus === "CANCELLED" ? "font-medium text-[gray] ms-1" : "font-medium text-[#F44E3B] hover:text-[#D33115] ms-1"}
                                                    // onClick={() => [dispatch(CancelOrderAction(ele?._id)), setcancelOrderPopUp(true)]}
                                                    // disabled={ele?.orderStatus === "CANCELLED"}
                                                >
                                                    Return Order
                                                </button>
                                                :
                                                <button type="button"
                                                    className={ele?.orderStatus === "CANCELLED" ? "font-medium text-[gray] ms-1" : "font-medium text-[#F44E3B] hover:text-[#D33115] ms-1"}
                                                    onClick={() => [dispatch(CancelOrderAction(ele?._id)), setcancelOrderPopUp(true)]}
                                                    disabled={ele?.orderStatus === "CANCELLED"} >
                                                    Cancel Order
                                                </button>
                                            }
                                            <div className='' >
                                                <div className='flex' >
                                                    <span className='text-lg font-semibold me-1 ' style={{ fontSize: "16px" }} >Payment Method:</span>
                                                    <p className="rounded-full mt-[2px] text-lg flex justify-center items-center text-gray-800">
                                                        <span className='font-bold -mt-[2px]' >{ele?.paymentDetails?.paymentMethod}</span>
                                                    </p>
                                                </div>
                                                <div className='flex' >
                                                    <span className='text-lg font-semibold me-1 ' style={{ fontSize: "16px" }} >Total Price:</span>
                                                    <p className="rounded-full mt-[2px] text-lg flex justify-center items-center text-gray-800">
                                                        <span><FaIndianRupeeSign className='' /></span>
                                                        <span className='font-bold -mt-[2px]' >{ele?.totalPrice}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                                :
                                <div className='flex m-[50px] justify-center p-10 items-center bg-red-100 h-[200px] col-span-3'>
                                    <span className='font-bold' style={{ fontSize: "35px" }} >No Order Available</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
