import React, { useEffect } from 'react'
import ShoppingCart from '../components/cart/ShoppingCart'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const Cart = () => {
  return (
    <div>
    <Navbar>
      <ShoppingCart></ShoppingCart>
    </Navbar>
    </div>
  )
}

export default Cart
