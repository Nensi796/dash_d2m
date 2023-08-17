import { Box, Button, buttonClasses, OutlinedInput, Typography } from '@mui/material';

import React from 'react';
import { useForm } from 'react-hook-form';
import { handleGraphqlError, showToast } from '@utils';
import { useMutation } from '@apollo/client';
import VERIFY_OTP from '@graphql/schema/mutation/otpVerification.graphql';
import VERIFY_TOKEN from '@graphql/schema/mutation/verifySignupToken.graphql';
import { IUserDetails } from '@components/Login/Login';
import { setCookies } from 'cookies-next';
interface IVerifyOTP {
  login: boolean;
  userData: IUserDetails;
}
interface IFormInputs {
  code: string;
}
export const VerifyOtp = ({ login, userData }: IVerifyOTP) => {
  console.log(userData);
  const [verifyOtp] = useMutation(VERIFY_OTP);
  const [verifySignupToken] = useMutation(VERIFY_TOKEN);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    if (login && (data as IFormInputs)) {
      verifyOtp({
        variables: {
          userId: userData.id,
          code: data.code,
        },
      })
        .then(async (res) => {
          localStorage.setItem('token', res.data.verifyOtp.token);
          setCookies('token', res.data.verifyOtp.token);
          verifySignupToken({
            variables: {
              input: { token: localStorage.getItem('token') },
            },
          }).then(async () => {
            showToast('User Login added successfully');
            window.location.href = window.location.origin;
          });
        })
        .catch(handleGraphqlError);
    }
  };
  console.log(userData);
  return (
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
      <Typography sx={{ fontSize: '32px', color: '#2B388C' }}>OTP Verification</Typography>
      <Typography
        sx={{
          fontSize: '16px',
          color: '#2B388C',
          lineHeight: '40px',
          minWidth: '320px',
          fontWeight: 600,
        }}>
        <>
          <p>
            {' '}
            {`OTP has been sent to ${userData?.phoneNumber.slice(
              0,
              3,
            )}********${userData?.phoneNumber.slice(-2)}`}
          </p>
          <p>Please enter the OTP in the field below. </p>
        </>
      </Typography>
      <>
        <Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>OTP Code</label>
          <OutlinedInput
            {...register('code', { required: 'Code is required' })}
            sx={{
              height: '40px',
              background: 'rgba(224, 231, 255, 0.2);',
              border: '2px solid #E0E7FF',
              '& input': { paddingX: '10px' },
            }}
          />
          {errors?.code && (
            <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
              {errors?.code?.message}
            </Typography>
          )}
          <Typography sx={{ fontSize: '12px', color: '#2E5BFF', marginTop: '15px' }}>
            Resend OTP
          </Typography>
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
          Log In
        </Button>
      </Box>
    </Box>
  );
};
