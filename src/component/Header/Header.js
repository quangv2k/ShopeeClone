import React, { useContext, useEffect, useState } from 'react'
import './Header.scss'
import { imgLogo } from './img'
import { useNavigate } from 'react-router-dom'
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Header() {

    const navigate = useNavigate();
    const { cartItems, setCartItems, addToCart,deleteProductCart } = useContext(CartContext);

    const {user,setUser} = useContext(UserContext);

    console.log('length',cartItems.length);
    const backgroundImageStyle = {
        backgroundImage: `url(${user.imageUrl})`,
        /* Các thuộc tính khác cho phần tử */
        width: '22px', // Đặt kích thước cho khối div
        height: '22px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5',
        borderRadius: '50%',
        cursor: 'pointer'
    };
    const isAuthenticated = localStorage.getItem('tokenuser');
    // const user = JSON.parse(isAuthenticated);

    //logout user 
    const handleLogoutUser = ()=> {
        localStorage.removeItem('tokenuser');
        toast.success('Đăng xuất thành công');
        navigate('/');
    }
    
    // useEffect(()=> {
        
    // },[cartItems])
   
    return (
        <div className='header'>
            <div className='container'>
                {/* nav-bar */}
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <span><a href='#'>Kênh Người Bán</a></span>
                        <div className='hr1 mx-2'></div>
                        <span><a href='#'>Trở thành người bán Shopee</a></span>
                        <div className='hr1 mx-2'></div>
                        <span><a href='#'>Tải Ứng Dụng</a></span>
                        <div className='hr1 mx-2'></div>
                        <span><a href='#'>Kết Nối</a></span>
                        <div className='m-left-10'>
                            <span ><i class="fa-brands fa-facebook"></i></span>
                        </div>
                        <div className='m-left-10'>
                            <span><i class="fa-brands fa-instagram"></i></span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <span className='me-2'><i class="fa-regular fa-bell"></i><a href='#'>Thông báo</a></span>
                        <span className='me-4'><i class="fa-sharp fa-regular fa-circle-question"></i><a href='#'>Hỗ Trợ</a></span>
                        <span className='me-4'><i class="fa-solid fa-globe"></i><a href='#'>Tiếng Việt</a><i class="fa-solid fa-chevron-down"></i></span>
                        {!isAuthenticated && (
                            <>
                                <span className='me-2' onClick={() => navigate('/signup')}><a href='#'>Đăng ký</a></span>
                                <div className='hr1 mx-2'></div>
                                <span className='me-2' onClick={() => navigate('/login')}><a href=''>Đăng Nhập</a></span>
                            </>
                        )

                        }
                        {isAuthenticated && (
                            <>
                                <div className='user-contaier-navbar'>
                                    <div className='me-2 d-flex align-items-center justify-content-between'>
                                        <div className='shopee-avatar me-1' style={backgroundImageStyle}></div>
                                        <div className='navbar-username'>{user.username}</div>
                                    </div>
                                    <div class="dropdown-content">
                                        <a href="" onClick={()=> navigate('/userprofile')}>Tài Khoản Của Tôi</a>
                                        <a href="">Đơn Mua</a>
                                        <a href="" onClick={()=> handleLogoutUser() }>Đăng Xuất</a>
                                    </div>
                                </div>
                            </>
                        )

                        }

                    </div>
                </div>
                {/*brand and input search */}
                <div className='d-flex justify-content-between align-items-center pt-4 pb-3'>
                    <div className='d-flex-align-items-center brand' onClick={() => navigate('/')}>
                        <img className='brand' src='../assets/anhlogo.png' alt='ảnh' />
                    </div>
                    <div className='wrap-search d-flex'>
                        <input type='text' className='form-control' placeholder='Shopee bao ship 0Đ - Đăng ký ngay!'></input>
                        <button type='button'><span><i class="fa-solid fa-magnifying-glass"></i></span></button>

                    </div>
                    <div className='d-flex justify-content-between align-items-center cart' onClick={() => navigate('/cart')}>
                        <span><i class="fa-solid fa-cart-shopping"></i></span>
                        {cartItems.length > 0 &&  <div class="shopee-cart-number-badge" aria-hidden="true">{cartItems.length}</div>}
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
