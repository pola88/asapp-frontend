import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchBy, fetchAll, searchBy } from '../../features/cities/citySlice';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormHelperText from '@mui/material/FormHelperText';
import { useDebouncedCallback } from 'use-debounce';
import styles from './CitySearch.module.css';

export function CitySearch() {
  const dispatch = useDispatch();

  //Use debounce func to handle when the user write fast into the input and don't send multiple request
  const searchCity = useDebouncedCallback((event) => {
    const value = event.target.value;
    if (value.length >= 3) {
      dispatch(fetchBy(value));
    } else if (value.length === 0) {
      dispatch(fetchAll());
    }

    dispatch(searchBy(value));
  }, 500);

  return (
    <div className={styles.searchInput} >
      <FormControl variant="standard" fullWidth={true} margin="dense">
        <Input
          id="input-with-icon-adornment"
          onChange={searchCity}
          placeholder="Type to filter by city name or country"
          startAdornment={
            <InputAdornment position="start">
              <FilterAltIcon />
            </InputAdornment>
          }
        />
        <FormHelperText id="component-helper-text">
          Min 3 characters
        </FormHelperText>
      </FormControl>
    </div>
  )
}