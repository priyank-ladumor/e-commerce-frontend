import { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, Link, NavLink } from 'react-router-dom'

const Protected = () => {
    let auth = localStorage.getItem("token")

    return (
        <>
            {/* {auth?.length > 0 ? <Outlet /> : <Navigate to="/login" replace />} */}
            {!auth ? <Outlet /> : <Navigate to="/" replace />}
        </>
    )
}

export default Protected
