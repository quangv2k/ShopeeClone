import { Navigate } from "react-router-dom";
import Admin from "../../pages/Admin/Admin"


const PrivateComponent = ({component: Component}) => {

    const isAuthenticated = localStorage.getItem('tokenadmin');
    return (
        isAuthenticated ?
       <Component/> : <Navigate to='/login' />
    )
}

export default PrivateComponent