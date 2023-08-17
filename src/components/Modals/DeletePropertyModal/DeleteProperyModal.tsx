import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface IMetaTitle {
  openDeletePropertyModal: boolean;
  setOpenDeletePropertyModal: (value: boolean) => void;
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

const DeletePropertyModal = ({
  openDeletePropertyModal,
  setOpenDeletePropertyModal,
}: IMetaTitle) => {
  return (
    <Modal
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
      open={openDeletePropertyModal}
      onClose={() => setOpenDeletePropertyModal(false)}
      aria-labelledby="New Applicant"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '200px' }}>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px', color: '#2B388C' }}>
            Warning!
          </Typography>
          <CloseIcon onClick={() => setOpenDeletePropertyModal(false)} />
        </Box>
        <Box mt={2}>
          <Typography sx={{ fontSize: '12px', color: '#2E384D' }}>
            Client’s Property 1 will be deleted from the system and cannot be recovered in the
            future. <br/> Do you wish to continue?
          </Typography>
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
            onClick={() => setOpenDeletePropertyModal(false)}
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
            onClick={() => setOpenDeletePropertyModal(false)}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#FF3D3D !important',
              fontWeight: 800,
            }}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default DeletePropertyModal;
