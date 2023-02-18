import { MenuItem, TextField } from '@mui/material';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { ControlledSelectOption } from './types';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Pick<
  ControllerProps<TFieldValues>,
  'control'
> & {
  name: TName;
  options: ControlledSelectOption<TFieldValues, TName>[];
  label: string;
};

export const ControlledSelect = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  options,
}: Props<TFieldValues, TName>) => (
  <Controller<TFieldValues>
    control={control}
    name={name}
    render={({ field }) => (
      <TextField {...field} label={label} select fullWidth>
        {options.map(({ value, label }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);
