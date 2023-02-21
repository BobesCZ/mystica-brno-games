import { Box, Container, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabNav, TabPanel } from '../../shared/components';
import { CategoryTab, NameTab } from './components';

export const Search = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_e: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Box sx={(theme) => ({ borderBottom: 1, borderColor: 'divider', background: theme.palette.secondary.dark })}>
        <Container>
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: '-1px' }}>
            <TabNav label={t('search.tabnav.category')} />
            <TabNav label={t('search.tabnav.name')} />
          </Tabs>
        </Container>
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
