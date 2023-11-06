import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import CartContext from '../../context/CartContext';

export default function CartItem({ item }) {
    const { cartItems, setCartItems, addToCart,deleteProductCart } = useContext(CartContext);

    const backgroundImageStyle = {
        backgroundImage: `url(${item.imageUrl})`,
        /* Các thuộc tính khác cho phần tử */
        width: '80px', // Đặt kích thước cho khối div
        height: '80px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer'
    };
    const handlePlus = () => {
        console.log(cartItems);
        const tmp = [...cartItems];
            for(let element of tmp) {
                if(element.id === item.id) {
                    element.quantity +=1
                    break;
                }
            
            }
            console.log('abc',tmp);
        setCartItems(tmp)
    }

    const handleMinus = () => {
        const tmp = [...cartItems];
            for(let element of tmp) {
                if(element.id === item.id && element.quantity > 1) {
                    element.quantity -=1
                    break;
                }
            
            }
            console.log('abc',tmp);
        setCartItems(tmp)
    }
    return (
        <>
            <div className='cart-item-contain'>
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
                                <p className='cart-item-name'>{item.name}</p>
                                <div className='special-price'>
                                    <span className='special-price-icon'>Special Price</span>
                                </div>
                                <img className="eQNnTs" src="https://down-vn.img.susercontent.com/file/vn-50009109-6d896a3addc51791d8d853e76296dc8d" />
                            </div>
                        </div>
                        <div className="title-price-header">₫{item.price}</div>
                        <div className="title-quantity-header">
                            <div className='d-flex align-items-center justify-content-center'>
                                <button type='button' className="quantity-minus" aria-label="Decrease" onClick={()=> handleMinus()}>-</button>
                                <input class="input-quantity-cart" type="text" role="spinbutton" aria-valuenow="1" value={item.quantity}></input>
                                <button type='button'class="quantity-plus" aria-label="Increase" onClick={()=> handlePlus()}>+</button>
                            </div>
                        </div>
                        <div className="title-money-header" style={{ color: '#ee4d2d' }}>₫{item.price * item.quantity}</div>
                        <div className="title-action-header">
                            <IconButton onClick={()=> deleteProductCart(item.id)}>
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
            </div>
        </>
    )
}
