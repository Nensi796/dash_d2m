import { Box, Button, Divider } from '@mui/material';
import { Typography } from '@components/index';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IProspectData } from '@types';

interface IDashboardProps {
  setIsEditProspect: Dispatch<SetStateAction<boolean>>;
  prospectData: IProspectData;
}

const Dashboard = ({ setIsEditProspect, prospectData }: IDashboardProps) => {
  const [editProspect, setEditProspect] = useState<IProspectData>();


  useEffect(() => {
    setEditProspect(prospectData);
  }, [prospectData]);

  return (
    <Box sx={{ background: '#FFFFFF', width: '100%' }}>
      <Box sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'Capitalize',
              border: '2px solid #2E5BFF !important',
              color: '#2E5BFF !important',
              fontWeight: 800,
            }}
            onClick={() => setIsEditProspect(true)}>
            Edit
          </Button>
        </Box>
        <Box sx={{ display: 'flex', padding: '20px', gap: '20px' }}>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Prospect Information
            </Box>
            <Divider color="#2B388C" />
            <Box sx={{ paddingY: '16px', display: 'flex' }}>
              <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Prospect ID</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Full Name</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.fullName}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Telephone</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.phoneNumber}
                  </Typography>
                </Box>{' '}
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Address</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    123 Main St, Anytown Liverpool 12345
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Email</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Mortgage Details
            </Box>
            <Divider color="#2B388C" />
            <Box sx={{ paddingY: '16px', display: 'flex' }}>
              <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Loan amount</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {' '}
                    {editProspect?.mortgageDetails?.loanAmount}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Interest rate</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.mortgageDetails?.interestRates}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Term</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.mortgageDetails?.term}
                  </Typography>
                </Box>{' '}
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>
                    Monthly payment
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.mortgageDetails?.monthlyPayment}
                  </Typography>
                </Box>
              </Box>
            </Box>
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
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>{editProspect?.advisorID}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Advisor Name</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.adviser}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Admin</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.admin}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#B0BAC9' }}>Office</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#2E384D' }}>
                    {editProspect?.officeId}
                  </Typography>
                </Box>{' '}
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ color: '#2B388C', fontSize: '16px', fontWeight: 400, paddingBottom: '8px' }}>
              Status and Progress
            </Box>
            <Divider color="#2B388C" />
            <Box sx={{ paddingY: '16px', display: 'flex' }}>
              <Button
                variant="contained"
                sx={{
                  height: '30px',
                  textTransform: 'Capitalize',
                  background: 'rgba(46, 91, 255, 0.08) !important',
                  color: '#2E5BFF',
                  fontWeight: '800',
                  fontSize: '12px',
                }}>
                In progress
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
