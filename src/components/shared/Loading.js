import React from 'react';
import styles from './Loading.module.css';
import LoadingGif from '../../assets/loading.gif';

export function Loading () {
  return (
    <div className={styles.LoadingContainer}>
      <img className={styles.Loading} alt='loading...' src={LoadingGif} />
    </div>
  );
}