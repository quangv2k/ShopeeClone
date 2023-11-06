import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from '../App.js'
import Admin from "../pages/Admin/Admin.js";
import ProductDetail from "../pages/ProductDetail/ProductDetail.js";
import Login from "../pages/Login/Login.js";
import PrivateComponent from "../component/PrivateComponent/PrivateComponent.js";
import Cart from "../pages/Cart/Cart.js";
import UserLayout from "../layout/UserLayout.js";
import UserProfile from "../pages/UserProfile/UserProfile.js";
import SignUp from "../pages/SignUp/SignUp.js";
import HeaderLoginSignUp from "../component/HeaderLoginSignUp/HeaderLoginSignUp.js";
import LoginSignUpLayout from "../layout/LoginSignUpLayout.js";

const router = createBrowserRouter([
    {
        path: "/",
        element:<UserLayout component={App}/>,
    },
    {
        path: "/admin",
        element: <PrivateComponent component={Admin}/>,
    },
    {
        path:'/productdetail',
        element:<UserLayout component={ProductDetail}/>
    },
    {
        path:'/productdetail/:id',
        element:<UserLayout component={ProductDetail}/>
    },
    {
        path:'/login',
        element: <LoginSignUpLayout component={Login} text={'Đăng nhập'}/>
    },
    {
        path:'/cart',
        element: <UserLayout component={Cart}/>
    },
    {
        path:'/userprofile',
        element: <UserLayout component={UserProfile}/>
    },
    {
        path:'/signup',
        element: <LoginSignUpLayout component={SignUp} text={'Đăng ký'}/>,
    },
    {
        path:'/headersign',
        element: <HeaderLoginSignUp/>,
    }
]);

export default router