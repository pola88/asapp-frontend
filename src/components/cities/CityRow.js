import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { selectSearchBy, addCity, removeCity } from '../../features/cities/citySlice';
import { pathPreferences, selectCurrentPreferences } from '../../features/preferences/preferenceSlice';
import style from './CityRow.module.css';

const highlightWord = (value, searchBy) => {
  if (searchBy && searchBy !== '') {
    const index = value.toLowerCase().indexOf(searchBy.toLowerCase());
    if (index === -1) {
      return value;
    }

    if (index === 0) {
      return <span>
              <span className={style.searchBy}>{value.slice(0, searchBy.length)}</span>
              {value.slice(searchBy.length)}
            </span>
    } else {
      return <span>
              {value.slice(0, index)}
              <span className={style.searchBy}>{value.slice(index, index + searchBy.length)}</span>
              {value.slice(index + searchBy.length)}
            </span>
    }
  }

  return value;
}

export default function CityRow({ city }) {
  const dispatch = useDispatch();
  const searchBy = useSelector(selectSearchBy);
  const currentPreferences = useSelector(selectCurrentPreferences);
  const [checked, setChecked] = useState(currentPreferences.indexOf(city.geonameid) !== -1);
  
  const handleToggle = () => () => {
    if (checked) {
      dispatch(removeCity(city));
    } else {
      dispatch(addCity(city));
    }
    
    dispatch(pathPreferences({
      geonameid: city.geonameid,
      selected: !checked
    }));
    
    setChecked(!checked);
  };

  const primaryText = highlightWord(city.name, searchBy);
  const secondaryText = <span>
    {highlightWord(city.subcountry, searchBy)}
    -
    {highlightWord(city.country, searchBy)}
  </span>;

  return (
    <ListItem
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleToggle()} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': city.geonameid }}
          />
        </ListItemIcon>
        <ListItemText id={city.geonameid} primary={primaryText} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}