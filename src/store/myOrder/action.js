import * as types from './action-type';
import API from '@/api/api'
/**
 * 
 * @param {Object}} params {uid typeid}
 */
export const getOrderList = (params)=>{
  return async dispatch => {
    try {
      let result = await API.getOrderList(params);
      dispatch({
        type: types.GETORDERLIST,
        dataList: result,
      })
    } catch (error) {
      console.log(error)
    }
  }
}