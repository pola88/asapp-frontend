import preferenceReducer, { getPreferences } from './preferenceSlice'

describe('preference reducer', () => {
  const initState = {
    current: {},
    links: {}
  }

  it('should handle initial state', () => {
    expect(preferenceReducer(undefined, {})).toEqual(initState)
  })

  it('should handle getPreferences.fulfilled', () => {
    const response = {
      data: [
        11
      ],
      links: {
        first: 'first_url_page',
        next: 'next_url_page',
        prev: 'prev_url_page',
        last: 'last_url_page'
      }
    }

    const action = { type: getPreferences.fulfilled.type, payload: response }
    expect(preferenceReducer(undefined, action)).toEqual({
      ...initState,
      current: response.data,
      links: response.links
    })
  })
})
