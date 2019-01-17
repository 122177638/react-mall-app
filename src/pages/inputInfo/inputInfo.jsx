import React,{PureComponent} from 'react';
import './inputInfo.less'

// function
import { Toast, Modal } from 'antd-mobile';
import API from '@/api/api'

class InputInfo extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      userInfo:{
        uid: localStorage.getItem('uid')
      }
    }

    // bind this
    this.formSubmit = this.formSubmit.bind(this);
    this.getName = this.getName.bind(this);
    this.getphone = this.getphone.bind(this);
    this.getAddress = this.getAddress.bind(this)
  }
  componentWillMount(){
    if(this.props.location.state){
      this.setState({ userInfo: this.props.location.state })
    }
  }
  weixinBUG(){
    window.scrollTo({top:0,left:0,behavior:"smooth"})
  }
  getName(e){
    this.setState({
      userInfo: {...this.state.userInfo,name:e.target.value}
    })
  }
  getphone(e){
    this.setState({
      userInfo: {...this.state.userInfo,phone:e.target.value}
    })
  }
  getAddress(e){
    this.setState({
      userInfo: {...this.state.userInfo,address:e.target.value}
    })
  }
  formSubmit(){
    if(!/[\u4e00-\u9fa5]+/.test(this.state.userInfo.name)){
      Toast.info('请输入收件人姓名(中文)', 1);
      return false;
    }
    if(!/^1(3|4|5|7|8)\d{9}/.test(this.state.userInfo.phone)){
      Toast.info('请输入正确的收件人电话', 1);
      return false;
    }
    if(!this.state.userInfo.address){
      Toast.info('请输入收件人地址', 1);
      return false;
    }
    Modal.alert('信息确认', '请确认信息填写无误', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => {
        console.log(this.state.userInfo)
        API.setAddress(this.state.userInfo).then((data)=>{
          if(data.code){
            this.props.history.go(-1)
          }else{
            Toast.fail('保存地址失败，请重试', 2);
          }
        })
      }},
    ]);
  }
  render(){
    return(
      <div className="InputInfo-container">
        <div className="InputInfo-content">
          <p className="InputInfo-point">你已成功购买【知命养生开运香】，请完善您的收件信息，以便能尽快收到商品。</p>
          <div className="InputInfo-form">
            <div className="form-item">
              <div className="input-name">收件人姓名</div> 
              <div className="input-box"><input type="text" placeholder="请填写收件人姓名" onChange={this.getName} value={this.state.userInfo.name} onBlur={this.weixinBUG} className="line-input"></input></div>
            </div>
            <div className="form-item">
              <div className="input-name">收件人电话</div> 
              <div className="input-box"><input type="text" placeholder="请填写收件人联系电话" onChange={this.getphone} onBlur={this.weixinBUG} value={this.state.userInfo.phone} className="line-input"></input></div>
            </div>
            <div className="form-item column">
              <p className="input-name">收件人地址(请填写详细的收件地址)</p> 
              <div className="input-box"><textarea className="line-input" onChange={this.getAddress} value={this.state.userInfo.address} onBlur={this.weixinBUG} placeholder="请填写详细的收件地址"></textarea></div>
            </div>
            <p className="form-point">
              温馨提示：
              <br />
              您购买的商品一般会在购买后3-7天内寄出，请易友耐心等待物流动态。
            </p>
          </div>
        </div>
        <div className="form-submit" onClick={this.formSubmit}>保存地址</div>
      </div>
    )
  }
}

export default InputInfo