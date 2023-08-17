import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  IconButton,
  Collapse,
  CardContent,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import GET_DASHBOARD_REMINDERS from '@graphql/schema/getDashboardReminders.graphql';
import { useMutation, useQuery } from '@apollo/client';
import { get } from 'react-hook-form';
import { IDashboardReminders } from '@types';
import UPDATE_CLIENT_REMINDER from '@graphql/schema/mutation/updateClientReminder.graphql';
import { showToast } from '@utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

const DashboardSidebar = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [thisWeekOpen, setThisWeekOpen] = useState(true);
  const [lateropen, setLaterOpen] = useState(false);
  dayjs.extend(isBetween);

  const { data: dashboardReminders, loading } = useQuery(GET_DASHBOARD_REMINDERS, {
    fetchPolicy: 'network-only',
  });

  const reminders = get(dashboardReminders, 'getReminders.nodes', []);

  const [updateClientReminder] = useMutation(UPDATE_CLIENT_REMINDER, {
    refetchQueries: [
      {
        query: GET_DASHBOARD_REMINDERS,
        fetchPolicy: 'network-only',
      },
    ],
  });
  const updateReminder = (id: string) => {
    updateClientReminder({
      variables: {
        input: {
          id: id,
          isCompleted: true,
        },
      },
    }).then(() => {
      showToast('Reminder marked as completed');
    });
  };
  return (
    <Box
      sx={{
        width: '25%',
        height: 'calc(100vh - 70px)',
        background: '#ffffff',
        '& .MuiTabPanel-root': { background: '#ffffff' },
        '& .MuiTabs-root .MuiButtonBase-root': { width: '50%' },
        '& svg': {
          '& path': {
            color: '#2E5BFF',
          },
        },
      }}>
      <Box>
        <Card
          sx={{
            minWidth: 300,
            borderRadius: '0px !important',
            boxShadow: 'none !important',
            background: '#F4F6FC',
          }}>
          <CardHeader
            title="Today"
            sx={{
              '& .MuiTypography-root': {
                fontWeight: '800 !important',
                fontSize: '14px !important',
                color: '#2E5BFF',
              },
            }}
            action={
              <IconButton onClick={() => setOpen(!open)} aria-label="expand" size="small">
                {open ? (
                  <KeyboardArrowDownIcon style={{ color: '#2E5BFF !important' }} />
                ) : (
                  <KeyboardArrowRightOutlinedIcon />
                )}
              </IconButton>
            }></CardHeader>
          <div style={{ backgroundColor: 'rgba(211,211,211,0.4)' }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <CardContent sx={{ background: 'white !important' }}>
                {reminders
                  .filter(
                    (item: IDashboardReminders) =>
                      dayjs(item.dueDate).format('DD/MM/YYYY') ===
                      dayjs(new Date()).format('DD/MM/YYYY'),
                  )
                  .map((item: IDashboardReminders, index: number) => {
                    return (
                      <Box
                        key={`tab_${index + 1}`}
                        sx={{
                          '& .MuiBox-root': { padding: '0px !important' },
                          p: '10px',
                          borderBottom:
                            index + 1 === 1 ? '2px solid rgba(46, 91, 255, 0.08)' : 'none',
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            flexDirection: 'column',
                          }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                              sx={{
                                fontSize: '10px !important',
                                color: '#2E5BFF',
                                backgroundColor: 'rgba(46, 91, 255, 0.08)',
                                fontWeight: '700 !important',
                                textTransform: 'Capitalize',
                              }}>
                              Adam Gordon Thomas
                            </Button>
                            <Typography
                              sx={{ color: '#BFC5D2', fontSize: '12px', fontWeight: 400 }}>
                              {dayjs(item.dueDate).format('DD/MM/YYYY')}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '16px',
                              color: '#2E384D',
                              fontWeight: 700,
                              marginTop: '10px',
                            }}>
                            {item.clientName}
                          </Typography>
                          <Typography color="#2B388C" sx={{ fontSize: '12px', fontWeight: 400 }}>
                            {item.subject}
                          </Typography>
                        </Box>
                        <Box sx={{ marginTop: '10px', gap: '10px', display: 'flex' }}>
                          <Button
                            variant="outlined"
                            sx={{
                              width: '210px',
                              border: '2px solid #2E5BFF !important',
                              fontSize: '14px',
                              textTransform: 'capitalize',
                              fontWeight: 700,
                              color: '#2E5BFF',
                            }}>
                            Reschedule
                          </Button>
                          <Button
                            onClick={() => updateReminder(item._id)}
                            variant="outlined"
                            sx={{
                              width: '210px',
                              border: '2px solid #33AC2E !important',
                              fontSize: '14px',
                              color: '#33AC2E',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                            }}>
                            Mark As Completed
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
              </CardContent>
            </Collapse>
          </div>
        </Card>
      </Box>
      <Box>
        <Card
          sx={{
            minWidth: 300,
            borderRadius: '0px !important',
            boxShadow: 'none !important',
            background: '#F4F6FC',
          }}>
          <CardHeader
            title="This Week"
            sx={{
              '& .MuiTypography-root': {
                fontWeight: '800 !important',
                fontSize: '14px !important',
                color: '#2E5BFF',
              },
            }}
            action={
              <IconButton
                onClick={() => setThisWeekOpen(!thisWeekOpen)}
                aria-label="expand"
                size="small">
                {thisWeekOpen ? (
                  <KeyboardArrowDownIcon style={{ color: '#2E5BFF !important' }} />
                ) : (
                  <KeyboardArrowRightOutlinedIcon />
                )}
              </IconButton>
            }></CardHeader>
          <div style={{ backgroundColor: 'rgba(211,211,211,0.4)' }}>
            <Collapse in={thisWeekOpen} timeout="auto" unmountOnExit>
              <CardContent sx={{ background: 'white !important' }}>
                {reminders
                  .filter((item: IDashboardReminders) =>
                    dayjs(dayjs(item.dueDate)).isBetween(dayjs().day(0), dayjs().day(7)),
                  )
                  .map((item: IDashboardReminders, index: number) => {
                    return (
                      <Box
                        key={`tab_${index + 1}`}
                        sx={{
                          '& .MuiBox-root': { padding: '0px !important' },
                          p: '10px',
                          borderBottom:
                            index + 1 === 1 ? '2px solid rgba(46, 91, 255, 0.08)' : 'none',
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            flexDirection: 'column',
                          }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                              sx={{
                                fontSize: '10px !important',
                                color: '#2E5BFF',
                                backgroundColor: 'rgba(46, 91, 255, 0.08)',
                                fontWeight: '700 !important',
                                textTransform: 'Capitalize',
                              }}>
                              Adam Gordon Thomas
                            </Button>
                            <Typography
                              sx={{ color: '#BFC5D2', fontSize: '12px', fontWeight: 400 }}>
                              {dayjs(item.dueDate).format('DD/MM/YYYY')}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '16px',
                              color: '#2E384D',
                              fontWeight: 700,
                              marginTop: '10px',
                            }}>
                            {item.clientName}
                          </Typography>
                          <Typography color="#2B388C" sx={{ fontSize: '12px', fontWeight: 400 }}>
                            {item.subject}
                          </Typography>
                        </Box>
                        <Box sx={{ marginTop: '10px', gap: '10px', display: 'flex' }}>
                          <Button
                            variant="outlined"
                            sx={{
                              width: '210px',
                              border: '2px solid #2E5BFF !important',
                              fontSize: '14px',
                              textTransform: 'capitalize',
                              fontWeight: 700,
                              color: '#2E5BFF',
                            }}>
                            Reschedule
                          </Button>
                          <Button
                            onClick={() => updateReminder(item._id)}
                            variant="outlined"
                            sx={{
                              width: '210px',
                              border: '2px solid #33AC2E !important',
                              fontSize: '14px',
                              color: '#33AC2E',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                            }}>
                            Mark As Completed
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
              </CardContent>
            </Collapse>
          </div>
        </Card>
      </Box>
      <Box>
        <Card
          sx={{
            minWidth: 300,
            borderRadius: '0px !important',
            boxShadow: 'none !important',
            background: '#F4F6FC',
          }}>
          <CardHeader
            title="Later"
            sx={{
              '& .MuiTypography-root': {
                fontWeight: '800 !important',
                fontSize: '14px !important',
                color: '#2E5BFF',
              },
            }}
            action={
              <IconButton onClick={() => setLaterOpen(!lateropen)} aria-label="expand" size="small">
                {lateropen ? (
                  <KeyboardArrowDownIcon style={{ color: '#2E5BFF !important' }} />
                ) : (
                  <KeyboardArrowRightOutlinedIcon />
                )}
              </IconButton>
            }></CardHeader>
          <div style={{ backgroundColor: 'rgba(211,211,211,0.4)' }}>
            <Collapse in={lateropen} timeout="auto" unmountOnExit>
              <CardContent sx={{ background: 'white !important' }}>
                {reminders
                  .filter(
                    (item: IDashboardReminders) =>
                      !dayjs(dayjs(item.dueDate)).isBetween(dayjs().day(0), dayjs().day(7)) &&
                      dayjs(item.dueDate).format('DD/MM/YYYY') !==
                        dayjs(new Date()).format('DD/MM/YYYY'),
                  )
                  .map((item: IDashboardReminders, index: number) => {
                    return (
                      <Box
                        key={`tab_${index + 1}`}
                        sx={{
                          '& .MuiBox-root': { padding: '0px !important' },
                          p: '10px',
                          borderBottom:
                            index + 1 === 1 ? '2px solid rgba(46, 91, 255, 0.08)' : 'none',
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            flexDirection: 'column',
                          }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                              sx={{
                                fontSize: '10px !important',
                                color: '#2E5BFF',
                                backgroundColor: 'rgba(46, 91, 255, 0.08)',
                                fontWeight: '700 !important',
                                textTransform: 'Capitalize',
                              }}>
                              Adam Gordon Thomas
                            </Button>
                            <Typography
                              sx={{ color: '#BFC5D2', fontSize: '12px', fontWeight: 400 }}>
                              {dayjs(item.dueDate).format('DD/MM/YYYY')}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '16px',
                              color: '#2E384D',
                              fontWeight: 700,
                              marginTop: '10px',
                            }}>
                            {item.clientName}
                          </Typography>
                          <Typography color="#2B388C" sx={{ fontSize: '12px', fontWeight: 400 }}>
                            {item.subject}
                          </Typography>
                        </Box>
                        <Box sx={{ marginTop: '10px', gap: '10px', display: 'flex' }}>
                          <Button
                            variant="outlined"
                            sx={{
                              width: '210px',
                              border: '2px solid #2E5BFF !important',
                              fontSize: '14px',
                              textTransform: 'capitalize',
                              fontWeight: 700,
                              color: '#2E5BFF',
                            }}>
                            Reschedule
                          </Button>
                          <Button
                            onClick={() => updateReminder(item._id)}
                            variant="outlined"
                            sx={{
                              width: '210px',
                              border: '2px solid #33AC2E !important',
                              fontSize: '14px',
                              color: '#33AC2E',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                            }}>
                            Mark As Completed
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
              </CardContent>
            </Collapse>
          </div>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
