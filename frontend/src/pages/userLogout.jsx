import React from 'react'
import axios from 'axios'

const userLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_API}/users/logout`, {
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
        <div>userLogout</div>
    )
}

export default userLogout