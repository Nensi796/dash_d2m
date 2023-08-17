import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  OutlinedInput,
  Select,
  MenuItem,
  ListItemText,
} from '@mui/material';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import { Controller, get, useForm } from 'react-hook-form';
import { Typography } from '@components';
import { IStaffDetails } from '@types';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import ALL_OFFICES from '@graphql/schema/getAllOffice.graphql';
import CREATE_STAFF_MEMBER from '@graphql/schema/mutation/createStaffMember.graphql';
import GET_USER_BY_ID from '@graphql/schema/getUserById.graphql';
import UPDATE_STAFF_MEMBER from '@graphql/schema/mutation/updateStaffMember.graphql';
import { showToast } from '@utils/toast';
import { handleGraphqlError } from '@utils';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Loader from '@components/Loader';

const Role = ['ADVISER', 'ADMIN'];

const StaffDetails = () => {
  const router = useRouter();
  const { staffName } = router.query;

  const [createStaff] = useMutation(CREATE_STAFF_MEMBER);
  const [updateStaff] = useMutation(UPDATE_STAFF_MEMBER);

  const [getUser, { data: users, loading: userLoading }] = useLazyQuery(GET_USER_BY_ID);

  useEffect(() => {
    if (router.query.staffName) {
      getUser({ variables: { userId: router.query.staffName } });
    }
  }, [router.query.staffName]);
  const { loading, data: AllOffices } = useQuery(ALL_OFFICES);

  const allOffices = get(AllOffices, 'getAllOffices.nodes', []);

  const breadcrumbList = staffName
    ? [
        {
          pathName: '/',
          routeName: 'Home',
        },

        {
          pathName: `${users?.user?.name}`,
          routeName: `${users?.user?.name}`,
        },
      ]
    : [
        {
          pathName: '/',
          routeName: 'Home',
        },

        {
          pathName: '/newstaff',
          routeName: 'Add New Staff',
        },
      ];

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<IStaffDetails>({});

  useEffect(() => {
    if (!userLoading && !loading && users) {
      reset({
        name: users?.user.name,
        role: users?.user.role,
        phoneNumber: users?.user.phoneNumber,
        office: users?.user.officeId,
        email: users?.user?.email,
      });
    }
  }, [reset, users, router.query.staffName, userLoading, loading]);

  const onSubmit = (data: IStaffDetails) => {
    console.log('hello');
    if (!!router.query.staffName) {
      updateStaff({
        variables: {
          input: {
            id: router.query.staffName,
            name: data.name,
            countryCode: '91',
            phoneNumber: dirtyFields?.phoneNumber
              ? `+${data.phoneNumber}`
              : users?.user.phoneNumber,
            officeId: data?.office,
            role: data.role,
          },
        },
      }).then(() => showToast('Staff Updated SuccessFully'));
    } else
      createStaff({
        variables: {
          input: {
            countryCode: '91',
            email: data.email,
            name: data.name,
            officeId: data.office,
            phoneNumber: data.phoneNumber,
            role: data.role,
          },
        },
      })
        .then((res: any) => showToast(res?.data?.createStaffMember.successMessage))
        .catch(handleGraphqlError);

    reset();
  };

  return (
    <Box p={4}>
      {userLoading ? (
        <Loader isFullScreen />
      ) : (
        <Box sx={{ paddingY: '15px', paddingX: '40px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
            <Button
              variant="text"
              startIcon={<KeyboardArrowLeftIcon />}
              sx={{
                textTransform: 'Capitalize',
                fontWeight: 800,
                color: '#2E5BFF !important',
              }}
              onClick={() => {
                router.push('/');
              }}>
              Back
            </Button>
            <Breadcrumbs
              routeList={breadcrumbList}
              onClick={(pathName: string | undefined) => {
                router.push(pathName || '/');
              }}
            />
          </Box>

          <form>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Box sx={{ fontSize: '24px', color: '#2B388C', fontWeight: '400', marginY: '20px' }}>
                {staffName ? 'Edit Staff ' : 'Add New Staff'}
              </Box>
              <Button
                variant="contained"
                sx={{ background: '#33AC2E !important', textTransform: 'Capitalize' }}
                onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                '& .MuiButtonBase-root-MuiButton-root': {
                  background: '#33AC2E',
                  fontWeight: 800,
                  fontSize: '16px',
                },
                '& .MuiButtonBase-root-MuiButton-root:hover': { background: '#33AC2E' },
              }}></Box>

            <Box sx={{ background: '#FFFFFF', width: '100%', height: '100%', marginY: '20px' }}>
              <Box sx={{ display: 'flex', padding: '20px', gap: '20px' }}>
                <Box sx={{ width: '50%' }}>
                  <Box
                    sx={{
                      color: '#2B388C',
                      fontSize: '16px',
                      fontWeight: 400,
                      paddingBottom: '8px',
                    }}>
                    Staff Details
                  </Box>
                  <Divider color="#2B388C" />
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: 'Please select one mortgage type' }}
                      render={({ field: { onChange, value } }: any) => {
                        return (
                          <RadioGroup
                            sx={{ flexDirection: 'row' }}
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            defaultValue={users?.user?.role}
                            value={value}
                            onChange={onChange}>
                            {Role.map((item: string, index: number) => {
                              return (
                                <FormControlLabel
                                  key={index}
                                  value={item}
                                  control={<Radio />}
                                  label={item}
                                />
                              );
                            })}
                          </RadioGroup>
                        );
                      }}
                    />
                  </Box>
                  {errors.role && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.role?.message}
                    </Typography>
                  )}
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Adviser Name
                    </label>
                    <OutlinedInput
                      placeholder="Please enter Staff Name"
                      {...register('name', {
                        required: 'Adviser name is required',
                      })}
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.name && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.name?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Email Address
                    </label>
                    <OutlinedInput
                      disabled={!!router.query.staffName}
                      placeholder="Please enter email address"
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'invalid email address',
                        },
                      })}
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.email && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.email?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Telephone Number
                    </label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ required: 'Telephone number is required' }}
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
                        {errors.phoneNumber?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Adviser Photo
                    </label>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        '& input[type="file"]::file-selector-button': {
                          display: 'none',
                        },
                      }}>
                      <OutlinedInput
                        // ref={uploadRef}
                        id="contained-button-file"
                        type="file"
                        placeholder="Please enter Staff Name"
                        {...register('photo', {
                          required: 'Photo is required',
                          validate: {
                            lessThan10MB: (file) =>
                              file[0]?.size < 1000000 || 'Upload Image no bigger than 1MB',
                          },
                        })}
                        sx={{
                          width: '100%',
                          height: '40px',
                          background: 'rgba(224, 231, 255, 0.2)',
                          border: '2px solid #E0E7FF',
                          '& input': { paddingX: '10px' },
                        }}
                      />

                      <label htmlFor="contained-button-file">
                        <Button
                          sx={{
                            textTransform: 'capitalize',
                            height: '40px',
                            color: '#2E5BFF',
                            border: '2px solid #2E5BFF',
                            fontWeight: 700,
                          }}
                          variant="outlined"
                          component="span">
                          Upload
                        </Button>
                      </label>
                    </Box>
                    {errors.photo && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.photo?.message}
                      </Typography>
                    )}
                    <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                        Office
                      </label>
                      <Controller
                        name="office"
                        control={control}
                        rules={{ required: 'Adviser office is required' }}
                        render={({ field: { onChange, value } }: any) => (
                          <Select
                            name="office"
                            sx={{
                              height: '40px',
                              background: 'rgba(224, 231, 255, 0.2)',
                              border: '2px solid #E0E7FF',
                              '& .MuiPopover-paper': {
                                background: '#EAEAEF',
                              },
                            }}
                            defaultValue={users?.user?.officeId}
                            onChange={onChange}
                            value={value}>
                            {!loading &&
                              allOffices?.length &&
                              allOffices.map((tag: any, i: number) => (
                                <MenuItem key={i} value={tag?.id}>
                                  <ListItemText primary={tag?.name} />
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                      />
                      {errors.office && (
                        <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                          {errors.office?.message}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default StaffDetails;
