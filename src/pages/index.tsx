import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  buttonClasses,
  LinearProgress,
  linearProgressClasses,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import GET_DASHBOARD_WIDGETS from '@graphql/schema/getDashboardWidgets.graphql';
import SvgIcon from '@components/SvgIcon';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import DashboardSidebar from '@components/DashboardSidebar';
import { IIcons } from '@assets';
import Loader from '@components/Loader';

interface IUseProgress {
  text: string;
  value: number;
}

const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
];

const CharOptions = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '90%',
  plugins: {
    legend: { display: false },
  },
};

const FrequentOperations = [
  { icon: 'AddImage', title: 'Add Client', value: 'NewClient' },
  { icon: 'AddImage', title: 'Add Prospect', value: 'AddProspects' },
  { icon: 'AddAdvisor', title: 'Add Advisor/Admin' },
  { icon: 'AddMessageTemplate', title: 'Add Message Template' },
  { icon: 'AddOffice', title: 'Add Office', value: 'AddOffice' },
  { icon: 'SendGroupNotification', title: 'Send Group ClientNotification' },
];

const UseProgress = (props: IUseProgress) => (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography sx={{ mb: '2px', fontSize: '12px' }}>{props.text}</Typography>
      <Typography sx={{ mb: '2px', fontSize: '12px' }}>{props.value}</Typography>
    </Box>
    <LinearProgress
      sx={() => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: '#B0BAC9',
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: '#2E5BFF',
        },
      })}
      value={props.value}
      variant="determinate"
    />
  </Box>
);

const DashboardPage = () => {
  const router = useRouter();

  const { loading: isDashboardWidgetsLoading, data: getDashboardWidgets } = useQuery(
    GET_DASHBOARD_WIDGETS,
    {
      fetchPolicy: 'network-only',
    },
  );

  const DashboardWidgets = getDashboardWidgets?.getDashboardWidgets;

  const ClientOverviewChartData = {
    labels: ['Active Clients', 'Inactive Clients'],
    datasets: [
      {
        data: [DashboardWidgets?.activeClients, DashboardWidgets?.inActiveClients],
        backgroundColor: ['#2E5BFF', '#FF3D3D'],
        borderWidth: 1,
      },
    ],
  };

  const ProspectOverviewChartData = {
    labels: ['Active Prospects', 'Inactive Prospects'],
    datasets: [
      {
        data: [DashboardWidgets?.activeProspects, DashboardWidgets?.inActiveProspects],
        backgroundColor: ['#33AC2E', '#FF3D3D'],
        borderWidth: 1,
      },
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '75%', background: '#E4E8F0', height: '100%' }}>
        <Box sx={{ mx: '5%', mt: '2%', gap: '2px' }}>
          <Breadcrumbs
            routeList={breadcrumbList}
            onClick={(pathName: string | undefined) => router.push(pathName || '/')}
          />
          <Typography sx={{ color: '#2B388C', fontWeight: 400, fontSize: '24px', my: '10px' }}>
            {' '}
            Dashboard{' '}
          </Typography>
          <Typography sx={{ color: '#2B388C', fontWeight: 400 }}> Widgets</Typography>
          <Divider
            sx={{
              mb: '20px',
              border: '2px solid #2B388C',
              color: '#2B388C',
              opacity: 0.3,
              mt: '15px',
            }}
          />
          {isDashboardWidgetsLoading ? (
            <Loader isFullScreen />
          ) : (
            <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Box
                sx={{
                  background: '#FFFFFF',
                  width: '33%',
                  fontSize: '16px',
                  pt: '10px',
                  pl: '10px',
                  pb: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Typography sx={{ color: '#2B388C', fontWeight: 400 }}> Client Overview</Typography>
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    gap: '20px',
                    ml: '30px',
                    mt: '10px',
                    [theme.breakpoints.down(1200)]: {
                      flexDirection: 'column',
                    },
                  })}>
                  <Box
                    sx={{
                      width: '60%',
                      position: 'relative',
                    }}>
                    <Doughnut
                      data={ClientOverviewChartData}
                      options={CharOptions}
                      width={80}
                      height={80}
                    />
                    <Box
                      sx={(theme) => ({
                        fontSize: '16px',
                        color: '#000000',
                        fontWeight: 500,
                        position: 'absolute',
                        width: '100%',
                        left: 0,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        bottom: '60px',
                        [theme.breakpoints.down(1200)]: {
                          bottom: '30px',
                        },
                        [theme.breakpoints.down(1000)]: {
                          bottom: '10px',
                        },
                      })}>
                      <Typography
                        sx={(theme) => ({
                          fontSize: '12px',
                          fontWeight: 400,
                          [theme.breakpoints.down(1000)]: {
                            bottom: '8px',
                          },
                        })}>
                        Total Client
                      </Typography>
                      <Typography
                        sx={(theme) => ({
                          fontSize: '32px',
                          [theme.breakpoints.down(1200)]: {
                            fontSize: '20px',
                          },
                        })}>
                        {DashboardWidgets?.totalClients}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '40%' }}>
                    {ClientOverviewChartData.datasets[0].data.map((ele, i) => (
                      <Box
                        key={`data_${i + 1}`}
                        sx={(theme) => ({
                          display: 'flex',
                          flexDirection: 'column',

                          [theme.breakpoints.down(1200)]: {
                            flexDirection: 'row',
                            alignItems: 'center',
                          },
                        })}>
                        {' '}
                        <Box
                          sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            mt: '25px',
                            [theme.breakpoints.down(1200)]: { mt: '10px' },
                          })}>
                          <Box
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: ClientOverviewChartData.datasets[0].backgroundColor[i],
                            }}
                          />
                          <Typography sx={{ fontSize: '12px' }}>
                            {ClientOverviewChartData.labels[i]}
                          </Typography>
                        </Box>
                        <Typography
                          sx={(theme) => ({
                            fontSize: '32px',
                            [theme.breakpoints.down(1200)]: { fontSize: '20px', m: 'auto' },
                          })}>
                          {ele}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  background: '#FFFFFF',
                  width: '33%',
                  fontSize: '16px',
                  pt: '10px',
                  pl: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Typography sx={{ color: '#2B388C', fontWeight: 400 }}>
                  {' '}
                  Prospect Overview
                </Typography>
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    gap: '20px',
                    ml: '30px',
                    mt: '10px',
                    [theme.breakpoints.down(1200)]: {
                      flexDirection: 'column',
                    },
                  })}>
                  <Box
                    sx={{
                      width: '60%',
                      position: 'relative',
                    }}>
                    <Doughnut
                      data={ProspectOverviewChartData}
                      options={CharOptions}
                      width={100}
                      height={50}
                    />
                    <Box
                      sx={(theme) => ({
                        fontSize: '16px',
                        color: '#000000',
                        fontWeight: 500,
                        position: 'absolute',
                        width: '100%',
                        left: 0,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        bottom: '60px',
                        [theme.breakpoints.down(1200)]: {
                          bottom: '30px',
                        },
                        [theme.breakpoints.down(1000)]: {
                          bottom: '10px',
                        },
                      })}>
                      <Typography
                        sx={(theme) => ({
                          fontSize: '12px',
                          fontWeight: 400,
                          [theme.breakpoints.down(1000)]: {
                            bottom: '8px',
                          },
                        })}>
                        Total Prospect
                      </Typography>
                      <Typography
                        sx={(theme) => ({
                          fontSize: '32px',
                          [theme.breakpoints.down(1200)]: {
                            fontSize: '20px',
                          },
                        })}>
                        {DashboardWidgets?.totalProspects}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '40%' }}>
                    {ProspectOverviewChartData?.datasets?.[0]?.data.map((ele, i) => (
                      <Box
                        key={i}
                        sx={(theme) => ({
                          display: 'flex',
                          flexDirection: 'column',

                          [theme.breakpoints.down(1200)]: {
                            flexDirection: 'row',
                            alignItems: 'center',
                          },
                        })}>
                        {' '}
                        <Box
                          sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            mt: '25px',
                            [theme.breakpoints.down(1200)]: { mt: '10px' },
                          })}>
                          <Box
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: ProspectOverviewChartData.datasets[0].backgroundColor[i],
                            }}
                          />
                          <Typography sx={{ fontSize: '12px' }}>
                            {ProspectOverviewChartData.labels[i]}
                          </Typography>
                        </Box>
                        <Typography
                          sx={(theme) => ({
                            [theme.breakpoints.down(1200)]: { fontSize: '20px', m: 'auto' },
                            fontSize: '32px',
                          })}>
                          {ele}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  background: '#FFFFFF',
                  width: '33%',
                  fontSize: '16px',
                  pt: '10px',
                  pl: '10px',
                }}>
                <Typography sx={{ color: '#2B388C', fontWeight: 400 }}>
                  {' '}
                  Clients by Office:
                </Typography>
                <Box sx={{ p: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {(DashboardWidgets?.clientsByOffice || []).map((ele: any, index: number) => {
                    return <UseProgress text={ele?.officeName} value={ele.total} key={index} />;
                  })}
                </Box>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              background: '#FFFFFF',
              width: '33%',
              fontSize: '16px',
              mt: '20px',
              pt: '10px',
              boxSizing: 'border-box',
              pl: '10px',
            }}>
            <Typography sx={{ color: '#2B388C', fontWeight: 400 }}> Recent Searches</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                py: '10px',
                px: '20px',
              }}>
              <Typography
                sx={{
                  color: '#494c5e',
                  fontWeight: 400,
                  borderBottom: '2px solid #E4E8F0',
                  fontSize: '12px',
                }}>
                {' '}
                Today
              </Typography>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <Box
                  sx={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2E5BFF' }}
                />
                <span style={{ fontSize: '12px' }}>John Doe</span>
              </Box>

              <Typography
                sx={{
                  color: '#2B388C',
                  fontWeight: 400,
                  borderBottom: '2px solid #E4E8F0',
                  fontSize: '12px',
                }}>
                {' '}
                Yesterday
              </Typography>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <Box
                  sx={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2E5BFF' }}
                />
                <span style={{ fontSize: '12px' }}>John Smith</span>
              </Box>

              <Typography
                sx={{
                  color: '#2B388C',
                  fontWeight: 400,
                  borderBottom: '2px solid #E4E8F0',
                  fontSize: '12px',
                }}>
                {' '}
                Last Week
              </Typography>
              <span style={{ color: '#E0E7FF', fontSize: '12px' }}>No Search found</span>
            </Box>
          </Box>
          <Typography sx={{ color: '#2B388C', fontWeight: 400, fontSize: '16px', mt: '20px' }}>
            {' '}
            Frequent Operations{' '}
          </Typography>
          <Divider
            sx={{
              mb: '20px',
              border: '2px solid #2B388C',
              color: '#2B388C',
              opacity: 0.3,
              mt: '10px',
            }}
          />
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: '10px' }}>
            {FrequentOperations.map((buttonEle, index) => {
              return (
                <Button
                  key={index}
                  variant="contained"
                  sx={{
                    textTransform: 'capitalize',
                    boxShadow: 'none',
                    [`&.${buttonClasses.contained}`]: {
                      color: '#2E384D',
                      backgroundColor: '#2E5BFF14',
                      padding: '10px 16px !important',
                      borderRadius: '4px !important',
                      fontWeight: 600,
                    },
                  }}
                  onClick={() => {
                    if (buttonEle.title === 'Add Office') {
                      buttonEle.value && router.push(`/office/newOffice`);
                    } else {
                      buttonEle.value && router.push(`/${buttonEle?.value.toLowerCase()}`);
                    }
                  }}
                  startIcon={<SvgIcon icon={buttonEle.icon as keyof IIcons} viewBox="0 0 26 26" />}>
                  <>
                    <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
                      {buttonEle.title}
                    </Typography>
                  </>
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Box>
      <DashboardSidebar />
    </Box>
  );
};
export default DashboardPage;
