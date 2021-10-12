import React from 'react'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../helpers/test-utils'
import { SelectedCitiesList } from './SelectedCitiesList'
import * as reactRedux from 'react-redux'
import * as citySlice from '../../features/cities/citySlice'
import * as preferenceSlice from '../../features/preferences/preferenceSlice'

describe('SelectedCitiesList', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  beforeEach(() => {
    useDispatchMock.mockClear()
  })

  test('calls to remove city', async () => {
    const currentCity = {
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State',
      subcountry: 'United State'
    }

    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    jest.spyOn(citySlice, 'selectSelectedCities').mockReturnValue({
      11: currentCity
    })
    jest.spyOn(preferenceSlice, 'pathPreferences')

    render(<SelectedCitiesList />)

    expect(screen.getByText(/Manhattan/i)).toBeInTheDocument()
    const cancelIcon = screen.getByTestId('CancelIcon')
    expect(cancelIcon).toBeInTheDocument()

    fireEvent.click(cancelIcon)

    expect(dummyDispatch).toHaveBeenCalledWith({ payload: currentCity, type: 'city/removeCity' })
    expect(preferenceSlice.pathPreferences).toHaveBeenCalledWith({
      geonameid: 11,
      selected: false
    })
  })
})
