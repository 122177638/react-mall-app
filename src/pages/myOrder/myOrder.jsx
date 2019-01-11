
import React,{PureComponent} from 'react';
import './myOrder.less'

// components
import OrderItem from '@/components/orderItem/orderItem'
import Nodata from '@/components/nodata/nodata'

// function
import { Tabs, Badge,Modal } from 'antd-mobile';
import API from '@/api/api'
import { connect } from 'react-redux';
import { getOrderList } from '@/store/myOrder/action'

class MyOrder extends PureComponent{
  constructor(props){
    super(props)
    this.state= {
      orderList: []
    }

    // bind this
    this.navitoOrderDetails = this.navitoOrderDetails.bind(this)
  }
  componentDidMount(){
    API.getOrderList({uid: localStorage.getItem('uid')}).then((data)=>{
      if(data){
        this.setState({
          orderList: data
        })
      }else{
        throw console.error('获取数据失败');
      }
      console.log(data)
    })
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
        API.setOrderEnter({orderid:orderid}).then((data)=>{
          if(data.code){
            API.getOrderList({uid: localStorage.getItem('uid')}).then((data)=>{
              if(data){
                this.setState({
                  orderList: data
                })
              }else{
                throw console.error('获取数据失败');
              }
            })
          }
        })
      }},
    ]);
  }
  render(){
    // <Badge text={'3'}></Badge>
    const tabs = [
      { title: '全部订单' },
      { title: '待发货' },
      { title: '待收货' },
      { title: '已完成' }
    ];
    return(
      <div className="myOrder-container">
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          {/* 全部订单 */}
          <div className="tabPage">
            {
              this.state.orderList
              ?this.state.orderList.map((item,index)=>{
                return(
                  <OrderItem itemData={item} key={index} click={this.navitoOrderDetails.bind(this,item)}></OrderItem>
                )
              })
              :<Nodata></Nodata>
            }
          </div>

          {/* 待发货 */}
          <div className="tabPage">
            {
              this.state.orderList.map((item,index)=>{
                return(
                  item.substate === '0' 
                  ? item.data ? <OrderItem itemData={item} key={index} click={this.navitoOrderDetails.bind(this,item)}></OrderItem> : <Nodata></Nodata> 
                  : null
                )
              })
            }
          </div>
          {/* 待收货 */}
          <div className="tabPage">
            
            {
              this.state.orderList.map((item,index)=>{
                return(
                  item.substate === '1' 
                  ? <OrderItem itemData={item} key={index} click={this.navitoOrderDetails.bind(this,item)} orderEnter={this.orderEnter.bind(this,item.orderid)}></OrderItem>
                  : false
                )
              })
            }
          </div>
          {/* 已完成 */}
          <div className="tabPage">
            {
              this.state.orderList.map((item,index)=>{
                return(
                  item.substate === '2' 
                  ? item.data ? <OrderItem itemData={item} key={index} click={this.navitoOrderDetails.bind(this,item)}></OrderItem> : <Nodata></Nodata> 
                  : null
                )
              })
            }
          </div>
        </Tabs>
      </div>
    )
  }
}

export default connect(state=>({
  
}),{

})(MyOrder)