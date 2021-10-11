import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map, isEmpty } from 'ramda';
import { fetchAll, selectCities, selectLinks } from '../../features/cities/citySlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import CityRow from './CityRow';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './CityList.module.css';

export function CityList() {
  const cities = useSelector(selectCities);
  const links = useSelector(selectLinks);

  const dispatch = useDispatch();

  const nextPage = () => {
    console.log(links);
    dispatch(fetchAll(links.next));
  };

  const cityRows = map(city => <CityRow key={`row_${city.geonameid}`} city={city} />, cities);
  return <div>
    <Paper
      id="scrollablePaper"
      sx={{
        height: 500,
        width: '100%',
        maxWidth: 360,
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
            bgcolor: 'background.paper',
          }}>
          { isEmpty(cities)
            ? <ListItem
                disablePadding
              > City not found
              </ListItem>
            : cityRows
          }
        </List>
      </InfiniteScroll>
    </Paper>
  </div>
};