import {
  Box,
  Grid,
  Divider,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  styled,
  TableCell,
  tableCellClasses,
  TableBody,
  Paper,
  OutlinedInput,
  Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
interface IFormInputs {
  date: string;
  description: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2e5bff14',
    borderBottom: '1px solid #2B388C',
    color: '#2B388C',
    fontSize: '12 !important',
    fontWeight: '500 !important',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#2e5bff14',
    borderBottom: '0',
    fontSize: '12 !important',
    fontWeight: 400,
    color: '#111111',
  },
}));
const Reminders = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IFormInputs>({ defaultValues: { date: '', description: '' } });

  const onSubmit = (list: IFormInputs) => {
    console.log(list);
    reset();
  };
  return (
    <Box sx={{ background: '#FFFFFF', width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, xl: 3 }}>
        <Grid item xs={12} sm={8}>
          <Box p={3}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Reminders
            </Box>
            <Divider color="#2B388C" />
            <Box mt={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Role</StyledTableCell>
                      <StyledTableCell align="left">Subject</StyledTableCell>
                      <StyledTableCell align="left">Date Created</StyledTableCell>
                      <StyledTableCell align="left">Date Due</StyledTableCell>
                      <StyledTableCell align="left">Action Date</StyledTableCell>
                      <StyledTableCell align="left">Actions</StyledTableCell>
                      <StyledTableCell align="left" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: 6 }).map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell align="left">Adviser</StyledTableCell>
                        <StyledTableCell align="left">
                          LC Chase Ansons Solicitors- IS THIS COMPLETING TODAY
                        </StyledTableCell>
                        <StyledTableCell align="left">05/09/2022</StyledTableCell>
                        <StyledTableCell align="left">05/09/2022</StyledTableCell>
                        <StyledTableCell align="left">05/09/2022</StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ color: '#2E5BFF !important', fontWeight: '700 !important' }}>
                          Reschedule
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ color: '#FF3D3D !important', fontWeight: '700 !important' }}>
                          Delete
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box p={3}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Schedule Reminders
            </Box>
            <Divider color="#2B388C" />
            <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Date is required' }}
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
              {errors.date && (
                <p style={{ color: 'red' }} className="error" role="alert">
                  {' '}
                  {errors.date?.message}{' '}
                </p>
              )}
            </Box>
            <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                Description
              </label>
              <OutlinedInput
                {...register('description', { required: 'description is required' })}
                placeholder="Subject"
                sx={{
                  height: '80px',
                  background: 'rgba(224, 231, 255, 0.2)',
                  border: '2px solid #E0E7FF',
                  '& input': { paddingX: '10px' },
                }}
              />
              {errors.description && (
                <p style={{ color: 'red' }} className="error" role="alert">
                  {' '}
                  {errors.description?.message}{' '}
                </p>
              )}
            </Box>
            <Box
              sx={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '10px',
              }}>
              <Button
                variant="outlined"
                sx={{
                  width: '280px',
                  textTransform: 'Capitalize',
                  color: '#2E5BFF',
                  fontWeight: 800,
                  border: '2px solid #2E5BFF !important',
                }}
                onClick={() => reset()}>
                Reset
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '280px',
                  textTransform: 'Capitalize',
                  background: '#2E5BFF !important',
                  fontWeight: 800,
                }}
                onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Reminders;
