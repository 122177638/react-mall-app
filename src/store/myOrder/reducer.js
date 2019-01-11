
import * as types from './action-type';

let defaultState = {
  orderList: []
}

export const myOrder = (state = defaultState, action)=>{
  switch(action.type){
    case types.GETORDERLIST:
      {
        action.dataList.conmodity.map((item)=>{return item.number = 0})
        action.dataList.totalMoney = 0;
        return {...state};
      }
    default:
    return {...state};
  }
}