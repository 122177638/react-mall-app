import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './sharePoint.less'

class SharePoint extends Component{
  render(){
    const tip = this.props.tip;
    const isShare = this.props.isShare;
    return(
      <div className={`SharePoint-container ${isShare?'Show':'Hide'}`} onClick={()=>this.props.shareShow()}>
        <div className={`SharePoint-bg ${isShare?'opacity':''}`}>
          <div className="SharePoint-wrapper">
            <div className="SharePoint-tip">
              <p>{tip}</p>
            </div>
          </div>
        </div>
      </div>  
    )
  }
}
export default SharePoint