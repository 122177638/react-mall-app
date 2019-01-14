import * as types from './action-type';
import API from '@/api/api'
/**
 * 获取全部订单
 * @param {Object}} params {uid}
 */
export const getOrder = (params)=>{
  return async dispatch => {
    try {
      let result = await API.getOrderList(params); 
      dispatch({
        type: types.GETORDERLIST,
        data: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 * 获取待发货订单
 * @param {Object}} params {uid}
 */
export const getOrder1 = (params)=>{
  return async dispatch => {
    try {
      let result = await API.getOrderList(params); 
      dispatch({
        type: types.GETORDERLIST1,
        data: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 * 获取待收货订单
 * @param {Object}} params {uid}
 */
export const getOrder2 = (params)=>{
  return async dispatch => {
    try {
      let result = await API.getOrderList(params); 
      dispatch({
        type: types.GETORDERLIST2,
        data: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 * 获取已完成订单
 * @param {Object}} params {uid}
 */
export const getOrder3 = (params)=>{
  return async dispatch => {
    try {
      let result = await API.getOrderList(params); 
      dispatch({
        type: types.GETORDERLIST3,
        data: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}