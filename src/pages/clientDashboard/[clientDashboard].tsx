import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { get } from 'react-hook-form';
import {
  ClientNotification,
  ClientDashboard,
  ClientDocumentation,
  ClientReminders,
  ClientEdit,
} from '@components/ClientsInfo';
import Breadcrumbs from '@components/Breadcrumb';
import Tabs from '@components/Tabs';
import GET_CLIENT_ID from '@graphql/schema/getClientById.graphql';
import { useQuery } from '@apollo/client';

const ClientDetails = (): JSX.Element => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditClient, setIsEditClient] = useState<boolean>(false);
  const router = useRouter();
  const { clientDashboard } = router.query;

  const { data: getClientData } = useQuery(GET_CLIENT_ID, {
    fetchPolicy: 'network-only',
    variables: {
      clientId: clientDashboard,
    },
  });

  const clientData = get(getClientData, 'getClientById.client', []);

  const breadcrumbList = [
    {
      pathName: '/',
      routeName: 'Home',
    },
    {
      pathName: '/clients',
      routeName: 'ClientDashboard',
    },
    {
      pathName: `/${clientData?.fullName}`,
      routeName: `${clientData?.fullName}`,
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
              router.push('/clients');
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {!isEdit ? (
            <Box sx={{ fontSize: '24px', color: '#2B388C', fontWeight: '400', marginY: '20px' }}>
              {clientData?.fullName}
            </Box>
          ) : null}

          <Box>
            {!isEditClient && (
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'Capitalize',
                  border: '2px solid #2E5BFF !important',
                  fontWeight: 800,
                  color: '#2E5BFF !important',
                }}
                onClick={() => {
                  setIsEdit(true);
                  router.push(` /client/${clientData?.id}`);
                }}>
                Edit
              </Button>
            )}
          </Box>
        </Box>

        <Box>
          <Tabs
            tabs={[
              {
                title: 'Dashboard',
                render: <ClientDashboard clientData={clientData} />,
              },
              { title: 'Client Documentation', render: <ClientDocumentation /> },
              { title: 'Notification centre', render: <ClientNotification /> },
              { title: 'Reminders', render: <ClientReminders /> },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDetails;
