import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Logo from '../../assets/logo.png';

const LoginWithOtp = () => {
  const navigate = useNavigate();
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = React.useState('');

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  return (
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
      }}
    >
      <img src={Logo} alt="logo" height="50px" />
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Welcome Back!
      </Typography>
      <Typography sx={{ marginBottom: '2rem', color: '#A5A4A7' }}>Member Login</Typography>
      {isOtpVisible ? (
        <>
          <Container
            sx={{
              display: 'flex',
              width: '70%',
              justifyContent: 'space-evenly',
            }}
          >
            <MuiOtpInput value={otp} onChange={handleChange} />
          </Container>

          <Button
            sx={{
              backgroundColor: '#58B85D',
              color: 'white',
              '&:hover': {
                backgroundColor: '#6BDB8A',
              },
              width: '70%',
              borderRadius: 0.75,
              paddingY: '0.5rem',
            }}
            onClick={() => navigate('/dashboard/app')}
          >
            Login
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="Mobile Number"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '70%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
          />
          Or
          <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ m: 1, width: '70%' }} />
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
            onClick={() => setIsOtpVisible(true)}
          >
            Send OTP
          </Button>
        </>
      )}
    </Box>
  );
};

export default LoginWithOtp;
