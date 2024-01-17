import React, { useEffect } from 'react'
import ShoppingCart from '../components/cart/ShoppingCart'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  let auth = localStorage.getItem("token")

  useEffect(() => {
    !auth &&
      Swal.fire({
        title: "Are you sure Login?",
        text: "You won't be able to see this page without login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to login page"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
        } else {
          navigate("/")
        }
      })
  }, [])
  
  return (
    <div>
      {auth?.length > 0 &&
        <ShoppingCart></ShoppingCart>
      }
    </div>
  )
}

export default Cart
