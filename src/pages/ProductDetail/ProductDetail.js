import React, { useContext, useEffect, useState } from 'react'
import Header from '../../component/Header/Header'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './ProductDetail.scss'
import { useParams } from 'react-router-dom';
import ProductApi from '../../api/ProductApi';
import CartContext from '../../context/CartContext';

export default function ProductDetail() {

    const {cartItems,setCartItems,addToCart} = useContext(CartContext);

    const [data,setData] = useState({});
    const [quantity,setQuantity] = useState(1);
    const {id} = useParams();
    useEffect(()=> {
        getProductById();
    },[])

    const getProductById = async() => {
        const res = await ProductApi.getByID(id);
        const data = res.data;
        setData(data);
    }
    console.log(id);

    const backgroundImageStyle = {
        backgroundImage: `url(${data.imageUrl})`,
        /* Các thuộc tính khác cho phần tử */
        width: '450px', // Đặt kích thước cho khối div
        height: '450px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      };

    const handlePlus = () => {
        console.log('a');
        setQuantity((prev)=> prev + 1)
    }

    const handleMinus = () => {
        setQuantity((prev)=> prev - 1)
        if(quantity === 1) {
            setQuantity(1);
        }
    }

    // Hàm định dạng giá thành chuỗi có dấu phân cách
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    console.log(typeof data.price);
    return (
        <>
            <div className='container'>
                <div className='product-briefing d-flex'>
                    <div className='product-detail-img'>
                        <div className='product-img-0' style={backgroundImageStyle}></div>
                    </div>
                    <div className='product-detail-content'>
                        <p className='title-product'>{data.name}</p>
                        
                        <div className='price-cotain'>
                            <span>₫{data.price}</span>
                        </div>
                        <div className='quantity-contain d-flex'>
                            <div className='title'>Miêu tả</div>
                            <div className='shopee-input-quantity'>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div className='quantity-contain d-flex'>
                            <div className='title'>Số Lượng</div>
                            <div className='shopee-input-quantity'>
                                <button >
                                    <RemoveIcon onClick={()=> handleMinus()}/>
                                </button>
                                <input className='input-quantity' type='number' value={quantity}></input>
                                <button onClick={()=> handlePlus()}>
                                    <AddIcon></AddIcon>
                                </button>
                            </div>
                        </div>
                        <div className='button-contain'>  
                                <button className='btn-add-cart' onClick={() => addToCart(data,quantity)}>
                                    <span><AddShoppingCartIcon/></span>
                                    <span>Thêm Vào giỏ Hàng</span>
                                </button>
                                <button className='btn-buy'>
                                    Mua Ngay
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
