import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchBy, fetchBy } from '../../features/cities/citySlice';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function CitySearch() {
  const searchBy = useSelector(selectSearchBy);
  const dispatch = useDispatch();

  const searchCity = (event) => {
    if (event.target.value.length >= 3) {
      dispatch(fetchBy(event.target.value));
    } else if (event.target.value.length === 0) {
      console.log('reset search');
    }
  };

  return (
    <FormControl variant="standard">
      <Input
        id="input-with-icon-adornment"
        onChange={searchCity}
        startAdornment={
          <InputAdornment position="start">
            <FilterAltIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}