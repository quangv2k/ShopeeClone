import React, { useContext } from 'react'
import CartContext from '../../context/CartContext';
import './Cart.scss'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CartItem from '../../component/CartItem/CartItem';

export default function Cart() {
    const { cartItems, setCartItems, addToCart } = useContext(CartContext);

    console.log('cart', cartItems);
    const backgroundImageStyle = {
        backgroundImage: `url(https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lj8rraa6d9u499)`,
        /* Các thuộc tính khác cho phần tử */
        width: '80px', // Đặt kích thước cho khối div
        height: '80px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
    };

    const totalCart = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }
    return (
        <>
            <div className='cart-page-header-wrapper'>
                <div className='container d-flex align-items-center' style={{ width: '100vw', height: '100px' }}>
                    <div className='cart-page-header'>Giỏ Hàng</div>
                </div>
            </div>
            <div className='cart-container'>
                <div className='container'>
                    <div className='free-ship-title'>
                        <img className='me-2' width="24" height="20" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png" alt="fs-icon" />
                        <span className="bXROAg ">Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!</span>
                    </div>

                    <div className="table-header-cart">
                        <div className="checkbox-contain-header">
                            <label className="stardust-checkbox">
                                <input className="stardust-checkbox-input" type="checkbox" aria-checked="false" aria-disabled="false" tabindex="0" role="checkbox" aria-label="Click here to select all products" />
                                <div className="stardust-checkbox-box"></div>
                            </label>
                        </div>
                        <div className="title-product-header">Sản Phẩm</div>
                        <div className="title-price-header">Đơn Giá</div>
                        <div className="title-quantity-header">Số Lượng</div>
                        <div className="title-money-header">Số Tiền</div>
                        <div className="title-action-header">Thao Tác</div>
                    </div>
                    {/* <div className='cart-item-contain'>
                        <div className='cart-item-detail'>
                            <div className='d-flex align-items-center'>
                                <div className="checkbox-contain-header">
                                    <label className="stardust-checkbox">
                                        <input className="stardust-checkbox-input" type="checkbox" aria-checked="false" aria-disabled="false" tabindex="0" role="checkbox" aria-label="Click here to select all products" />
                                        <div className="stardust-checkbox-box"></div>
                                    </label>
                                </div>
                                <div className="title-product-header d-flex align-items-center">
                                    <div className='cart-item-img' style={backgroundImageStyle}></div>
                                    <div className='cart-item-content-right'>
                                        <p className='cart-item-name'>Áo thun tay lỡ Nụ Hôn Hades</p>
                                        <div className='special-price'>
                                            <span className='special-price-icon'>Special Price</span>
                                        </div>
                                        <img className="eQNnTs" src="https://down-vn.img.susercontent.com/file/vn-50009109-6d896a3addc51791d8d853e76296dc8d" />
                                    </div>
                                </div>
                                <div className="title-price-header">₫1.000</div>
                                <div className="title-quantity-header">
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <button className="quantity-minus" aria-label="Decrease">-</button>
                                        <input class="input-quantity-cart" type="text" role="spinbutton" aria-valuenow="1" value="1"></input>
                                        <button class="quantity-plus" aria-label="Increase">+</button>
                                    </div>
                                </div>
                                <div className="title-money-header" style={{ color: '#ee4d2d' }}>₫1.000</div>
                                <div className="title-action-header">
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='discount-title d-flex'>
                        <img className="discount-img" width="24" height="20" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png" alt="fs-icon" />
                        <div className="shopee-content-discount">Giảm ₫300.000 phí vận chuyển đơn tối thiểu ₫0</div>
                        <div className="shopee-drawer" id="pc-drawer-id-2" tabindex="0"><span class="XEejA4" aria-describedby="168758605_shipping_discount"> Tìm hiểu thêm </span></div>
                    </div> */}
                    {cartItems.map((item, index) => (
                        <CartItem item={item} />
                    ))}

                    <div className='total-price-cart d-flex  align-items-center justify-content-end'>
                        <div className='total-price'>Tổng thanh toán &#40; {cartItems.length} sản phẩm &#41; : <span className='total-price-or'>₫{totalCart()}</span></div>
                        <button type='button' className='btn-buy-cart'>Mua Hàng</button>
                    </div>
                </div>
            </div>

        </>
    )
}
