import React from 'react'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, screen } from '../../helpers/test-utils'
import { CityList } from './CityList'
import * as citySlice from '../../features/cities/citySlice'

describe('CityList', () => {
  test('when selectCities returns an empty array', async () => {
    jest.spyOn(citySlice, 'selectCities').mockReturnValue([])

    render(<CityList />)

    expect(screen.getByText('City not found')).toBeInTheDocument()
  })

  test('when selectCities returns some cities', async () => {
    jest.spyOn(citySlice, 'selectCities').mockReturnValue([{
      geonameid: 11,
      name: 'Manhattan',
      country: 'United State'
    }, {
      geonameid: 12,
      name: 'Second Manhattan',
      country: 'United State'
    }])

    render(<CityList />)

    expect(screen.getByText('Manhattan')).toBeInTheDocument()
    expect(screen.getByText('Second Manhattan')).toBeInTheDocument()
  })
})
