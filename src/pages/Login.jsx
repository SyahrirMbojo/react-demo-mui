import {
  Avatar,
  Box,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import { LoadingButton } from "@mui/lab";
import * as baseapi from "../utils/Baseapi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as global from "../utils/Global";
import { usePost } from "../hooks/UseHooks";
import { UseParam } from "../hooks/UseParam";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmitLogin = async (dataform) => {
    setLoading(true);
    const itemBody = {
      username: dataform.username,
      password: dataform.password,
    };
    let { data, success, errors, isloading } = await usePost(
      baseapi.apilogin,
      itemBody,
      true
    );
    if (success) {
      UseParam.setIslogin("success");
      UseParam.setToken(data.access_token);
      navigate("/");
      reset();
    }

    if (errors) {
      global.toastWarning("Your username and password not match");
    }

    setLoading(isloading);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Sign in
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmitLogin)}
              style={{ marginTop: 20 }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                name="username"
                size="large"
                placeholder="Please enter username"
                autoComplete="username"
                autoFocus
                {...register("username", { required: "Username is required" })}
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                size="large"
                placeholder="Please enter password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                size="large"
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                loadingPosition="end"
                endIcon={<LoginIcon />}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" underline="none">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" underline="none">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Footer />
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
