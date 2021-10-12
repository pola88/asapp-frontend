import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPref, pathPref } from './preferenceAPI'
import { map } from 'ramda'

const initialState = {
  current: {},
  links: {}
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchAll())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getPreferences = createAsyncThunk(
  'preferences/get',
  async () => {
    const response = await getPref()
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const pathPreferences = createAsyncThunk(
  'preferences/path',
  async (params) => {
    await pathPref({
      [`${params.geonameid}`]: params.selected
    })
  }
)

export const removeAllPreferences = createAsyncThunk(
  'preferences/removeAllPreferences',
  async (cityIds) => {
    const fetchCitiesPromises = map(cityId =>
      pathPref({
        [`${cityId}`]: false
      })
    , cityIds)

    await Promise.all(fetchCitiesPromises)
  }
)

export const prefrenceSlice = createSlice({
  name: 'preference',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getPreferences.fulfilled, (state, action) => {
        state.current = action.payload.data
        state.links = action.payload.links
      })
      .addCase(removeAllPreferences.fulfilled, (state, action) => {
        state.current = {}
        state.links = {}
      })
  }
})

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const selectCurrentPreferences = (state) => state.preference.current
export const selectLinks = (state) => state.preference.links

export default prefrenceSlice.reducer
