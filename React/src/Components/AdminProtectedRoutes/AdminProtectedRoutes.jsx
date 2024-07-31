import React from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function AdminProtectedRoutes({children}) {
    const token = localStorage.getItem("token");

    if (token) {
        const { role } = jwtDecode(token);
        if (role === 'admin') {
            return children
        }
        localStorage.removeItem('token');
        return  <Navigate to={'/login'} />
    } else {
        localStorage.removeItem('token');
        return <Navigate to={'/login'}/>
    }
}