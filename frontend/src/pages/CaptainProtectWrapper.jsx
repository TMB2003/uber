import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
    const captainToken = localStorage.getItem('captainToken'); // Using a different token for captains
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!captainToken) {
            navigate('/captain-login'); // Redirect to captain login if no token
        }
    }, [captainToken]);

    axios.get(`${import.meta.env.VITE_API}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 200) {
            setCaptain(response.data.captain)
            setIsLoading(false)
        }
    }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain-login')
    })


    if (isLoading) {
        return (
            <div>Loading....</div>
        )
    }


    return <>{children}</>;
};

export default CaptainProtectWrapper;
