import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Close as CloseIcon, SearchOutlined } from '@mui/icons-material';
import {
  ApplicantModal,
  AddPropertyModal,
  DeletePropertyModal,
  DefaultMortgageModal,
  ResetPasswordModal,
  SearchModal,
} from '@components/Modals';
import { IFormInputsClient, IGetClientDetails } from '@types';
import dayjs from 'dayjs';
import UPDATE_CLIENT_RECORD from '@graphql/schema/mutation/updateClient.graphql';
import { useMutation } from '@apollo/client';
import { handleGraphqlError, showToast } from '@utils';

export const SEARCH_STATUS_OPTIONS = [
  'Application 1',
  'Application 2',
  'Application 3',
  'Application 4',
];

const MortgageTypeData = [
  'Buy',
  'But To Let Remortgage',
  'Purchase',
  'Remortgage',
  'Right To Buy',
  'Buy To Let',
  'Limited Company Buy To Let',
  'Let To Buy',
  'HMO',
];
const TableColumns = ['#', 'Product Type', 'Description', 'Renewal date', ''];

interface IEditClientProps {
  setIsEditClient: Dispatch<SetStateAction<boolean>>;
  clientData: IGetClientDetails;
}
interface IAddRow {
  id: number;
  type: string;
  description: string;
  renewalDate: string;
}

export interface IAdditionalRecord {
  __typename: string;
  type: string;
  description: string;
  renewalDate: string;
}

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

const EditClients = ({ clientData, setIsEditClient }: IEditClientProps) => {
  const [rows, setRows] = useState<IAddRow[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [disable, setDisable] = React.useState(false);
  const [openApplicantModal, setOpenApplicantModal] = useState(false);
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openDeletePropertyModal, setOpenDeletePropertyModal] = useState(false);
  const [openDefaultMortgageModal, setOpenDefaultMortgageModal] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [updateClient] = useMutation(UPDATE_CLIENT_RECORD);

  const handleAddNew = () => {
    setIsEdit(false);
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        type: '',
        description: '',
        renewalDate: '',
      },
    ]);
    setDisable(true);
  };
  const handleRemove = (id: number) => {
    const updatedUsers = rows.filter((user, idx) => idx !== id);
    setRows(updatedUsers);
    setDisable(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list: any = [...rows];
    list[index][name] = value;

    setRows(list);
    setDisable(true);
  };

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputsClient>();

  useEffect(() => {
    const data = clientData?.mortgageProperty.map((item: any) => {
      return item;
    });

    const additionalRecord = data.map((ele) => ele?.additionalProducts);

    if (additionalRecord[0]) {
      let list: IAddRow[] = [];
      additionalRecord[0].map((v: IAdditionalRecord, index: number) => {
        list.push({
          id: index + 1,
          type: v?.type,
          description: v?.description,
          renewalDate: v?.renewalDate,
        });
      });
      setRows(list);
    }

    reset({
      fullName_applicant: clientData?.fullName,
      email_applicant: clientData?.correspondence?.email,
      phone_applicant: clientData?.correspondence?.phoneNumber,
      date: dayjs(clientData?.correspondence?.dob).format('MM/DD/YYYY'),
      pinCode_applicant: clientData?.correspondence?.postCode,
      mortgageType: clientData?.mortgageType,
      fullName_solicitor: 'sfsfdfdf',
      email_solicitor: 'sasa@gamil.com',
      phone_solicitor: '+915454564461',
      office: clientData?.officeId,
      adviser: clientData?.adviser,
      admin: clientData?.admin,
      property: data?.[0]?.propertyNumber,
      acc_num: data?.[0]?.lenderAccountNumber,
      price: data?.[0]?.purchasePrice,
      term: data?.[0]?.term,
      rerpayment_method: data?.[0]?.rerPaymentMethod,
      pinCode_mortgage: data?.[0]?.postCode,
      amount: data?.[0]?.amountRequired,
      lender: data?.[0]?.lender,
      next_renewal_date: data?.[0]?.nextRenewalDate,
    });
  }, [setIsEditClient, clientData]);

  console.log('clientDAta', clientData);
  const onSubmit = (data: IFormInputsClient) => {
    console.log(data);
    updateClient({
      variables: {
        input: {
          id: clientData.id,
          fullName: data?.fullName_applicant,
          dob: data?.date,
          correspondence: {
            postCode: data?.pinCode_applicant,
            dob: data?.date,
            fullName: data?.fullName_solicitor,
            email: data?.email_applicant,
            phoneNumber: data?.phone_applicant,
            countryCode: '+91',
          },
          mortgageType: data?.mortgageType,
          adviser: data?.adviser,
          officeId: data?.office,
          admin: data?.admin,
          mortgageProperty: {
            propertyNumber: data?.property,
            purchasePrice: data?.price,
            postCode: data?.pinCode_mortgage,
            term: data?.term,
            rerPaymentMethod: data?.rerpayment_method,
            lender: data?.lender,
            lenderAccountNumber: data?.acc_num,
            nextRenewalDate: data?.next_renewal_date,
            amountRequired: data?.amount,
            additionalProducts: [],
          },
          applicants: 'null',
        },
      },
    })
      .then(() => {
        showToast('Client updated successfully');
      })
      .catch(handleGraphqlError);
    // reset();
    // setIsEditClient(false);
  };

  return (
    <Box sx={{ paddingY: '15px' }}>
      <SearchModal
        title="Search Input"
        openSearchModal={openSearchModal}
        setOpenSearchModal={setOpenSearchModal}
      />
      <ApplicantModal
        openApplicantModal={openApplicantModal}
        setOpenApplicantModal={setOpenApplicantModal}
      />
      <AddPropertyModal
        openPropertyModal={openPropertyModal}
        setOpenPropertyModal={setOpenPropertyModal}
      />
      <DeletePropertyModal
        openDeletePropertyModal={openDeletePropertyModal}
        setOpenDeletePropertyModal={setOpenDeletePropertyModal}
      />
      <DefaultMortgageModal
        openDefaultMortgageModal={openDefaultMortgageModal}
        setOpenDefaultMortgageModal={setOpenDefaultMortgageModal}
      />
      <ResetPasswordModal
        openResetPasswordModal={openResetPasswordModal}
        setOpenResetPasswordModal={setOpenResetPasswordModal}
      />
      <form>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& .MuiButtonBase-root-MuiButton-root': {
              background: '#33AC2E',
              fontWeight: 800,
              fontSize: '16px',
            },
            '& .MuiButtonBase-root-MuiButton-root:hover': { background: '#33AC2E' },
          }}>
          <Box sx={{ fontSize: '24px', color: '#2B388C', fontWeight: '400', marginY: '20px' }}>
            {clientData?.fullName}
          </Box>
          <Button
            variant="contained"
            sx={{ textTransform: 'Capitalize', backgroundColor: '#33AC2E !important' }}
            onClick={handleSubmit(onSubmit)}>
            Save Application
          </Button>
        </Box>
        <Box sx={{ background: '#FFFFFF', width: '100%', height: '100%', marginY: '20px' }}>
          <Box sx={{ display: 'flex', padding: '20px', gap: '20px' }}>
            <Box sx={{ width: '50%' }}>
              <Box
                sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
                Applicants
              </Box>
              <Divider color="#2B388C" />
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Select Applicant
                </label>
                <Controller
                  name="applicant"
                  control={control}
                  rules={{ required: 'Applicant is required' }}
                  render={({ field: { onChange, value } }: any) => (
                    <Select
                      sx={{
                        borderRadius: '4px',
                        fontSize: '1rem',
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#323232',
                          borderWidth: '1px',
                        },
                        '& .css-monmjk-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
                          {
                            height: '18px',
                            minHeight: '0.4375rem',
                          },
                      }}
                      labelId="demo-select-small"
                      title="Select status type"
                      id="demo-select-small"
                      value={value}
                      onChange={onChange}>
                      {Object.values(SEARCH_STATUS_OPTIONS).map((value: string) => (
                        <MenuItem value={value} key={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.applicant && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.applicant?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', width: 'full', gap: '10px' }}>
                <Button
                  onClick={() => setOpenApplicantModal(true)}
                  sx={{
                    textTransform: 'capitalize',
                    height: '24px',
                    width: '50%',
                    color: '#2E5BFF',
                    border: '2px solid #2E5BFF',
                    fontWeight: 700,
                  }}
                  variant="outlined">
                  Add New Application
                </Button>
                <Button
                  onClick={() => setOpenSearchModal(true)}
                  sx={{
                    textTransform: 'capitalize',
                    height: '24px',
                    width: '40%',
                    color: '#2E5BFF',
                    border: '2px solid #2E5BFF !important',
                    fontWeight: 700,
                  }}
                  variant="outlined">
                  Add from Client
                </Button>
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Full Name
                </label>
                <OutlinedInput
                  {...register('fullName_applicant', { required: 'FullName is required' })}
                  placeholder="Please enter text"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.fullName_applicant && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.fullName_applicant?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Email Address
                </label>
                <OutlinedInput
                  placeholder="Please Email"
                  {...register('email_applicant', {
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
                {errors.email_applicant && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.email_applicant?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', width: 'full' }}>
                <Button
                  onClick={() => setOpenResetPasswordModal(true)}
                  sx={{
                    textTransform: 'capitalize',
                    height: '24px',
                    width: '100%',
                    color: '#2E5BFF',
                    border: '2px solid #2E5BFF',
                    fontWeight: 700,
                  }}
                  variant="outlined">
                  Reset Password Email
                </Button>
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Telephone Number
                </label>
                <Controller
                  name="phone_applicant"
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
                {errors.phone_applicant && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.phone_applicant?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Date of Birth
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Date of Birth is required' }}
                    render={({ field: { onChange, value } }: any) => {
                      console.log('====', value);
                      return (
                        <DesktopDatePicker
                          value={value}
                          onChange={onChange}
                          defaultValue={dayjs(clientData?.correspondence?.dob)}
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
                      );
                    }}
                  />
                </LocalizationProvider>{' '}
                {errors.date && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.date?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Enter Pincode
                </label>
                <TextField
                  placeholder="Search Keywords"
                  {...register('pinCode_applicant', { required: 'PinCode is required' })}
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
                {errors.pinCode_applicant && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.pinCode_applicant?.message}
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
                  Mortgage type
                </Box>
                <Divider color="#2B388C" />
                <Box>
                  <Controller
                    name="mortgageType"
                    control={control}
                    rules={{ required: 'Please select one mortgage type' }}
                    render={({ field: { onChange, value } }: any) => (
                      <RadioGroup
                        sx={{ flexDirection: 'column' }}
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        defaultValue={clientData?.mortgageType}
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
                  {errors.mortgageType && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.mortgageType?.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: '50%' }}>
              <Box>
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
                    name="adviser"
                    control={control}
                    rules={{ required: 'select adviser' }}
                    render={({ field: { onChange, value } }: any) => (
                      <Autocomplete
                        value={value}
                        size="small"
                        title="Select status type"
                        sx={{
                          borderRadius: '4px',
                          fontSize: '1rem',
                          height: '40px',
                          background: 'rgba(224, 231, 255, 0.2)',
                          border: '2px solid #E0E7FF',
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#323232',
                            borderWidth: '1px',
                          },
                          '& .css-monmjk-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
                            {
                              height: '18px',
                              minHeight: '0.4375rem',
                            },
                        }}
                        onChange={(e, item) => {
                          onChange(item);
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={SEARCH_STATUS_OPTIONS}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                  {errors.adviser && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {' '}
                      {errors.adviser?.message}{' '}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Admin
                  </label>
                  <OutlinedInput
                    {...register('admin', { required: 'Data is required' })}
                    placeholder="Tracy Cooper"
                    sx={{
                      height: '40px',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      '& input': { paddingX: '10px' },
                    }}
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
                  <OutlinedInput
                    {...register('office', { required: 'office details is require' })}
                    placeholder="Sale"
                    sx={{
                      height: '40px',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      '& input': { paddingX: '10px' },
                    }}
                  />
                  {errors.office && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {' '}
                      {errors.office?.message}{' '}
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
                  {errors.phone_solicitor && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.phone_solicitor?.message}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  color: '#2B388C',
                  fontSize: '16px',
                  fontWeight: 400,
                  paddingBottom: '8px',
                  marginTop: '40px',
                }}>
                Mortgage Property
              </Box>
              <Divider color="#2B388C" />
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Select Property
                </label>
                <OutlinedInput
                  {...register('property', { required: 'Property is required' })}
                  placeholder="Tracy Cooper"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.property && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.property?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', width: 'full', gap: '10px' }}>
                <Button
                  onClick={() => setOpenPropertyModal(true)}
                  sx={{
                    textTransform: 'capitalize',
                    height: '24px',
                    width: '40%',
                    color: '#2E5BFF',
                    border: '2px solid #2E5BFF !important',
                    fontWeight: 700,
                  }}
                  variant="outlined">
                  Add New Property
                </Button>
                <Button
                  onClick={() => setOpenDeletePropertyModal(true)}
                  sx={{
                    textTransform: 'capitalize',
                    height: '24px',
                    width: '40%',
                    color: '#FF3D3D',
                    border: '2px solid #FF3D3D !important',
                    fontWeight: 700,
                  }}
                  variant="outlined">
                  Delete Property
                </Button>
                <Button
                  onClick={() => setOpenDefaultMortgageModal(true)}
                  sx={{
                    textTransform: 'capitalize',
                    height: '24px',
                    width: '40%',
                    color: '#2E5BFF',
                    border: '2px solid #2E5BFF !important',
                    fontWeight: 700,
                  }}
                  variant="outlined">
                  Set Mortgage as Default
                </Button>
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Lender Account Number
                </label>
                <OutlinedInput
                  {...register('acc_num', { required: 'Lender account number is required' })}
                  placeholder="Lender Account Number"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.acc_num && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.acc_num?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Purchase price
                </label>
                <OutlinedInput
                  {...register('price', { required: 'Purchase price is required' })}
                  placeholder="Purchase price"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.price && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.price?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Term
                </label>
                <OutlinedInput
                  {...register('term', { required: 'Term is required' })}
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
                    {errors.term?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Rerpayment Method
                </label>
                <OutlinedInput
                  placeholder="Rerpayment Method "
                  {...register('rerpayment_method', { required: 'Rerpayment Method is required' })}
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.rerpayment_method && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.rerpayment_method?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Enter Pincode
                </label>
                <TextField
                  placeholder="Search Keywords"
                  {...register('pinCode_mortgage', { required: 'PinCode is required' })}
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
                {errors.pinCode_mortgage && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.pinCode_mortgage?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Amount Required
                </label>
                <OutlinedInput
                  {...register('amount', { required: 'Amount is required' })}
                  placeholder="Amount Required"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.amount && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.amount?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Lender
                </label>
                <OutlinedInput
                  {...register('lender', { required: 'Lender is required' })}
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
                  {...register('next_renewal_date', { required: 'Next renewal Date is required' })}
                  placeholder="Next renewal Date"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.next_renewal_date && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.next_renewal_date?.message}
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
                  <Typography sx={{ color: '#111111', fontWeight: 400, fontSize: '14px' }}>
                    List Of Additional Products taken
                  </Typography>
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
                          setIsEdit(!isEdit);
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
                        <TableHead>
                          <TableRow>
                            {TableColumns.map((item, index) => (
                              <StyledTableCell key={index}>{item}</StyledTableCell>
                            ))}{' '}
                          </TableRow>
                        </TableHead>
                        {isEdit ? (
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
                                  <StyledTableCell align="left"> {row.description}</StyledTableCell>
                                  <StyledTableCell align="left"> {row.renewalDate}</StyledTableCell>
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
      </form>
    </Box>
  );
};

export default EditClients;
