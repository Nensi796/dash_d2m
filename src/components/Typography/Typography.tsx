import { useMemo, CSSProperties, ReactNode } from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { HtmlTags } from '@types';

interface ITypographyProps extends TypographyProps {
  text?: ReactNode;
  tag?: HtmlTags;
  style?: CSSProperties;
  gutterBottom?: boolean;
  children?: ReactNode;
}

const Typography = ({
  children,
  text = '',
  style = {},
  tag = 'body1',
  gutterBottom = false,
  ...restProps
}: ITypographyProps): JSX.Element => {
  const typoStyle = useMemo(() => ({ ...style }), [style]);

  return (
    <MuiTypography {...restProps} variant={tag} style={typoStyle} gutterBottom={gutterBottom}>
      {text || children}
    </MuiTypography>
  );
};

export default Typography;
