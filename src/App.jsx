import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { IntervalBlock } from './components/Interval-block';
import { EnhancedTable } from './components/table/Table-Body';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';


const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU
);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ padding: 3 }} maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <EnhancedTable />
          </Grid>
          <Grid item xs={4}>
            <IntervalBlock />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}


export default App;
