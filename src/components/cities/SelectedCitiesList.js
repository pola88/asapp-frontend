import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedCities } from '../../features/cities/citySlice';
import { map, values, isEmpty } from 'ramda';

export function SelectedCitiesList() {
  const selectedCities = useSelector(selectSelectedCities);
  const selectedRow = map(city => <div key={`selected_${city.geonameid}`}>{city.name} ({city.subcountry})</div>, values(selectedCities));
  return (<div>
    <div>Selected cities:</div>
    { isEmpty(selectedRow)
      ? <div>You haven't selected any city yet</div>
      : selectedRow
    }
  </div>);
};