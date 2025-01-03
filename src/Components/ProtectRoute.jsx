import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({
    children,
    role = '',
    allowedRoles = [],
    student,
    admin
}) => {
  
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else if (!allowedRoles.includes(role)) {
            
            navigate('/unauthorized')
        }
    }, [token, role, allowedRoles, navigate]);

    if(role ==='student' && student) {
        return student
    }
    else if(role === 'admin' && admin) {
        return admin
    }

    return (
        token && allowedRoles.includes(role) ?
        <>
            {children}
        </>
        :
            null
    )
}

export default ProtectRoute