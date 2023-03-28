import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useState } from 'react';
import UnderGroupLocation from './UnderGroupLocation';
import UnderGroupActual from './UnderGroupActual';
import Header from '../../components/header';

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ padding: 0 }}>
      <div style={{ position: 'fixed', width: '100%', zIndex: 11111 }}>
        <Header />
      </div>

      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          borderBottom: 1,
          borderColor: 'divider',
          paddingTop: '4.5rem',
          backgroundColor: '#EFF0F3',
          zIndex: 1111,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          sx={{ backgroundColor: '#EFF0F3' }}
        >
          <Tab label="Step 1" {...a11yProps(0)} />
          <Tab label="Step 2" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div style={{ paddingTop: '7rem' }}>
        <TabPanel value={value} index={0}>
          <UnderGroupLocation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UnderGroupActual />
        </TabPanel>
      </div>
    </Box>
  );
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
