import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Link } from '@mui/material';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

export const ShowMoreToggler = ({ expanded, setExpanded }: Props) => {
  const { t } = useTranslation();

  const handleToggle: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    setExpanded((prev) => !prev);
  };

  return (
    <Link component="button" variant="body2" onClick={handleToggle} display="flex" underline="hover" sx={{ m: 'auto' }}>
      {expanded ? (
        <>
          <Trans t={t} i18nKey="common.showLess" />
          <KeyboardArrowUp fontSize="small" />
        </>
      ) : (
        <>
          <Trans t={t} i18nKey="common.showMore" />
          <KeyboardArrowDown fontSize="small" />
        </>
      )}
    </Link>
  );
};
