import React, { Component } from 'react';
import './service.less'

import {CopyToClipboard} from 'react-copy-to-clipboard';

class Service extends Component{
  render(){
    const isShow = this.props.isShow;
    return(
      <div className={`service-container ${isShow?'Show':'Hide'}`}>
        <div className={`service-bg ${isShow?'opacity':''}`}>
          <div className="service-wrapper">
            <p>
              如订单中遇到任何问题
              <br />
              可联系我们的客服君君
            </p>
            <img src={require('@/assets/img/kefu.png')} alt=""/>
            <CopyToClipboard text={'zm_junjun'}
              onCopy={() => {alert('复制成功，前去添加客服微信')}}>
              <p>微信: <a href="weixin://" className="openWX">zm_junjun</a></p>
            </CopyToClipboard>
            <div className="service-close" onClick={()=>this.props.onShow()}></div>
          </div>
        </div>
      </div>  
    )
  }
}
export default Service