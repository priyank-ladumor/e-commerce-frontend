import React, { useEffect } from 'react'
import ShoppingCart from '../components/cart/ShoppingCart'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  return (
    <div>
      <ShoppingCart></ShoppingCart>
    </div>
  )
}

export default Cart
