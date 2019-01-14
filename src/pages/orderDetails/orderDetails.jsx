import React,{Component} from 'react';
import './orderDetails.less'

// components
import OrderItem from '@/components/orderItem/orderItem'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Toast,Modal } from 'antd-mobile';

// function
import API from '@/api/api'


class OrderDetails extends Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  componentDidMount(){
    console.log(this)
  }
  orderEnter(orderid,event){
    event.stopPropagation();
    Modal.alert('信息确认', '请确认是否收货成功', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => {
        API.setOrderEnter({orderid:orderid}).then((data)=>{
          if(data.code){
            this.props.history.replace({pathname:'/myorder',state:{indexPage:2}})
          }
        })
      }},
    ]);
  }
  render(){
    let orderItem;
    try {
      if(this.props.location.state){
        sessionStorage.setItem('orderDetails',JSON.stringify(this.props.location.state))
      }
       orderItem = JSON.parse(sessionStorage.getItem('orderDetails'))
    } catch (error) {
      alert('不支持localstorage|sessionstorage')
    }
    return(
      <div className="orderDetails-container">
        <div className="orderDetails-box">
          <h3 className="orderDetails-title">订单收货地址</h3>
          <div className="order-info">
            <div className="info-top">
              <p className="info-txt">收件人: <span>{orderItem.name}</span></p>
              <p className="info-txt">手机号: <span>{orderItem.phone}</span></p>
            </div>
            <p className="info-txt mt15">收货地址: <span>{orderItem.address}</span></p>
          </div>
        </div>
        <div className="orderDetails-box">
          <h3 className="orderDetails-title">商品信息</h3>
          <OrderItem itemData={orderItem} orderEnter={this.orderEnter.bind(this,orderItem.orderid)} btnTxt="联系客服"></OrderItem>
        </div>

        <div className="orderDetails-box">
          <h3 className="orderDetails-title">订单信息</h3>
          <div className="order-info">
            <p className="info-txt">订单创建时间: <span>{orderItem.updatetime}</span></p>
            <p className="info-txt mt15">订单号: <span>{orderItem.orderid}</span></p>
            {
              orderItem.substate !== '0' && 
              <p className="info-txt mt15">物流单号: <span>{orderItem.express}{orderItem.eOrder}</span>
              <CopyToClipboard text={orderItem.eOrder}
                onCopy={() => {Toast.success('复制成功', 1);}}>
                <span className="copy-order">复制</span>
              </CopyToClipboard>
              </p>
            }
          </div>
        </div>
        <div className="goHome" onClick={e=>{this.props.history.replace('/')}}>返回首页</div>
      </div>
    )
  }
}

export default OrderDetails