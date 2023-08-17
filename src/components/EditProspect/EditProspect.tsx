import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  RadioGroup,
  Radio,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useRouter } from 'next/router';
import UPDATE_PROSPECT from '@graphql/schema/mutation/updateProspect.graphql';

import {
  ApplicantModal,
  AddPropertyModal,
  DeletePropertyModal,
  DefaultMortgageModal,
  ResetPasswordModal,
} from '@components/Modals';
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { showToast } from '@utils';
import { IProspectData } from '@types';

export const SEARCH_STATUS_OPTIONS = [
  'interestRates',
  'loanAmount',
  'Application 2',
  'Application 3',
  'Application 4',
];

export const SEARCH_STATUS_OPTIONS_FOR_ADVISOR_ID = [123, 456, 222];

const MortgageTypeData = [
  'But To Let Remortgage',
  'Purchase',
  'Remortgage',
  'Right To Buy',
  'Buy To Let',
  'Limited Company Buy To Let',
  'Let To Buy',
  'HMO',
  'mortgageType',
];

interface IEditProspectProps {
  setIsEditProspect: Dispatch<SetStateAction<boolean>>;
  prospectData: IProspectData;
}

const EditProspect = ({ prospectData, setIsEditProspect }: IEditProspectProps) => {
  const router = useRouter();
  const prospectId = router.query.prospectName;
  const [openApplicantModal, setOpenApplicantModal] = useState(false);
  const [openPropertyModal, setOpenPropertyModal] = useState(false);
  const [openDeletePropertyModal, setOpenDeletePropertyModal] = useState(false);
  const [openDefaultMortgageModal, setOpenDefaultMortgageModal] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const [updateProspect] = useMutation(UPDATE_PROSPECT);

  console.log('prospectData', prospectData);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<IProspectData>();

  useEffect(() => {
    reset({
      fullName: prospectData.fullName,
      interestRates: prospectData?.mortgageDetails?.interestRates,
      advisorID: prospectData.advisorID,
      email: prospectData.email,
      phoneNumber: prospectData.phoneNumber,
      dob: dayjs(prospectData.dob).format('MM/DD/YYYY'),
      postCode: prospectData.postCode,
      monthlyPayment: prospectData?.mortgageDetails?.monthlyPayment,
      term: prospectData?.mortgageDetails?.term,
      adviser: prospectData.adviser,
      admin: prospectData.admin,
      loanAmount: prospectData?.mortgageDetails?.loanAmount,
      mortgageType: prospectData.mortgageType,
      officeId: prospectData.officeId,
    });
  }, [reset, prospectData]);

  const onSubmit = (data: IProspectData) => {
    updateProspect({
      variables: {
        input: {
          postCode: data.postCode,
          phoneNumber: dirtyFields?.phoneNumber ? `+${data.phoneNumber}` : prospectData.phoneNumber,
          officeId: '644a2796c150722dbc0ffd19',
          mortgageType: data.mortgageType,
          advisorID: data.advisorID,
          adviser: '644f5ed1e0b2ff18f819826d',
          admin: '644f5edde0b2ff18f8198271',
          mortgageDetails: {
            loanAmount: data.loanAmount,
            interestRates: data.interestRates,
            term: data.term,
            monthlyPayment: data.monthlyPayment,
          },
          id: prospectId,
          fullName: data.fullName,
          dob: data.dob,
          email: data.email,
        },
      },
    }).then(() => showToast('Prospect Updated Successfully'));
    reset();
    setIsEditProspect(false);
  };

  return (
    <Box sx={{ paddingY: '15px' }}>
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
            justifyContent: 'flex-end',
            alignItems: 'center',
            '& .MuiButtonBase-root-MuiButton-root': {
              background: '#33AC2E',
              fontWeight: 800,
              fontSize: '16px',
            },
            '& .MuiButtonBase-root-MuiButton-root:hover': { background: '#33AC2E' },
          }}>
          <Button
            variant="contained"
            sx={{ textTransform: 'Capitalize', backgroundColor: '#33AC2E !important' }}
            onClick={handleSubmit(onSubmit)}>
            Save & Update
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
                  {...register('fullName', { required: 'FullName is required' })}
                  placeholder="Please enter text"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.fullName && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.fullName.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Email Address
                </label>
                <OutlinedInput
                  placeholder="Please Email"
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
                    {errors.email.message}
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
                    {errors.phoneNumber.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Date of Birth
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{ required: 'Date of Birth is required' }}
                    render={({ field: { onChange } }: any) => (
                      <DesktopDatePicker
                        defaultValue={dayjs(prospectData.dob)}
                        onChange={onChange}
                        sx={{
                          height: '40px',
                          background: 'rgba(224, 231, 255, 0.2)',
                          border: '2px solid #E0E7FF',
                          '& .MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
                          '& input': { height: '8px', paddingX: '10px' },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>{' '}
                {errors.dob && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.dob.message}
                  </Typography>
                )}
              </Box>
              <Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Enter Postcode
                  </label>
                  <TextField
                    {...register('postCode', { required: 'Address Line 1 is required' })}
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
                  {errors.postCode && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.postCode.message}
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
                    defaultValue={prospectData?.mortgageType}
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
                    name="loanAmount"
                    control={control}
                    rules={{ required: 'select loanAmount amount' }}
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
                        defaultValue={prospectData?.mortgageDetails?.loanAmount}
                        onChange={onChange}>
                        {Object.values(SEARCH_STATUS_OPTIONS).map((value: string) => (
                          <MenuItem value={value} key={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />

                  {errors.loanAmount && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.loanAmount.message}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Interest Rates
                  </label>
                  <Controller
                    name="interestRates"
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
                        defaultValue={prospectData?.mortgageDetails?.interestRates}
                        onChange={onChange}>
                        {SEARCH_STATUS_OPTIONS.map((item: string) => (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />

                  {errors.interestRates && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.interestRates.message}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                    Team
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
                    {...register('monthlyPayment', { required: 'payment is required' })}
                    placeholder="Sale"
                    sx={{
                      height: '40px',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      '& input': { paddingX: '10px' },
                    }}
                  />
                  {errors.monthlyPayment && (
                    <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                      {errors.monthlyPayment.message}
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
                  rules={{ required: 'select adviser' }}
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
                      defaultValue={prospectData?.adviser}
                      onChange={onChange}>
                      {SEARCH_STATUS_OPTIONS.map((value: string) => (
                        <MenuItem value={value} key={value}>
                          {value}
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
                <Controller
                  name="advisorID"
                  control={control}
                  rules={{ required: 'select advisorID' }}
                  render={({ field: { onChange, value } }: any) => {
                    console.log(value);
                    return (
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
                        defaultValue={prospectData?.advisorID}
                        onChange={onChange}>
                        {SEARCH_STATUS_OPTIONS_FOR_ADVISOR_ID.map((value: number) => (
                          <MenuItem value={value} key={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />

                {errors.advisorID && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.advisorID.message}
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
                  rules={{ required: 'select admin' }}
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
                      defaultValue={prospectData?.admin}
                      onChange={onChange}>
                      {SEARCH_STATUS_OPTIONS.map((value: string) => (
                        <MenuItem value={value} key={value}>
                          {value}
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
                <OutlinedInput
                  {...register('officeId', { required: 'Office is required' })}
                  placeholder="Sale"
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px' },
                  }}
                />
                {errors.officeId && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.officeId.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EditProspect;
