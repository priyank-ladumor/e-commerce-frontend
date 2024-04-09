import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartitemRemoveAction, getCartItemsAction, updateCartItemsAction } from '../../store/action/cartAction';
import { FaRupeeSign } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner"
import Swal from 'sweetalert2'
import { checkAvailableQuantityAction, createOrderAction } from '../../store/action/orderAction';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { loadStripe } from '@stripe/stripe-js';


const ShoppingCart = ({ paymentSys, selectedAddress, cartItemDetails }) => {
    const [open, setOpen] = useState(true)
    const [deleteCartItemPopUp, setdeleteCartItemPopUp] = useState(false)

    const { getCartItemsPENDING, getCartItemsData, addToCartMSG, removeCartItemsMSG, updateCartItemsMSG, getCartItemsDataSuccess } = useSelector((state) => state.cart)
    const { checkAvailableQuantityERROR, checkAvailableQuantityPENDING, checkAvailableQuantityMSG, createOrderERROR, createOrderPENDING } = useSelector((state) => state.order)
    const { createOrderMSG, createOrderSTRIPE_ID } = useSelector((state) => state.order)
    const [orderCreatedPopUp, setorderCreatedPopUp] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [cartItemData, setcartItemData] = useState()

    useEffect(() => {
        dispatch(getCartItemsAction())
    }, [addToCartMSG, removeCartItemsMSG, updateCartItemsMSG])

    useEffect(() => {
        if (getCartItemsData) {
            const cartItem = getCartItemsData.map((ele) => ele.cartItem)
            setcartItemData(cartItem)
        }
    }, [getCartItemsData])

    const handleRemoveCartItem = (size, color, id) => {
        const item = {
            size: size,
            color: color,
            id: id
        }
        dispatch(cartitemRemoveAction(item))
        setdeleteCartItemPopUp(true)
    }

    useEffect(() => {
        if (deleteCartItemPopUp && removeCartItemsMSG) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Remove Cart Item Successfully",
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setdeleteCartItemPopUp(false)
        }
    }, [removeCartItemsMSG])

    // create order popup
    useEffect(() => {
        if (orderCreatedPopUp && createOrderMSG && paymentSys === "CASH") {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: createOrderMSG,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderCreatedPopUp(false)
            navigate("/myorder")
        }
    }, [createOrderMSG])

    useEffect(() => {
        if (orderCreatedPopUp && createOrderERROR) {
            <div className='swal2-container'>
                {Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: createOrderERROR,
                    showConfirmButton: false,
                    timer: 2500
                })}
            </div>
            setorderCreatedPopUp(false)
            // navigate("/")
        }
    }, [createOrderERROR])

    const handleQuantityPlusUpdate = (product) => {
        const item = {
            size: product.size,
            id: product._id,
            quantity: product.quantity + 1,
            order: "plus",
            color: product.color,
        }
        dispatch(updateCartItemsAction(item))
    }

    const handleQuantityMinusUpdate = (product) => {
        const item = {
            size: product.size,
            id: product._id,
            quantity: product.quantity - 1,
            order: "minus",
            color: product.color
        }
        dispatch(updateCartItemsAction(item))
    }

    //create order func
    const handlePlaceOrder = async (getCartItemsData) => {
        if (selectedAddress?.length === 0 || paymentSys?.length === 0) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Please Select Address And  Payment System!",
                showConfirmButton: false,
                timer: 2500
            })
            return;
        } else {
            if (selectedAddress && checkAvailableQuantityERROR === null) {
                const items = {
                    selectedAddress,
                    paymentSys,
                    cartId: getCartItemsData[0]?._id,
                    cartItemDetails,
                    location: window.location.href.split("/checkout")[0]
                }
                dispatch(createOrderAction(items))
                setorderCreatedPopUp(true)
            }
        }
    }

    useEffect(() => {
        if (paymentSys === "ONLINE" && createOrderSTRIPE_ID) {
            async function fetchData() {
                const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

                await stripe.redirectToCheckout({
                    sessionId: createOrderSTRIPE_ID
                });
            }
            fetchData();
        }else{
            // if(paymentSys){
            //     navigate("/myorder")
            // }
        }
    }, [createOrderSTRIPE_ID])

    const handleCheckOut = (cartData) => {
        navigate("/checkout")
    }

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [getCartItemsDataSuccess]);

    return (
        <div>
            {/* <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0"> */}
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl p-4 text-gray-900 font-bold tracking-tighter">Cart</h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {getCartItemsPENDING ?
                        [0]?.map((ele) => {
                            return (
                                <>
                                    <SkeletonTheme baseColor="#f0f0f0" highlightColor="whitesmoke" >
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                <li className="flex py-6">
                                                    <div className="flex-shrink-0 overflow-hidden rounded-md ">
                                                        <Skeleton count={1} className='rounded-md w-[144px] h-[144px] ' />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="displayBlock flex justify-between text-base font-medium text-gray-900 mb-1 ">
                                                                <h3>
                                                                    <span className='text-lg font-semibold me-2' >Title:</span>
                                                                    <Skeleton count={1} className='rounded-md w-[70px] h-[20px] md:w-[200px] md:h-[25px]' />
                                                                </h3>
                                                                <div className='flex mt-1 items-center ' >
                                                                    <FaRupeeSign />
                                                                    <p className=""><Skeleton count={1} className='rounded-md w-[70px] h-[20px] md:w-[70px] md:h-[25px]' /></p>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center mb-1' >
                                                                <span className='text-lg font-semibold me-2' >Size:</span>
                                                                <p className="rounded-full mt-[2px] text-lg text-gray-800"><Skeleton count={1} className='rounded-md w-[70px] h-[20px] md:w-[200px] md:h-[25px]' /></p>
                                                            </div>
                                                            <div className='flex items-center' >
                                                                <span className=' text-lg font-semibold me-2' >Color:</span>
                                                                <Skeleton count={1} className='rounded-full' style={{ width: "25px", height: "25px" }} />
                                                            </div>
                                                            <div className=" flex justify-between text-sm mb-2 ">
                                                                <div className='flex' >
                                                                    <span className=' text-lg font-semibold me-2' >Qty:</span>
                                                                    <p className="rounded-full mt-[2px] text-lg text-gray-800"><Skeleton count={1} className='rounded-md w-[40px] h-[20px] md:w-[200px] md:h-[25px]' /></p>
                                                                </div>
                                                                <div>
                                                                    <Skeleton count={1} className='rounded-lg' style={{ width: "30px", height: "35px" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </SkeletonTheme>
                                </>
                            )
                        })
                        :
                        getCartItemsData && getCartItemsData[0]?.totalItem > 0 ?
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartItemData && cartItemData[0]?.map((product) => {
                                        const limitQuantity = product && product?.product.map((ele) =>
                                            ele?.sizesAndColor?.filter((item) =>
                                                item.color === product.color && item.size === product.size
                                            ))
                                        return (
                                            <>
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-36 w-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        {
                                                            product && product?.product.map((ele) =>
                                                                <img
                                                                    src={ele.thumbnail[0]}
                                                                    alt={ele.thumbnail[0]}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            )
                                                        }
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="displayBlock flex justify-between text-base font-medium text-gray-900 mb-1 ">
                                                                <h3>
                                                                    <span className='text-lg font-semibold me-2' >Title:</span>
                                                                    {
                                                                        product && product?.product.map((ele) =>
                                                                            <a href={ele.href}>{ele.title}</a>
                                                                        )
                                                                    }
                                                                </h3>
                                                                <div className='flex mt-1 items-center ' >
                                                                    <FaRupeeSign />
                                                                    <p className="">{product.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center mb-1' >
                                                                <span className='text-lg font-semibold me-2' >Size:</span>
                                                                <p className="rounded-full mt-[2px] text-lg text-gray-800">{product.size}</p>
                                                            </div>
                                                            <div className='flex items-center' >
                                                                <span className=' text-lg font-semibold me-2' >Color:</span>
                                                                <p className=" p-4 w-8 rounded-full mt-[2px] text-sm text-gray-500 border-[1px] border-black " style={{ background: product.color }} >{""}</p>
                                                            </div>
                                                        </div>
                                                        <div className=" flex flex-1 items-end justify-between text-sm mb-2 ">
                                                            <div className="text-gray-500 flex items-center justify-center gap-[5px]">Qty:
                                                                {product.quantity === 1
                                                                    ?
                                                                    <div className="cursor-no-drop border-2 border-gray-400 p-[1px]">
                                                                        <FaMinus />
                                                                    </div>
                                                                    :
                                                                    <div className="hover:text-blue-900 hover:border-blue-900 cursor-pointer border-2 border-gray-400 p-[1px]">
                                                                        <FaMinus onClick={() => handleQuantityMinusUpdate(product)} />
                                                                    </div>
                                                                }
                                                                <span className="font-medium text-black text-[20px]">{product.quantity}</span>
                                                                {limitQuantity && product.quantity < limitQuantity[0][0]?.quantity ?
                                                                    <div className="hover:text-blue-900  hover:border-blue-900 cursor-pointer border-2 border-gray-400 p-[1px]">
                                                                        <FaPlus onClick={() => handleQuantityPlusUpdate(product)} />
                                                                    </div>
                                                                    :
                                                                    <div className="cursor-no-drop border-2 border-gray-400 p-[1px]">
                                                                        <FaPlus />
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="flex text-2xl ">
                                                                <button
                                                                    type="button"
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                >
                                                                    <TbTrashXFilled color='red' onClick={() => handleRemoveCartItem(product.size, product.color, product._id)} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                            :
                            getCartItemsDataSuccess && getCartItemsPENDING === false && showMessage &&
                            <div className='flex p-5 justify-center items-center bg-red-100 h-[300px] w-[100%]'>
                                <span className='font-bold' style={{ fontSize: "35px" }} >Not selected Any Cart Items Available</span>
                            </div>
                    }
                </div>
                <div className="border-t mt-5 border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <div className='flex justify-center items-center text-2xl ' >
                            <FaRupeeSign />
                            <p className='' >{getCartItemsData && getCartItemsData[0]?.totalPrice}</p>
                        </div>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        {
                            location.pathname.split("/")[1] === "checkout" ?
                                paymentSys === "ONLINE" && getCartItemsData && getCartItemsData[0]?.totalItem > 0 ?
                                    <NavLink
                                        // to={"/pay"}
                                        onClick={() => [handlePlaceOrder(getCartItemsData)]}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        {
                                            createOrderPENDING ?
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
                                                "Pay now"
                                        }
                                    </NavLink>
                                    :
                                    <NavLink
                                        // to={"/pay"}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        onClick={() => [handlePlaceOrder(getCartItemsData)]}
                                    >
                                        {
                                            createOrderPENDING ?
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
                                                "Create Order"
                                        }
                                    </NavLink>
                                :
                                getCartItemsData && getCartItemsData[0]?.totalItem > 0 ?
                                    <div
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        onClick={() => handleCheckOut(getCartItemsData[0])}
                                    >
                                        Checkout
                                    </div>
                                    :
                                    <p className="flex items-center justify-center rounded-md border border-transparent bg-indigo-300 px-6 py-3 text-base font-medium text-white shadow-sm">
                                        Checkout
                                    </p>
                        }
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or
                            <NavLink to="/">
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500 ms-1"
                                    onClick={() => setOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
