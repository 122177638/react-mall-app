import React,{ PureComponent } from 'react';
import './footnote.less'

class Footnote extends PureComponent{
  render(){
    return(
      <section className="footnote-container">
        <img src={require('./kefu.png')} alt=""/>
        <p>想要知道你更适合哪款知命养身开运香？</p>
        <p>可扫码添加以上的二维码，联系我们的客服君君</p>
        <p className="foot-small">深圳云卓数码科技有限公司</p>
      </section>
    )
  }
}

export default Footnote