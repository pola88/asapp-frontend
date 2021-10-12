import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAll, fetchSelectedByIds } from '../../features/cities/citySlice'
import { getPreferences } from '../../features/preferences/preferenceSlice'
import { FilterContainer } from './FilterContainer'
import { SelectedContainer } from './SelectedContainer'
import { Loading } from '../shared/Loading'
import styles from './CityView.module.css'
import Grid from '@mui/material/Grid'
import { isEmpty } from 'ramda'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export function CityView () {
  const dispatch = useDispatch()
  const [loadingCities, setLoadingCities] = useState(true)
  const [loadingPreferences, setLoadingPreferences] = useState(true)

  useEffect(() => {
    dispatch(fetchAll()).then(() => setLoadingCities(false))

    dispatch(getPreferences()).then(
      ({ payload }) => {
        const data = payload.data
        if (isEmpty(data)) {
          setLoadingPreferences(false)
          return
        }

        dispatch(fetchSelectedByIds(data)).then(() => {
          setLoadingPreferences(false)
        })
      }
    )
  }, [dispatch, setLoadingCities, setLoadingPreferences])

  return (
    <div className={styles.Container}>
      { loadingCities || loadingPreferences
        ? <Loading/>
        : <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Paper className={styles.column} sx={{ maxHeight: '100%', overflow: 'auto' }}>
                <SelectedContainer />
                <div className={styles.title}>
                  <Typography className={styles.selectedTitle} variant="h5">Select your favorite cities</Typography>
                </div>
                <FilterContainer />
              </Paper>
            </Grid>
          </Grid>
      }
    </div>
  )
}
