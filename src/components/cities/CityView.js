import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll, fetchSelectedByIds } from '../../features/cities/citySlice';
import { getPreferences } from '../../features/preferences/preferenceSlice';
import { CityList } from './CityList';
import { CitySearch } from './CitySearch';
import { SelectedCitiesList } from './SelectedCitiesList';
import { Loading } from '../shared/Loading';
import styles from './CityView.module.css';

import Grid from '@mui/material/Grid';
import { isEmpty } from 'ramda';

export function CityView() {
  const dispatch = useDispatch();
  const [ loadingCities, setLoadingCities ] = useState(true);
  const [ loadingPreferences, setLoadingPreferences ] = useState(true);

  useEffect(() => {
    dispatch(fetchAll()).then(() => setLoadingCities(false));

    dispatch(getPreferences()).then(
      ({ payload }) => {
        const data = payload.data;
        if (isEmpty(data)) {
          setLoadingPreferences(false);
          return;
        }
        
        dispatch(fetchSelectedByIds(data)).then( () => {
          setLoadingPreferences(false)
        });
      }
    );

  }, [dispatch, setLoadingCities, setLoadingPreferences]);

  return (
    <div className={styles.Container}>
      { loadingCities || loadingPreferences
        ? <Loading/>
        : <Grid container spacing={2}>
            <Grid item xs={6}>
              <CitySearch />
              <CityList />
            </Grid>
            <Grid item xs={6}>
              <SelectedCitiesList/>
            </Grid>
          </Grid>
      }
    </div>
  );
}