import React from 'react'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../helpers/test-utils'
import { CityRow } from './CityRow'
import * as reactRedux from 'react-redux'
import * as citySlice from '../../features/cities/citySlice'
import * as preferenceSlice from '../../features/preferences/preferenceSlice'

describe('CityRow', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  beforeEach(() => {
    useDispatchMock.mockClear()
  })

  test('render the correct text', async () => {
    const currentCity = {
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State',
      subcountry: 'United State'
    }
    render(<CityRow city={currentCity} />)

    expect(screen.getByText('Manhattan')).toBeInTheDocument()
    expect(screen.getByText(/United State/i)).toBeInTheDocument()
  })

  test('highlight the beginning of word', async () => {
    jest.spyOn(citySlice, 'selectSearchBy').mockReturnValue('Manh')

    const currentCity = {
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State',
      subcountry: 'United State'
    }
    const { container } = render(<CityRow city={currentCity} />)
    expect(container.querySelector('span[class=highlightWord]').innerHTML).toEqual('Manh')
  })

  test('highlight in the middle of word', async () => {
    jest.spyOn(citySlice, 'selectSearchBy').mockReturnValue('hatt')

    const currentCity = {
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State',
      subcountry: 'United State'
    }
    const { container } = render(<CityRow city={currentCity} />)
    expect(container.querySelector('span[class=highlightWord]').innerHTML).toEqual('hatt')
  })

  test('highlight at the end of word', async () => {
    jest.spyOn(citySlice, 'selectSearchBy').mockReturnValue('ttan')

    const currentCity = {
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State',
      subcountry: 'United State'
    }
    const { container } = render(<CityRow city={currentCity} />)
    expect(container.querySelector('span[class=highlightWord]').innerHTML).toEqual('ttan')
  })

  test('check city', async () => {
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)

    const currentCity = {
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State',
      subcountry: 'United State'
    }
    jest.spyOn(preferenceSlice, 'pathPreferences')

    const { container } = render(<CityRow city={currentCity} />)
    expect(screen.getByText('Manhattan')).toBeInTheDocument()
    const cityCheckbox = container.querySelector('input[aria-labelledby="11"]')
    fireEvent.click(cityCheckbox)
    expect(dummyDispatch).toHaveBeenCalledWith({ payload: currentCity, type: 'city/addCity' })

    expect(preferenceSlice.pathPreferences).toHaveBeenCalledWith({
      geonameid: 11,
      selected: true
    })
  })

  test('uncheck city', async () => {
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

    const { container } = render(<CityRow city={currentCity} />)
    expect(screen.getByText('Manhattan')).toBeInTheDocument()
    const cityCheckbox = container.querySelector('input[aria-labelledby="11"]')
    fireEvent.click(cityCheckbox)
    expect(dummyDispatch).toHaveBeenCalledWith({ payload: currentCity, type: 'city/removeCity' })
    expect(preferenceSlice.pathPreferences).toHaveBeenCalledWith({
      geonameid: 11,
      selected: false
    })
  })
})
