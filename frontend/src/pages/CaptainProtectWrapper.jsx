import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captainToken'); // Ensure correct token key
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_API}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.status === 200) {
                    setCaptain(response.data.captain);
                }
            })
            .catch(err => {
                console.error('Authentication error:', err);
                localStorage.removeItem('captainToken');
                navigate('/captain-login');
            })
            .finally(() => setIsLoading(false));
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading....</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;