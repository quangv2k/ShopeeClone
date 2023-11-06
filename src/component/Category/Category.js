import React from 'react'
import './Category.scss'
import CategoryItem from '../CategoryItem/CategoryItem'
import '../CategoryItem/CategoryItem.scss'
import ImgCate from './ImgCate'

export default function Category() {

    const img1 = 'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
    return (
        <div className='container category-contain'>
            <div className='shoppe_header_category'>
                <div className='shoppe_header_category_title'>DANH MỤC</div>
            </div>
            <div className='shoppe_content_category'>
                <div className='d-flex cateItem-contain'>
                    {ImgCate.map((item,index)=> (
                         <CategoryItem iconCate={item.urlImg} titleCate={item.titleImg}/>
                    )
                    )}
                </div>

            </div>
        </div>
    )
}
