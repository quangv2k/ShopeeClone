import { ClassNames } from '@emotion/react'
import React from 'react'
import './HeaderLoginSignUp.scss'
import { useNavigate } from 'react-router-dom';

export default function HeaderLoginSignUp({text}) {
    const navigate = useNavigate();
    const backgroundImageStyle = {
        backgroundImage: `url()`,
        /* Các thuộc tính khác cho phần tử */
        width: '22px', // Đặt kích thước cho khối div
        height: '22px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5',
        borderRadius: '50%',
        cursor: 'pointer'
    };
    return (
        <div className='header-login-signup'>
            <div className='container d-flex justify-content-between block-header-icon' >
                <div className='d-flex justify-content-between align-items-center'>
                    <div onClick={()=> navigate('/')}>
                        <img src='../assets/anhlogo.png' alt='ảnh' style={{width:'123px',height:'40px',cursor:'pointer'}}/>
                    </div>
                    <div style={{color:'#222',fontSize:'1.5rem',marginLeft:'15px'}}>{text}</div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>Bạn cần giúp đỡ </div>
            </div>
        </div>
    )
}
