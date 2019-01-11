import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './service.less'

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
            <div className="service-close" onClick={()=>this.props.onShow()}></div>
          </div>
        </div>
      </div>  
    )
  }
}
export default Service