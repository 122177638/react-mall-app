import React,{ PureComponent } from 'react';
import './footnote.less'

import {CopyToClipboard} from 'react-copy-to-clipboard';

class Footnote extends PureComponent{
  render(){
    return(
      <section className="footnote-container">
        <img src={require('./kefu.png')} alt=""/>
        <p>想要知道你更适合哪款知命养身开运香？</p>
        <p>可扫描以上二维码添加客服微信</p>
        <p>或微信搜索客服君君(
          <CopyToClipboard text={'zm_junjun'}
            onCopy={() => { alert('复制成功，前去微信添加客服')}}>
            <a href="weixin://" className="openWX">zm_junjun</a>
          </CopyToClipboard>
        )了解更多</p>
        <p className="foot-small">深圳云卓数码科技有限公司</p>
      </section>
    )
  }
}

export default Footnote