import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Order from '../components/order/Order'

const MyOrder = () => {
    return (
        <div>
            <Navbar>
                <Order />
            </Navbar>
        </div>
    )
}

export default MyOrder
