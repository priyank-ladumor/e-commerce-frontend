import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Outlet, Navigate, useNavigate, Link, NavLink } from 'react-router-dom'

const Protected = () => {
    let auth = localStorage.getItem("token")
    const navigate = useNavigate()
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
        <>
            {auth?.length > 0 && <Outlet />}
            {/* {auth?.length > 0 ? <Outlet /> : <Navigate to="/login" replace />} */}
        </>
    )
}

export default Protected
