import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Faq, Feedback, Rank, Search } from '.';
import { Urls } from './config';

export const AppRoutes = () => {
  const { pathname } = useLocation();

  // Scroll to top after page change
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return (
    <Routes>
      <Route path={Urls.SEARCH} element={<Search />} />
      <Route path={Urls.FAQ} element={<Faq />} />
      <Route path={Urls.FEEDBACK} element={<Feedback />} />
      <Route path={Urls.RANK} element={<Rank />} />
    </Routes>
  );
};
