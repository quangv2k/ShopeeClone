import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/Api";
import UserApi from "../../api/UserApi";
import { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            console.log({
                email: data.get("username"),
                password: data.get("password"),
            });
            const username = data.get("username");
            const password = data.get("password");
            if (validateForm(username, password)) {
                const response = await UserApi.getAll({
                    params: {
                        username: data.get("username"),
                        password: data.get("password")
                    }

                })
                const user = response.data[0];
                console.log(response);
                console.log(user?.role);
                if (response.status === 200) {
                    if (user && user.role === 'admin') {
                        localStorage.setItem("tokenadmin", JSON.stringify(user));
                        toast.success('Đăng nhập thành công');
                        navigate('/admin');

                    } else if (user && user.role === 'user') {
                        localStorage.setItem("tokenuser", JSON.stringify(user));
                        toast.success('Đăng nhập thành công');
                        navigate('/');

                    } else {
                        toast.error('Sai tên đăng nhập hoặc mật khẩu.');
                    }
                }
            }

        } catch (error) {
            console.error(error);
        }
        // navigate("/admin");

    };

    const validateForm = (username, password) => {
        const errors = {};
        let isValid = true;

        // Kiểm tra trường username
        if (!username.trim()) {
            errors.username = 'Tên Đăng Nhập không được để trống';
            isValid = false;
            toast.error('Tên Đăng Nhập không được để trống');
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
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 8,
                }}
            >
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(https://source.unsplash.com/random)",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Đăng Nhập
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Tên Đăng Nhập"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật Khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Đăng Nhập
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Quên Mật Khẩu
                                        </Link>
                                    </Grid>
                                    <Grid item onClick={() => navigate('/signup')}>
                                        <Link href="#" variant="body2">
                                            {"Bạn không có tài khoản? Đăng ký"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
