import Axios from './axios';

class API extends Axios{
   /**
   * 获取商品详情
   * @method post
   * @param {Object} params typeid
   * @return {promise}
   */
  async getGoodsInfo(params = {}){
    try{
      let result = await this.axios('post', '/Home/Kaiyun/indexData', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取商品数据失败',
          response: result,
          data: params,
          url: '/Home/Kaiyun/indexData',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
}
  /**
   * 获取商品列表
   * @method post
   * @param {Object} params uid typeid
   * @return {promise}
   */
  async getGoodsList(params = {}){
    try{
      let result = await this.axios('post', '/Home/Kaiyun/zhifu', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取商品列表数据失败',
          response: result,
          data: params,
          url: '/Home/Kaiyun/zhifu',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 获取订单列表
   * @method post
   * @param {Object} params uid
   * @return {promise}
   */
  async getOrderList(params = {}){
    try{
      let result = await this.axios('post', '/Home/Kaiyun/selectOrder', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取订单列表失败',
          response: result,
          data: params,
          url: '/Home/Kaiyun/ ',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 查询收货地址
   * @method post
   * @param {Object} params uid
   * @return {promise}
   */
  async getAdress(params = {}){
    try{
      let result = await this.axios('post', '/Home/Kaiyun/selectAddress', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '查询收货地址失败',
          response: result,
          data: params,
          url: '/Home/Kaiyun/selectAddress',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 修改收货地址
   * @method post
   * @param {Object} params uid name phone address
   * @return {promise}
   */
  async setAdress(params = {}){
    try{
      let result = await this.axios('post', '/Home/Kaiyun/addToAddress', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '修改收货地址失败',
          response: result,
          data: params,
          url: '/Home/Kaiyun/addToAddress',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 确认收货
   * @method post
   * @param {Object} params orderid uid
   * @return {promise}
   */
  async setOrderEnter(params = {}){
    try{
      let result = await this.axios('post', '/Home/Kaiyun/completeOrder', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '确认收货失败',
          response: result,
          data: params,
          url: '/Home/Kaiyun/completeOrder',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 查询是否支付
   * @method post
   * @param {Object} params orderid
   * @return {promise}
   */
  async getPayStatus(params = {}){
    try{
      let result = await this.axios('post', '/Home/Index/seletLoop', params); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '支付失败',
          response: result,
          data: params,
          url: '/Home/Index/seletLoop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
  /**
   * 用途：获取微信签名ID
   * @param {Object} params shareurl
   * @method post  
   */
  async getWxInfo(params = {}){
    try{
      let result = await this.axios('post', '/Home-InterfaceMr-shareData', params,{baseURL:"https://www.yixueqm.com/zhiming/index.php/"}); 
      if(result){
        return result;
      }else{
        let err = {
          tip: '获取微信信息失败',
          response: result,
          data: params,
          url: '/Home-InterfaceMr-shareData',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API()