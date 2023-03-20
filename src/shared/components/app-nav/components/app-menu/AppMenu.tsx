import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState, KeyboardEvent, MouseEvent } from 'react';
import { Urls } from '../../../../../pages';
import { MenuLink } from './components';

export const AppMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <IconButton size="large" color="secondary" edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box component="div" role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <MenuLink to={Urls.SEARCH} i18nKey="search.pageTitle" />
            <MenuLink to={Urls.NAME} i18nKey="name.pageTitle" />
            <MenuLink to={Urls.RANK} i18nKey="rank.pageTitle" />

            <Divider sx={{ my: 1 }} />

            <MenuLink to={Urls.FAQ} i18nKey="faq.pageTitle" />
            <MenuLink to={Urls.FEEDBACK} i18nKey="feedback.pageTitle" />
          </List>
        </Box>
      </Drawer>
    </>
  );
};
