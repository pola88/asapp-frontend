import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedCities } from '../../features/cities/citySlice';
import { map, values, isEmpty } from 'ramda';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

export function SelectedCitiesList() {
  const selectedCities = useSelector(selectSelectedCities);
  const selectedRow = map(city => <Grid key={`selected_${city.geonameid}`} item xs><Chip label={`${city.name} (${city.subcountry})`} /></Grid>, values(selectedCities));
  
  return (<div>
    <div>Selected cities:</div>
    { isEmpty(selectedRow)
      ? <div>You haven't selected any city yet</div>
      : (<Grid container spacing={1}>
          {selectedRow}
        </Grid>)
    }
  </div>);
};