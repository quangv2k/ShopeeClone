import React, { useContext, useEffect, useState } from 'react'
import './ListProduct.scss'
import ProductItem from '../ProductItem/ProductItem'
import ProductModalContext from '../../context/ProductModalContext';
import ProductApi from '../../api/ProductApi';
import { Pagination, Stack } from '@mui/material';
import ProductPagingContext from '../../context/ProductPagingContext';


export default function ListProduct() {

  const [listProduct, setListProduct] = useState([]);
  const [pagingData, setPagingData] = useState({
    currentPage: 1,
    totalPage: 0,
    limit: 12,
    search: ''
  })
  const fetchListProduct = async (config = {}) => {
    const res = await ProductApi.getAll(config);
    const data = res.data;
    setListProduct(data)
  }
  useEffect(() => {
    getPagingProduct();
  }, [pagingData.currentPage])

  const getPagingProduct = async () => {

    const response = await ProductApi.getPaging(
      pagingData.limit,
      pagingData.currentPage,
    );
    const { data, headers } = response;
    const totalPage = Math.ceil(Number(headers['x-total-count']) / pagingData.limit);
    setPagingData({
      ...pagingData,
      totalPage: totalPage
    });

    setListProduct(data);
  }
  const handleChange = (event, value) => {
    setPagingData({
      ...pagingData,
      currentPage: value,
    });
  };
  return (


    <div className='container product-cotainer'>
      <div className='product-header d-flex'>
        <div>Gợi ý hôm nay</div>
      </div>
      <div className='line'></div>
      <div className='listProduct d-flex'>
        {listProduct.map((item, index) => (
          <ProductItem item={item} />
        ))}

        {/* <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/>
             <ProductItem/> */}
      </div>
      <div style={{ width: '100%', height: 'auto', position: 'relative', marginTop: '25px' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Stack spacing={2}>
            <Pagination count={pagingData.totalPage} variant="outlined" color="primary" page={pagingData.currentPage} onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </div>


  )
}
