import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { map, isEmpty } from 'ramda'
import { fetchAll, selectCities, selectLinks } from '../../features/cities/citySlice'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import { CityRow } from './CityRow'
import InfiniteScroll from 'react-infinite-scroll-component'

export function CityList () {
  const cities = useSelector(selectCities)
  const links = useSelector(selectLinks)

  const dispatch = useDispatch()

  const nextPage = () => {
    dispatch(fetchAll(links.next))
  }

  const cityRows = map(city => <CityRow key={`row_${city.geonameid}`} city={city} />, cities)
  return (
    <Paper
      id="scrollablePaper"
      elevation={0}
      sx={{
        maxHeight: '70vh',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto'
      }}
    >
      <InfiniteScroll
        dataLength={cities.length}
        next={nextPage}
        hasMore={!!links.next}
        scrollableTarget="scrollablePaper"
        loader={<h4>Loading...</h4>}
      >
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper'
          }}>
          { isEmpty(cities)
            ? <Alert variant="filled" severity="error">
                City not found
              </Alert>
            : cityRows
          }
        </List>
      </InfiniteScroll>
    </Paper>)
};
