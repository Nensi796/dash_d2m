import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface IMetaTitle {
  openResetPasswordModal: boolean;
  setOpenResetPasswordModal: (value: boolean) => void;
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

const ResetPasswordModal = ({ openResetPasswordModal, setOpenResetPasswordModal }: IMetaTitle) => {
  return (
    <Modal
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
      open={openResetPasswordModal}
      onClose={() => setOpenResetPasswordModal(false)}
      aria-labelledby="New Applicant"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px', color: '#2B388C' }}>
            Reset Password
          </Typography>
          <CloseIcon onClick={() => setOpenResetPasswordModal(false)} />
        </Box>
        <Box mt={2}>
          <Typography sx={{ fontSize: '12px', color: '#2E384D' }}>
            Email with instructions to reset is successfully sent! New Password : Password <br/>
            Password is already saved in your clipboard!
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button
            variant="contained"
            onClick={() => setOpenResetPasswordModal(false)}
            sx={{
              ml: '5px',
              background: '#2E5BFF',
              color: 'white',
              fontWeight: '900',
              textTransform: 'capitalize'
            }}>
            Okay
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ResetPasswordModal;
