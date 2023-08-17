import React from 'react';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TextareaAutosize,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography } from '@components';

const rows = [
  {
    type: 'System',
    name: 'Admin Name',
    subject: 'LC Chase Ansons Solicitors- IS THIS COMPLETING TODAY',
    date: '28/02/2023',
  },
  {
    type: 'Manual',
    name: 'Read',
    subject: 'LC Chase Ansons Solicitors- IS THIS COMPLETING TODAY',
    date: '28/02/2023',
  },
  {
    type: 'System',
    name: 'Admin Name',
    subject: 'LC Chase Ansons Solicitors- IS THIS COMPLETING TODAY',
    date: '28/02/2023',
  },
  {
    type: 'Manual',
    name: 'Read',
    subject: 'LC Chase Ansons Solicitors- IS THIS COMPLETING TODAY',
    date: '28/02/2023',
  },
];
const ClientNotification = () => {
  return (
    <Box sx={{ background: 'white', p: 5 }}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={12} lg={6}>
          <Box>
            <Box sx={{ borderBottom: '2px solid #2B388C' }}>
              <Typography text="Communication " color="#2B388C" fontWeight={600} />
            </Box>
            <Box sx={{ background: 'rgba(46, 91, 255, 0.08)', mt: 4, p: 2, minHeight: '645px' }}>
              <Typography text="Contact Log" fontWeight={500} />
              <TableContainer sx={{ m: 1 }}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ outline: '2px solid #2B388C', outlineWidth: '0 0 2px 0' }}>
                      <TableCell
                        sx={{
                          color: '#2B388C',
                          fontWeight: 600,
                          fontSize: '16px',
                        }}>
                        Type
                      </TableCell>
                      <TableCell
                        sx={{
                          color: '#2B388C',
                          fontWeight: 600,
                          fontSize: '16px',
                        }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ color: '#2B388C', fontWeight: 600, fontSize: '16px' }}>
                        Subject
                      </TableCell>
                      <TableCell sx={{ color: '#2B388C', fontWeight: 600, fontSize: '16px' }}>
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '& tr': { border: 0 },
                          '& td': { px: '2px' },
                        }}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>{' '}
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ borderBottom: '2px solid #2B388C' }}>
            <Typography text="Contact info " color="#2B388C" fontWeight={600} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ mt: 4, minHeight: '600px' }}>
                <Typography color="#B0BAC9" text="Last Contact" fontWeight={400} />
                <Typography text="Monday, 23 Feb 2023, 12:30:00" fontWeight={400} />
                <Box sx={{ my: '25px' }}>
                  <Typography text="Notes" fontWeight={400} />
                  <TextareaAutosize
                    name="message"
                    minRows={5}
                    aria-label="empty textarea"
                    style={{
                      maxWidth: '100%',
                      width: '100%',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      borderRadius: 4,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                  <Button
                    onClick={() => console.log('email')}
                    type="submit"
                    variant="outlined"
                    sx={{
                      border: '2px solid #2E5BFF !important',
                      color: '#2E5BFF',
                      fontWeight: '900',
                      textTransform: 'Capitalize',
                      lineHeight: 1.25,
                    }}>
                    Send System Email
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientNotification;
