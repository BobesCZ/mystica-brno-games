import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

export type ControlledSelectOption<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  value: ControllerRenderProps<TFieldValues, TName>['value'];
  label: string;
};
