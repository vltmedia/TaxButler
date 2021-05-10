import SignOutForm from '../SignOutForm';
import React from 'react';
import * as browser from 'webextension-polyfill';

import WebCombRoutes from '../../api/webcomb/routes';
// import Form_CrawlSettingEdit from '../webcomb/Form_CrawlSettingEdit';
import ButtonMenu from '../webcomb/ButtonMenu';
// import Address_Form from '../Address_Form';
// import crawler_Target from '../../api/webcomb/crawlers/crawler_Target/crawler_Target';
let WebCombRoutes_ = new WebCombRoutes();

class UserWindow extends React.Component {
  constructor() {
    super();
    this.SignOutClicked = this.SignOutClicked.bind(this);
    this.StartTargetBot = this.StartTargetBot.bind(this);

  }
  componentDidMount() {




  }


  async SignOutClicked(){
    browser.storage.local.remove('userinfo');
    let resp = await WebCombRoutes_.SignOutUser();
    console.log(resp);
    this.props.SignOutClick();

    // browser.runtime.sendMessage({data:'test 123'});
  
  }

  StartTargetBot(){
    browser.runtime.sendMessage({data:'crawlerTargetStart', command:'crawlerTargetStart'});
    // let crawler_Target_ = new crawler_Target();
    // crawler_Target_.StartCrawler();
    // browser.tabs.update({active: true, url: 'https://target.com'});
    // browser.tabs.update(1, {url: 'http://www.google.com'});
    // browser.window.location.reload('https://target.com');

  }

  render() {
    return  (<div className="popup">
      <div className="navinfo">
        <SignOutForm SignOutClick={this.SignOutClicked.bind(this)} />
      </div>
      <button onClick={this.StartTargetBot}>Start Target Bot</button>
      <ButtonMenu/>
    </div>);
  }
}
  
export default UserWindow;
  