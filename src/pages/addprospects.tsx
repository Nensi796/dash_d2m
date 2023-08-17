import {
  Box,
  Button,
  RadioGroup,
  Radio,
  Divider,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller, get } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ADD_PROSPECT from '@graphql/schema/mutation/addProspect.graphql';

import {
  ApplicantModal,
  AddPropertyModal,
  DeletePropertyModal,
  DefaultMortgageModal,
  ResetPasswordModal,
} from '@components/Modals';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { handleGraphqlError, showToast } from '@utils';
import { IFormInputsProspect } from '@types';
import LIST_USERS from '@graphql/schema/listUsers.graphql';
import ALL_OFFICES from '@graphql/schema/getAllOffice.graphql';

export const SEARCH_STATUS_OPTIONS = {
  APPLICATION_1: 'Application 1',
  APPLICATION_2: 'Application 2',
  APPLICATION_3: 'Application 3',
  APPLICATION_4: 'Application 4',
};

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

const AddProspect = () => {
  const router = useRouter();

  const breadcrumbList = [
    {
      pathName: '/',
      routeName: 'Home',
    },
    {
      pathName: '/prospects',
      routeName: 'Prospects',
    },
    {
      pathName: `/addprospects`,
      routeName: 'New Prospect',
    },
  ];

  const [addProspect] = useMutation(ADD_PROSPECT);
  const [openApplicantModal, setOpenApplicantModal] = useState(false);
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openDeletePropertyModal, setOpenDeletePropertyModal] = useState(false);
  const [openDefaultMortgageModal, setOpenDefaultMortgageModal] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const { data: listUsers } = useQuery(LIST_USERS, {
    fetchPolicy: 'network-only',
  });
  const Users = listUsers?.listUsers?.nodes;

  const { loading, data: AllOffices } = useQuery(ALL_OFFICES);
  const allOffices = get(AllOffices, 'getAllOffices', []).nodes;

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputsProspect>({
    defaultValues: {
      date: '',
      phone_applicant: '',
      loan: '',
      interest_rate: '',
      adviser: '',
      adviser_id: '',
      admin: '',
    },
  });

  const onSubmit = async (data: IFormInputsProspect) => {
    console.log(data);
    await addProspect({
      variables: {
        input: {
          admin: data.admin,
          adviser: data.adviser,
          advisorID: parseInt('6454b104315aa11e08ac695a'),
          dob: data.date,
          postCode: data.pinCode_applicant,
          phoneNumber: `+${data.phone_applicant}`,
          officeId: data.office,
          mortgageType: data.mortgageType,
          mortgageDetails: {
            interestRates: data.interest_rate,
            loanAmount: data.loan,
            monthlyPayment: data.payment,
            term: data.term,
          },
          fullName: data.fullName_applicant,
          email: data.email_applicant,
        },
      },
    })
      .then(() => {
        showToast('prospect added successfully');
        router.push('/prospects');
        reset();
      })
      .catch(handleGraphqlError);

    // setIsEditProspect(false);
  };

  return (
    <Box p={4}>
      <Box sx={{ paddingY: '25px', paddingX: '40px' }}>
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
              router.push('/prospects');
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
              New Prospect
            </Box>
            <Button
              variant="contained"
              sx={{ textTransform: 'Capitalize', backgroundColor: '#33AC2E !important' }}
              onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </Box>
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
                  Prospect details
                </Box>
                <Divider color="#2B388C" />

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
                      {errors.fullName_applicant.message}
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
                      {errors.email_applicant.message}
                    </Typography>
                  )}
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
                      {errors.phone_applicant.message}
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
                      render={({ field: { onChange, value } }: any) => (
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
                  {errors.date && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.date.message}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Enter Postcode
                  </label>
                  <TextField
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
                    }}
                  />
                  {errors.pinCode_applicant && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.pinCode_applicant.message}
                    </Typography>
                  )}
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
                  Mortgage Interest type{' '}
                </Box>
                <Divider color="#2B388C" />
                <Controller
                  name="mortgageType"
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
                {errors.mortgageType && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.mortgageType.message}
                  </Typography>
                )}

                <Box sx={{ marginTop: '40px' }}>
                  <Box
                    sx={{
                      color: '#2B388C',
                      fontSize: '16px',
                      fontWeight: 400,
                      paddingBottom: '8px',
                    }}>
                    Mortagage Details
                  </Box>
                  <Divider color="#2B388C" />
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Loan Amount
                    </label>
                    <Controller
                      name="loan"
                      control={control}
                      rules={{ required: 'select loan amount' }}
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

                    {errors.loan && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.loan.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Interest Rates
                    </label>
                    <Controller
                      name="interest_rate"
                      control={control}
                      rules={{ required: 'Interest_rate is required' }}
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

                    {errors.interest_rate && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.interest_rate.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Term
                    </label>
                    <OutlinedInput
                      {...register('term', { required: 'term is required' })}
                      placeholder="Sale"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.term && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.term.message}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                      Monthly Payment
                    </label>
                    <OutlinedInput
                      {...register('payment', { required: 'payment is required' })}
                      placeholder="Sale"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: '2px solid #E0E7FF',
                        '& input': { paddingX: '10px' },
                      }}
                    />
                    {errors.payment && (
                      <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.payment.message}
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
                  {errors.adviser && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.adviser.message}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Advisor ID
                  </label>
                  <OutlinedInput
                    {...register('adviser_id', { required: 'adviser_id is required' })}
                    placeholder="Sale"
                    sx={{
                      height: '40px',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      '& input': { paddingX: '10px' },
                    }}
                  />

                  {errors.adviser_id && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.adviser_id.message}
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
                        {Users?.length &&
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
                      {errors.admin.message}
                    </Typography>
                  )}
                </Box>
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
                      {errors.office.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddProspect;
