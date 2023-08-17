import React, { useCallback, useMemo, useState } from 'react';
import Typography from '@components/Typography';
import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  MoreVert as MoreVertIcon,
  SearchOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import ReviewFilterModal from '@components/Modals/ReviewFilterModal';
import { IReviewFilterData, IReviewDetails } from '@types';
import { FormControl } from '@material-ui/core';
import SvgIcon from '@components/SvgIcon';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const StyledTableRow = styled(TableRow)(({}) => ({
  '&:nth-of-type': {
    backgroundColor: '#2e5bff14',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: '0px solid !important',
  },
}));
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

const columnTitles = [
  'Client ID',
  'Title',
  'Full Name',
  'Product Type',
  'Description',
  'Renewal Date',
  'View',
];

const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
  {
    pathName: '/review',
    routeName: 'Review',
  },
];
const reviewData: IReviewDetails[] = [
  {
    clientId: '123',
    title: 'adc',
    fullName: 'xyz',
    product_Type: 'active',
    description: '658',
    renewal_date: '12/08/2023',
    view: 'df',
  },
  {
    clientId: '1234',
    title: 'new review',
    fullName: 'xyz',
    product_Type: 'a@gmail.com',
    description: '654',
    renewal_date: '01/02/2022',
    view: 'df',
  },
  {
    clientId: '1235',
    title: 'adc',
    fullName: 'xyz',
    product_Type: 'expired',
    description: 'test',
    renewal_date: '25/01/2018',
    view: 'df',
  },
  {
    clientId: '1236',
    title: 'test',
    fullName: 'xyz',
    product_Type: 'type_first',
    description: 'description',
    renewal_date: '09/10/2018',
    view: 'df',
  },
  {
    clientId: '7',
    title: 'admin',
    fullName: 'xyza',
    product_Type: 'type_Second',
    description: 'xyz',
    renewal_date: '10/09/2018',
    view: 'df',
  },
];

const Review = () => {
  const router = useRouter();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterData, setFilterData] = useState<IReviewFilterData | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const open = useMemo(() => {
    return !!anchorEl;
  }, [anchorEl]);

  const getFilterData = (data: IReviewFilterData | null) => {
    setFilterData(data);
  };
  const reviewList = useMemo(() => {
    if (filterData) {
      return reviewData.filter(
        (ele) =>
          ele.product_Type.toLocaleLowerCase() === filterData?.product_Type?.toLocaleLowerCase() ||
          (filterData?.renewal_date &&
            new Date(ele.renewal_date).getTime() === new Date(filterData.renewal_date).getTime()) ||
          ele.description.toLowerCase() === filterData?.description?.toLocaleLowerCase(),
      );
    }
    if (searchValue) {
      return reviewData.filter((client) =>
        client?.fullName?.toLowerCase()?.includes(searchValue.toLowerCase()),
      );
    }
    return reviewData;
  }, [searchValue, filterData]);

  const handleIncrease = () => {
    if (
      page >=
      Array.from({
        length: Math.ceil(reviewList.length / rowsPerPage),
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

  const getFilterOptions = useCallback(
    (value: string) => {
      const productTypes = [...new Set(reviewList.map((item) => item.product_Type))];
      if (value === 'product_Type') {
        return productTypes;
      } else return null;
    },
    [reviewList],
  );

  return (
    <Box sx={{ padding: '20px' }}>
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
        <Typography mt={2} sx={{ fontWeight: 400, fontSize: '24px' }} color="#2B388C">
          Review List
        </Typography>
      </Box>
      <Box p={3} ml={3} mr={3} sx={{ backgroundColor: 'white', borderRadius: '4px' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>Enter Details</Typography>
        <Box mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
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
                  maxWidth: '600px',
                },
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: '#ffffff' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
            <ReviewFilterModal
              getFilterOptions={getFilterOptions}
              openFilterModal={openFilterModal}
              setOpenFilterModal={setOpenFilterModal}
              getFilterData={getFilterData}
            />
            <Button sx={{ color: '#2E5BFF', fontWeight: 700, textTransform: 'Capitalize' }}>
              Export All
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: '10px', borderRadius: '0' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columnTitles.map((ele, index) => (
                  <StyledTableCell key={index} align="center">
                    {ele}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                ? reviewList.map((item, index) => (
                    <StyledTableRow key={`review_${index}`}>
                      <StyledTableCell align="center">{item.clientId}</StyledTableCell>
                      <StyledTableCell align="center">{item.title}</StyledTableCell>
                      <StyledTableCell align="center">{item.fullName}</StyledTableCell>
                      <StyledTableCell align="center">{item.product_Type}</StyledTableCell>
                      <StyledTableCell align="center">{item.description}</StyledTableCell>
                      <StyledTableCell align="center">{item.renewal_date}</StyledTableCell>
                      <StyledTableCell align="center">
                        <MoreVertIcon
                          sx={{ color: '#2E5BFF' }}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setAnchorEl(event?.target as HTMLElement);
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
                              setAnchorEl(null);
                              e.stopPropagation();
                            }}>
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setAnchorEl(null);

                              e.stopPropagation();
                            }}>
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setAnchorEl(null);
                              e.stopPropagation();
                            }}>
                            View
                          </MenuItem>
                        </Menu>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                : (
                    reviewList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || []
                  ).map((item, index) => (
                    <StyledTableRow key={`review_${index}`}>
                      <StyledTableCell align="center">{item.clientId}</StyledTableCell>
                      <StyledTableCell align="center">{item.title}</StyledTableCell>
                      <StyledTableCell align="center">{item.fullName}</StyledTableCell>
                      <StyledTableCell align="center">{item.product_Type}</StyledTableCell>
                      <StyledTableCell align="center">{item.description}</StyledTableCell>
                      <StyledTableCell align="center">{item.renewal_date}</StyledTableCell>
                      <StyledTableCell align="center">
                        <MoreVertIcon
                          sx={{ color: '#2E5BFF' }}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setAnchorEl(event?.target as HTMLElement);
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
                              setAnchorEl(null);
                              e.stopPropagation();
                            }}>
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setAnchorEl(null);

                              e.stopPropagation();
                            }}>
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              setAnchorEl(null);
                              e.stopPropagation();
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
              text={`1–${rowsPerPage} of ${reviewList.length}
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
                {Array.from({ length: Math.ceil(reviewList.length / rowsPerPage) }).map(
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
                  length: Math.ceil(reviewList.length / rowsPerPage),
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
  );
};

export default Review;
