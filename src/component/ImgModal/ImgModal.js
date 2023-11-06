import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function ImgModal({ open, handleClose, handleSaveImg,formData }) {

    console.log(open);

    const [showImage, setShowImage] = React.useState(false); // Trạng thái hiển thị hình ảnh
    const [previewImage, setPreviewImage] = React.useState('');
    const [imageUrl,setImageUrl] = React.useState(formData.imageUrl);

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

    const handleImageToggle = (imageUrl) => {
        console.log(imageUrl);
        setShowImage(!showImage); // Đảo trạng thái hiển thị hình ảnh
        setPreviewImage(imageUrl);
    };

    const onChangeImg = (event) => {
        const newValue = event.target.value;
        setImageUrl(newValue);
        setShowImage(false);
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Hãy Nhập Link Ảnh"}
                </DialogTitle>
                <DialogContent>
                <TextField
                            margin="dense"
                            id="name"
                            label="Image"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='imageUrl'
                            value={imageUrl}
                            onChange={onChangeImg}
                        />
                    <Button variant="contained" onClick={() => handleImageToggle(imageUrl)}>
                        {showImage ? 'Đóng hình ảnh' : 'Hiển thị hình ảnh'}
                    </Button>
                    {showImage && <ImageDiv imageUrl={previewImage} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleSaveImg(imageUrl)}>Lưu</Button>
                    
                </DialogActions>
            </Dialog>
        </>
    )
}
