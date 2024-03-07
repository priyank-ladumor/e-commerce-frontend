import React, { useEffect } from 'react'
import ShoppingCart from '../components/cart/ShoppingCart'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import MyProfile from '../components/profile/MyProfile'

const MyProfilePage = () => {
  return (
    <div>
    <Navbar>
      <MyProfile />
    </Navbar>
    </div>
  )
}

export default MyProfilePage
