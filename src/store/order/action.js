import * as types from './action-type';
import API from '@/api/api'
/**
 * 
 * @param {Object}} params {uid typeid}
 */
export const getGoodsList = (params)=>{
  return async dispatch => {
    try {
      let result = await API.getGoodsList(params);
      dispatch({
        type: types.GETGOODSLIST,
        dataList: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 * 减少购物车
 * @param {Object} item 产品
 */
export const addShopCart = (item)=>{
  return {
    type: types.ADDSHOPCART,
    dataList: item
  }
}
/**
 * 添加购物车
 * @param {Object} item 产品
 */
export const delShopCart = (item)=>{
  return {
    type: types.DELSHOPCART,
    dataList: item
  }
}