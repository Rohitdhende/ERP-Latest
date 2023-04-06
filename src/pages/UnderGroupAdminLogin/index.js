import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Logo from '../../assets/logo.png';
import LoginWithOtp from '../../components/LoginWithOtp/LoginWithOtp';

import Background from '../../assets/login-background.jpg';


function UnderGroupAdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loginWithOtp, setLoginWithOTP] = useState(false);
  const notify = () => toast.success('User Logged in Successfully!');
  return (
    <div
      style={{
        width: '100%',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          width: '100%',
          height: { lg: '90vh', xm: 'auto' },
          marginY: 'auto',
          flexDirection: { lg: 'row', md: 'row', sm: 'row', xs: 'column' },
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          padding: '1rem !important',
          borderRadius: 0.75,
          marginX: {
            lg: '1rem !important',
            md: '1rem !important',
            sm: '1rem !important',
            xs: '1rem !important',
          },
        }}
      >
        {loginWithOtp ? (
          <LoginWithOtp />
        ) : (
          <Box
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '1rem',
              backgroundColor: 'white',
              paddingY: 5,
              margin: 0,
              borderRadius: 0.75,
            }}
          >
            <img src={Logo} alt="logo" height="50px" />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Welcome Back!
            </Typography>
            <Typography sx={{ marginBottom: '2rem', color: '#A5A4A7' }}>
              Under Group Admin Login
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              sx={{ width: { lg: '70%', md: '70%', sm: '70%', xs: '80%' } }}
            />
            <FormControl
              sx={{
                m: 1,
                width: { lg: '70%', md: '70%', sm: '70%', xs: '80%' },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Typography
              variant="body2"
              sx={{
                color: 'grey',
                cursor: 'pointer',
                '&:hover': {
                  color: 'black',
                },
              }}
            >
              Forgot Password?
            </Typography>
            <Button
              sx={{
                backgroundColor: '#6BDB8A',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#58B85D',
                },
                width: '70%',
                borderRadius: 0.75,
                paddingY: '0.5rem',
              }}
              onClick={() => {
                notify();
                navigate('/under-group-admin-dashboard');
              }}
            >
              Login
            </Button>
            <span style={{ color: '#C8C8C8' }}>Or</span>

            <Button
              sx={{
                backgroundColor: '#F1F6F7',
                color: '#6BDB8A',
                '&:hover': {
                  backgroundColor: '#F2F2F8',
                },
                width: '70%',
                borderRadius: 0.75,
                paddingY: '0.5rem',
              }}
              onClick={() => setLoginWithOTP(true)}
            >
              Login with OTP
            </Button>
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            // backgroundColor: '#58B85D',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            paddingY: 5,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Easily Track the Details
          </Typography>
          <Typography sx={{ color: '#58B85D', fontWeight: 'bold' }}>
            well-organized
          </Typography>
          <Typography variant="body2" sx={{ color: 'grey' }}>
            Create, Add, Edit and Save it!
          </Typography>
          {/* <img src={Analytics} alt="logo" width="350px" /> */}
        </Box>
      </Container>
    </div>
  );
}

export default UnderGroupAdminLogin;
