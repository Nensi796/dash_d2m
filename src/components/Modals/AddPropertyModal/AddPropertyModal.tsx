import { Box, Button, Modal, OutlinedInput, Typography } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';

interface IMetaTitle {
  openPropertyModal: boolean;
  setOpenPropertyModal: (value: boolean) => void;
}

interface IFormInputsProperty {
  acc_num: string;
  price: string;
  term: string;
  repayment_method: string;
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

const AddPropertyModal = ({ openPropertyModal, setOpenPropertyModal }: IMetaTitle) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInputsProperty>();

  const onSubmit: SubmitHandler<IFormInputsProperty> = (data) => {
    setOpenPropertyModal(false);
  };

  return (
    <Modal
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
      open={openPropertyModal}
      onClose={() => setOpenPropertyModal(false)}
      aria-labelledby="New Applicant"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '170px' }}>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px', color: '#2B388C' }}>
            New Property
          </Typography>
          <CloseIcon onClick={() => setOpenPropertyModal(false)} />
        </Box>
        <form>
          <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
              Lender Account Number
            </label>
            <OutlinedInput
              {...register('acc_num', {
                required: 'Lender Account Number is required',
              })}
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
              {...register('price', {
                required: 'Purchase price is required',
              })}
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
            <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Term</label>
            <OutlinedInput
              {...register('term', {
                required: 'Term is required',
              })}
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
              Repayment Method
            </label>
            <OutlinedInput
              {...register('repayment_method', {
                required: 'Repayment Method is required',
              })}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& input': { paddingX: '10px' },
              }}
            />
            {errors.repayment_method && (
              <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                {errors.repayment_method?.message}
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
              onClick={() => setOpenPropertyModal(false)}
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
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default AddPropertyModal;
