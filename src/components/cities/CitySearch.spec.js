import React from 'react'
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../helpers/test-utils'
import { CitySearch } from './CitySearch'
import * as reactRedux from 'react-redux'
import * as citySlice from '../../features/cities/citySlice'

describe('CitySearch', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  beforeEach(() => {
    useDispatchMock.mockClear()
  })

  test('do not call search after write three letters on the input', async () => {
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)
    jest.spyOn(citySlice, 'fetchBy')

    render(<CitySearch />)

    // should show the input helper
    expect(screen.getByText(/Min 3 characters/i)).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Type to filter by city name or country')
    fireEvent.change(searchInput, { target: { value: 'Ma' } })
    expect(searchInput.value).toBe('Ma')

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 500))

    expect(dummyDispatch.mock.calls.length).toEqual(0)
  })

  test('calls search after write three letters on the input', async () => {
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)

    jest.spyOn(citySlice, 'fetchBy')

    render(<CitySearch />)

    // should show the input helper
    expect(screen.getByText(/Min 3 characters/i)).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Type to filter by city name or country')
    fireEvent.change(searchInput, { target: { value: 'Manha' } })
    expect(searchInput.value).toBe('Manha')

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 500))

    expect(dummyDispatch.mock.calls.length).toEqual(2)
    expect(dummyDispatch).toHaveBeenCalledWith({ payload: 'Manha', type: 'city/searchBy' })
    expect(citySlice.fetchBy).toHaveBeenCalled()
  })

  test('calls search after clear input', async () => {
    const dummyDispatch = jest.fn()
    useDispatchMock.mockReturnValue(dummyDispatch)

    jest.spyOn(citySlice, 'fetchBy')

    render(<CitySearch />)

    // should show the input helper
    expect(screen.getByText(/Min 3 characters/i)).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Type to filter by city name or country')
    fireEvent.change(searchInput, { target: { value: '1' } })
    fireEvent.change(searchInput, { target: { value: '' } })
    expect(searchInput.value).toBe('')

    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 500))

    expect(dummyDispatch.mock.calls.length).toEqual(2)
    expect(dummyDispatch).toHaveBeenCalledWith({ payload: '', type: 'city/searchBy' })
    expect(citySlice.fetchBy).toHaveBeenCalled()
  })
})
