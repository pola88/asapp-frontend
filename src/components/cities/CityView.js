import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll } from '../../features/cities/citySlice';
import { CityList } from './CityList';
import { CitySearch } from './CitySearch';
import { SelectedCitiesList } from './SelectedCitiesList';
import { Loading } from '../shared/Loading';
import styles from './CityView.module.css';

import Grid from '@mui/material/Grid';

export function CityView() {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    dispatch(fetchAll()).then(() => setLoading(false));
  }, [dispatch, setLoading]);
  console.log(loading);

  return (
    <div className={styles.Container}>
      { loading
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