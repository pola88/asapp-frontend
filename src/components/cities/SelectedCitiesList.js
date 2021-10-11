import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedCities, removeCity } from '../../features/cities/citySlice';
import { map, values } from 'ramda';
import Chip from '@mui/material/Chip';
import { pathPreferences } from '../../features/preferences/preferenceSlice';
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

  const selectedRow = map(city => 
    <Chip
      key={`selected_${city.geonameid}`}
      label={`${city.name} (${city.subcountry})`}
      onDelete={() => onDelete(city)}
      color="primary"
      classes={
        {root: styles.chip}
      }
      />, values(selectedCities));
  
  return (<div className={styles.chipsContainer}>
          {selectedRow}
    </div>);
};