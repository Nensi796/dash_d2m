import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  linearProgressClasses,
} from '@mui/material';
import React from 'react';
import { Typography } from '@components';
import { IGetClientDetails } from '@types';

const MortgageTypeData = [
  'Authorised by client to proceed',
  'Acceptable forms of ID received',
  'Proof of Income/Bank Statements received',
  'Proof of deposit received',
  'Decision in Principle',
  'Supporting documentation received',
  'Survey instructed',
  'Mortgage offered',
];

interface IDashboardProps {
  clientData: IGetClientDetails;
}
const Dashboard = ({ clientData }: IDashboardProps) => {
  return (
    <Box sx={{ background: '#FFFFFF', width: '100%' }}>
      <Box sx={{ padding: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            padding: '20px',
            gap: '20px',
          }}>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Client Details
            </Box>
            <Divider color="#2B388C" />
            <Box
              sx={(theme) => ({
                paddingY: '16px',
                display: 'flex',
                [theme.breakpoints.down(1200)]: {
                  flexDirection: 'column',
                },
              })}>
              <Box
                sx={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Client ID</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Full Name</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.fullName}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Telephone</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.correspondence?.phoneNumber}
                  </Typography>
                </Box>{' '}
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>DOB</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.dob}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Email ID </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.correspondence?.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>
                    Property Number
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>12</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address 2</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    Bachestation Road
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address 3</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>Huntington</Typography>
                </Box>{' '}
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address 4</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>Cheshire</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>PostCode</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.correspondence?.postCode}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Mortgage Property
            </Box>
            <Divider color="#2B388C" />

            {clientData?.mortgageProperty?.map((list, index) => {
              return (
                <Box
                  key={`mortgageProperty-${index}`}
                  sx={(theme) => ({
                    paddingY: '16px',
                    display: 'flex',
                    [theme.breakpoints.down(1200)]: {
                      flexDirection: 'column',
                    },
                  })}>
                  <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>
                        Property Number
                      </Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        {list?.propertyNumber}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address 2</Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        18 Highfield Lane
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address 3</Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        Trampoline
                      </Typography>
                    </Box>{' '}
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address 4</Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>Cheshire</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Postcode </Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        {' '}
                        {list?.postCode}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>
                        Solicitor Name
                      </Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        {clientData?.solicitorDetails?.fullName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>
                        Solicitor Number
                      </Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        {clientData?.solicitorDetails?.phoneNumber}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>
                        Solicitor Email{' '}
                      </Typography>
                      <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                        {clientData?.solicitorDetails?.email}
                      </Typography>
                    </Box>{' '}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Advisor Details
            </Box>
            <Divider color="#2B388C" />
            <Box sx={{ paddingY: '16px', display: 'flex' }}>
              <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Advisor ID</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.adviser}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Advisor Name</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>John Elias</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Office</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {clientData?.officeId}
                  </Typography>
                </Box>{' '}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '100%', padding: '20px' }}>
          <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
            Application Status
          </Box>

          <Box sx={{ width: '98%', marginTop: '10px' }}>
            <Box
              sx={{
                maxWidth: '98%',
                display: 'flex',
                gap: 2,

                alignItems: 'center',
                '& .MuiButtonBase-root-MuiButton-root': {
                  background: '#33AC2E',
                  fontWeight: 800,
                  fontSize: '16px',
                },
                '& .MuiButtonBase-root-MuiButton-root:hover': { background: '#33AC2E' },
              }}>
              <Divider color="#2B388C" sx={{ width: '98%' }} />
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'Capitalize',
                  border: '2px solid #2E5BFF !important',
                  fontWeight: 800,
                  color: '#2E5BFF !important',
                }}
                onClick={() => console.log('save')}>
                Edit
              </Button>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ mb: '2px', fontSize: '14px' }}>
                  Application Status Completed
                </Typography>
                <Typography sx={{ mb: '2px', fontSize: '12px' }}>40%</Typography>
              </Box>
              <LinearProgress
                sx={{
                  width: '100%',
                  height: 10,
                  borderRadius: 5,
                  [`&.${linearProgressClasses.colorPrimary}`]: {
                    backgroundColor: '#B0BAC9',
                  },
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                    backgroundColor: '#33AC2E',
                  },
                }}
                value={10}
                variant="determinate"
              />
            </Box>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <Box sx={{ width: '100%' }}>
                <Grid container spacing={1}>
                  {(MortgageTypeData || []).map((tag, index) => (
                    <Grid item xs={4} md={3} lg={3} xl={3} key={`MortgageType_${index}`}>
                      <Box sx={{ marginY: '10px', marginLeft: '8px' }}>
                        <FormControlLabel
                          key={index}
                          sx={{
                            '& .MuiTypography-root': {
                              fontSize: '14px',
                            },
                            '& .MuiCheckbox-root.Mui-checked': {
                              color: '#2E5BFF',
                            },
                          }}
                          control={
                            <Checkbox
                              size="small"
                              name={tag}
                              value={tag}
                              sx={{ color: '#4C575B' }}
                            />
                          }
                          label={tag}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
