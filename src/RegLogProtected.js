import React from 'react'
import { useEffect } from 'react'
import { Outlet, Navigate, useNavigate, Link, NavLink } from 'react-router-dom'

const RegLogProtected = () => {
    let auth = localStorage.getItem("token")
    return (
        <div>
            {!auth ? <Outlet /> : <Navigate to="/" replace />}
        </div>
    )
}

export default RegLogProtected
