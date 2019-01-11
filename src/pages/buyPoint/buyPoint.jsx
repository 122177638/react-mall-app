import React,{PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import './buyPoint.less'

// function
import API from '@/api/api'


class BuyPoint extends PureComponent{
  goInputAdress(){
    API.getAdress({uid:localStorage.getItem('uid')}).then((data)=>{
      if(data.code){
        this.props.history.push({pathname:'/inputInfo',state:data})
      }else{
        this.props.history.push({pathname:'/inputInfo'})
      }
    })
  }
  render(){
    return(
      <div className="buyPonit-container">
        <div className="buyPonit-wrap">
          <img src={require('@/assets/img/ysx_cg.png')} className="point-icon" alt=""/>
          <p className="point-txt">购买成功</p>
          <p>您已成功购买商品。</p>
          <p>需要完善您的收货地址！</p>
          <p>我们将在3-7日内将商品邮寄。</p>
          <p>详细消息请留意通知。</p>
          <p>感谢您对知命的支持！</p>
          <div className="inout-adress" onClick={this.goInputAdress.bind(this)}>前往填写收货地址</div>
        </div>
        <div className="buyPonit-foot"></div>
      </div>
    )
  }
}

export default withRouter(BuyPoint)