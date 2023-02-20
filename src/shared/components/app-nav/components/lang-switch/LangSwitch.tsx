import { ToggleButtonGroup, ToggleButton, darken } from '@mui/material';
import { MouseEvent, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Lang, langOptions } from '../../../../locales';
import { AppContext } from '../../../../store';

export const LangSwitch = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();
  const { lang, setLang } = useContext(AppContext);

  const handleLangChange = (_e: MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null && Object.values(Lang).includes(newValue as Lang)) {
      setLang(newValue as Lang);
      changeLanguage(newValue);
    }
  };

  return (
    <ToggleButtonGroup color="secondary" value={lang} exclusive onChange={handleLangChange} size="small">
      {langOptions.map(({ label, value }) => (
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
