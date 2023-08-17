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
  Button,
  TextareaAutosize,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import { Controller, get, useForm } from 'react-hook-form';
import CREATE_CLIENT_REMINDER from '@graphql/schema/mutation/createClientReminder.graphql';
import UPDATE_CLIENT_REMINDER from '@graphql/schema/mutation/updateClientReminder.graphql';
import DELETE_CLIENT_REMINDER from '@graphql/schema/mutation/deleteClientReminder.graphql';
import GET_LOGIN_USER from '@graphql/schema/loginUser.graphql';
import GET_REMINDER_BY_CLIENT_ID from '@graphql/schema/getReminderByClientId.graphql';
import { useMutation, useQuery } from '@apollo/client';

import { useRouter } from 'next/router';

import { IClientReminder } from '@types';
import dayjs, { Dayjs } from 'dayjs';
import { showToast } from '@utils';
import Loader from '@components/Loader';
interface IFormInputs {
  due_date: Dayjs | null;
  subject: string;
}

const TableColumns = ['Role', 'Subject', 'Date Created', 'Date Due', 'Action Date', 'Actions', ''];
const StyledTableCell = styled(TableCell)(({}) => ({
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
  const router = useRouter();
  const [isReschedule, setIsReschedule] = useState('');
  const [reminder, setReminder] = useState<IClientReminder>({
    id: '',
    subject: '',
    role: '',
    dueDate: '',
    createdBy: '',
    clientId: '',
    isCompleted: false,
  });

  const { data, loading } = useQuery(GET_LOGIN_USER, { fetchPolicy: 'network-only' });
  const { data: clientsReminder, loading: reminderLoading } = useQuery(GET_REMINDER_BY_CLIENT_ID, {
    variables: {
      clientId: router.query.clientDashboard,
    },
    fetchPolicy: 'network-only',
  });

  const reminderData: IClientReminder[] = get(clientsReminder, 'getRemindersByClientId.nodes', []);

  const [createClientReminder] = useMutation(CREATE_CLIENT_REMINDER, {
    refetchQueries: [
      {
        query: GET_REMINDER_BY_CLIENT_ID,

        variables: {
          clientId: router.query.clientDashboard,
        },
      },
    ],
  });

  const [updateClientReminder] = useMutation(UPDATE_CLIENT_REMINDER);

  const [deleteReminder] = useMutation(DELETE_CLIENT_REMINDER, {
    refetchQueries: [
      {
        query: GET_REMINDER_BY_CLIENT_ID,

        variables: {
          clientId: router.query.clientDashboard,
        },
      },
    ],
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IFormInputs>({ defaultValues: { due_date: null, subject: '' } });

  const onSubmit = (list: IFormInputs) => {
    if (isReschedule !== '') {
      updateClientReminder({
        variables: {
          input: {
            id: reminder?.id,
            subject: list.subject,
            role: 'ADMIN',
            dueDate: list.due_date,
            createdBy: data.me.id,
            clientId: router.query.clientDashboard,
            isCompleted: true,
          },
        },
      }).then(() => {
        showToast('Reminder updated successfully');
        reset({ due_date: null, subject: '' });
        setIsReschedule('');
      });
    } else
      createClientReminder({
        variables: {
          input: {
            subject: list.subject,
            role: 'ADMIN',
            dueDate: list.due_date,
            createdBy: data.me.id,
            clientId: router.query.clientDashboard,
          },
        },
      }).then(() => showToast('Reminder created successfully'));
    reset();
    setIsReschedule('');
  };

  const handleReschedule = (id: string) => {
    setIsReschedule(id);
    setReminder(reminderData.find((item) => item.id === id) as IClientReminder);
    reset({
      due_date: dayjs(reminderData.find((item) => item.id === id)?.dueDate),
      subject: reminderData.find((item) => item.id === id)?.subject,
    });
  };

  const removeReminder = (id: string) => {
    deleteReminder({
      variables: {
        deleteReminderId: id,
      },
    }).then((res) => showToast(res.data.deleteReminder.successMessage));
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
            {reminderLoading ? (
              <Loader isFullScreen />
            ) : (
              <Box mt={2}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        {TableColumns.map((item, index) => (
                          <StyledTableCell key={index}>{item}</StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reminderData.map((item: IClientReminder, index: number) => (
                        <TableRow
                          key={index}
                          sx={{
                            '& td': { py: 2 },
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}>
                          <StyledTableCell align="left">{item.role}</StyledTableCell>
                          <StyledTableCell align="left">{item.subject}</StyledTableCell>

                          <StyledTableCell align="left">{item.dueDate}</StyledTableCell>
                          <StyledTableCell align="left">05/09/2022</StyledTableCell>
                          <StyledTableCell align="left">05/09/2022</StyledTableCell>
                          <StyledTableCell
                            onClick={() => handleReschedule(item.id)}
                            align="left"
                            sx={{
                              color: '#2E5BFF !important',
                              fontWeight: '700 !important',
                              cursor: 'pointer',
                            }}>
                            Reschedule
                          </StyledTableCell>
                          <StyledTableCell
                            onClick={() => removeReminder(item.id)}
                            align="left"
                            sx={{
                              color: '#FF3D3D !important',
                              fontWeight: '700 !important',
                              cursor: 'pointer',
                            }}>
                            Delete
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <form>
            <Box p={3}>
              <Box
                sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
                Schedule Reminders
              </Box>
              <Divider color="#2B388C" />
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Due Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="due_date"
                    control={control}
                    rules={{ required: 'Due date is required' }}
                    render={({ field: { onChange, value } }) => (
                      <DesktopDatePicker
                        minDate={dayjs(new Date())}
                        // defaultValue={dayjs(reminder?.dueDate)}
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
                {errors.due_date && (
                  <p style={{ color: 'red' }} className="error" role="alert">
                    {' '}
                    {errors.due_date?.message}{' '}
                  </p>
                )}
              </Box>
              <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Description
                </label>
                <TextareaAutosize
                  // defaultValue={reminder?.subject}
                  {...register('subject', { required: 'subject is required' })}
                  placeholder="Subject"
                  minRows={7}
                  aria-label="empty textarea"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    borderRadius: 4,
                    fontWeight: 500,
                    fontSize: '18px',
                  }}
                />
                {errors.subject && (
                  <p style={{ color: 'red' }} className="error" role="alert">
                    {' '}
                    {errors.subject?.message}{' '}
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
                  onClick={() => reset({ due_date: null, subject: '' })}>
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
                  submit
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Reminders;
