
import * as types from './action-type';

let defaultState = {
  orderList: [],
  orderList1: [],
  orderList2: [],
  orderList3: [],
}

export const myOrder = (state = defaultState, action)=>{
  switch(action.type){
    case types.GETORDERLIST:
      {
        return {...state,orderList:action.data};
      }
    case types.GETORDERLIST1:
      {
        return {...state,orderList1:action.data};
      }
    case types.GETORDERLIST2:
      {
        return {...state,orderList2:action.data};
      }
    case types.GETORDERLIST3:
      {
        return {...state,orderList3:action.data};
      }
    default:
    return {...state};
  }
}