import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, buttonClasses, OutlinedInput, Typography } from '@mui/material';
import { LoginImage } from 'assets';
import { useMutation } from '@apollo/client';
import LOGIN_USER from '@graphql/schema/mutation/loginUser.graphql';
import { useForm } from 'react-hook-form';
import { ILoginUser } from '@types';
import { showToast, handleGraphqlError } from '@utils';
import { VerifyOtp } from '@components/VerifyOTP/VerifyOtp';

export interface IUserDetails {
  id: string;
  name: string;
  countryCode: string;
  officeId: any;
  picture: string;
  phoneNumber: string;
  role: string;
  email: string;
  isVerified: boolean;
}
export interface IResponseData {
  data: {
    authBasic: AuthBasic;
  };
}

export interface AuthBasic {
  errors: any;
  isSuccess: boolean;
  successMessage: string;
  user: IUserDetails;
}

const LoginPage = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserDetails>();

  const [loginUser] = useMutation(LOGIN_USER);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ILoginUser>();

  const onSubmit = (data: ILoginUser) => {
    if (!login && (data as ILoginUser)) {
      if ('password' && 'email' in data) {
        loginUser({
          variables: {
            input: {
              password: data?.password,
              email: data?.email,
            },
          },
        })
          .then((res: any) => {
            setUserData(res.data?.authBasic.user);
            showToast(
              `Verification code sent to:${res.data?.authBasic.user?.phoneNumber.slice(
                0,
                3,
              )}********${res.data?.authBasic.user?.phoneNumber.slice(-2)}`,
            );
            showToast('User Login added successfully');
            setLogin(true);
            reset();
          })
          .catch(handleGraphqlError);
      }
    }
  };

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '968px',
        background: '#E4E8F0',
        m: 'auto',
      })}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          width: '65%',
          alignItems: 'center',
          [theme.breakpoints.down(1200)]: {
            width: '80%',
          },
        })}>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down(1200)]: {
              '& img': { width: '330px', height: '270px' },
            },
            [theme.breakpoints.between(1200, 1400)]: {
              '& img': { width: '350px', height: '300px' },
            },
            [theme.breakpoints.down(850)]: {
              '& img': { width: '290px', height: '250px' },
            },
          })}>
          <Typography
            sx={(theme) => ({
              fontSize: '64px',
              fontWeight: 400,
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
        {login ? (
          <VerifyOtp login={login} userData={userData as IUserDetails} />
        ) : (
          <Box
            sx={(theme) => ({
              [theme.breakpoints.between(1200, 1400)]: { width: '350px' },
              [theme.breakpoints.down(1200)]: { width: '300px' },
              background: '#FFFFFF',
              height: '364px',
              width: '406px',
              p: '30px',
              borderRadius: '4px',
            })}>
            <Typography sx={{ fontSize: '32px', color: '#2B388C' }}>Login</Typography>
            <Typography
              sx={{
                fontSize: '16px',
                color: '#2B388C',
                lineHeight: '40px',
                minWidth: '320px',
                fontWeight: 400,
              }}>
              Login to your Direct Mortgages Dashboard
            </Typography>

            <>
              <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Email
                </label>
                <OutlinedInput
                  {...register('email', { required: 'Email is required' })}
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2);',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors?.email && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors?.email?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Password
                </label>
                <OutlinedInput
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2);',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors?.password && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors?.password?.message}
                  </Typography>
                )}
              </Box>
            </>

            <Box sx={{ marginTop: '40px', display: 'flex', width: 'full', gap: '10px' }}>
              <Button
                onClick={handleSubmit(onSubmit)}
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
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default LoginPage;
