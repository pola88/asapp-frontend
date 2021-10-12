import cityReducer, {
  searchBy, addCity, removeCity,
  clearSelectedCity, fetchAll, fetchBy
} from './citySlice'

describe('city reducer', () => {
  const initState = {
    all: [],
    selectedCities: {},
    links: {},
    status: 'idle',
    searchBy: ''
  }

  const firstCity = {
    geonameid: 11,
    name: 'Manhattan',
    country: 'United State'
  }

  const secondCity = {
    geonameid: 12,
    name: 'Manhattan 2',
    country: 'United State'
  }

  it('should handle initial state', () => {
    expect(cityReducer(undefined, {})).toEqual(initState)
  })

  test('should handle searchBy', () => {
    expect(cityReducer(initState, searchBy('Manh'))).toEqual({
      ...initState,
      searchBy: 'Manh'
    })
  })

  test('should handle addCity when selectedCities is empty', () => {
    expect(cityReducer(initState, addCity(firstCity))).toEqual({
      ...initState,
      selectedCities: {
        [firstCity.geonameid]: firstCity
      }
    })
  })

  test('should handle addCity when selectedCities has already a city', () => {
    const previousValues = {
      ...initState,
      selectedCities: {
        [secondCity.geonameid]: secondCity
      }
    }

    expect(cityReducer(previousValues, addCity(firstCity))).toEqual({
      ...initState,
      selectedCities: {
        [firstCity.geonameid]: firstCity,
        [secondCity.geonameid]: secondCity
      }
    })
  })

  test('should handle removeCity when selectedCities is empty', () => {
    expect(cityReducer(initState, removeCity(firstCity))).toEqual({
      ...initState,
      selectedCities: {}
    })
  })

  test('should handle removeCity when selectedCities has the city', () => {
    const previousValues = {
      ...initState,
      selectedCities: {
        [firstCity.geonameid]: firstCity
      }
    }

    expect(cityReducer(previousValues, removeCity(firstCity))).toEqual({
      ...initState,
      selectedCities: {}
    })
  })

  test('should handle clearSelectedCity', () => {
    const previousValues = {
      ...initState,
      selectedCities: {
        [firstCity.geonameid]: firstCity
      }
    }

    expect(cityReducer(previousValues, clearSelectedCity())).toEqual({
      ...initState,
      selectedCities: {}
    })
  })

  test('should handle fetchAll.pending', () => {
    expect(cityReducer(initState, { type: fetchAll.pending.type })).toEqual({
      ...initState,
      status: 'loading'
    })
  })

  test('should handle fetchAll.fulfilled but it is the first page', () => {
    const response = {
      data: [
        firstCity
      ],
      links: {
        first: 'first_url_page',
        next: 'next_url_page',
        prev: 'prev_url_page',
        last: 'last_url_page'
      }
    }
    const action = { type: fetchAll.fulfilled.type, payload: response }
    expect(cityReducer(initState, action)).toEqual({
      ...initState,
      status: 'idle',
      all: response.data,
      links: response.links
    })
  })

  test('should handle fetchAll.fulfilled but there are city in the state', () => {
    const response = {
      data: [
        secondCity
      ],
      links: {
        first: 'first_url_page',
        next: 'next_url_page',
        prev: 'prev_url_page',
        last: 'last_url_page'
      }
    }

    const previousValues = {
      ...initState,
      all: [firstCity]
    }
    const action = { type: fetchAll.fulfilled.type, payload: response }
    expect(cityReducer(previousValues, action)).toEqual({
      ...initState,
      status: 'idle',
      all: [firstCity, secondCity],
      links: response.links
    })
  })

  test('should handle fetchBy.pending', () => {
    expect(cityReducer(initState, { type: fetchBy.pending.type })).toEqual({
      ...initState,
      status: 'searching'
    })
  })

  test('should handle fetchBy.fulfilled but all state is empty', () => {
    const response = {
      data: [
        firstCity
      ],
      links: {
        first: 'first_url_page',
        next: 'next_url_page',
        prev: 'prev_url_page',
        last: 'last_url_page'
      }
    }
    const action = { type: fetchBy.fulfilled.type, payload: response }
    expect(cityReducer(initState, action)).toEqual({
      ...initState,
      status: 'idle',
      all: response.data,
      links: response.links
    })
  })

  test('should handle fetchBy.fulfilled but all state is not empty', () => {
    const response = {
      data: [
        secondCity
      ],
      links: {
        first: 'first_url_page',
        next: 'next_url_page',
        prev: 'prev_url_page',
        last: 'last_url_page'
      }
    }

    const previousValues = {
      ...initState,
      all: [firstCity]
    }
    const action = { type: fetchBy.fulfilled.type, payload: response }
    expect(cityReducer(previousValues, action)).toEqual({
      ...initState,
      status: 'idle',
      all: [secondCity],
      links: response.links
    })
  })
})
