import React from 'react';
import 'regenerator-runtime/runtime';
import ReactDOM from 'react-dom';
import * as browser from 'webextension-polyfill';
import './index.css';
import WebCombWindow from '../components/webcomb/WebCombWindow/index.js';
// import MainAppWindow from '../components/MainAppWindow/index.js';
// import SignInForm from '../components/SignInForm/index.js';
// import SignOutForm from '../components/SignOutForm/index.js';

// import Popup from './Popup';
// var payload = {user: "johnsmith", password :"123456"};
browser.runtime.sendMessage({ data: 'hello' , command:'log'});

class PopUpManager extends React.Component {
  constructor() {
    super();
    this.state = {color: 'red',
      PageToLoad : <WebCombWindow  />
  
    };
    // this.LoginClicked = this.LoginClicked.bind(this);
    // this.SignOutClicked = this.SignOutClicked.bind(this);
    this.RefreshUserState = this.RefreshUserState.bind(this);
  }
  componentDidMount() {

    // this.RefreshUserState();

  }

  RefreshUserState(){
    // browser.storage.local.get('userinfo')
    //   .then(res => {browser.runtime.sendMessage(['found user info',res, 'userinfo' in res, res.userinfo.session_token]);
    //     if('userinfo' in res){
    //       this.setState({PageToLoad : <SignOutForm SignOutClick={this.SignOutClicked.bind(this)} />});
    //     }else{
    //       this.setState({PageToLoad : <SignInForm LoginClick={this.LoginClicked.bind(this)} />});
    //     }
      

    //   })
    //   .catch(() => {browser.runtime.sendMessage('failed user info');
    //     this.setState({PageToLoad : <SignInForm LoginClick={this.LoginClicked.bind(this)} />});
    //   });
  }



  render() {
    return <div>

      {this.state.PageToLoad}
  
    </div>;
  }
}

export default PopUpManager;


ReactDOM.render(<PopUpManager  />, document.getElementById('root'));

