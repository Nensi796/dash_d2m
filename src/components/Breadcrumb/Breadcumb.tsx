import React, { MouseEvent } from 'react';
import { Box, Button, Typography, Breadcrumbs } from '@mui/material';
import SvgIcon from '@components/SvgIcon';

export interface IRouteListItem {
  /**
   * The page name that shows menu name.
   */
  pageName?: string;

  /**
   * The pathname for redirect user when click on menu.
   */
  pathName?: string;
  /** The route name for navigation */
  routeName?: string;
  isActive?: boolean;
}
interface IBreadcrumbProps {
  isNavbar?: boolean;
  /**
   * An array that contain all the route name and pathname or some route's icon.
   */
  routeList?: IRouteListItem[];
  /**
   * The onClick is a function for get click on link.
   */
  onClick?: (pathName: string) => void;
}

const Breadcrumb = ({
  isNavbar = false,
  routeList = [{ routeName: '', pathName: '' }],
  onClick = () => null,
}: IBreadcrumbProps): JSX.Element => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>, pathName: string | undefined) => {
    event.preventDefault();
    if (onClick && pathName) {
      onClick(pathName);
    }
  };

  return (
    <Box role="presentation" sx={{ marginLeft: '-10px', width: '100%' }}>
      <Breadcrumbs
        separator={<SvgIcon sx={{ cursor: 'pointer' }} icon="RightArrow" viewBox="0 0 26 26" />}
        sx={{
          color: '#2E5BFF',
          backgroundColor: 'rgba(46, 91, 255, 0.08) !important',

          fontSize: '20px',
          background: 'rgba(46, 91, 255, 0.08)',
          borderRadius: '30px',
          '.MuiBreadcrumbs-separator': {
            letterSpacing: '-4px',
            mx: '2px',
          },
        }}
        aria-label="breadcrumb">
        {routeList?.map((routeData, index) => {
          const routeListLength = (routeList || []).length;
          const isActive = routeListLength === 1 ? true : routeListLength - 1 === index;

          return (
            <Button
              component="button"
              key={`${routeData?.routeName}_${index + 1}`}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                gap: '10px',
                padding: '6px 6px !important',
              }}
              onClick={(event) => handleClick(event, routeData?.pathName)}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 800,
                  fontSize: '12px',
                  ...(isNavbar &&
                    routeListLength > 2 &&
                    routeListLength === index + 1 && {
                      maxWidth: 145,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textTransform: 'none',
                      textOverflow: 'ellipsis',
                    }),
                  color: isActive ? '#33AC2E' : '#2E5BFF',
                }}>
                {routeData?.routeName}
              </Typography>
            </Button>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
