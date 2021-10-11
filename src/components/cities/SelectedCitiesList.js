import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedCities } from '../../features/cities/citySlice';
import { map, values, isEmpty, keys } from 'ramda';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { removeCity, clearSelectedCity } from '../../features/cities/citySlice';
import { pathPreferences, removeAllPreferences } from '../../features/preferences/preferenceSlice';
import styles from './SelectedCitiesList.module.css';

export function SelectedCitiesList() {
  const selectedCities = useSelector(selectSelectedCities);
  const dispatch = useDispatch();

  const onDelete = (city) => {
    dispatch(removeCity(city));

    dispatch(pathPreferences({
      geonameid: city.geonameid,
      selected: false
    }));
  };

  const selectedRow = map(city => <Grid
    key={`selected_${city.geonameid}`}
    item
    xs>
      <Chip
        label={`${city.name} (${city.subcountry})`}
        onDelete={() => onDelete(city)}
        />
    </Grid>, values(selectedCities));
  
  const clearAll = () => {
    dispatch(clearSelectedCity());
    dispatch(removeAllPreferences(keys(selectedCities)));
  };

  return (<div>
    <Typography className={styles.selectedTitle} variant="h5">Selected cities:</Typography>
    <div className={styles.clearAllBtn}>
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          clearAll();
        }}
      >
        Clear all
      </Link>
    </div>
    { isEmpty(selectedRow)
      ? <div>You haven't selected any city yet</div>
      : (<Grid container spacing={1}>
          {selectedRow}
        </Grid>)
    }
  </div>);
};