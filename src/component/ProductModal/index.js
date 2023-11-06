import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext } from 'react'
import ProductModalContext from '../../context/ProductModalContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ProductApi from '../../api/ProductApi';
import { useState } from 'react';
import ProductPagingContext from '../../context/ProductPagingContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    price: yup
        .number('Enter your price')
        .min(100, 'price should be of minimum 100')
        .max(100000000, 'price should be of maximum 100.000.000')
        .required('price is required'),
    description: yup
        .string('Enter your description')
        .min(8, 'description should be of minimum 8 characters length')
        .required('description is required'),
    imageUrl: yup
        .string('Enter your description')
        .required('description is required'),
});


function ImageDiv({ imageUrl }) {
    console.log("hình ảnh:", imageUrl)
    const divStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '100px',
        height: '100px',
    };

    return <div style={divStyle}></div>;
}


export default function ProductModal() {

    const { isOpenModal, setIsOpenModal, initDataModal, setiInitDataModal, handleSearch } = useContext(ProductModalContext);
    const {pagingData, setPagingData,refetch } = useContext(ProductPagingContext);
    const [showImage, setShowImage] = useState(false); // Trạng thái hiển thị hình ảnh
    const [previewImage, setPreviewImage] = useState('');
    // console.log('az', initDataModal);
    const handleClose = () => {
        setIsOpenModal(false);
        setShowImage(false);
    }
    

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: initDataModal.id ?? "",
            name: initDataModal.name ?? "",
            price: initDataModal.price ?? "",
            description: initDataModal.description ?? "",
            imageUrl: initDataModal.imageUrl ?? ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values,{resetForm}) => {
            // alert(JSON.stringify(values, null, 2));
            if (values.id) {
                await handleEditProduct({
                    id: values.id,
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    imageUrl: values.imageUrl
                })
                toast.success('Cập nhật thành công');
            } else {
                await handleCreateProduct({
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    imageUrl: values.imageUrl
                })
                toast.success('Thêm mới thành công');
                resetForm();
            }
            if(pagingData.currentPage === 1 || values.id) {
                refetch();
            }else {
                setPagingData({
                    ...pagingData,
                    currentPage:1,
                })
            }
            handleClose();
          
        },
       
    });
    const handleCreateProduct = async ({ name, price, description, imageUrl }) => {
        await ProductApi.create({
            name,
            price,
            description,
            imageUrl
        });
    }
    const handleEditProduct = async ({ id, name, price, description, imageUrl }) => {
        await ProductApi.updateByID(id, {
            name,
            price,
            description,
            imageUrl
        });
    }

    const handleImageToggle = (imageUrl) => {
        console.log(imageUrl);
        setShowImage(!showImage); // Đảo trạng thái hiển thị hình ảnh
        setPreviewImage(imageUrl);
    };
    return (
        <>

            <Dialog open={isOpenModal} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add/Update Product</DialogTitle>
                    <DialogContent>
                        <TextField

                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField

                            margin="dense"
                            id="name"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            name='price'
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField

                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Image"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='imageUrl'
                            value={formik.values.imageUrl}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                            helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                        />
                        <Button variant="contained" onClick={() => handleImageToggle(formik.values.imageUrl)}>
                            {showImage ? 'Đóng hình ảnh' : 'Hiển thị hình ảnh'}
                        </Button>
                        {showImage && <ImageDiv imageUrl={previewImage} />}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' variant='contained'>Save</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}
