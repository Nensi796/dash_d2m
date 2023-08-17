import { SvgIcon as MuiSvgIcon, SvgIconProps } from '@mui/material';

import { ICONS } from '@assets';
import { IIcons } from '@assets';

interface ISvgIconProps extends SvgIconProps {
  /**
   * key of the icon
   */
  icon: keyof IIcons;
}

const SvgIcon = ({ icon, ...restProps }: ISvgIconProps): JSX.Element => (
  <MuiSvgIcon {...restProps}>{ICONS[`${icon}`]}</MuiSvgIcon>
);

export default SvgIcon;
