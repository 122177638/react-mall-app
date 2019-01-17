import * as types from './action-type';

let defaultState = {
  addressList: []
}

export const setAddress = (state = defaultState, action) => {
  switch (action.type) {
    case types.GETADRESSLIST:
      {
        return { ...state,addressList: action.data.data || [] };
      }
    case types.SELADRESSLIST:
      {
        state.addressList.forEach((item, index) => { 
          item.selected = false;
          if (item.aid === action.data.aid) { 
            item.selected = true;
          }
        })
        return { ...state };
      }
    case types.DELADRESSITEM:
      { 
        action.data.code &&
        state.addressList.splice(state.addressList.findIndex(item => item.aid === action.data.aid), 1)
        return { ...state };
      }
    default:
      return { ...state };
  }
}