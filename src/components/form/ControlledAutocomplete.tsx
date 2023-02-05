import { Autocomplete, TextField } from '@mui/material';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export type ControlledAutocompleteOption = {
  value: string;
  label: string;
};

type ControlledAutocompleteProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Pick<
  ControllerProps<TFieldValues>,
  'control'
> & {
  name: TName;
  options: ControlledAutocompleteOption[];
  label: string;
};

export const ControlledAutocomplete = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  options,
}: ControlledAutocompleteProps<TFieldValues, TName>) => (
  <Controller<TFieldValues>
    control={control}
    name={name}
    render={({ field: { ref, onChange, ...field } }) => (
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        onChange={(_, data) => onChange(data)}
        renderInput={(params) => <TextField {...field} {...params} fullWidth inputRef={ref} label={label} />}
      />
    )}
  />
);
