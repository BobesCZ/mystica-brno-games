type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = ({ children, value, index, ...rest }: TabPanelProps) => (
  <div role="tabpanel" hidden={value !== index} {...rest}>
    {value === index && <>{children}</>}
  </div>
);
