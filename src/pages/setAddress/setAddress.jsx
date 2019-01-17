import React, { PureComponent } from 'react';
import './setAddress.less';

import { Toast, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { getAddressList, selAddressInit, delAddressItem } from '@/store/setAddress/action';
class SetAddress extends PureComponent {
  componentWillMount() {
    this.props.getAddressList({ uid: localStorage.getItem('uid')});
  }
  selAddress(item) {
    this.props.selAddressInit(item);
  }
  setAddress(item,event) { 
    event.stopPropagation();
    this.props.history.push({pathname:'/inputInfo',state:item})
  }
  addAddress() { 
    this.props.history.push({ pathname: '/inputInfo' });
  }
  delAddress(item, event) {
    event.stopPropagation();
    console.log(item);
    Modal.alert('删除收货地址', null, [
      {
        text: '取消',
        onPress: () => {},
      },
      {
        text: '确定',
        onPress: () => {
          this.props.delAddressItem(item);
        },
      },
    ]);
  }
  submitAddress() {
    let item = this.props.storeState.addressList.filter(item => item.selected)[0];
    this.props.history.push({ pathname: '/order', state: { type:'address',data:item } })
    console.log(item);
  }
  render() {
    const addressList = this.props.storeState.addressList;
    console.log(addressList);
    return (
      <div className="setAddress-container">
        <div className="setAddress-wrapper">
          {addressList.length > 0 && <div className="setAddress-tip">您目前所保存的收货地址</div>}
          <ul className="setAddress-list">
            {addressList.map((item, index) => {
              return (
                <li className={`setAddress-item  ${item.selected ? 'selected' : ''}`} key={index} onClick={this.selAddress.bind(this, item)}>
                  <div className="item-status" />
                  <div className="item-content">
                    <p className="item-info">
                      {item.name}
                      <span>{item.phone}</span>
                    </p>
                    <p className="item-address">{item.address}</p>
                  </div>
                  <div className="item-fs">
                    <div className="item-set"  onClick={this.setAddress.bind(this, item)}>编辑</div>
                    <div className="item-del" onClick={this.delAddress.bind(this, item)}>
                      删除
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="add-address">
            <span className="add-address-btn" onClick={this.addAddress.bind(this)}>添加收货地址</span>
          </div>
        </div>
        <div className="setAddress-footer">
          <div className="selected-btn" onClick={this.submitAddress.bind(this)}>
            确认选择
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ storeState: { ...state.setAddress } }),
  {
    getAddressList,
    selAddressInit,
    delAddressItem,
  }
)(SetAddress);
