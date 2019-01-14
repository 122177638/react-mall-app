import React,{ PureComponent } from 'react';
import './order.less'

// components
import Service from '@/components/service/service';

// function
import { openScroll,parseQueryString } from '@/common/js/mixin.js'; 
import { Toast, Modal } from 'antd-mobile';
import API from '@/api/api';
import { connect } from 'react-redux';
import { getGoodsList,addShopCart,delShopCart } from '@/store/order/action'

class Order extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      isShow: false,
    }
    //  bind this
    this.onShow = this.onShow.bind(this);
    this.navitoOrder = this.navitoOrder.bind(this);
  }
  componentWillMount(){
    this.typeid = localStorage.getItem('typeid');
    this.uid = localStorage.getItem('uid');
    this.channel = localStorage.getItem('channel');
    this.pramas =parseQueryString(window.location.href);
    console.log(this.pramas)
    this.props.getGoodsList({uid:this.uid,typeid:this.typeid});
  }
  componentDidMount(){
    openScroll(this.refs.viewDom)
    this.getPaySuccess()
  }
  onShow(){
    this.setState({isShow:!this.state.isShow})
  }
  getPaySuccess(){
    if(this.pramas && this.pramas.orderid){
      Modal.alert('是否已完成支付', null, [
        { text: '取消支付', onPress: () => {
          API.getPayStatus({orderid:this.pramas.orderid}).then((data)=>{
            if(data.code){
              this.props.history.push('/buyPoint')
            }
          })
        }},
        { text: '已完成支付', onPress: () => {
          API.getPayStatus({orderid:this.pramas.orderid}).then((data)=>{
            if(data.code){
              this.props.history.push('/buyPoint')
            }else{
              Toast.info('订单未支付成功', 1);
            }
          })
        }},
      ])
    }
  }
  navitoOrder(){
    if(this.props.storeState.goodsList.totalMoney){
      // 利用表单提交
      this.refs.form.submit();
    }else{
      Toast.info('请选择你要购买的产品', 1);
    }
  }
  render(){
    const goodsList = this.props.storeState.goodsList.conmodity;
    const totalMoney = this.props.storeState.goodsList.totalMoney;
    return(
      <div className="order-container" ref="viewDom">
        <div className="order-content">
          <div className="order-top">
            <p className="order-title">知命会员新年专享优惠</p>
            <p className="order-txt">买两盒送一盒体验装;买三盒送一盒;买四盒送两盒！</p>
          </div>
          <div className="order-goods">
          <p className="order-goods-title">已选商品</p>
          <ul className="order-goods-list">
            {
              goodsList && 
              goodsList.map((item,index)=>{
                return(
                  <li className="order-goods-item" key={index}>
                    <div className="item-left">
                      <div className="goods-img"><img src={item.imgUrl} alt=""/></div>
                      <div className="goods-info">
                        <h3 className="goods-title">{item.name}</h3>
                        <p className="goods-money">单价：￥{item.price}</p>
                      </div>
                    </div>
                    <div className="item-right">
                      <div 
                        className={`num-minus ${item.number <= 0?'no':''}`} 
                        onClick={item.number > 0 ? this.props.delShopCart.bind(this,item) : null}>
                      </div>
                      <div className="num">{item.number}</div>
                      <div 
                        className={`num-add ${item.number >= item.stock?'no':''}`} 
                        onClick={item.number < item.stock?this.props.addShopCart.bind(this,item):null}>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        </div>
        <div className="order-count">
          <div className="count-box">
            <div className="kefu-btn" onClick={this.onShow}>客服</div>
            <div className="total-money">总计： <strong>￥{totalMoney}</strong></div>
            <div className="mall-btn" onClick={this.navitoOrder}>立即购买</div>
          </div>
        </div>
        {/* 客服弹窗 */}
        <Service isShow={this.state.isShow} onShow={this.onShow}></Service>
        {/* 支付提交 */}
        <form action="https://hy.yixueqm.com/interface/index.php/Home/Kaiyun/placeOrder" ref="form" method="POST">
          <input type="hidden" name="uid" value={this.uid}/>
          <input type="hidden" name="price" value={totalMoney}/>
          <input type="hidden" name="clist" value={JSON.stringify(goodsList)}/>
          <input type="hidden" name="typeid" value={this.typeid}/>
          <input type="hidden" name="channel" value={this.channel}/>
        </form>
      </div>
    )
  }
}

export default connect(state=>(
  { storeState: state.orderGoods }
),{
  getGoodsList,
  addShopCart,
  delShopCart
})(Order)