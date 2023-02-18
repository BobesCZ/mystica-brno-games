import { Autocomplete, TextField } from '@mui/material';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Pick<
  ControllerProps<TFieldValues>,
  'control'
> & {
  name: TName;
  options: string[];
  label: string;
  multiple?: boolean;
  freeSolo?: boolean;
};

export const ControlledAutocomplete = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  options,
  multiple,
  freeSolo,
}: Props<TFieldValues, TName>) => (
  <Controller<TFieldValues>
    control={control}
    name={name}
    render={({ field: { ref, onChange, ...field } }) => (
      <Autocomplete
        options={options}
        onChange={(_, data) => onChange(data)}
        onInputChange={freeSolo ? (_, data) => onChange(data) : undefined}
        renderInput={(params) => <TextField {...field} {...params} fullWidth inputRef={ref} label={label} />}
        blurOnSelect
        multiple={multiple}
        freeSolo={freeSolo}
      />
    )}
  />
);
