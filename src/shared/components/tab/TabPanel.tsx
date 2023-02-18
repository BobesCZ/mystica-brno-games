type Props = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = ({ children, value, index, ...rest }: Props) => (
  <div role="tabpanel" hidden={value !== index} {...rest}>
    {value === index && <>{children}</>}
  </div>
);
