import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './SelectedContainer.module.css'
import Link from '@mui/material/Link'
import { SelectedCitiesList } from './SelectedCitiesList'
import { clearSelectedCity, selectSelectedCities } from '../../features/cities/citySlice'
import { removeAllPreferences } from '../../features/preferences/preferenceSlice'
import { keys, isEmpty } from 'ramda'

export function SelectedContainer () {
  const selectedCities = useSelector(selectSelectedCities)
  const dispatch = useDispatch()

  const clearAll = () => {
    dispatch(clearSelectedCity())
    dispatch(removeAllPreferences(keys(selectedCities)))
  }

  return <div className={styles.container}>
            { isEmpty(selectedCities)
              ? <noscript />
              : (<div className={styles.subheader}>
                  <div className={styles.clearAllBtn}>
                    <Link
                      underline="none"
                      component="button"
                      variant="body2"
                      onClick={() => {
                        clearAll()
                      }}
                    >
                      Clear all
                    </Link>
                  </div>
                </div>)
            }
            <div className={styles.columnContainer}>
              <SelectedCitiesList />
            </div>
          </div>
};
