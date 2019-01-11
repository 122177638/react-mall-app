import React,{PureComponent} from 'react';
import './nodata.less'


class NoPoint extends PureComponent{
  render(){
    return(
      <div className="nodata">
        <div className="nodata-wrap">
          <div className="nodata-img"><img src={require('./ysx_zwdd.png')} alt=""/></div>
          <div className="nodata-tip">暂无订单</div>
        </div>
      </div>
    )
  }
}

export default NoPoint