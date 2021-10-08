import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { addCity, removeCity } from '../../features/cities/citySlice';
import { pathPreferences } from '../../features/preferences/preferenceSlice';

export default function CityRow({ city }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

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
        <ListItemText id={city.geonameid} primary={city.name} secondary={`${city.subcountry} - ${city.country}`} />
      </ListItemButton>
    </ListItem>
  );
}