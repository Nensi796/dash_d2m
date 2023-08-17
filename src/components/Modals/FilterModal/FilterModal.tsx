import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IFilterModal } from '@types';
import { FormControl } from '@material-ui/core';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

interface IMetaTitle {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
  getFilterData: (value: IFilterModal) => void;
  getData: (value: string) => string[] | null;
}

const style = {
  position: 'absolute',
  top: '57%',
  left: '88%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2,
};

const FilterModal = ({
  getData = () => null,
  openFilterModal,
  setOpenFilterModal,
  getFilterData = () => null,
}: IMetaTitle) => {
  const [appliedFilter, setAppliedFilter] = useState<IFilterModal | null>(null);

  const handleFilter = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setAppliedFilter({ ...(appliedFilter as IFilterModal), [name]: value });
  };
  return (
    <Modal
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
      open={openFilterModal}
      onClose={() => setOpenFilterModal(false)}
      aria-labelledby="New Applicant"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '210px' }}>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px', color: '#2B388C' }}>
            Filter By
          </Typography>
          <CloseIcon onClick={() => setOpenFilterModal(false)} />
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Status</label>

          <FormControl>
            <Select
              name="status"
              sx={{
                height: '40px',
                color: '#2E5BFF',
                fontWeight: 700,
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& fieldset': { border: 'none !important' },
                '& svg': { position: 'absolute', right: '12px' },
              }}
              id="demo-simple-select"
              value={appliedFilter?.status}
              onChange={handleFilter}>
              {getData('status')?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Advisor</label>

          <FormControl>
            <Select
              name="adviser"
              sx={{
                height: '40px',
                color: '#2E5BFF',
                fontWeight: 700,
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& fieldset': { border: 'none !important' },
                '& svg': { position: 'absolute', right: '12px' },
              }}
              id="demo-simple-select"
              value={appliedFilter?.adviser}
              onChange={handleFilter}>
              {getData('adviser')?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Admin</label>
          <FormControl>
            <Select
              name="admin"
              sx={{
                height: '40px',
                color: '#2E5BFF',
                fontWeight: 700,
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& fieldset': { border: 'none !important' },
                '& svg': { position: 'absolute', right: '12px' },
              }}
              id="demo-simple-select"
              value={appliedFilter?.admin}
              onChange={handleFilter}>
              {getData('admin')?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography fontSize="12px">Caption goes here</Typography>
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
            onClick={() => {
              setAppliedFilter({ adviser: '', admin: '', status: '' });
              setOpenFilterModal(false);
            }}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#E0E7FF !important',
              color: '#2E5BFF',
              fontWeight: 800,
            }}>
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              getFilterData(appliedFilter as IFilterModal);
              setOpenFilterModal(false);
            }}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#2E5BFF !important',
              fontWeight: 800,
            }}>
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default FilterModal;
