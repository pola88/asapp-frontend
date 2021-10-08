import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll } from '../../features/cities/citySlice';
import { CityList } from './CityList';
import { CitySearch } from './CitySearch';
import { Loading } from '../shared/Loading';
import styles from './CityView.module.css';

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
        : <div>
            <CitySearch />
            <CityList />
          </div>
      }
    </div>
  );
}