import React, { useEffect, useRef, useState } from 'react'
import ProductTable from '../../component/ProductTable'
import ProductApi from '../../api/ProductApi.js';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import ProductModalContext from '../../context/ProductModalContext.js'
import ProductModal from '../../component/ProductModal';
import ProductPagingContext from '../../context/ProductPagingContext';
import HeaderAdmin from '../../component/HeaderAdmin/HeaderAdmin';



export default function Admin() {
  const [listProduct, setListProduct] = useState([]);
  const ref = useRef(null)

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [initDataModal, setiInitDataModal] = useState({});
  const [pagingData, setPagingData] = useState({
    currentPage: 1,
    totalPage: 0,
    limit: 5,
    search: ''
  })

  // console.log(pagingData.totalPage);
  console.log(pagingData.currentPage);
  const fetchListProduct = async (config = {}) => {
    const res = await ProductApi.getAll(config);
    const data = res.data;
    setListProduct(data)
  }
  useEffect(() => {
    getPagingProduct();
  }, [pagingData.currentPage,pagingData.search])

  const handleSearch = async () => {
    //cách 1 toán tử 3 ngôi
    // await fetchListProduct(!ref.current.value ? {} :{
    //   params : {
    //     name:ref.current.value,
    //   }
    // })
    //cách 2 dùng detructoring
    // await fetchListProduct(
    //   ...(ref.current.value.trim() && [{
    //     params: {
    //       name: ref.current.value.trim(),
    //     },
    //   }]
    //   ));
    console.log('page',pagingData.currentPage);
    setPagingData({
      ...pagingData,
      currentPage: 1,
      search: ref.current.value.trim(),
    })
   console.log('data',pagingData);
  }

  const handleAddOpen = () => {
    setIsOpenModal(true);
    setiInitDataModal({});
  }

  const getPagingProduct = async () => {
    console.log(ref.current.value.trim());
    const response = await ProductApi.getPaging(
      pagingData.limit,
      pagingData.currentPage,
      ref.current.value.trim() && { name: ref.current.value.trim() },
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
    <ProductPagingContext.Provider value={{ pagingData, setPagingData,refetch: getPagingProduct,handleChange }}>
      <ProductModalContext.Provider value={{ isOpenModal, setIsOpenModal, initDataModal, setiInitDataModal, handleSearch }}>
        <ProductModal />
        <HeaderAdmin/>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: '500px' }}>
            <InputBase
              inputRef={ref}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "Search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant='contained' onClick={handleAddOpen}><AddIcon /></Button>
        </div>
        <ProductTable data={listProduct}/>
        <div style={{ width: '100vw', height: 'auto', position: 'relative', marginTop: '25px' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Stack spacing={2}>
              <Pagination count={pagingData.totalPage} variant="outlined" color="primary" page={pagingData.currentPage} onChange={handleChange} />
            </Stack>
          </div>
        </div>
      </ProductModalContext.Provider>
    </ProductPagingContext.Provider>
  )
}

