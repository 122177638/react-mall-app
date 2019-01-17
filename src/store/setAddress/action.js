import * as types from './action-type';
import API from '@/api/api'
/**
 * 获取收货地址列表
 * @param {Object}} params {uid}
 */
export const getAddressList = (params) => {
  return async dispatch => {
    try {
      let result = await API.getAddressList(params);
      dispatch({
        type: types.GETADRESSLIST,
        data: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 * 选中收货地址
 * @param {Object}} params {aid}
 */
export const selAddressInit = (params) => {
  return {
    type: types.SELADRESSLIST,
    data: params,
  }
}
/**
 * 删除收货地址
 * @param {Object}} params {aid}
 */
export const delAddressItem = (params) => {
  return async dispatch => {
    try {
      let result = await API.delAddressItem(params);
      dispatch({
        params: params,
        type: types.DELADRESSITEM,
        data: result
      })
    } catch (error) {
      console.log(error)
    }
  }
}