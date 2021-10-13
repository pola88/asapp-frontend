import React from 'react'
import { CityList } from './CityList'
import { CitySearch } from './CitySearch'
import styles from './CityView.module.css'

export function FilterContainer () {
  return <div className={styles.filterContainer}>
          <CitySearch />
          <CityList />
        </div>
}
