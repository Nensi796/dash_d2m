import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller, get } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  OutlinedInput,
  FormControlLabel,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  TableCell,
  tableCellClasses,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import PhoneInput from 'react-phone-input-2';
import { SearchOutlined, Close as CloseIcon } from '@mui/icons-material';
import { Typography } from '@components';
import Breadcrumbs from '../Breadcrumb';
import ADD_CLIENT from '@graphql/schema/mutation/addClient.graphql';
import LIST_USERS from '@graphql/schema/listUsers.graphql';
import { useMutation, useQuery } from '@apollo/client';
import { handleGraphqlError, showToast } from '@utils';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { IClientInputs } from '@types';
import ALL_OFFICES from '@graphql/schema/getAllOffice.graphql';

const StyledTableCell = styled(TableCell)(({}) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: '1px solid #2B388C',
    color: '#2B388C',
    fontSize: '12 !important',
    fontWeight: '500 !important',
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: '0',
    fontSize: '12 !important',
    fontWeight: 400,
    color: '#111111',
  },
}));

const MortgageTypeData = [
  'But To Let Remortgage',
  'Purchase',
  'Remortgage',
  'Right To Buy',
  'Buy To Let',
  'Limited Company Buy To Let',
  'Let To Buy',
  'HMO',
];

const TableColumns = ['#', 'Product Type', 'Description', 'Renewal Date', ' '];
const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
  {
    pathName: '/clients',
    routeName: 'Clients',
  },
  {
    pathName: '/newclient',
    routeName: 'New Client',
  },
];

interface IAddRow {
  id: number;
  type: string;
  description: string;
  renewalDate: string;
}

export default function NewClient() {
  const router = useRouter();
  const [rows, setRows] = useState<IAddRow[]>([]);
  const [disable, setDisable] = React.useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showTableHeader, setShowTableHeader] = useState(false);
  const [addClient] = useMutation(ADD_CLIENT);
  const { loading, data: AllOffices } = useQuery(ALL_OFFICES);
  const { data: listUsers } = useQuery(LIST_USERS, {
    fetchPolicy: 'network-only',
  });
  const allOffices = get(AllOffices, 'getAllOffices', []).nodes;
  const Users = listUsers?.listUsers?.nodes;
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IClientInputs>({
    defaultValues: { birthDate: '', dob: '', num: '', advisor: '' },
  });

  const handleAddNew = () => {
    setIsSaved(false);
    setShowTableHeader(true);
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        type: '',
        renewalDate: '',
        description: '',
      },
    ]);
    setDisable(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    // setIsSaved(true);
    const { name, value } = e.target;
    const list: any = [...rows];
    list[index][name] = value;
    console.log('test onChange', rows);
    setRows(list);
    setDisable(true);
  };
  const handleRemove = (id: number) => {
    const updatedUsers = rows.filter((user, idx) => idx !== id);
    setRows(updatedUsers);
    setDisable(false);
  };

  const onSubmit = async (list: IClientInputs) => {
    await addClient({
      variables: {
        input: {
          admin: list?.admin,
          adviser: list?.advisor,
          applicants: '',
          correspondence: {
            countryCode: '+91',
            email: list?.email,
            dob: list?.dob,
            fullName: list?.fname,
            phoneNumber: `+${list?.num}`,
            postCode: list?.pin,
          },
          dob: list?.birthDate,
          fullName: list?.name,
          mortgageProperty: [
            {
              rerPaymentMethod: list?.repaymentMethod,
              term: list?.term,
              purchasePrice: list?.purchasePrice,
              propertyNumber: list?.propertyNumber,
              postCode: list?.ePin,
              nextRenewalDate: list?.nextDate,
              lenderAccountNumber: list?.lAccountNumber,
              lender: list?.lender,
              amountRequired: parseInt((list?.amountRequired as string) || '') as number,
              additionalProducts: rows.map((obj: IAddRow) => {
                // @ts-ignore
                delete obj.id;
                return obj;
              }),
            },
          ],
          solicitorDetails: {
            fullName: list?.fullName_solicitor,
            email: list?.email_solicitor,
            countryCode: '+91',
            phoneNumber: `+${list?.phone_solicitor}`,
          },
          mortgageType: list?.MortgageTypeData,
          officeId: list?.officeId,
        },
      },
    })
      .then(() => {
        showToast('Client data added successfully');
        router.push('/clients');
      })
      .catch(handleGraphqlError);
    // reset();
  };

  return (
    <>
      <Box
        sx={{
          paddingY: '15px',
          paddingX: '40px',
          '& .error': {
            color: '#FF3D3D',
          },
        }}>
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
              router.push('/clients');
            }}>
            Back
          </Button>
          <Breadcrumbs
            routeList={breadcrumbList}
            onClick={(pathName: string | undefined) => router.push(pathName || '/')}
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
              New Client
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{
                textTransform: 'Capitalize',
                backgroundColor: '#33AC2E !important',
                height: '44px',
              }}>
              Save Application
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
                  Client Details
                </Box>
                <Divider color="#2B388C" />
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Full Name
                  </label>
                  <OutlinedInput
                    {...register('name', { required: 'name is required' })}
                    placeholder="Please enter text"
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
                    Date of Birth
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="birthDate"
                      control={control}
                      rules={{ required: 'BirthDate is required' }}
                      render={({ field: { value, onChange } }) => (
                        <DesktopDatePicker
                          value={value}
                          onChange={onChange}
                          sx={{
                            height: '40px',
                            background: 'rgba(224, 231, 255, 0.2)',
                            border: '2px solid #E0E7FF',
                            '& .MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
                            '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(224, 231, 255, 0.2) !important',
                            },
                            '& input': { height: '8px', paddingX: '10px' },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>{' '}
                  {errors.birthDate && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {' '}
                      {errors.birthDate?.message}{' '}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Box
                    sx={{
                      color: '#2B388C',
                      fontSize: '16px',
                      fontWeight: 400,
                      paddingBottom: '8px',
                    }}>
                    Correspondence / Current Address
                  </Box>
                  <Divider color="#2B388C" />
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Full Name
                    </label>
                    <OutlinedInput
                      {...register('fname', { required: 'Full name is required' })}
                      placeholder="Please enter text"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.fname && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.fname?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      marginTop: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Date of Birth
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="dob"
                        control={control}
                        rules={{ required: 'BirthDate is required' }}
                        render={({ field: { onChange, value } }) => (
                          <DesktopDatePicker
                            value={value}
                            onChange={onChange}
                            sx={{
                              height: '40px',
                              background: 'rgba(224, 231, 255, 0.2)',
                              border: '2px solid #E0E7FF',
                              '& .MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
                              '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(224, 231, 255, 0.2) !important',
                              },
                              '& input': { height: '8px', paddingX: '10px' },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>{' '}
                    {errors.dob && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.dob?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Enter Pincode
                    </label>
                    <TextField
                      type="number"
                      {...register('pin', { required: 'pinCode is require' })}
                      placeholder="Search Keywords"
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
                    {errors.pin && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.pin?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Telephone Number
                    </label>
                    <Controller
                      name="num"
                      control={control}
                      rules={{ required: 'Telephone number is require' }}
                      render={({ field: { onChange, value } }) => (
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

                    {errors.num && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.num?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Email Address
                    </label>
                    <OutlinedInput
                      {...register('email', { required: 'Enter Email address' })}
                      placeholder="Please enter text"
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
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Box
                    sx={{
                      color: '#2B388C',
                      fontSize: '16px',
                      fontWeight: 400,
                      paddingBottom: '8px',
                    }}>
                    Mortgage type
                  </Box>
                  <Divider color="#2B388C" />
                  <Box>
                    <Controller
                      name="MortgageTypeData"
                      control={control}
                      rules={{ required: 'Please select one mortgage type' }}
                      render={({ field: { onChange, value } }: any) => (
                        <RadioGroup
                          sx={{ flexDirection: 'column' }}
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          value={value}
                          onChange={onChange}>
                          {MortgageTypeData.map((item, index) => {
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
                      )}
                    />
                    {errors.MortgageTypeData && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.MortgageTypeData?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Box
                  sx={{
                    color: '#2B388C',
                    fontSize: '16px',
                    fontWeight: 400,
                    paddingBottom: '8px',
                  }}>
                  {' '}
                  Advisor Details
                </Box>
                <Divider color="#2B388C" />
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Advisor
                  </label>
                  <Controller
                    name="advisor"
                    control={control}
                    rules={{ required: 'Adviser is required' }}
                    render={({ field: { onChange, value } }: any) => (
                      <Select
                        name="advisor"
                        sx={{
                          height: '40px',
                          background: 'rgba(224, 231, 255, 0.2)',
                          border: '2px solid #E0E7FF',
                          '& .MuiPopover-paper': {
                            background: '#EAEAEF',
                          },
                        }}
                        onChange={onChange}
                        value={value}>
                        {!loading &&
                          Users?.length &&
                          Users.filter((item: any) => {
                            return item.role === 'ADVISER';
                          }).map((tag: any, i: number) => (
                            <MenuItem key={i} value={tag?.id}>
                              <ListItemText primary={tag?.name} />
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.advisor && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {' '}
                      {errors.advisor?.message}{' '}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Admin
                  </label>
                  <Controller
                    name="admin"
                    control={control}
                    rules={{ required: 'Admin is required' }}
                    render={({ field: { onChange, value } }: any) => (
                      <Select
                        name="admin"
                        sx={{
                          height: '40px',
                          background: 'rgba(224, 231, 255, 0.2)',
                          border: '2px solid #E0E7FF',
                          '& .MuiPopover-paper': {
                            background: '#EAEAEF',
                          },
                        }}
                        onChange={onChange}
                        value={value}>
                        {!loading &&
                          Users?.length &&
                          Users.filter((item: any) => {
                            return item.role === 'ADMIN';
                          }).map((tag: any, i: number) => (
                            <MenuItem key={i} value={tag?.id}>
                              <ListItemText primary={tag?.name} />
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.admin && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {' '}
                      {errors.admin?.message}{' '}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Office
                  </label>
                  <Controller
                    name="officeId"
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
                  {errors.officeId && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {' '}
                      {errors.officeId?.message}{' '}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Box
                    sx={{
                      color: '#2B388C',
                      fontSize: '16px',
                      fontWeight: 400,
                      paddingBottom: '8px',
                    }}>
                    Solicitor Details (Optional)
                  </Box>
                  <Divider color="#2B388C" />
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Full Name
                    </label>
                    <OutlinedInput
                      {...register('fullName_solicitor', { required: 'FullName is required' })}
                      placeholder="Please enter text"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.fullName_solicitor && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.fullName_solicitor?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Email Address
                    </label>
                    <OutlinedInput
                      placeholder="Please Email"
                      {...register('email_solicitor', {
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
                    {errors.email_solicitor && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.email_solicitor?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Telephone Number
                    </label>
                    <Controller
                      name="phone_solicitor"
                      control={control}
                      rules={{ required: 'Telephone number is required' }}
                      render={({ field: { onChange } }: any) => (
                        <PhoneInput
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
                    {errors.phone_solicitor && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.phone_solicitor?.message}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                  <Box
                    sx={{
                      color: '#2B388C',
                      fontSize: '16px',
                      fontWeight: 400,
                      paddingBottom: '8px',
                    }}>
                    Mortgage Property
                  </Box>
                  <Divider color="#2B388C" />
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Property Number
                    </label>
                    <OutlinedInput
                      {...register('propertyNumber', { required: 'Property Number is required' })}
                      placeholder="Property Number"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.propertyNumber && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.propertyNumber?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Enter Postcode
                    </label>{' '}
                    <TextField
                      type="number"
                      {...register('ePin', { required: 'pinCode is require' })}
                      placeholder="Search Keywords"
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
                    {errors.ePin && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.ePin?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Purchase price
                    </label>
                    <OutlinedInput
                      {...register('purchasePrice', { required: 'price is require' })}
                      placeholder="Purchase price"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.purchasePrice && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.purchasePrice?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Term
                    </label>
                    <OutlinedInput
                      {...register('term', { required: 'data is require' })}
                      placeholder="Term"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />

                    {errors.term && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.term?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Rerpayment Method
                    </label>
                    <OutlinedInput
                      {...register('repaymentMethod', { required: 'Purchase price is required' })}
                      placeholder="Rerpayment Method "
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.repaymentMethod && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.repaymentMethod?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Lender Account Number
                    </label>
                    <OutlinedInput
                      {...register('lAccountNumber', { required: 'Lender Account Number' })}
                      placeholder="Lender Account Number"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.lAccountNumber && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.lAccountNumber?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Amount Required
                    </label>
                    <OutlinedInput
                      {...register('amountRequired', { required: 'amount is required' })}
                      placeholder="Amount Required"
                      type="number"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.amountRequired && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {' '}
                        {errors.amountRequired?.message}{' '}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Lender
                    </label>
                    <OutlinedInput
                      {...register('lender', { required: 'lender is required' })}
                      placeholder="Lender"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.lender && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.lender?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Next renewal Date
                    </label>
                    <OutlinedInput
                      {...register('nextDate', { required: 'Next date is required' })}
                      placeholder="Next renewal Date"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.nextDate && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.nextDate?.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '40px' }}>
                    <Box
                      sx={{
                        color: '#2B388C',
                        fontSize: '16px',
                        fontWeight: 400,
                        paddingBottom: '8px',
                      }}>
                      Additional Products
                    </Box>
                    <Divider color="#2B388C" />
                    <Box
                      sx={{
                        marginTop: '24px',
                        padding: '24px 16px',
                        background: 'rgba(46, 91, 255, 0.08)',
                      }}>
                      {' '}
                      <Typography
                        text="List Of Additional Products taken"
                        color="#111111"
                        fontWeight={400}
                        fontSize="14px"
                      />
                      <Box
                        sx={{
                          '& .MuiButton-root': { padding: 0 },
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '10px',
                        }}>
                        {' '}
                        <Button
                          onClick={() => handleAddNew()}
                          variant="outlined"
                          sx={{
                            border: '2px solid #2E5BFF !important',
                            width: '80px',
                            color: '#2E5BFF',
                            fontWeight: '900',
                            fontSize: '12px',
                            textTransform: 'Capitalize',
                          }}>
                          Add New
                        </Button>
                        {disable && (
                          <Button
                            onClick={() => {
                              setDisable(false);
                              setIsSaved(!isSaved);
                            }}
                            variant="outlined"
                            sx={{
                              border: '2px solid #2E5BFF !important',
                              width: '80px',
                              color: '#2E5BFF',
                              fontWeight: '900',
                              fontSize: '12px',
                              textTransform: 'Capitalize',
                            }}>
                            Edit
                          </Button>
                        )}
                      </Box>
                      <Box>
                        <TableContainer>
                          <Table aria-label="a dense table">
                            {showTableHeader && (
                              <TableHead>
                                <TableRow>
                                  {TableColumns.map((item, index) => (
                                    <StyledTableCell key={index}>{item}</StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                            )}
                            {isSaved ? (
                              <TableBody>
                                {rows.map((row, index) => {
                                  return (
                                    <TableRow
                                      key={index}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                      <StyledTableCell
                                        align="left"
                                        sx={{
                                          color: '#2E5BFF !important',
                                          textDecoration: 'underline',
                                        }}>
                                        {row.type}
                                      </StyledTableCell>
                                      <StyledTableCell align="left">
                                        {row.description}
                                      </StyledTableCell>
                                      <StyledTableCell align="left">
                                        {row.renewalDate}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <Box sx={{ display: 'flex', alignItem: 'center' }}>
                                          <CloseIcon
                                            sx={{ color: '#FF3D3D' }}
                                            onClick={() => handleRemove(index)}
                                          />
                                        </Box>
                                      </StyledTableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            ) : (
                              <TableBody>
                                {rows.map((row, index) => {
                                  return (
                                    <TableRow
                                      key={index}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                      <StyledTableCell
                                        align="left"
                                        sx={{
                                          color: '#2E5BFF !important',
                                          textDecoration: 'underline',
                                        }}>
                                        <OutlinedInput
                                          placeholder="Product Type"
                                          sx={{
                                            height: '25px',
                                            background: '#E0E7FF33',
                                            border: '2px solid #E0E7FF',
                                            '& input': { paddingX: '10px' },
                                          }}
                                          value={row.type}
                                          name="type"
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e, index)
                                          }
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell align="left">
                                        {' '}
                                        <OutlinedInput
                                          placeholder="Description"
                                          sx={{
                                            height: '25px',
                                            background: '#E0E7FF33',
                                            border: '2px solid #E0E7FF',
                                            '& input': { paddingX: '10px' },
                                          }}
                                          value={row.description}
                                          name="description"
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e, index)
                                          }
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell align="left">
                                        {' '}
                                        <OutlinedInput
                                          placeholder="Renewal Date"
                                          sx={{
                                            height: '25px',
                                            background: '#E0E7FF33',
                                            border: '2px solid #E0E7FF',
                                            '& input': { paddingX: '10px' },
                                          }}
                                          value={row.renewalDate}
                                          name="renewalDate"
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e, index)
                                          }
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {' '}
                                        <Box sx={{ display: 'flex', alignItem: 'center' }}>
                                          <CloseIcon
                                            sx={{ color: '#FF3D3D' }}
                                            onClick={() => handleRemove(index)}
                                          />
                                        </Box>
                                      </StyledTableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            )}
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
