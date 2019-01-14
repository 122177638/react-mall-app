import React,{PureComponent} from 'react';
import './orderItem.less'
import { withRouter } from 'react-router-dom'

import Service from '@/components/service/service'

class OrderItem extends PureComponent{
  static defaultProps = {
    itemData: {
      data: []
    }
  };
 
  constructor(props){
    super(props)
    this.state = {
      isShow: false
    }
    // bind this
    this.openService = this.openService.bind(this)
  }

  openService(){
    this.setState({isShow: !this.state.isShow})
  }
  render(){
    const goodsNum = this.props.itemData.data.reduce((count,curr)=>{return count+=Number(curr.number)},0);
    return(
      <div className="orderItem" onClick={this.props.click}>
        <div className="orderItem-top">
          <p className="orderItem-time">{this.props.itemData.updatetime}</p>
          <div className={`orderItem-statu statu${this.props.itemData.substate}`}>
            {
              this.props.itemData.substate === '0'
              ?'待发货'
              :this.props.itemData.substate === '1'
              ?'待收货'
              :'已完成'
            }
          </div>
        </div>
        <ul className="goods-list">
          {
            this.props.itemData.data.map((item,index)=>{
              return(
                <li className="goods-item" key={index}>
                  <div className="item-left">
                    <div className="goods-img"><img src={item.imgUrl} alt=""/></div>
                    <div className="goods-info">
                      <h3 className="goods-name">{item.typeName}</h3>
                      <p className="goods-type">【{item.name}】 香</p>
                    </div>
                  </div>
                  <div className="item-right">
                    <p className="goods-money">￥{item.price}<br/><span>x {item.number}</span></p>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="goods-count">
          <p className="goods-discount">
              已享优惠：
              {
                goodsNum === 2
                ?'买两盒送一盒体验装'
                :goodsNum === 3
                ?'买三盒送一盒'
                :goodsNum >= 4
                ?'买四盒送两盒'
                :'买一盒半价'
              }
          </p>
          <p className="goods-num">共{goodsNum}件商品 合计:
            <strong className="total-money">￥{this.props.itemData.data.reduce((count,curr)=>{return count+=Number(curr.price)},0)}</strong>
          </p>
        </div>
        <div className="order-detail">
          <span className="order-btn" onClick={this.props.btnTxt === '联系客服'?this.openService:null}>{this.props.btnTxt || '查看详情'}</span>
          {
            this.props.itemData.substate === '1'&&
            <span className="order-enter" onClick={this.props.orderEnter}>确认收货</span>
          }

        </div>
        <Service isShow={this.state.isShow} onShow={this.openService}></Service>
      </div>
    )
  }
}

export default withRouter(OrderItem)