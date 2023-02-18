import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  index: number;
  value: number;
};

export const TabPanel = ({ children, value, index, ...rest }: Props) => (
  <div role="tabpanel" hidden={value !== index} {...rest}>
    {value === index && <>{children}</>}
  </div>
);
