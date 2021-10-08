import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchBy, fetchAll, searchBy } from '../../features/cities/citySlice';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function CitySearch() {
  const dispatch = useDispatch();

  const searchCity = (event) => {
    const value = event.target.value;
    if (value.length >= 3) {
      dispatch(fetchBy(value));
    } else if (value.length === 0) {
      dispatch(fetchAll());
    }

    dispatch(searchBy(value));
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