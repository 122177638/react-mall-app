/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//elm.cangdu.org/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = 'https://hy.yixueqm.com/interface/index.php/';
}else{
  baseURL = 'https://hy.yixueqm.com/interface/index.php/';
}


export default {imgUrl, baseURL}