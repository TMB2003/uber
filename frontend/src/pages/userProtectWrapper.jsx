import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const userProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_API}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.captain)
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err)
            localStorage.removeItem('token')
            navigate('/login')
        })


        if (isLoading) {
            return (
                <div>Loading....</div>
            )
        }

    }, [token])

    return (
        <>
            {children}
        </>
    )
}

export default userProtectWrapper