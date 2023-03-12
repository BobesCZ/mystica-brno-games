import { Container, Divider } from '@mui/material';
import { BggLoader, CsvLoader } from './components';

export const DataLoader = () => (
  <Container>
    <CsvLoader />

    <Divider />

    <BggLoader />
  </Container>
);
