import { TableCell, TableRow } from '@mui/material'
import React, { useContext } from 'react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductApi from '../../api/ProductApi';
import EditIcon from '@mui/icons-material/Edit';
import ProductModalContext from '../../context/ProductModalContext';
import ProductPagingContext from '../../context/ProductPagingContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageDiv({ imageUrl }) {
    const divStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '100px',
        height: '100px',
    };

    return <div style={divStyle}></div>;
}

export default function ProductTableRow({ row }) {
    // console.log(row);
    //test 
    const { isOpenModal, setIsOpenModal, initDataModal, setiInitDataModal, handleSearch } = useContext(ProductModalContext);
    const {pagingData, setPagingData,refetch } = useContext(ProductPagingContext);
    const handleDelete = async () => {
        await ProductApi.deleteByID(row.id);
        
        if(pagingData.currentPage === 1 ) {
            refetch();
        }else {
            setPagingData({
                ...pagingData,
                currentPage:1
            })
        }
        toast.success('Xóa sản phẩm thành công');
        
    }

    const handleEditProduct = () => {
        console.log(row);
        setiInitDataModal(row);
        console.log(initDataModal);
        setIsOpenModal(true);

    }
    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                    {row.name}
                </TableCell>
                <TableCell >{row.price}</TableCell>
                <TableCell >{row.description}</TableCell>
                <TableCell >
                    <ImageDiv imageUrl={row.imageUrl} />
                </TableCell>
                <TableCell align="right" >
                    <IconButton onClick={() => { handleDelete() }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleEditProduct}>
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}
