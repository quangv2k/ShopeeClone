import React from 'react'
import './ProductItem.scss'
import { useNavigate } from 'react-router-dom';

export default function ProductItem({ item }) {
    const navigate = useNavigate()
    const backgroundImageStyle = {
        backgroundImage: `url(${item.imageUrl})`,
        /* Các thuộc tính khác cho phần tử */
        width: '188px', // Đặt kích thước cho khối div
        height: '188px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    };
    const isAuthenticated = localStorage.getItem('tokenuser');

    // Hàm định dạng giá thành chuỗi có dấu phân cách
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <div className='productItem' onClick={() => navigate(isAuthenticated ? `/productdetail/${item.id}` : '/login')}>
            <div className='productImg' style={backgroundImageStyle}></div>
            <div className='productContent'>
                <p>{item.name}</p>
                <span className='d'>đ</span><span className='priceProduct'>{formatPrice(item.price)}</span>
            </div>
        </div>

    )
}
