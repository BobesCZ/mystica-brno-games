import { TextField } from '@mui/material';
import { Controller, ControllerProps, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export type ControlledTextFieldOption<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  value: ControllerRenderProps<TFieldValues, TName>['value'];
  label: string;
};

type ControlledTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Pick<
  ControllerProps<TFieldValues>,
  'control'
> & {
  name: TName;
  label: string;
};

export const ControlledTextField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
}: ControlledTextFieldProps<TFieldValues, TName>) => (
  <Controller<TFieldValues>
    control={control}
    name={name}
    render={({ field }) => <TextField {...field} fullWidth label={label} />}
  />
);
