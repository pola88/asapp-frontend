import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAll } from '../../features/cities/citySlice';
import { CityList } from './CityList';
import Loading from '../../assets/loading.gif';

export function CityView() {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    dispatch(fetchAll()).then(() => setLoading(false));
  }, [dispatch, setLoading]);
  console.log(loading);

  return (
    <div>
      { loading
        ? <img alt='loading...' src={Loading} />
        : <CityList />
      }
    </div>
  );
}