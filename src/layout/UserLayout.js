import { useEffect, useState } from "react";
import Header from "../component/Header/Header"
import CartContext from "../context/CartContext"
import UserContext from "../context/UserContext";
import UserApi from "../api/UserApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UserLayout = ({ component: Component }) => {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    //create user and get user from localstorage
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('tokenuser')) || {})
    console.log('here', cartItems);
    console.log('user',user);

    const addToCart = (product, quantity) => {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
        let productIndex = -1;
        if (cartItems !== null) {
            productIndex = cartItems.findIndex((item) => item.id === product.id);
            if (productIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng của nó
                const updatedCart = [...cartItems];
                updatedCart[productIndex].quantity += quantity;
                setCartItems(updatedCart);
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng với số lượng là 1
                const updatedCart = [...cartItems, { ...product, quantity: quantity }];
                setCartItems(updatedCart);
            }
        }
        toast.success('Sản phẩm đã được thêm vào Giỏ Hàng');
    };

    const deleteProductCart = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        toast.success('Xóa sản phẩm thành công');
    }

    // Lấy dữ liệu từ Local Storage khi tải trang
    // useEffect(() => {
    //     const savedCart = JSON.parse(localStorage.getItem('cart'));
    //     console.log(savedCart);
    //     if (savedCart) {
    //         setCartItems(savedCart);
    //     }
    // }, []);

    // Lưu dữ liệu vào Local Storage khi giỏ hàng thay đổi
    useEffect(() => {
        console.log('change', cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    //update user 

    const updateUser = async (id,body) => {
        return await UserApi.updateByID(id,{
            ...user,
            username:body.username,
        })
    }
    
    return (
        <UserContext.Provider value={{user,setUser,updateUser}}>
            <CartContext.Provider value={{ cartItems, setCartItems, addToCart, deleteProductCart }}>
                <Header />
                <Component />
            </CartContext.Provider>
        </UserContext.Provider>
    )
}

export default UserLayout