import reducer from '../reducer';

const initialState = {
  creating: false,
  active: false
}

describe('CurrentGameSubscriptionStatus Module Reducer', () => {

  it('returns the intial state by default', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('starts creating a subscription and innactivates active subcription for action type "CREATING_SUBSCRIPTION', () => {
    expect(reducer(undefined, { type: "CREATING_SUBSCRIPTION"})).toEqual({
      creating: true,
      active: false
    })
  })

  it('returns an activated subscription for action type "ACTIVATE_SUBSCRIPTION"', () => {
    expect(reducer(undefined, { type: "ACTIVATE_SUBSCRIPTION"})).toEqual({
      creating: false,
      active: true
    })
  })
})