import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography } from '@components';

import ManageTemplateModal from '@components/Modals/ManageTemplateModal';

interface ITemplates {
  id: number;
  message: string;
  subject: string;
  isChecked?: boolean;
}
const rows = [
  { status: 'Read', subject: 'Subject#1', date: '28/02/2023' },
  { status: 'Read', subject: 'Subject#1', date: '28/02/2023' },
  { status: 'Read', subject: 'Subject#1', date: '28/02/2023' },
  { status: 'Read', subject: 'Subject#1', date: '28/02/2023' },
];
const ClientNotification = () => {
  const [property, setProperty] = useState('The Scott House');
  const [selectedTemplate, setSelectedTemplate] = useState('Welcome to Direct Mortgages');
  const [recordId, setRecordId] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState(
    'I am writing to you today to introduce myself. I am your dedicated mortgage administrator and will have a great deal of involvement with your mortgage application.I have submitted the application to the lender and provided all of the relevant documentation in order for them to underwrite the mortgage application. I will be their point of contact as well as your point of contact during the application process. Should the lender provide me with any update or request any further information I will contact you.\n' +
      'At this stage, I would expect the lender to provide me with an update within the next four days. Should you need anything in the meantime however, please do not hesitate to contact me. I will also be liaising with any third',
  );

  const [addModel, setAddModel] = useState(false);
  const [sendNotificationModel, setSendNotificationModel] = useState(false);
  const [templates, setTemplates] = useState<ITemplates[]>([
    {
      id: 1,
      subject: 'Welcome to Mortgages',
      message:
        'I am writing to you today to introduce myself. I am your dedicated mortgage administrator and will have a great deal of involvement with your mortgage application.I have submitted the application to the lender and provided all of the relevant documentation in order for them to underwrite the mortgage application. I will be their point of contact as well as your point of contact during the application process. Should the lender provide me with any update or request any further information I will contact you. At this stage, I would expect the lender to provide me with an update within the next four days. Should you need anything in the meantime however, please do not hesitate to contact me. I will also be liaising with any third',
    },
    {
      id: 2,
      subject: 'Mortgage  offer',
      message:
        'your mortgage application.I have submitted the application to the lender and provided all of the relevant documentation in order for them to underwrite the mortgage application. I will be their point of contact as well as your point of contact during the application process. Should the lender provide me with any update or request any further information I will contact you. At this stage, I would expect the lender to provide me with an update within the next four days. Should you need anything in the meantime however, please do not hesitate to contact me. I will also be liaising with any third',
    },
    {
      id: 3,
      subject: 'Direct Mortgages Questionnaire ',
      message:
        'I am writing to you today to introduce myself. I am your dedicated mortgage administrator and will have a great deal of involvement with your mortgage application.I have submitted the application to the lender and provided all of the relevant documentation in order for them to underwrite the mortgage application. I will be their point of contact as well as your point of contact during the application process. Should the lender provide me with any update or request any further information I will contact you. At this stage, I would expect the lender to provide me with an update within the next four days. Should you need anything in the meantime however, please do not hesitate to contact me. I will also be liaising with any third',
    },
  ]);
  useEffect(() => {
    setSelectedTemplate(
      (templates?.find((ele) => ele.id === recordId) as ITemplates).subject as string,
    );
    setEditContent((templates?.find((ele) => ele.id === recordId) as ITemplates).message as string);
  }, [templates, editContent, selectedTemplate, recordId]);

  const handleChange = (event: SelectChangeEvent) => {
    setProperty(event.target.value as string);
  };

  const getData = (value: ITemplates[]) => {
    setTemplates(value);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={{ background: '#ffffff', p: 5 }}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={{ height: '95%' }}>
            <Box sx={{ borderBottom: '2px solid #2B388C' }}>
              <Typography text="Notification History " color="#2B388C" fontWeight={600} />
            </Box>
            <Box
              sx={{
                background: 'rgba(46, 91, 255, 0.08)',
                mt: 4,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '96%',
              }}>
              <Typography text="Previous" fontWeight={500} />
              <Box>
                <Typography
                  text="Select Property"
                  sx={{ mt: 2, fontSize: '16px' }}
                  fontWeight={600}
                />
              </Box>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <Select
                  value={property}
                  sx={{ '& input': { border: '2px solid #E0E7FF !important' } }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}>
                  <MenuItem value={'10'}>Ten</MenuItem>
                  <MenuItem value={'20'}>Twenty</MenuItem>
                  <MenuItem value={'30'}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
                        Status
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
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <Link href="#" color="#2E5BFF" variant="body2">
                            {row.subject}
                          </Link>
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    background: 'rgba(46, 91, 255, 0.08) !important',
                    width: '100%',
                    color: '#2E5BFF',
                    fontWeight: '900',
                    mt: 24,
                    textTransform: 'Capitalize',
                  }}>
                  Export
                </Button>
              </Box>
            </Box>{' '}
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Box sx={{ borderBottom: '2px solid #2B388C' }}>
            <Typography text="Send Message " color="#2B388C" fontWeight={600} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                sx={{
                  background: 'rgba(46, 91, 255, 0.08)',
                  mt: 4,
                  p: 2,
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'flex-start !important',
                  flexDirection: 'column',
                  height: '95%',
                }}>
                <Typography text="TEMPLATES" fontWeight={500} />
                <Box sx={{ mt: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      height: '586px',
                      overflow: 'auto',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <FormControl
                      sx={{ width: '100%', '& .MuiFormControlLabel-root': { marginLeft: 0 } }}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group">
                        {templates?.map((item) => {
                          console.log('templates', templates);
                          return (
                            <FormControlLabel
                              key={item?.id}
                              value={item?.subject}
                              control={
                                <Radio
                                  checked={item.id === recordId}
                                  key={item?.subject}
                                  onChange={(e) => {
                                    setSelectedTemplate(item.subject);
                                    setEditContent(item.message);
                                    setRecordId(item.id);
                                  }}
                                />
                              }
                              label={item?.subject}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        gap: '10px',
                        width: '100%',
                      }}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          setOpen(true);
                        }}
                        sx={{
                          background: 'rgba(46, 91, 255, 0.08) !important',
                          width: '50%',
                          color: '#2E5BFF',
                          fontWeight: '900',
                          textTransform: 'Capitalize',
                        }}>
                        Manage
                      </Button>{' '}
                      <Button
                        onClick={() => setAddModel(true)}
                        type="submit"
                        variant="outlined"
                        sx={{
                          border: '2px solid #2E5BFF',
                          width: '50%',
                          color: '#2E5BFF',
                          fontWeight: '900',
                          textTransform: 'Capitalize',
                          lineHeight: 1.25,
                        }}>
                        Add new
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  background: 'rgba(46, 91, 255, 0.08)',
                  mt: 4,
                  p: 2,

                  display: 'flex',
                  gap: '80px',
                  flexDirection: 'column',
                  height: '95%',
                }}>
                <Typography text="PREVIEW" fontWeight={500} />
                <Box
                  sx={{
                    display: 'flex',
                    gap: '40px',
                    flexDirection: 'column',
                    // justifyContent: 'space-between',
                  }}>
                  <Box>
                    <Typography text="Subject" color="#B0BAC9" fontWeight={500} />
                    <Typography
                      text={selectedTemplate}
                      color="#2E384D"
                      fontWeight={500}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Box sx={{ minHeight: '330px' }}>
                    <Typography text="Messege" color="#B0BAC9" fontWeight={500} />
                    <Typography
                      text={editContent}
                      color="#2E384D"
                      fontWeight={500}
                      sx={{ mt: 1, height: '200px', overflow: 'auto' }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-end',
                    gap: '10px',
                    width: '100%',
                    // mt: 35,
                  }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      width: '50%',
                      color: '#2E5BFF',
                      fontWeight: '900',
                      border: '2px solid #2E5BFF',
                      textTransform: 'capitalize',
                    }}>
                    Internal Note
                  </Button>{' '}
                  <Button
                    onClick={() => setSendNotificationModel(true)}
                    type="submit"
                    variant="contained"
                    sx={{
                      width: '50%',
                      backgroundColor: '#2E5BFF !important',
                      fontWeight: '900',
                      textTransform: 'capitalize',
                    }}>
                    send to All Applicants
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ManageTemplateModal
        checkedId={recordId}
        sendNotificationModel={sendNotificationModel}
        setSendNotificationModel={setSendNotificationModel}
        isAddModal={addModel}
        setIsOpenAddModal={setAddModel}
        getData={getData}
        isOpen={open}
        setIsOpen={setOpen}
        templateSubjects={templates}
      />
    </Box>
  );
};

export default ClientNotification;
