import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  TableHead,
  InputAdornment,
  MenuItem,
  TableBody,
  TextField,
  Table,
  TableContainer,
  Paper,
  TableRow,
  styled,
  TableCell,
  tableCellClasses,
  InputLabel,
  Link,
  Button,
  Menu,
  Select,
} from '@mui/material';
import {
  SearchOutlined,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { debounce } from 'lodash';
import { useQuery } from '@apollo/client';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import Typography from '@components/Typography';
import { FilterModal } from '@components/Modals';
import { IFilterModal, IGetClientDetails } from '@types';
import { FormControl } from '@material-ui/core';
import SvgIcon from '@components/SvgIcon';
import { get } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LIST_CLIENTS from '@graphql/schema/listClients.graphql';
import Loader from '@components/Loader';

const tableColumns = [
  'Client ID',
  // 'Title',
  'Full Name',
  'Email Address',
  'Mobile Number',
  // 'Status',
  'Advisor',
  'Admin',
  'View',
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2E384D',
    color: theme.palette.common.white,
    borderLeft: '1px solid #FFFFFF',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 400,
    color: '#2B388C',
    backgroundColor: '#2e5bff14',
    borderLeft: '1px solid #FFFFFF',
    borderBottom: '1px solid #FFFFFF',
  },
}));
const StyledTableRow = styled(TableRow)(({}) => ({
  '&:nth-of-type': {
    backgroundColor: '#2e5bff14',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '0px solid !important',
  },
}));
const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
  {
    pathName: '/clients',
    routeName: 'Clients',
  },
];
const Clients = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [filterData, setFilterData] = useState<IFilterModal | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selectId, setSelectId] = useState<string>();

  const { loading: clientsLoading, data: listClients } = useQuery(LIST_CLIENTS, {
    fetchPolicy: 'network-only',
    variables: {
      offset: null,
      limit: null,
      filter: {
        name: searchValue,
      },
      sort: {
        fieldName: 'fullName',
        order: 'ASC',
      },
    },
  });

  const clientsData = get(listClients, 'listClients.nodes', []);

  const open = useMemo(() => {
    return !!anchorEl;
  }, [anchorEl]);
  const getFilterData = (data: IFilterModal) => {
    setFilterData(data);
  };

  const getData = useCallback(
    (value: string) => {
      const advisors = [...new Set(clientsData.map((item: IGetClientDetails) => item.adviser))];
      // const status = [...new Set(list.map((item) => item.status))];
      const admin = [...new Set(clientsData.map((item: IGetClientDetails) => item.admin))];

      if (value === 'adviser') {
        return advisors;
      }
      // if (value === 'status') {
      //   return status;
      // }
      if (value === 'admin') {
        return admin;
      } else return null;
    },
    [clientsData],
  );

  const clientList = useMemo(() => {
    if (!clientsLoading) {
      if (filterData) {
        return clientsData.filter(
          (ele: IGetClientDetails) =>
            // ele.status.toLocaleLowerCase() === filterData?.status?.toLocaleLowerCase() ||
            ele.adviser?.toLocaleLowerCase() === filterData?.adviser?.toLocaleLowerCase() ||
            ele.admin?.toLocaleLowerCase() === filterData?.admin?.toLocaleLowerCase(),
        );
      }

      return clientsData;
    }
  }, [searchValue, filterData, clientsLoading]);

  const handleIncrease = () => {
    if (
      page >=
      Array.from({
        length: Math.ceil(clientList?.length / rowsPerPage),
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);

  return (
    <Box sx={{ paddingY: '15px', paddingX: '40px' }}>
      <Box p={4}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
          <Button
            variant="text"
            startIcon={<KeyboardArrowLeftIcon />}
            sx={{
              textTransform: 'Capitalize',
              fontWeight: 800,
              color: '#2E5BFF !important',
            }}
            onClick={() => {
              router.push('/');
            }}>
            Back
          </Button>
          <Breadcrumbs
            routeList={breadcrumbList}
            onClick={(pathName: string | undefined) => router.push(pathName || '/')}
          />
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', mt: 2 }}>
          <Typography mt={2} sx={{ fontWeight: 400, fontSize: '24px' }} color="#2B388C">
            Clients List
          </Typography>
          <Button
            onClick={() => router.push('/newclient')}
            type="submit"
            variant="contained"
            sx={{
              width: '150px',
              height: '44px',
              backgroundColor: '#2E5BFF !important',
              fontWeight: '600',
              fontSize: '12px',
              textTransform: 'Capitalize',
              lineHeight: 1.75,
            }}>
            Add New Client
          </Button>
        </Box>
      </Box>
      {clientsLoading ? (
        <Loader isFullScreen />
      ) : (
        <Box p={3} ml={3} mr={3} sx={{ backgroundColor: 'white', borderRadius: '4px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Enter Details</Typography>
          <Box mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              autoFocus={!!searchValue}
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search for something..."
              sx={{
                mr: 2,
                color: '#8798AD',
                background: 'rgba(224, 231, 255, 0.2)',
              }}
              InputProps={{
                sx: {
                  color: '#8798AD',
                  '&, & input': {
                    maxHeight: '40px',
                  },
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined
                      sx={{ color: '#545151' }}
                      onClick={() => {
                        console.log('search data');
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', position: 'relative !important' }}>
              {filterData && (
                <Button
                  onClick={() => {
                    setFilterData(null);
                  }}
                  sx={{
                    color: '#2E5BFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                  endIcon={<CloseIcon sx={{ width: '10px', height: '10px' }} />}>
                  {/*{filterData}*/}
                </Button>
              )}
              <InputLabel
                sx={{
                  color: '#2E5BFF !important',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 700,
                  fontSize: '15px',
                }}
                onClick={() => setOpenFilterModal(true)}
                id="demo-controlled-open-select-label">
                Filter by <KeyboardArrowDownIcon />
              </InputLabel>
              <FilterModal
                getData={getData as any}
                openFilterModal={openFilterModal}
                setOpenFilterModal={setOpenFilterModal}
                getFilterData={getFilterData}
              />
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ marginTop: '10px', borderRadius: '0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableColumns.map((ele, index) => (
                    <StyledTableCell key={index} align="center">
                      {ele}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(
                  (clientList?.length &&
                    clientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)) ||
                  []
                ).map((item: IGetClientDetails, index: number) => (
                  <StyledTableRow
                    sx={{ cursor: 'pointer' }}
                    key={`edit_${index}`}
                    onClick={() => router.push(`/clientDashboard/${item?.id}`)}>
                    <StyledTableCell align="center">{item.id}</StyledTableCell>
                    {/*<StyledTableCell align="center">{item.title}</StyledTableCell>*/}
                    <StyledTableCell align="center">{item.fullName}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Link sx={{ color: '#2E5BFF' }}>{item.correspondence.email}</Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.correspondence.phoneNumber}
                    </StyledTableCell>
                    {/*<StyledTableCell align="center">{item.status}</StyledTableCell>*/}
                    <StyledTableCell align="center">{item.adviser}</StyledTableCell>
                    <StyledTableCell align="center">{item.admin}</StyledTableCell>
                    <StyledTableCell align="center">
                      <MoreVertIcon
                        sx={{ color: '#2E5BFF' }}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          setAnchorEl(event?.target as HTMLElement);
                          setSelectId(item?.id);
                        }}
                      />
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setAnchorEl(null);
                            router.push(` /client/${selectId}`);
                          }}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setAnchorEl(null);
                          }}>
                          Delete
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setAnchorEl(null);
                            router.push(` /clientDashboard/${selectId}`);
                          }}>
                          View
                        </MenuItem>
                      </Menu>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              backgroundColor: 'rgba(46, 91, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              px: 2,
              py: 1,
            }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </FormControl>
              <Typography
                fontWeight={700}
                text={`1–${rowsPerPage} of ${clientList?.length}
             items`}
                color="#2B388C"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {' '}
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
                  {Array.from({ length: Math.ceil(clientList?.length / rowsPerPage) }).map(
                    (_, index) => (
                      <MenuItem key={index} value={index}>
                        {index + 1}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
              <Typography
                text={` of ${
                  Array.from({
                    length: Math.ceil(clientList?.length / rowsPerPage),
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
      )}
    </Box>
  );
};
export default Clients;
