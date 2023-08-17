import React, { MouseEvent, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Menu,
  Grid,
  Avatar,
  AppBar,
  Button,
  Toolbar,
  Tooltip,
  MenuItem,
  Container,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import Image from 'next/image';
import { LogoImage } from '@assets';
import { useRouter } from 'next/router';
import { SearchOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { removeCookies } from 'cookies-next';
import SvgIcon from '@components/SvgIcon';

const NestedMenuItem = dynamic(() => import('mui-nested-menu').then((a) => a.NestedMenuItem), {
  ssr: false,
});

interface IAdministrationList {
  title: string;
  list?: string[];
}

const settings = ['Profile', 'Account', 'DashboardSidebar', 'Logout'];

const administrationList: IAdministrationList[] = [
  { title: 'Staffs', list: ['Add New Staffs', 'Edit Staffs'] },
  { title: 'Office', list: ['Add New Office', 'Edit Office'] },
  {
    title: 'Message Template',
  },
  { title: 'Group Notification' },
];

const useStyles = makeStyles({
  padding: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
});
interface IPages {
  pageName: string;
  pathName: string;
  isActive?: boolean;
}
interface IHeader {
  handleSearchModal: (value: boolean, text: string) => void;
}
export default function Header({ handleSearchModal }: IHeader) {
  const [pages, setPages] = useState<IPages[]>([
    { pageName: 'Dashboard', pathName: '/' },
    { pageName: 'Clients', pathName: '/clients' },
    { pageName: 'Prospects', pathName: '/prospects' },
    { pageName: 'Review', pathName: '/review' },
    { pageName: 'Administration', pathName: '/administration' },
    // { pageName: 'Notification', pathName: '/notification' },
  ]);
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    const pathName = router.pathname.split('/');
    setPages(
      pages.map((n) => ({
        ...n,
        isActive: !pathName[1] ? n?.pathName === '/' : n?.pathName?.includes(pathName[1]),
      })),
    );
  }, [router]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).innerText === 'Logout') {
      removeCookies('token');
      window.location.href = window.location.origin;
    } else if ((e.target as HTMLElement).innerText === 'Profile') {
      router.push('/staff');
    }
    setAnchorElUser(null);
  };

  const handleItemClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).innerText.includes('Edit')) {
      handleSearchModal(true, (e.target as HTMLElement).innerText.replace('Edit', 'Search'));
    } else if ((e.target as HTMLElement).innerText === 'Add New Staffs') {
      router.push('/newstaff');
    } else if ((e.target as HTMLElement).innerText === 'Add New Office') {
      router.push('/office/newOffice');
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth={false}
        sx={{
          background: '#2B388C',
          color: '#FFFFFF',
        }}>
        <Toolbar>
          <Grid container spacing={2} display="flex" alignItems="center">
            <Grid
              item
              md={1.5}
              xs={2}
              sx={(theme) => ({
                img: {
                  cursor: 'pointer',
                  [theme.breakpoints.down(1200)]: {
                    height: '40px',
                    width: '80px',
                  },
                },
              })}>
              <Image src={LogoImage} alt="Direct Mortgages" onClick={() => router.push('/')} />
            </Grid>

            <Grid item xs={6} md={7}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                {pages.map((page, i) => (
                  <Button
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    key={i}
                    onClick={(e) => {
                      if (page.pageName === 'Administration') {
                        handleClick(e);
                      } else if (page.pageName === 'Dashboard') {
                        router.push('/');
                      } else router.push(`/${page.pageName.toLowerCase()}`);
                    }}
                    sx={(theme) => ({
                      color: page?.isActive ? '#33AC2E' : '#FFFFFF',
                      my: 2,
                      mx: 1,
                      display: 'flex',
                      [theme.breakpoints.down(1200)]: {
                        fontSize: '11px',
                      },
                      fontWeight: '800',
                      textTransform: 'inherit',
                    })}>
                    {page.pageName}
                    {page.pageName === 'Administration' && <KeyboardArrowDownIcon />}
                  </Button>
                ))}
                <Menu
                  sx={{
                    '& .MuiPopover-paper': {
                      background: '#2B388C',
                      color: '#FFFFFF',
                      borderRadius: 0,
                      boxShadow: 'none',
                    },
                    '& .MuiMenuItem-root:hover': {
                      background: '#33AC2E',
                      color: '#FFFFFF',
                    },
                    '& .MuiButtonBase-root': {
                      m: '4px',
                      pl: '8px',
                      '& p': { pl: 0 },
                    },
                  }}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    classes: { padding: classes.padding },
                  }}>
                  {administrationList.map((user, index) =>
                    'list' in user ? (
                      <NestedMenuItem
                        label={user.title}
                        key={`administration_${index + 1}`}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              background: '#2B388C',
                              color: '#FFFFFF',
                              boxShadow: 'none',
                              borderRadius: 0,
                              '.MuiList-root': {
                                paddingTop: '4',
                                paddingBottom: '4',
                              },
                              '& .MuiMenuItem-root:hover': {
                                background: '#33AC2E',
                                color: '#FFFFFF',
                              },
                            },
                          },
                        }}
                        parentMenuOpen={open}>
                        {(user.list || []).map((lists, index) => (
                          <MenuItem onClick={handleItemClick} key={`list_${index + 1}`}>
                            {lists}
                          </MenuItem>
                        ))}
                      </NestedMenuItem>
                    ) : (
                      <MenuItem key={`administration_${index + 1}`} onClick={handleItemClick}>
                        {user.title}
                      </MenuItem>
                    ),
                  )}
                </Menu>
              </Box>
            </Grid>

            <Grid item md={3.5} xs={3} display="flex" justifyContent="flex-end">
              <Box sx={{ alignItems: 'center', display: 'flex', gap: '12px' }}>
                <TextField
                  placeholder="Search Names, Email Address"
                  sx={{
                    ml: 2,
                    color: '#ffffff',
                    borderRadius: '50px !important',
                    background: 'rgba(224, 231, 255, 0.2)',
                  }}
                  InputProps={{
                    sx: (theme) => ({
                      color: '#ffffff',
                      borderRadius: '50px !important',
                      '&, & input': {
                        maxHeight: '40px',
                        [theme.breakpoints.down(1200)]: {
                          maxWidth: '100px',
                        },
                        maxWidth: '255px',
                      },
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlined sx={{ color: '#ffffff' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  value="12"
                  sx={{
                    mr: 1,
                    color: '#8798AD',
                    borderRadius: '50px !important',
                    background: 'rgba(224, 231, 255, 0.2)',
                  }}
                  InputProps={{
                    sx: (theme) => ({
                      color: '#ffffff',
                      fontWeight: 800,
                      borderRadius: '50px !important',
                      '&, & input': {
                        maxHeight: '40px',
                        [theme.breakpoints.down(1200)]: {
                          maxWidth: '80px',
                        },
                        maxWidth: '80px',
                      },
                    }),
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            'svg path': {
                              stroke: '#FFFFFF',
                            },
                          }}>
                          <SvgIcon
                            icon="SendGroupNotification"
                            fill="#FFFFFF"
                            viewBox="0 0 26 26"
                          />{' '}
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
                <Tooltip title="Remy Sharp" arrow>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 4 }}>
                    <Avatar src="https://mui.com/static/images/avatar/1.jpg" alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
