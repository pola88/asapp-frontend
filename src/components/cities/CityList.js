import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'ramda';
import { fetchAll, selectCities, selectLinks } from '../../features/cities/citySlice';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import CityRow from './CityRow';
import InfiniteScroll from 'react-infinite-scroll-component';
// import styles from './CityList.module.css';

const loadMoreItems = (event, nextPage) => {
  console.log(event.target.scrollTop);
  if (event.target.scrollTop === 234) {
    console.log('load next page');
    nextPage();
    //user is at the end of the list so load more items
  }
};

export function CityList() {
  const cities = useSelector(selectCities);
  const links = useSelector(selectLinks);

  const dispatch = useDispatch();

  const nextPage = () => {
    console.log(links);
    dispatch(fetchAll(links.next));
  };

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const cityRows = map(city => <CityRow key={`row_${city.geonameid}`} city={city} />, cities);
  return <div>
    City List
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
          {cityRows}
        </List>
      </InfiniteScroll>
    </Paper>
  </div>
};