import city from './citySlice'

describe('city reducer', () => {
  it('should handle initial state', () => {
    expect(city(undefined, { type: 'unknown' })).toEqual({
      all: [],
      status: 'idle'
    })
  })
})
