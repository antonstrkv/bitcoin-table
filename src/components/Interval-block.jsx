import { useSelector, useDispatch } from 'react-redux';
import { setInterval } from '../RTK/reducers';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


const IntervalBlock = () => {
  const dispatch = useDispatch();
  const interval = useSelector(state => state.bitcoin.interval);
  

  const handleChange = (event) => {
    dispatch(setInterval(event.target.value));
  };


  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="demo-simple-select-helper-label">Интервал сканирования:</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={interval}
        label="Интервал сканирования:"
        onChange={handleChange} >
        <MenuItem value={30}>0.30 мин</MenuItem>
        <MenuItem value={60}>1 мин</MenuItem>
        <MenuItem value={90}>1.30 мин</MenuItem>
        <MenuItem value={120}>2 мин</MenuItem>
        <MenuItem value={150}>2.30 мин</MenuItem>
        <MenuItem value={180}>3 мин</MenuItem>
      </Select>
    </FormControl>
  );
}

export { IntervalBlock }

