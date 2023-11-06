import React from 'react'
import './Banner.scss'

export default function Banner() {
    return (
        <div className='containBaner'>
            <div className='container d-flex'>
                <div className='imgBanner1'>
                    <img src='https://cf.shopee.vn/file/vn-50009109-5274a22ae3744f5db8f8040638d6e812_xxhdpi' alt='ảnh'></img>
                </div>
                <div className='imgBanner2'>
                    <div className='imgBanner2_1 imgW-H'>
                        <img className='img' src='https://cf.shopee.vn/file/vn-50009109-7b9c11643a27321b50f243b0daad2e55_xhdpi' alt='ảnh'></img>
                    </div>
                    <div className='imgBanner2_2 imgW-H'>
                        <img className='img' src='	https://cf.shopee.vn/file/vn-50009109-6931a7369ecaf30a6f831b767da54f95_xhdpi' alt='ảnh'></img>
                    </div>
                </div>
            </div>
            <div className='container d-flex justify-content-around align-items-center'>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM1'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Khung Giờ Săn Sale</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM2'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Miễn Phí Ship - Có Shopee</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM3'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Voucher Giảm Đến 500.000Đ</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM4'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Hàng Hiệu Outlet Giảm 50%</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM5'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Mã Giảm Giá</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM6'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Gì Cũng Rẻ - Deal Sốc 9.000Đ</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM7'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Nạp Thẻ, Dịch Vụ & Khách Sạn</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM8'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Hàng Quốc Tế</p>
                        </div>
                    </div>
                </a>
                <a href='#'>
                    <div className='KM1'>
                        <div className='iconKM9'>
                        </div>
                        <div className='titleKM'>
                            <p className='fs-13'>Bắt Trend - Giá Sốc</p>
                        </div>
                    </div>
                </a>
            </div>

        </div>
    )
}
