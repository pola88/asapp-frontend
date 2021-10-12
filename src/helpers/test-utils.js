import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import cityReducer from '../features/cities/citySlice'
import preferenceReducer from '../features/preferences/preferenceSlice'

function render (
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        city: cityReducer,
        preference: preferenceReducer
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper ({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
// eslint-disable-next-line import/export
export * from '@testing-library/react'
// override render method
// eslint-disable-next-line import/export
export { render }
