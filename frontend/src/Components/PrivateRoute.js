import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/UseAuth"


const PrivateRoute = ({children}) =>{

    const {isAuthenticated, loading} = useAuth()
    const navigate = useNavigate()

    if (loading){
        return <p>Loading..</p>
    }

    if (isAuthenticated){
        return children
    }else{
        navigate('/login')
    }

}

export default PrivateRoute;