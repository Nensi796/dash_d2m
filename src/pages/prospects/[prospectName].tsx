import Tabs from '@components/Tabs';
import {
  ProspectReminders,
  ProspectCommunication,
  ProspectDashboard,
} from '@components/ProspectsInfo';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import EditProspect from '@components/EditProspect/EditProspect';
import { useQuery } from '@apollo/client';
import GET_PROSPECT from '@graphql/schema/getProspectsById.graphql';
import { get } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2,
};
const ProspectsTabs = () => {
  const router = useRouter();
  const [isEditProspect, setIsEditProspect] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const prospectId = router.query.prospectName;

  const { loading, data: prospect } = useQuery(GET_PROSPECT, {
    fetchPolicy: 'network-only',
    variables: {
      prospectId: prospectId,
    },
  });
  console.log(prospect);
  const prospectData = get(prospect, 'getProspectById.prospect', []);

  const breadcrumbList = [
    {
      pathName: '/',
      routeName: 'Home',
    },
    {
      pathName: '/prospects',
      routeName: 'Prospects',
    },
    {
      pathName: `/${prospectData?.fullName}`,
      routeName: `${prospectData?.fullName}`,
    },
  ];

  return (
    <Box p={4}>
      <Box sx={{ paddingY: '15px', paddingX: '40px' }}>
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
              router.push('/prospects');
            }}>
            Back
          </Button>
          <Breadcrumbs
            routeList={breadcrumbList}
            onClick={(pathName: string | undefined) => router.push(pathName || '/')}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {' '}
          <Box sx={{ fontSize: '24px', color: '#2B388C', fontWeight: '400', marginY: '20px' }}>
            {prospectData?.fullName}
          </Box>
          {!isEditProspect ? (
            <Box>
              <Button
                onClick={() => setOpen(true)}
                sx={{
                  textTransform: 'capitalize',
                  height: '40px',
                  color: '#2E5BFF',
                  border: '2px solid #2E5BFF !important',
                  fontWeight: 700,
                }}
                variant="outlined"
                component="span">
                Convert to Client
              </Button>
              <Modal
                slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="New Applicant"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" sx={{ fontSize: '20px', color: '#2B388C' }}>
                      {prospectData?.fullName}-Confirm
                    </Typography>
                    <CloseIcon onClick={() => setOpen(false)} />
                  </Box>
                  <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
                    <Box>
                      <Typography id="modal-modal-title" sx={{ fontSize: '14px' }}>
                        Are you sure you want to move this Prospect to the Client list?
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 5 }}>
                      <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        sx={{
                          color: '#2E5BFF',
                          background: ' rgba(46, 91, 255, 0.08) !important',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        sx={{
                          background: '#2E5BFF !important',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}>
                        Confirm
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
              <Button
                variant="contained"
                sx={{
                  marginLeft: '10px',
                  background: '#2E5BFF !important',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}>
                Save & update
              </Button>
            </Box>
          ) : null}
        </Box>
        {isEditProspect ? (
          <EditProspect setIsEditProspect={setIsEditProspect} prospectData={prospectData} />
        ) : (
          <Box>
            <Tabs
              tabs={[
                {
                  title: 'Dashboard',
                  render: (
                    <ProspectDashboard
                      setIsEditProspect={setIsEditProspect}
                      prospectData={prospectData}
                    />
                  ),
                },
                { title: 'Communication', render: <ProspectCommunication /> },
                { title: 'Reminders', render: <ProspectReminders /> },
              ]}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProspectsTabs;
