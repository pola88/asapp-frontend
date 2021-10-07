import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'ramda';
import { fetchAll, selectCities } from '../../features/cities/citySlice';
// import styles from './CityList.module.css';

const buildCityRow = (city) => (
  <div key={city.geonameid}>
    {city.name}
  </div>
);

export function CityList() {
  const cities = useSelector(selectCities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const cityRows = map(buildCityRow, cities);
  return <div>
    City List
    <div>
      {cityRows}
    </div>
  </div>
};