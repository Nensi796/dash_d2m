import React from 'react';
import Image from 'next/image';
import { Box, Button, buttonClasses, OutlinedInput, Typography } from '@mui/material';
import { LoginImage } from 'assets';
import { useMutation } from '@apollo/client';
import SIGNUP_USER from '@graphql/schema/mutation/signupUser.graphql';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { showToast } from '@utils/toast';
import { useRouter } from 'next/router';

interface ISignupUser {
  countryCode: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  role: string;
}
const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<ISignupUser>({
    defaultValues: {
      countryCode: '',
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
      role: '',
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [signupUser] = useMutation(SIGNUP_USER);
  const handleSignup = (data: ISignupUser) => {
    signupUser({
      variables: {
        input: {
          countryCode: data.countryCode,
          email: data.email,
          name: data.name,
          username: data.name,
          password: data.password,
          phoneNumber: `+${data.phoneNumber}`,
          role: 'SUPER_ADMIN',
        },
      },
    }).then((res) => {
      console.log(res.data.signup.successMessage);
      showToast(res.data.signup.successMessage);
      router.push('/login');
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: '#E4E8F0',
        alignItems: 'center',
        height: '968px',
        m: 'auto',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '65%',
          alignItems: 'center',
        }}>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down(1200)]: {
              '& img': { width: '300px', height: '280px' },
            },
            [theme.breakpoints.between(1200, 1400)]: {
              '& img': { width: '350px', height: '300px' },
            },
          })}>
          <Typography
            sx={(theme) => ({
              fontSize: '64px',
              [theme.breakpoints.down(1200)]: { fontSize: '40px' },
            })}>
            Welcome
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              textTransform: 'capitalize',
            }}>
            Login to your Direct Mortgages Dashboard
          </Typography>
          <Image src={LoginImage} alt="loginImage" width={560} height={350} />
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.between(1200, 1400)]: { width: '350px' },
            [theme.breakpoints.down(1200)]: { width: '300px' },
            background: '#FFFFFF',
            height: 'fit-content',
            width: '350px',
            p: '30px',
            borderRadius: '4px',
          })}>
          <Typography sx={{ fontSize: '32px', color: '#2B388C' }}>SignUp</Typography>
          <Typography sx={{ fontSize: '16px', color: '#2B388C', lineHeight: '24px' }}>
            Create an account to view and manage your Clients.
          </Typography>
          <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Email</label>
            <OutlinedInput
              {...register('email', { required: 'Enter Email address' })}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& input': { paddingX: '10px' },
              }}
            />
            {errors.email && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {' '}
                {errors.email?.message}{' '}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
              Username
            </label>
            <OutlinedInput
              {...register('name', { required: 'Enter Username' })}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& input': { paddingX: '10px' },
              }}
            />
            {errors.name && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {' '}
                {errors.name?.message}{' '}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
              Password
            </label>
            <OutlinedInput
              {...register('password', { required: 'Enter password' })}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& input': { paddingX: '10px' },
              }}
            />
            {errors.password && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {' '}
                {errors.password?.message}{' '}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: 'Phone number is required' }}
              render={({ field: { onChange, value } }: any) => (
                <PhoneInput
                  value={value}
                  onChange={onChange}
                  country={'us'}
                  inputStyle={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    width: '100%',
                  }}
                  dropdownStyle={{ background: '#E0E7FF' }}
                  containerStyle={{
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                  }}
                />
              )}
            />
            {errors.phoneNumber && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {' '}
                {errors.phoneNumber?.message}{' '}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{ fontSize: '12px', color: '#2B388C', lineHeight: '16px', marginTop: '10px' }}>
              By creating an account you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
          <Box sx={{ marginTop: '20px', display: 'flex', width: 'full', gap: '10px' }}>
            <Button
              onClick={handleSubmit(handleSignup)}
              variant="contained"
              sx={{
                textTransform: 'capitalize',
                height: '32px',
                width: '100%',
                border: '2px solid #2E5BFF',
                fontWeight: 700,
                [`&.${buttonClasses.contained}`]: {
                  color: '#FFFFFF',
                  backgroundColor: '#2E5BFF',
                },
              }}>
              Create Your Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
