import {
  Box,
  Button,
  Divider,
  OutlinedInput,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import ADD_OFFICE from '@graphql/schema/mutation/addOffice.graphql';
import UPDATE_OFFICE from '@graphql/schema/mutation/updateOffice.graphql';
import GET_OFFICE_BY_ID from '@graphql/schema/getOfficeById.graphql';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import React, { useEffect } from 'react';
import { useForm, Controller, get } from 'react-hook-form';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import { SearchOutlined } from '@mui/icons-material';
import { handleGraphqlError, showToast } from '@utils';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface IFormInputsOffice {
  name: string;
  phoneNumber: string;
  postCode: string;
  address1: string;
  address2: string;
  address3: string;
}

const OfficeDetails = () => {
  const router = useRouter();
  const { officeName } = router.query;

  const { data: getOfficeById } = useQuery(GET_OFFICE_BY_ID, {
    fetchPolicy: 'network-only',
    variables: {
      officeId: officeName,
    },
  });

  const officeData = get(getOfficeById, 'getOfficeById.office', []);

  const [createOffice] = useMutation(ADD_OFFICE);
  const [updateOffice] = useMutation(UPDATE_OFFICE);

  const breadcrumbList = officeName
    ? [
        {
          pathName: '/',
          routeName: 'Home',
        },
        {
          pathName: '/administration ',
          routeName: 'Administration ',
        },
        {
          pathName: '/office',
          routeName: 'Office',
        },
        {
          pathName: `/${officeData?.name}`,
          routeName: `${officeData?.name}`,
        },
      ]
    : [
        {
          pathName: '/',
          routeName: 'Home',
        },
        {
          pathName: '/administration ',
          routeName: 'Administration ',
        },
        {
          pathName: '/office',
          routeName: 'Office',
        },
        {
          pathName: '/addNew',
          routeName: 'Add New Office',
        },
      ];

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputsOffice>({
    defaultValues: {
      name: '',
      address1: '',
      address2: '',
      phoneNumber: '',
      postCode: '',
      address3: '',
    },
  });
  useEffect(() => {
    reset({
      name: officeData?.name,
      address1: officeData?.address1,
      address2: officeData?.address2,
      phoneNumber: officeData?.phoneNumber,
      postCode: officeData?.postCode,
      address3: officeData?.address3,
    });
  }, [reset, officeData]);

  const onSubmit = (data: IFormInputsOffice) => {
    {
      officeName
        ? updateOffice({
            variables: {
              input: {
                id: officeName,
                address1: data.address1,
                address2: data.address2,
                name: data.name,
                phoneNumber: data.phoneNumber,
                postCode: data.postCode,
                address3: data.address3,
              },
            },
          })
            .then((res) => {
              showToast('office updated successfully');
              router.push('/office');
            })

            .catch(handleGraphqlError)
        : createOffice({
            variables: {
              input: {
                address1: data.address1,
                address2: data.address2,
                name: data.name,
                phoneNumber: data.phoneNumber,
                postCode: data.postCode,
                address3: data.address3,
              },
            },
          })
            .then((res) => showToast('office added successfully'))
            .catch(handleGraphqlError);
    }
    reset();
  };

  return (
    <Box p={4}>
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
              router.push('/office');
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
              {officeName ? 'Edit Office ' : 'Add New Office'}
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
                  Office Details
                </Box>
                <Divider color="#2B388C" />
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Office Name
                  </label>
                  <OutlinedInput
                    // value={officeName ? officeData?.name : ''}
                    placeholder="Please enter Office Name"
                    {...register('name', { required: 'Office is required' })}
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
                    Enter Postcode
                  </label>
                  <TextField
                    placeholder="Search for Address..."
                    // value={officeName ? officeData?.postCode : ''}
                    {...register('postCode', {
                      required: 'PinCode is required',
                      pattern: {
                        value: /^[0-9]*$/,
                        message: 'Enter only numeric value',
                      },
                    })}
                    sx={{
                      mr: 2,
                      color: '#8798AD',
                      borderRadius: '8px',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      height: '40px',
                      width: '100%',
                    }}
                    InputProps={{
                      sx: {
                        color: '#000000',
                        height: '40px',
                      },
                      startAdornment: (
                        <InputAdornment position="end">
                          <SearchOutlined sx={{ color: '#000000' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.postCode && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.postCode?.message}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Address Line 1
                    </label>
                    <TextField
                      // value={officeName ? officeData?.address1 : ''}
                      {...register('address1', { required: 'Address Line 1 is required' })}
                      sx={{
                        mr: 2,
                        color: '#8798AD',
                        borderRadius: '8px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        height: '40px',
                        width: '100%',
                      }}
                      InputProps={{
                        sx: {
                          color: '#000000',
                          height: '40px',
                        },
                      }}
                    />
                    {errors.address1 && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.address1?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Address Line 2
                    </label>
                    <TextField
                      // value={officeName ? officeData?.address2 : ''}
                      {...register('address2', { required: 'Address Line 2 is required' })}
                      sx={{
                        mr: 2,
                        color: '#8798AD',
                        borderRadius: '8px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        height: '40px',
                        width: '100%',
                      }}
                      InputProps={{
                        sx: {
                          color: '#000000',
                          height: '40px',
                        },
                      }}
                    />
                    {errors.address2 && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.address2?.message}
                      </Typography>
                    )}
                  </Box>{' '}
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Address Line 3
                    </label>
                    <TextField
                      // value={officeName ? officeData?.address3 : ''}
                      {...register('address3', { required: 'Address Line 3 is required' })}
                      sx={{
                        mr: 2,
                        color: '#8798AD',
                        borderRadius: '8px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        height: '40px',
                        width: '100%',
                      }}
                      InputProps={{
                        sx: {
                          color: '#000000',
                          height: '40px',
                        },
                      }}
                    />
                    {errors.address3 && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.address3?.message}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>{' '}
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default OfficeDetails;
