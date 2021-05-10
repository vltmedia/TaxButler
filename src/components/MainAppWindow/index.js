import React from 'react';
import 'regenerator-runtime/runtime';
import * as browser from 'webextension-polyfill';
// import './index.css';
import TaxButlerMainWindow from '../TaxButlerMainWindow/index.js';
// import SignOutForm from '../SignOutForm/index.js';
import UserWindow from '../UserWindow/index.js';
// import WebCombWindow from '../webcomb/WebCombWindow';
import WebCombRoutes from '../../api/webcomb/routes';
let WebCombRoutes_ = new WebCombRoutes();

// import Popup from './Popup';
// var payload = {user: "johnsmith", password :"123456"};
browser.runtime.sendMessage({ data: 'hello', command: 'log' });

let devmode = true;

class MainAppWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      color: 'red',
      PageToLoad: (
        <TaxButlerMainWindow
          LoginClick={this.LoginClicked.bind(this)}
          showdev={devmode}
        />
      )
    };
    this.LoginClicked = this.LoginClicked.bind(this);
    this.SignOutClicked = this.SignOutClicked.bind(this);
    this.RefreshUserState = this.RefreshUserState.bind(this);
  }
  componentDidMount() {
    this.RefreshUserState();
  }

  RefreshUserState() {
    browser.storage.local
      .get('userinfo')
      .then(res => {
        browser.runtime.sendMessage({
          data: [
            'found user info',
            res,
            'userinfo' in res,
            res.userinfo.session_token
          ],
          command: 'log'
        });
        if ('userinfo' in res) {
          // this.setState({PageToLoad : <WebCombWindow SignOutClick={this.SignOutClicked.bind(this)} />});
          // this.setState({PageToLoad : <h1>Poo</h1>});
          this.setState({
            PageToLoad: (
              <UserWindow SignOutClick={this.SignOutClicked.bind(this)} />
            )
          });
          // this.setState({PageToLoad : <SignOutForm SignOutClick={this.SignOutClicked.bind(this)} />});
        } else {
          this.setState({
            PageToLoad: (
              <TaxButlerMainWindow
                LoginClick={this.LoginClicked.bind(this)}
                showdev={devmode}
              />
            )
          });
        }
      })
      .catch(() => {
        browser.runtime.sendMessage({
          data: 'failed user info',
          command: 'log'
        });
        this.setState({
          PageToLoad: (
            <TaxButlerMainWindow
              LoginClick={this.LoginClicked.bind(this)}
              showdev={devmode}
            />
          )
        });
      });
  }

  async LoginClicked(UserLogin) {
    let logintest = await WebCombRoutes_.LoginUser(UserLogin);
    if (logintest.result == 'success') {
      browser.storage.local.set({ userinfo: logintest.data });
      this.RefreshUserState();
      this.props.SignedInClicked();
    }

    browser.runtime.sendMessage(logintest);
    // browser.runtime.sendMessage({data:'test 123'});
    // browser.alert('Poo');
    console.log('Login Clicked');
    console.log(logintest.result);
  }

  

  async SignOutClicked() {
    browser.storage.local.remove('userinfo');
    // let resp = await WebCombRoutes_.SignOutUser();

    this.RefreshUserState();
    this.props.SignOutClicked();

    // browser.runtime.sendMessage(resp);
    // browser.runtime.sendMessage({data:'test 123'});
  }

  render() {
    return (
      <div>
        
        {this.state.PageToLoad}
      </div>
    );
  }
}

export default MainAppWindow;
