import { Box, Button, Modal, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2';

interface IMetaTitle {
  openApplicantModal: boolean;
  setOpenApplicantModal: (value: boolean) => void;
}

interface IFormInputsApplicant {
  name: string;
  date: string;
  email: string;
  phone: number;
  address_line1: string;
  address_line2: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2,
};

const ApplicantModal = ({ openApplicantModal, setOpenApplicantModal }: IMetaTitle) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IFormInputsApplicant>();

  const onSubmit: SubmitHandler<IFormInputsApplicant> = (data) => {
    console.log(data);
    setOpenApplicantModal(false);
  };
  return (
    <Modal
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
      open={openApplicantModal}
      onClose={() => setOpenApplicantModal(false)}
      aria-labelledby="New Applicant"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '170px' }}>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px', color: '#2B388C' }}>
            New Applicant
          </Typography>
          <CloseIcon onClick={() => setOpenApplicantModal(false)} />
        </Box>
        <form>
          <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Name</label>
            <OutlinedInput
              {...register('name', {
                required: 'Name is required',
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
              Date of Birth
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Date of Birth is required' }}
                render={({ field: { onChange } }) => (
                  <DesktopDatePicker
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
            {errors.date && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {errors.date?.message}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Email</label>
            <OutlinedInput
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
              name="phone"
              control={control}
              rules={{ required: 'Telephone number is required' }}
              render={({ field: { onChange } }) => (
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
            {errors.phone && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {errors.phone?.message}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
              Address line 1
            </label>
            <OutlinedInput
              {...register('address_line1', {
                required: 'Address line1 is required',
              })}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& input': { paddingX: '10px' },
              }}
            />
            {errors.address_line1 && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {errors.address_line1?.message}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
              Address line 2
            </label>
            <OutlinedInput
              {...register('address_line2', {
                required: 'Address line2 is required',
              })}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& input': { paddingX: '10px' },
              }}
            />
            {errors.address_line2 && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {errors.address_line2?.message}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              justifyContent: 'flex-end',
            }}>
            <Button
              variant="contained"
              onClick={() => setOpenApplicantModal(false)}
              sx={{
                textTransform: 'capitalize',
                backgroundColor: '#E0E7FF !important',
                color: '#2E5BFF',
                fontWeight: 800,
              }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{
                textTransform: 'capitalize',
                backgroundColor: '#2E5BFF !important',
                fontWeight: 800,
              }}>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default ApplicantModal;
