import React,{ PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import { ActionSheet, Toast } from 'antd-mobile';
import './footBuy.less'

//components
import SharePoint from '@/components/sharePoint/sharePoint'
import Service from '@/components/service/service';

// function
import { isIos,isAndroid,isWeixin,isQQ } from '@/common/js/lib'

class FootBuy extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      isShare: false,
      isShow: false,
    }
    // bind this
    this.shareShow = this.shareShow.bind(this);
    this.linktoOrder = this.linktoOrder.bind(this);
    this.onShow = this.onShow.bind(this);
    this.naviToMyOrder = this.naviToMyOrder.bind(this);
  }
  // 分享配置
  dataList = [
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '朋友圈' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ好友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }));
  shareShow(){
    if(isWeixin() || isQQ()){
      this.setState({isShare: !this.state.isShare})
    }else if(sessionStorage.getItem('native')){
      if(isAndroid()){
        this.showShareActionSheet('android');
      }else if(isIos()){
        this.showShareActionSheet('ios');
      }
    } else{
      this.setState({isShare: !this.state.isShare})
    }
  }
  onShow(){
    this.setState({isShow:!this.state.isShow})
  }
  linktoOrder(){
    this.props.history.push('/order')
  }
  naviToMyOrder(){
    this.props.history.push('/myOrder')
  }
  showShareActionSheet = (client) => {
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      // title: 'title',
      message: '分享到',
    },
    (buttonIndex) => {
      if(buttonIndex > -1){
        let sharetype = ++buttonIndex;
        sharetype = sharetype === 4?5:sharetype;
        let shareParams = {
          title: '知命养生开运香',
          content: '道家传统古法秘制，化煞旺运，清心养神，修心转运必请',
          imgurl: 'https://hy.yixueqm.com/interface/Public/images/kaiyun/shareKyx.png',
          sharetype: sharetype,
          shareMode: 9,
        }
        if(client === 'ios'){
          window.webkit.messageHandlers.share.postMessage(JSON.stringify(shareParams)) // eslint-disable-line
        }
        if(client === 'android'){
          android.share(JSON.stringify(shareParams)) // eslint-disable-line
        }
        // also support Promise
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      }
      return new Promise((resolve) => {
        setTimeout(resolve, 20);
      });
    });
  }
  render(){
    return(
      <section className="footBuy-container">
        <div className="footBuy-wrapper">
          <div className="work-btn" onClick={this.onShow}>客服</div>
          <div className="work-btn" onClick={this.shareShow}>分享</div>
          <div className="buy-btn" onClick={this.linktoOrder}>立即购买</div>
        </div>
        <div className="footBuy-order" onClick={this.naviToMyOrder}>订单</div>
        <Service isShow={this.state.isShow} onShow={this.onShow}></Service>
        <SharePoint tip="分享到你的微信好友或者朋友圈" isShare={this.state.isShare} shareShow={this.shareShow}></SharePoint>
      </section>
    )
  }
}

export default withRouter(FootBuy)