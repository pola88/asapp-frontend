import React from 'react';
import { CityView } from './components/cities/CityView';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.main}>
      <CityView />
    </div>
  );
}

export default App;
