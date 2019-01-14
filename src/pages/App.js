import React, { Component,Fragment } from 'react';
import { Switch, Route,HashRouter } from 'react-router-dom';

// function
// import asyncComponent from '@/common/js/asyncComponent'
import API from "@/api/api";
import { wxShare } from "@/common/js/lib";

// components
// import Home from './home/home'
import GoodsDetails from './goodsDetails/goodsDetails'
import Order from './order/order'
import InputInfo from './inputInfo/inputInfo';
import BuyPoint from './buyPoint/buyPoint';
import MyOrder from './myOrder/myOrder';
// import NotFound from './notFound/notFound';
import orderDetails from './orderDetails/orderDetails'
// 页面按需加载
// const Login = asyncComponent(() => import('./login/login'))
// const GoodsDetails = asyncComponent(() => import('./goodsDetails/goodsDetails'))
// react-router-dom4 不再推荐将所有路由规则放在同一个地方集中式路由
// 子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染,所以我去除了router.js
class App extends Component {
  componentWillMount(){
    let url = window.location.href.split('#')[0];
    API.getWxInfo({shareUrl:url}).then((data)=>{
      wxShare(data,{
        share_title: '知命养生开运香',
        share_description:'道家传统古法秘制，化煞旺运，清心养神，修心转运必请',
        thumb:'https://hy.yixueqm.com/interface/Public/images/kaiyun/shareKyx.png'
      },'https://hy.yixueqm.com/interface/index.php/Home/Kaiyun',()=>{})
    })
  }
  render() {
    return (
      <HashRouter>
        <Fragment>
          <Switch>
            <Route exact path="/" component={GoodsDetails}></Route>
            <Route path="/order" component={Order}></Route>
            <Route path="/inputInfo" component={InputInfo}></Route>
            <Route path="/buyPoint" component={BuyPoint}></Route>
            <Route path="/myOrder" component={MyOrder}></Route>
            <Route path="/orderDetails" component={orderDetails}></Route>
            {/* <Redirect exact from="/" to="/home"></Redirect> */}
            {/* <Route path="/login" component={Login}></Route> */}
            {/* <Route path="*" component={NotFound}></Route> */}
          </Switch>
        </Fragment>
    </HashRouter>
    );
  }
}

export default App;
