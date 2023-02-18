import { Box, Container, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { TabNav, TabPanel } from '../../components';
import { CategoryTab, NameTab } from './components';

export const Search = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box pt={4} sx={(theme) => ({ backgroundColor: theme.palette.secondary.main })}>
        <Container>
          <Typography variant="h3" textAlign="center">
            Nevíte, co hrát?
          </Typography>

          <Box my={2}>
            <Typography variant="h5" textAlign="center">
              Najděte si hru přímo pro vás
            </Typography>
          </Box>
        </Container>

        <Box sx={(theme) => ({ borderBottom: 1, borderColor: 'divider', background: theme.palette.secondary.dark })}>
          <Container>
            <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
              <TabNav label="Podle parametrů" />
              <TabNav label="Podle jména" />
              <TabNav label="Novinky" />
            </Tabs>
          </Container>
        </Box>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        <CategoryTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <NameTab />
      </TabPanel>
    </>
  );
};
