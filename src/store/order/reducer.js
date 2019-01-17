
import * as types from './action-type';

let defaultState = {
  goodsList: {}
}

export const order = (state = defaultState, action)=>{
  switch(action.type){
    case types.GETGOODSLIST:
      {
        action.dataList.conmodity.map((item)=>{return item.number = 0})
        action.dataList.totalMoney = 0;
        return {...state,...{goodsList:action.dataList}};
      }
    case types.ADDSHOPCART:
      {
        let allMoney = state.goodsList.conmodity.map((item)=>{
          item.cid === action.dataList.cid && item.number++;
          return item.price * item.number;
        })
        state.goodsList.totalMoney = allMoney.reduce((item,curr)=>{return item += curr;},0)
        return {...state,goodsList:state.goodsList};
      }
    case types.DELSHOPCART:
      {
        let allMoney = state.goodsList.conmodity.map((item)=>{
          item.cid === action.dataList.cid && item.number--;
          return item.price * item.number;
        })
        state.goodsList.totalMoney = allMoney.reduce((item,curr)=>{return item += curr;},0)
        return {...state,goodsList:state.goodsList};
      }
    default:
    return {...state};
  }
}