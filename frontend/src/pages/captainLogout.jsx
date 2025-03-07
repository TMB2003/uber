import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    
    axios.post(`${import.meta.env.VITE_API}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/login')
        }
    }).catch((error) => {
        console.log(error);
    })


    return (
        <div>captainLogout</div>
    )
}

export default CaptainLogout