import { EmojiEvents } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Rank } from '../../../../types';

type Props = {
  rank: Rank;
};

export const RankTag = ({ rank: { name, value } }: Props) => {
  const { t } = useTranslation();
  const rankName = t(`rank.form.rankName.options.${name}`);

  return (
    <Chip
      color="primary"
      icon={<EmojiEvents fontSize="small" />}
      label={`${value}. ${rankName}`}
      sx={(theme) => ({
        boxShadow: theme.shadows[4],
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        '.MuiChip-icon': {
          fontSize: 18,
        },
      })}
    />
  );
};
