import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { get, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  Link,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { PlayCircleOutline as PlayCircleOutlineIcon } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import GET_ALL_OFFICES from '@graphql/schema/getAllOffice.graphql';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import Typography from '@components/Typography';
import { FormControl } from '@material-ui/core';
import SvgIcon from '@components/SvgIcon';
import Loader from '@components/Loader';
import GET_USER_BY_OFFICE from '@graphql/schema/getUserByOfficeId.graphql';
import { IStaff } from '@types';

const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
  {
    pathName: '/administration',
    routeName: 'Administration',
  },
  {
    pathName: '/office',
    routeName: 'Office',
  },
];
interface IFormInputs {
  role?: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2E384D',
    color: theme.palette.common.white,
    borderLeft: '1px solid #ffffff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 400,
    color: '#2B388C',
    backgroundColor: 'rgba(46, 91, 255, 0.08)',
    borderLeft: '1px solid #ffffff',
  },
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  '&:nth-of-type': {
    backgroundColor: '#2e5bff14',
  },
  // hide last border
  '& td, &:last-child th': {
    borderBottom: '0px solid !important',
  },
}));

interface IOffice {
  address1: string;
  address2: string;
  address3: string;
  id: string;
  name: string;
  phoneNumber: string;
  postCode: string;
  staff?: any;
}

const OfficeDetail = () => {
  const router = useRouter();

  const { loading: isOfficeDetailsLoading, data: getAllOffices } = useQuery(GET_ALL_OFFICES, {
    fetchPolicy: 'network-only',
  });

  const offices = get(getAllOffices, 'getAllOffices.nodes', []);

  const [value, setValue] = useState('Ellesmere Port');
  const [selectedOffice, setSelectedOffice] = useState<IOffice>({
    address1: '',
    address2: '',
    address3: '',
    id: offices[0]?.id,
    name: '',
    phoneNumber: '',
    postCode: '',
    staff: [],
  });

  useEffect(() => {
    setSelectedOffice(offices[0]);
  }, [offices]);

  const { loading: isStaffLoading, data } = useQuery(GET_USER_BY_OFFICE, {
    variables: {
      officeId: selectedOffice?.id,
    },
    fetchPolicy: 'network-only',
  });
  const staffDetails = get(data, 'listUsersByOffice.nodes', []);
  console.log(staffDetails);

  console.log(selectedOffice);
  const {
    handleSubmit,
    register,
    formState: {},
  } = useForm<IFormInputs>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const onSubmit = () => {
    router.push('/office/newOffice');
  };
  const onHandleEdit = () => {
    router.push(`/office/${selectedOffice.id}`);
  };
  const handleIncrease = () => {
    if (
      page >=
      Array.from({
        length: Math.ceil(staffDetails.length / rowsPerPage),
      }).length -
        1
    ) {
      return;
    }
    setPage(page + 1);
  };
  const handleDecrease = () => {
    if (page === 0) {
      return;
    }

    setPage(page - 1);
  };

  return (
    <Box
      sx={{
        paddingY: '15px',
        paddingX: '40px',
        height: isOfficeDetailsLoading ? 'calc(100vh - 60px)' : 'auto',
      }}>
      {isOfficeDetailsLoading && !offices.length ? (
        <Loader isFullScreen />
      ) : (
        <>
          <Box py={4}>
            <Breadcrumbs
              routeList={breadcrumbList}
              onClick={(pathName: string | undefined) => router.push(pathName || '/')}
            />
          </Box>

          <Box sx={{ background: '#FFFFFF', width: '100%', height: '100%', marginY: '20px' }}>
            <Box sx={{ padding: '40px' }}>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    color: '#2B388C',
                    fontSize: '16px',
                    fontWeight: 400,
                    paddingBottom: '8px',
                  }}>
                  Manage office
                </Box>
                <Divider color="#E4E8F0" />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} lg={4}>
                    <Box
                      sx={{
                        padding: '16px',
                        mt: 2,
                        background: '#2E5BFF14',
                        height: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <Typography
                        text="List of Offices"
                        color="#111111"
                        fontWeight={400}
                        fontSize="18px"
                      />
                      <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="role"
                          value={value}
                          onChange={handleChange}>
                          {(offices || []).map((office: IOffice) => {
                            return (
                              <FormControlLabel
                                key={office.id}
                                {...register('role', { required: true })}
                                value={office?.name}
                                control={
                                  <Radio
                                    checked={selectedOffice?.id === office.id}
                                    onChange={() => setSelectedOffice(office)}
                                  />
                                }
                                label={office?.name}
                              />
                            );
                          })}
                        </RadioGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          '& .MuiButton-root': { padding: 0 },
                          gap: '10px',
                          marginTop: '20px',
                          marginBottom: '10px',
                        }}>
                        {' '}
                        <Button
                          variant="outlined"
                          sx={{ textTransform: 'Capitalize', width: '50%' }}
                          onClick={handleSubmit(onHandleEdit)}>
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ textTransform: 'Capitalize', width: '50%' }}
                          onClick={handleSubmit(onSubmit)}>
                          Add New
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <Box sx={{ padding: '16px', mt: 2, background: '#2E5BFF14', height: '90%' }}>
                      {' '}
                      <Typography
                        text="List of Staffs"
                        color="#111111"
                        fontWeight={400}
                        fontSize="18px"
                      />
                      <Box sx={{ marginTop: '20px' }}>
                        {isStaffLoading ? (
                          <Loader isFullScreen />
                        ) : (
                          <TableContainer
                            component={Paper}
                            sx={{ marginTop: '10px', borderRadius: '0' }}>
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell align="center">Serial #</StyledTableCell>
                                  <StyledTableCell align="center">ID</StyledTableCell>
                                  <StyledTableCell align="center">Full Name</StyledTableCell>
                                  <StyledTableCell align="center">Email Address</StyledTableCell>
                                  <StyledTableCell align="center">Mobile Number</StyledTableCell>
                                  <StyledTableCell align="center">Roles</StyledTableCell>
                                  <StyledTableCell align="center">View</StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {(
                                  staffDetails.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage,
                                  ) || []
                                ).map((item: IStaff, index: number) => {
                                  return (
                                    <StyledTableRow
                                      sx={{ cursor: 'pointer', '& .MuiTableCell-root': { py: 1 } }}
                                      key={`edit_${index}`}
                                      onClick={() => router.push(`/staff/${item.name}`)}>
                                      <StyledTableCell align="center">{item.id}</StyledTableCell>
                                      <StyledTableCell align="center">{item.id}</StyledTableCell>
                                      <StyledTableCell align="center">{item.name}</StyledTableCell>
                                      <StyledTableCell align="center">
                                        <Link sx={{ color: '#2E5BFF' }}>{item.email}</Link>
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {item.phoneNumber}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">{item.role}</StyledTableCell>
                                      <StyledTableCell align="center">
                                        <PlayCircleOutlineIcon
                                          sx={{ color: '#2E5BFF' }}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                          }}
                                        />
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3,
                            px: 2,
                            py: 1,
                          }}>
                          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                            <Typography text="Items per Page:" color="#2B388C" fontWeight={700} />
                            <FormControl>
                              <Select
                                sx={{
                                  height: '30px',
                                  color: '#2E5BFF',
                                  fontWeight: 700,
                                  border: 'none',
                                  '& fieldset': { border: 'none !important' },
                                  '& svg': { position: 'absolute', right: '12px' },
                                }}
                                id="demo-simple-select"
                                value={rowsPerPage}
                                onChange={(e) => {
                                  setRowsPerPage(e.target.value as number);
                                  setPage(0);
                                }}>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                              </Select>
                            </FormControl>
                            <Typography
                              fontWeight={700}
                              text={`1–${rowsPerPage} of ${staffDetails.length}
                            items`}
                              color="#2B388C"
                            />
                          </Box>
                          <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                            {' '}
                            {/*do not delete this code*/}
                            <FormControl>
                              <Select
                                sx={{
                                  height: '30px',
                                  color: '#2E5BFF',
                                  fontWeight: 700,
                                  border: 'none',
                                  '& fieldset': { border: 'none !important' },
                                  '& svg': { position: 'absolute', right: '12px' },
                                }}
                                id="demo-simple-select"
                                value={page}
                                onChange={(e) => setPage(e.target.value as number)}>
                                {Array.from({
                                  length: Math.ceil(staffDetails.length / rowsPerPage),
                                }).map((_, index) => (
                                  <MenuItem key={index} value={index}>
                                    {index + 1}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <Typography
                              text={`1–10 of ${
                                Array.from({
                                  length: Math.ceil(staffDetails.length / rowsPerPage),
                                }).length
                              } Pages`}
                              color="#2B388C"
                              fontWeight={700}
                            />
                            <SvgIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={handleDecrease}
                              icon="LeftArrow"
                              viewBox="0 0 26 26"
                            />
                            <SvgIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={handleIncrease}
                              icon="RightArrow"
                              viewBox="0 0 26 26"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OfficeDetail;
