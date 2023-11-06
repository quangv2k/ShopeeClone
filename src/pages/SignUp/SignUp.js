import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();
    const [users, setUsers] = React.useState([]);

    React.useEffect(()=> {
        getAllUser();
        // navigate('/login');
    },[])

    const getAllUser = async() => {
        const response = await UserApi.getAll();
        const data = response.data;
        setUsers(data);
        console.log(data);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const usernameExists = users.some((user) => user.username === username);

        if(validateForm(username,email,password)){
            if(usernameExists) {
                toast.error('Tên đăng nhập đã tồn tại');
            }else {
                try {
                    const data = new FormData(event.currentTarget);
                    console.log(data.get('email'));
                    const newUser = {
                        username: data.get('username'),
                        password: data.get('password') ,
                        role: "user",
                        email: data.get('email'),
                        phone: "",
                        dateOfBirth: "",
                        name: "",
                        sex: "",
                        imageUrl: ""
                    }
                    const response = await UserApi.create(newUser);
                    console.log(response);
                    if (response.status === 201) {
                        // Đăng ký thành công
                        const data = response.data;
                        toast.success('Đăng ký thành công');
                        console.log('Đăng ký thành công:', data);
                        navigate('/login');
                      } else {
                        // Đăng ký thất bại
                        toast.error('Đăng ký thất bại: ' + response.data.message);
                        console.error('Đăng ký thất bại:', response.data);
                      }
                } catch (error) {
                    toast.error('Lỗi khi gửi dữ liệu đăng ký: ' + error.message);
                    console.log(error);
                }
            }
           
    
        }
        
    };

    const validateForm = (username,email,password) => {
        const errors = {};
        let isValid = true;
    
        // Kiểm tra trường username
        if (!username.trim()) {
          errors.username = 'Tên Đăng Nhập không được để trống';
          isValid = false;
          toast.error('Tên Đăng Nhập không được để trống');
          return;
        }
        
    
        // Kiểm tra trường email
        if (!email.trim()) {
          errors.email = 'Email không được để trống';
          isValid = false;
          toast.error('Email không được để trống');
          return;
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
          errors.email = 'Email không hợp lệ';
          isValid = false;
          toast.error('Email không hợp lệ');
          return;
        }

         // Kiểm tra trường password
         if (!password.trim()) {
            errors.username = 'Password không được để trống';
            isValid = false;
            toast.error('Password không được để trống');
            return;
          }
    
        return isValid;
      };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng Ký
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Tên Đăng Nhập"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật Khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                           Đăng Ký
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item onClick={()=> navigate('/login')}>
                                <Link href="#" variant="body2">
                                    Bạn đã có tài khoản? Đăng nhập ngay
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ToastContainer position="top-right" />
            </Container>
        </ThemeProvider>
    );
}