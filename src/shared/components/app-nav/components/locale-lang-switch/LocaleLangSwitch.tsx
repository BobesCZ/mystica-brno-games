import { ToggleButtonGroup, ToggleButton, darken } from '@mui/material';
import { MouseEvent, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLang, localeLangOptions } from '../../../../locales';
import { AppContext } from '../../../../store';

export const LocaleLangSwitch = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();
  const { localeLang, setLocaleLang } = useContext(AppContext);

  const handleLangChange = (_e: MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null && Object.values(LocaleLang).includes(newValue as LocaleLang)) {
      setLocaleLang(newValue as LocaleLang);
      changeLanguage(newValue);
    }
  };

  return (
    <ToggleButtonGroup color="secondary" value={localeLang} exclusive onChange={handleLangChange} size="small">
      {localeLangOptions.map(({ label, value }) => (
        <ToggleButton
          key={value}
          value={value}
          sx={({ palette, spacing }) => ({
            color: darken(palette.primary.contrastText, 0.3),
            borderColor: darken(palette.primary.contrastText, 0.5),
            py: spacing(0.25),
          })}
        >
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
