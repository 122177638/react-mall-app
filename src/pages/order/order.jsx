import React, { PureComponent } from 'react';
import './order.less';

// components
import Service from '@/components/service/service';

// function
import { openScroll, parseQueryString } from '@/common/js/mixin.js';
import { Toast, Modal } from 'antd-mobile';
import API from '@/api/api';
import { connect } from 'react-redux';
import { getGoodsList, addShopCart, delShopCart } from '@/store/order/action';

class Order extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      address: {},
    };
    //  bind this
    this.onShow = this.onShow.bind(this);
    this.navitoOrder = this.navitoOrder.bind(this);
  }
  componentWillMount() {
    console.log(this.props.history.location.state);
    this.typeid = localStorage.getItem('typeid');
    this.uid = localStorage.getItem('uid');
    this.channel = sessionStorage.getItem('channel');
    this.pramas = parseQueryString(window.location.href);
    console.log(this.pramas);
    // 获取商品列表
    this.props.getGoodsList({ uid: this.uid, typeid: this.typeid });
    // 获取地址信息
    if (this.props.history.location.state && this.props.history.location.state.type === 'address') {
      this.setState({ address: this.props.history.location.state.data });
    }
  }
  componentDidMount() {
    openScroll(this.refs.viewDom);
    this.getPaySuccess();
  }
  onShow() {
    this.setState({ isShow: !this.state.isShow });
  }
  getPaySuccess() {
    if (this.pramas && this.pramas.orderid) {
      Modal.alert('是否已完成支付', null, [
        {
          text: '取消支付',
          onPress: () => {
            API.getPayStatus({ orderid: this.pramas.orderid }).then(data => {
              if (data.code) {
                this.props.history.push('/myOrder');
              }
            });
          },
        },
        {
          text: '已完成支付',
          onPress: () => {
            API.getPayStatus({ orderid: this.pramas.orderid }).then(data => {
              if (data.code) {
                this.props.history.push('/myOrder');
              } else {
                Toast.info('订单未支付成功', 1);
              }
            });
          },
        },
      ]);
    }
  }
  navitoOrder() {
    if (!this.state.address.aid) {
      Toast.info('请选择你的收货地址', 1);
      return false;
    }
    if (!this.props.storeState.goodsList.totalMoney) {
      Toast.info('请选择你要购买的产品', 1);
      return false;
    }
    // 利用表单提交
    this.refs.form.submit();
  }
  render() {
    const goodsList = this.props.storeState.goodsList.conmodity;
    const totalMoney = this.props.storeState.goodsList.totalMoney;
    return (
      <div className="order-container" ref="viewDom">
        <div className="order-content">
          <div className="order-top">
            {this.state.address.name ? (
              <div
                className="address-info"
                onClick={e => {
                  this.props.history.push('/setAddress');
                }}
              >
                <div className="address-info-box">
                  <div className="address-pr">
                    <p>
                      <strong>收货人：</strong>
                      {this.state.address.name}
                    </p>
                    <p className="phone">{this.state.address.phone}</p>
                  </div>
                  <p className="address-txt">
                    <strong>收货地址：</strong>
                    <span>{this.state.address.address}</span>
                  </p>
                </div>
                <div className="address-jx" />
              </div>
            ) : (
              <div className="order-add-address">
                <span
                  className="order-add"
                  onClick={e => {
                    this.props.history.push('/setAddress');
                  }}
                >
                  添加收货地址
                </span>
              </div>
            )}
          </div>
          <div className="order-goods">
            <p className="order-goods-title">已选商品</p>
            <ul className="order-goods-list">
              {goodsList &&
                goodsList.map((item, index) => {
                  return (
                    <li className="order-goods-item" key={index}>
                      <div className="item-left">
                        <div className="goods-img">
                          <img src={item.imgUrl} alt="" />
                        </div>
                        <div className="goods-info">
                          <h3 className="goods-title">{item.name}</h3>
                          <p className="goods-money">单价：￥{item.price}</p>
                        </div>
                      </div>
                      <div className="item-right">
                        <div
                          className={`num-minus ${item.number <= 0 ? 'no' : ''}`}
                          onClick={item.number > 0 ? this.props.delShopCart.bind(this, item) : null}
                        />
                        <div className="num">{item.number}</div>
                        <div
                          className={`num-add ${item.number >= item.stock ? 'no' : ''}`}
                          onClick={item.number < item.stock ? this.props.addShopCart.bind(this, item) : null}
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="order-bottom">
            <p className="order-title">知命会员新年专享优惠</p>
            <p className="order-txt">买两盒送一盒体验装;买三盒送一盒;买四盒送两盒！</p>
          </div>
        </div>
        <div className="order-count">
          <div className="count-box">
            <div className="kefu-btn" onClick={this.onShow}>
              客服
            </div>
            <div className="total-money">
              总计： <strong>￥{totalMoney}</strong>
            </div>
            <div className="mall-btn" onClick={this.navitoOrder}>
              立即购买
            </div>
          </div>
        </div>
        {/* 客服弹窗 */}
        <Service isShow={this.state.isShow} onShow={this.onShow} />
        {/* 支付提交 */}
        <form action="https://hy.yixueqm.com/interface/index.php/Home/Kaiyun/placeOrder" ref="form" method="POST">
          <input type="hidden" name="uid" value={this.uid} />
          <input type="hidden" name="price" value={totalMoney} />
          <input type="hidden" name="clist" value={JSON.stringify(goodsList)} />
          <input type="hidden" name="typeid" value={this.typeid} />
          <input type="hidden" name="aid" value={this.state.address.aid} />
          <input type="hidden" name="channel" value={this.channel} />
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({ storeState: state.order }),
  {
    getGoodsList,
    addShopCart,
    delShopCart,
  }
)(Order);
