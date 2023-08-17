import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  TableHead,
  InputAdornment,
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
  Select,
  MenuItem,
} from '@mui/material';
import {
  SearchOutlined,
  PlayCircleOutline as PlayCircleOutlineIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import Typography from '@components/Typography';
import { FilterModal } from '@components/Modals';
import { IProspectDetails, IFilterModal } from '@types';
import { FormControl } from '@material-ui/core';
import SvgIcon from '@components/SvgIcon';
import GET_PROSPECTS_LIST from '@graphql/schema/listProspects.graphql';
import { useQuery } from '@apollo/client';
import { get } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Loader from '@components/Loader';

const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
  {
    pathName: '/prospects',
    routeName: 'Prospects',
  },
];

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
    backgroundColor: '#2e5bff14',
    borderLeft: '1px solid #ffffff',
    borderBottom: '1px solid #ffffff',
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

const tableColumns = [
  'Prospect ID',
  'Full Name',
  'Email Address',
  'Mobile Number',
  'Advisor',
  'View',
];

const Prospect = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [filterData, setFilterData] = useState<IFilterModal | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { loading: prospectsLoading, data: prospects } = useQuery(GET_PROSPECTS_LIST, {
    variables: {
      offset: 0,
      filter: {
        name: searchValue,
      },
      sort: {
        order: 'ASC',
        fieldName: 'fullName',
      },
    },
    fetchPolicy: 'network-only',
  });

  const prospectsList = get(prospects, 'listProspects.nodes', []);

  const getFilterData = (data: IFilterModal) => {
    setFilterData(data);
  };

  const clientList = useMemo(() => {
    if (!prospectsLoading) {
      if (filterData) {
        return prospectsList.filter(
          (ele: IProspectDetails) =>
            ele?.adviser?.toLocaleLowerCase() === filterData?.adviser?.toLocaleLowerCase(),
        );
      }

      return prospectsList;
    }
  }, [searchValue, filterData, prospectsLoading, prospectsList]);

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

  const getData = useCallback(
    (value: string) => {
      const advisors = !prospectsLoading &&
        prospectsList?.length && [
          ...new Set(prospectsList?.map((item: IProspectDetails) => item.adviser)),
        ];
      if (value === 'adviser' && !prospectsLoading && prospectsList?.length) {
        return advisors;
      } else return null;
    },
    [prospectsList],
  );

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
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
          }}>
          <Typography mt={2} sx={{ fontWeight: 400, fontSize: '24px' }} color="#2B388C">
            Prospect List
          </Typography>
          <Button
            onClick={() => router.push('/addprospects')}
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
            Add New Prospect
          </Button>
        </Box>
      </Box>
      {prospectsLoading ? (
        <Loader isFullScreen />
      ) : (
        <Box p={3} ml={3} mr={3} sx={{ backgroundColor: 'white', borderRadius: '4px' }}>
          <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Enter Details</Typography>
          <Box mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              autoFocus={!!searchValue}
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(event.target.value);
              }}
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

                    width: '100%',
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
                  endIcon={
                    <CloseIcon
                      onClick={(e) => {
                        e.preventDefault();
                        setFilterData(null);
                      }}
                      sx={{ width: '10px', height: '10px' }}
                    />
                  }>
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
                getData={getData}
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
                ).map((item: IProspectDetails, index: number) => (
                  <StyledTableRow
                    sx={{ cursor: 'pointer' }}
                    key={`edit_${index}`}
                    onClick={() => {
                      router.push(`/prospects/${item.id}`);
                    }}>
                    <StyledTableCell align="center">{item.id}</StyledTableCell>
                    {/*<StyledTableCell align="center">{item.title}</StyledTableCell>*/}
                    <StyledTableCell align="center">{item.fullName}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Link sx={{ color: '#2E5BFF' }}>{item.email}</Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.phoneNumber}</StyledTableCell>
                    <StyledTableCell align="center">{item.adviser}</StyledTableCell>
                    {/*<StyledTableCell align="center">{item.lastContacted}</StyledTableCell>*/}
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
                onClick={() => handleDecrease()}
                icon="LeftArrow"
                viewBox="0 0 26 26"
              />
              <SvgIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => handleIncrease()}
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

export default Prospect;
