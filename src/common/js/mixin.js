export default methods => {
    return target => {
        Object.assign(target.prototype, methods);
    }
}
/**
 * 开启接触touchmove默认事件
 * @param {Element} el 
 */
export const openScroll = function (el) {
  el.addEventListener('touchstart', function () {
      var top = el.scrollTop;
      var totalScroll = el.scrollHeight;
      var currentScroll = top + el.offsetHeight
      if (top === 0) {
          el.scrollTop = 1
      } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1
      }
  }, {passive: true})
  el.addEventListener('touchmove', function (evt) {
    if (el.offsetHeight < el.scrollHeight) { evt._isScroller = true }
  }, {passive: true})
};
/**
 * url转json
 * @param {String} url 
 */
export const parseQueryString = function (url) {
    var regUrl = /^[^?]+\?([\w\W]+)$/
    var regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g
    var arrUrl = regUrl.exec(url)
    var ret = {}
    if (arrUrl && arrUrl[1]) {
      var strPara = arrUrl[1]
      var result
      while ((result = regPara.exec(strPara)) != null) {
        ret[result[1]] = result[2]
      }
    }
    return ret
  }
