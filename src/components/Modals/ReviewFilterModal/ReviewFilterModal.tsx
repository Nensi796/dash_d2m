import React, { ChangeEvent, useState } from 'react';
import { Box, Button, MenuItem, Modal, Select, TextareaAutosize, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { IReviewFilterData } from '@types';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { FormControl } from '@material-ui/core';
interface IMetaTitle {
  getFilterOptions: (value: string) => string[] | null;
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
  getFilterData: (value: IReviewFilterData | null) => void;
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
const ReviewFilterModal = ({
  openFilterModal,
  setOpenFilterModal,
  getFilterData,
  getFilterOptions,
}: IMetaTitle) => {
  const [appliedFilter, setAppliedFilter] = useState<IReviewFilterData | null>(null);

  const handleFilter = (e: ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setAppliedFilter({ ...(appliedFilter as IReviewFilterData), [name]: value });
  };

  const handleDateFilter = (value: any) => {
    setAppliedFilter({
      ...(appliedFilter as IReviewFilterData),
      renewal_date: dayjs(value).format('DD/MM/YYYY'),
    } as IReviewFilterData);
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
            Action
          </Typography>
          <CloseIcon onClick={() => setOpenFilterModal(false)} />
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
            Product Type
          </label>
          <FormControl>
            <Select
              name="product_Type"
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
              value={appliedFilter?.product_Type}
              onChange={handleFilter}>
              {getFilterOptions('product_Type')?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
            Renewal Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              onChange={handleDateFilter}
              sx={{
                height: '40px',
                background: 'rgba(224, 231, 255, 0.2)',
                border: '2px solid #E0E7FF',
                '& .MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
                '& input': { height: '8px', paddingX: '10px' },
              }}
            />
          </LocalizationProvider>{' '}
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
            Description
          </label>

          <TextareaAutosize
            value={appliedFilter?.description}
            name="description"
            onChange={handleFilter}
            minRows={5}
            aria-label="empty textarea"
            style={{
              maxWidth: 295,
              width: 295,
              background: 'rgba(224, 231, 255, 0.2)',
              border: '2px solid #E0E7FF',
              borderRadius: 4,
              fontWeight: 500,
              fontSize: '18px',
            }}
          />
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
              getFilterData(appliedFilter as IReviewFilterData);
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

export default ReviewFilterModal;
