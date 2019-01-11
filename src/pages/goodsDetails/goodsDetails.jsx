import React,{ PureComponent } from 'react';
import './goodsDetails.less'

// import Component
import Footnote from '@/components/footnote/footnote'
import FootBuy from '@/components/footBuy/footBuy'

// import function
import { openScroll,parseQueryString } from '@/common/js/mixin';
import API from '@/api/api';


class GoodsDetails extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      goodsInfo: {
        dataImg:[]
      }
    }
    // bind this
  }
  componentWillMount(){
    let params = parseQueryString(window.location.href);
    console.log(params)
    try {
      if(params && params.uid){
        localStorage.setItem('uid',params.uid)
      }
      if(params && params.channel){
        localStorage.setItem('channel',params.channel)
      }
      if(params && params.typeid){
        localStorage.setItem('typeid',params.typeid)
      }
      if(params && params.native){
        sessionStorage.setItem('native',params.native)
      }
    } catch (error) {
      alert('浏览器不支持localstorage||sessionstorage')
    }
  }
  componentDidMount(){
    API.getGoodsInfo({typeid:localStorage.getItem('typeid')}).then((data)=>{
      this.setState({goodsInfo: data})
      console.log(this.state.goodsInfo)
    })
    openScroll(this.refs.viewDom)
  }
  openRetract(idx){
    let goodsInfo = this.state.goodsInfo;
    goodsInfo.dataImg[idx].Retract = false;
    this.setState({
      goodsInfo: {...goodsInfo}
    })
  }
  render(){
    return(
      <div className="GoodsDetails-container" ref="viewDom">
        <section className="goods-banner">
          <img src={this.state.goodsInfo.banner} alt=""/>
          <div className="goods-info">
            <h3 className="goods-title">{this.state.goodsInfo.typeName}</h3>
            <p className="goods-money">
              <span className="goods-nowmoney">￥{this.state.goodsInfo.price}</span>
              <span className="goods-oldmoney">原价：￥338.00</span>
              <span className="goods-star">加持人：{this.state.goodsInfo.number}</span>
            </p>
          </div>
        </section>
        <section className="goods-introduce">
          <ul className="goods-list">
            {
              this.state.goodsInfo.dataImg.map((item,index)=>{
                return(
                  <li className={`goods-item ${item.Retract?'Retract':''}`} key={index}>
                    <img src={item.img} alt=""/>
                    { 
                      item.Retract && 
                      <div className="open-more">
                        <div className="open-flag" onClick={this.openRetract.bind(this,index)}>
                          <p className="more-txt">展开阅读更多用香知识</p>
                          <p className="more-icon"></p>
                        </div>
                      </div>
                    }
                  </li>
                )
              })
            }
          </ul>
        </section>
        <Footnote></Footnote>
        <FootBuy></FootBuy>
      </div>
    )
  }
}

export default GoodsDetails;