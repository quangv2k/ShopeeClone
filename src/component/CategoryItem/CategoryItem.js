import React from 'react'
import backgroundImageUrl from './img/Áo.png';
import './CategoryItem.scss'

export default function CategoryItem({iconCate,titleCate}) {
    console.log(titleCate)
    const backgroundImageStyle = {
        backgroundImage: `url(${iconCate})`,
        /* Các thuộc tính khác cho phần tử */
        width: '83px', // Đặt kích thước cho khối div
        height: '88px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      };
  return (
    <div className='cateItem d-flex'>
        <div className='cateImg' style={backgroundImageStyle}></div>
        <div className='cateTitle'>
            {titleCate}
        </div>
    </div>
  )
}
