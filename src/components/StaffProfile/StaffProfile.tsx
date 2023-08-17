import Typography from '@components/Typography';
import { Avatar, Box, Button, Divider } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@components/Breadcrumb/Breadcumb';
import { useRouter } from 'next/router';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const breadcrumbList = [
  {
    pathName: '/',
    routeName: 'Home',
  },
  {
    pathName: '/staffProfile',
    routeName: 'Staff',
  },
];
const DataStyle = {
  fontWeight: 400,
  fontSize: '14px',
};

const HeadingStyle = {
  marginTop: '20px',
  fontWeight: 400,
  fontSize: '12px',
};
const staffDetails = {
  name: 'xyz',
  email: 't@gmail.com',
  phoneNo: 12345,
  advisorId: '456',
  role: 'admin',
  office: 'bvm',
};

const StaffProfile = () => {
  const router = useRouter();

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
            onClick={(pathName: string | undefined) => {
              router.push(pathName || '/');
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            alignItems: 'center',
          }}>
          <Typography
            color="#2B388C"
            style={{ marginTop: '8px', fontWeight: 400, fontSize: '24px' }}>
            Staff Detail
          </Typography>
          <Button
            onClick={() => router.push(`/staff/${staffDetails.name}`)}
            variant="outlined"
            sx={{
              borderWidth: '2px',
              borderColor: '#2E5BFF',
              color: '#2E5BFF',
              marginTop: '25px',
              textTransform: 'capitalize',
              float: 'right',
              marginRight: '20px',
              fontWeight: 800,
              fontSize: '14px',
            }}>
            Edit
          </Button>
        </Box>
      </Box>
      <Box
        mr={4}
        ml={4}
        p={2}
        sx={{
          backgroundColor: 'white',
          borderRadius: '4px',
        }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, xl: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography color="#2B388C">Personal Detail</Typography>
            <Divider sx={{ borderColor: '#2B388C' }} />
            <Avatar
              src="https://mui.com/static/images/avatar/1.jpg"
              alt="Remy Sharp"
              sx={{ marginTop: '20px' }}
            />
            <Typography sx={HeadingStyle} color="#B0BAC9">
              Name
            </Typography>
            <Typography sx={DataStyle}>{staffDetails.name}</Typography>
            <Typography sx={HeadingStyle} color="#B0BAC9">
              Email Address
            </Typography>
            <Typography sx={DataStyle}>{staffDetails.email}</Typography>
            <Typography sx={HeadingStyle} color="#B0BAC9">
              Telephone
            </Typography>
            <Typography
              sx={{
                marginBottom: '20px',
                fontWeight: 400,
                fontSize: '14px',
              }}>
              {staffDetails.phoneNo}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="#2B388C">Other Details</Typography>
            <Divider sx={{ borderColor: '#2B388C' }} />
            <Typography sx={HeadingStyle} color="#B0BAC9">
              Advisor ID
            </Typography>
            <Typography sx={DataStyle}>{staffDetails.advisorId}</Typography>
            <Typography sx={HeadingStyle} color="#B0BAC9">
              Role
            </Typography>
            <Typography sx={DataStyle}>{staffDetails.role}</Typography>
            <Typography sx={HeadingStyle} color="#B0BAC9">
              Office
            </Typography>
            <Typography sx={DataStyle}>{staffDetails.office}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StaffProfile;
