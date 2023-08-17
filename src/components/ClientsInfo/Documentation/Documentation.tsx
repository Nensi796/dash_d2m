import {
  Box,
  Divider,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Button,
  TableCell,
  tableCellClasses,
  styled,
  Grid,
  OutlinedInput,
} from '@mui/material';
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';

interface Ifiles {
  document_name: string | null;
  date: any;
}

const tableTitles = [
  'PROOF OF IDENTITY / PROOF OF ADDRESS',
  'PROOF OF INCOME AND EXPENDITURE',
  'DEPOSIT',
  'ADDITIONAL DOCUMENTS',
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: '1px solid #2B388C',
    color: '#2B388C',
    fontSize: '12 !important',
    fontWeight: '500 !important',
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: '0',
    fontSize: '12 !important',
    fontWeight: 400,
    color: '#111111',
  },
}));

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down(1200)]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  [theme.breakpoints.up(1200)]: {
    display: 'flex',
    flexDirection: 'row',
    gap: 22,
  },
}));

const SubRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down(1200)]: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',

    backgroundColor: '#2e5bff14',
    p: 2,
    mt: 2,
    width: '100%',
  },
  [theme.breakpoints.up(1200)]: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',

    backgroundColor: '#2e5bff14',
    width: '23%',
    p: 2,
    mt: 2,
  },
}));
const Documentation = () => {
  const uploadRef = useRef(null);
  const [documents, setDocuments] = useState<Ifiles>();
  const [identityData, setIdentityData] = useState<Ifiles[]>([
    { document_name: 'DocumentName', date: '22/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '24/01/2023' },
  ]);
  const [incomeData, setIncomeData] = useState<Ifiles[]>([
    { document_name: 'DocumentName', date: '22/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '24/01/2023' },
  ]);
  const [depositData, setDepositData] = useState<Ifiles[]>([
    { document_name: 'DocumentName', date: '22/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '24/01/2023' },
  ]);
  const [additionalDocuments, setAdditionalDocuments] = useState<Ifiles[]>([
    { document_name: 'DocumentName', date: '22/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '23/01/2023' },
    { document_name: 'DocumentName', date: '24/01/2023' },
  ]);
  const getData = useCallback(
    (value: any) => {
      let list: Ifiles[] = [];
      if (value === 'PROOF OF IDENTITY / PROOF OF ADDRESS') {
        list = identityData;
      }
      if (value === 'PROOF OF INCOME AND EXPENDITURE') {
        list = incomeData;
      }
      if (value === 'DEPOSIT') {
        list = depositData;
      }
      if (value === 'ADDITIONAL DOCUMENTS') {
        list = additionalDocuments;
      }
      return list;
    },
    [identityData, incomeData, additionalDocuments, depositData],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    {
      files && console.log(files[0]);
    }
    setDocuments({
      ...documents,
      document_name: files && (files[0].name as string),
      date: dayjs(new Date()).format('DD/MM/YYYY'),
    });
    if (name === 'PROOF OF INCOME AND EXPENDITURE') {
      setIncomeData([
        ...incomeData,
        {
          ...documents,
          document_name: files && files[0].name,
          date: dayjs(new Date()).format('DD/MM/YYYY'),
        },
      ]);
    }
    if (name === 'PROOF OF IDENTITY / PROOF OF ADDRESS') {
      setIdentityData([
        ...identityData,
        {
          ...documents,
          document_name: files && files[0].name,
          date: dayjs(new Date()).format('DD/MM/YYYY'),
        },
      ]);
    }
    if (name === 'DEPOSIT') {
      setDepositData([
        ...depositData,
        {
          ...documents,
          document_name: files && files[0].name,
          date: dayjs(new Date()).format('DD/MM/YYYY'),
        },
      ]);
    }
    if (name === 'ADDITIONAL DOCUMENTS') {
      setAdditionalDocuments([
        ...additionalDocuments,
        {
          ...documents,
          document_name: files && files[0].name,
          date: dayjs(new Date()).format('DD/MM/YYYY'),
        },
      ]);
    }
  };

  return (
    <Box sx={{ background: '#FFFFFF', width: '100%' }}>
      <Box p={4}>
        <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
          Documents Upload
        </Box>
        <Divider color="#2B388C" />
        <Root>
          {tableTitles.map((title, index) => {
            return (
              <SubRoot key={index}>
                <label style={{ fontSize: '14px', fontWeight: 400, marginBottom: '5px' }}>
                  PROOF OF IDENTITY / PROOF OF ADDRESS
                </label>
                <Box mt={2} mb={4}>
                  <TableContainer>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>#</StyledTableCell>
                          <StyledTableCell align="left">Name</StyledTableCell>
                          <StyledTableCell align="left">Date</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getData(title).map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableCell align="left">{index + 1}</StyledTableCell>
                            <StyledTableCell
                              align="left"
                              sx={{ color: '#2E5BFF !important', textDecoration: 'underline' }}>
                              {item.document_name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{item.date}</StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: '280px',
                      textTransform: 'Capitalize',
                      backgroundColor: '#2e5bff14 !important',
                      color: '#2E5BFF',
                      fontWeight: 800,
                    }}
                    onClick={() => console.log('reset')}>
                    Export
                  </Button>
                  <OutlinedInput
                    name={title}
                    ref={uploadRef}
                    id="contained-button-file"
                    type="file"
                    placeholder="Please enter Staff Name"
                    onChange={handleFileChange}
                    sx={{
                      width: '100%',
                      height: '40px',
                      background: 'rgba(224, 231, 255, 0.2)',
                      border: '2px solid #E0E7FF',
                      '& input': {
                        paddingX: '10px',
                        fontWeight: 800,
                        color: '#2E5BFF',
                        textAlign: 'center',
                      },
                      '& input[type="file"]::file-selector-button': {
                        display: 'none',
                      },
                    }}
                  />
                </Box>
              </SubRoot>
            );
          })}
        </Root>
      </Box>
    </Box>
  );
};
export default Documentation;
