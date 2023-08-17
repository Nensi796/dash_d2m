import { ReactNode, useState, useEffect, SyntheticEvent, useLayoutEffect } from 'react';
import { Box, styled, Tab, Tabs as MuiTabs, TabsProps } from '@mui/material';

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

interface ITab {
  title: string;
  render: ReactNode;
  isActive?: boolean;
}

interface ITabsProps extends TabsProps {
  tabs: ITab[];
  handleActiveTabChange?: (selectedTabIndex: number) => void;
}

const StyledTabs = styled(MuiTabs)<TabsProps>(({ theme }) => ({
  '& button': { padding: '15px 20px !important' },
  '& .MuiTab-root': {
    color: '#2B383E',
    background: 'rgba(46, 91, 255, 0.08)',
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'capitalize',
  },
  '& .MuiTab-root.Mui-selected': {
    color: '#2E5BFF',
    background: '#FFFFFF',
  },

  '& .MuiTabs-indicator': {
    background: '#FFFFFF',
  },
}));

const TabPanel = ({ children, value, index }: TabPanelProps): JSX.Element => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box>{children}</Box>}
  </div>
);

const Tabs = ({ tabs = [], handleActiveTabChange = () => null }: ITabsProps): JSX.Element => {
  let defaultIndex = 0;
  const activeTabIndex = tabs.findIndex((tab) => tab.isActive);
  if (activeTabIndex > -1) {
    defaultIndex = activeTabIndex + 1;
  }

  const [index, setIndex] = useState(defaultIndex);

  useEffect(() => {
    handleActiveTabChange(defaultIndex);
  }, [defaultIndex]);

  const handleTabChange = (event: SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
    handleActiveTabChange(newIndex);
  };

  return (
    <Box>
      <StyledTabs value={index} onChange={handleTabChange}>
        {tabs.map((tab, key) => (
          <Tab key={tab?.title} label={tab?.title} id={`${tab?.title}_${key}`} />
        ))}
      </StyledTabs>
      {tabs.map((tab, key) => (
        <TabPanel key={tab?.title} index={key} value={index}>
          {tab?.render}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Tabs;
