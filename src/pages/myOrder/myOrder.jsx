
import React,{PureComponent} from 'react';
import './myOrder.less'

// components
import OrderItem from '@/components/orderItem/orderItem'
import Nodata from '@/components/nodata/nodata'

// function
import { Tabs,Modal } from 'antd-mobile';
import API from '@/api/api'
import { connect } from 'react-redux';
import { getOrder,getOrder1,getOrder2,getOrder3 } from '@/store/myOrder/action'

class MyOrder extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      indexPage: 0
    }
    // bind this
    this.navitoOrderDetails = this.navitoOrderDetails.bind(this)
  }
  componentWillMount(){
    // 设置默认页码
    if(this.props.location.state &&　this.props.location.state.indexPage){
      this.setState({indexPage: this.props.location.state.indexPage})
    }
   this.getOrders()
  }
  navitoOrderDetails(itemData,event){
    event.preventDefault();
    this.props.history.push({pathname:'/orderDetails',state:itemData})
  }
  orderEnter(orderid,event){
    event.stopPropagation();
    Modal.alert('信息确认', '请确认是否收货成功', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => {
        API.setOrderEnter({orderid:orderid,uid: localStorage.getItem('uid')}).then((data)=>{
          console.log(data)
          if(data.code){
            this.pageSwitch()
          }else{
            alert('确认收货失败')
          }
        })
      }},
    ]);
  }
  getOrders(){
    this.props.getOrder({uid: localStorage.getItem('uid')})
    this.props.getOrder1({uid: localStorage.getItem('uid'),substate:0})
    this.props.getOrder2({uid: localStorage.getItem('uid'),substate:1})
    this.props.getOrder3({uid: localStorage.getItem('uid'),substate:2})
  }
  pageSwitch(){
    // 更新需要的页面
    switch (this.state.indexPage) {
      case 0:
        this.props.getOrder({uid: localStorage.getItem('uid')})
        break;
      case 1:
        this.props.getOrder1({uid: localStorage.getItem('uid'),substate:0})
        break;
      case 2:
        this.props.getOrder2({uid: localStorage.getItem('uid'),substate:1})
        break;
      case 3:
        this.props.getOrder3({uid: localStorage.getItem('uid'),substate:2})
        break;
      default:
        alert('获取最新数据失败')
        break;
    }
  }
  render(){
    // <Badge text={'3'}></Badge>
    const tabs = [
      { title: '全部订单' },
      { title: '待发货' },
      { title: '待收货' },
      { title: '已完成' }
    ];
    console.log(this.props)
    return(
      <div className="myOrder-container">
        <Tabs tabs={tabs}
          initialPage={this.state.indexPage}
          onChange={(tab, index) => { }}
          onTabClick={(tab, index) => { }}
        >
          {/* 全部订单 */}
          <div className="tabPage">
            {
              this.props.store.orderList.length > 0
              ?this.props.store.orderList.map((item,index)=>{
                return(
                  <OrderItem 
                    itemData={item} 
                    key={index} 
                    click={this.navitoOrderDetails.bind(this,item)} 
                    orderEnter={item.substate === '1'?this.orderEnter.bind(this,item.orderid):null}
                  ></OrderItem>
                )
              })
              :<Nodata></Nodata>
            }
          </div>

          {/* 待发货 */}
          <div className="tabPage">
            {
              this.props.store.orderList1.length > 0 
              ?this.props.store.orderList1.map((item,index)=>{
                return(
                  <OrderItem 
                    itemData={item} 
                    key={index} 
                    click={this.navitoOrderDetails.bind(this,item)}
                  ></OrderItem>
                )
              })
              : <Nodata></Nodata> 
            }
          </div>
          {/* 待收货 */}
          <div className="tabPage">
            {
              this.props.store.orderList2.length > 0 
              ?this.props.store.orderList2.map((item,index)=>{
                return(
                  <OrderItem 
                    itemData={item} 
                    key={index} 
                    click={this.navitoOrderDetails.bind(this,item)} 
                    orderEnter={this.orderEnter.bind(this,item.orderid)}
                  ></OrderItem>
                )
              })
              : <Nodata></Nodata> 
            }
          </div>
          {/* 已完成 */}
          <div className="tabPage">
            {
              this.props.store.orderList3.length > 0
              ?this.props.store.orderList3.map((item,index)=>{
                return(
                  <OrderItem 
                    itemData={item} 
                    key={index} 
                    click={this.navitoOrderDetails.bind(this,item)}
                  ></OrderItem>
                )
              })
              : <Nodata></Nodata> 
            }
          </div>
        </Tabs>
      </div>
    )
  }
}

export default connect(state=>(
  { 
    store:{...state.myOrder} 
  }
),{
  getOrder,
  getOrder1,
  getOrder2,
  getOrder3
})(MyOrder)