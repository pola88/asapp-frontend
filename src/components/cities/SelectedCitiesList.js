import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedCities } from '../../features/cities/citySlice';
import { map, values, isEmpty } from 'ramda';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function SelectedCitiesList() {
  const selectedCities = useSelector(selectSelectedCities);
  const selectedRow = map(city => <Chip key={`selected_${city.geonameid}`} label={`${city.name} (${city.subcountry})`} />, values(selectedCities));
  
  return (<div>
    <div>Selected cities:</div>
    { isEmpty(selectedRow)
      ? <div>You haven't selected any city yet</div>
      : (<Stack direction="row" spacing={1}>
          {selectedRow}
        </Stack>)
    }
  </div>);
};