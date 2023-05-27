import { CircleFlag } from 'react-circle-flags';
import { Lang } from '../../../../types';
import { COUNTRY_FLAG_BY_LANG } from './config';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  lang: Lang;
};

export const LangItem = ({ lang }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip arrow enterTouchDelay={100} title={t(`search.form.langs.options.${lang.toLowerCase()}`)}>
      <Box display="inline-flex">
        <CircleFlag countryCode={COUNTRY_FLAG_BY_LANG[lang]} width={16} height={16} title={' '} />
      </Box>
    </Tooltip>
  );
};
