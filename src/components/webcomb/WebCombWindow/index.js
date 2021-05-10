import './style.css';
import './material.css';
import * as browser from 'webextension-polyfill';

import MainAppWindow from '../../MainAppWindow/index.js';
import ButtonMenu from '../ButtonMenuBar';
import React from 'react';

class WebCombWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 28,
      SignedIn: false,
      PageToLoad: (
        <MainAppWindow
          SignedInClicked={this.SignInClicked.bind(this)}
          SignOutClicked={this.SignOutClicked.bind(this)}
        />
      ),
      ButtonMenu: <p>Load</p>
    };
    this.SubmitClicked = this.SubmitClicked.bind(this);
    this.DefaultUI = this.DefaultUI.bind(this);
    this.OverideUI = this.OverideUI.bind(this);
    this.SignOutClicked = this.SignOutClicked.bind(this);
    this.SignInClicked = this.SignInClicked.bind(this);
    this.AutoCheckLogin = this.AutoCheckLogin.bind(this);
  }

  componentDidMount() {
    this.AutoCheckLogin();
  }

  AutoCheckLogin() {
    browser.storage.local.get('userinfo').then(res => {
      if (res.userinfo != undefined) {
        if ('is_sys_admin' in res.userinfo) {
          this.setState({
            SignedIn: true,
            ButtonMenu: (
              <ButtonMenu
                SignedIn={true}
                OverideUI={this.OverideUI.bind(this)}
                HomeClicked={this.DefaultUI.bind(this)}
                SignOutClicked={this.SignOutClicked.bind(this)}
              />
            )
          });
        } 
      } else {
        this.setState({
          SignedIn: false,

          ButtonMenu: (
            <ButtonMenu
              SignedIn={this.state.SignedIn}
              OverideUI={this.OverideUI.bind(this)}
              HomeClicked={this.DefaultUI.bind(this)}
              SignOutClicked={this.SignOutClicked.bind(this)}
            />
          )
        });
      }
    });
  }
  SubmitClicked() {
    console.log('SubmitClicked');

    // this.props.Submit(this.state)
  }

  SignOutClicked() {
    console.log('SubmitClicked');
    browser.storage.local.remove('userinfo');
    // this.setState({ SignedIn: false, ButtonMenu: <p>Please Sign In</p> });
    this.setState({
      SignedIn: false,
      ButtonMenu: (
        <ButtonMenu
          SignedIn={false}
          OverideUI={this.OverideUI.bind(this)}
          HomeClicked={this.DefaultUI.bind(this)}
          SignOutClicked={this.SignOutClicked.bind(this)}
        />
      )
    });
    this.DefaultUI();
    // this.props.Submit(this.state)
  }

  SignInClicked() {
    console.log('signed in clicked');
    this.setState({
      SignedIn: true,
      ButtonMenu: (
        <ButtonMenu
          SignedIn={true}
          OverideUI={this.OverideUI.bind(this)}
          HomeClicked={this.DefaultUI.bind(this)}
          SignOutClicked={this.SignOutClicked.bind(this)}
        />
      )
    });

    // this.props.Submit(this.state)
  }
  
  OverideUI(html) {
    this.setState({ PageToLoad: html });
  }

  DefaultUI() {
    this.setState({
      PageToLoad: (
        <MainAppWindow
          SignedIn={true}
          SignedInClicked={this.SignInClicked.bind(this)}
          SignOutClicked={this.SignOutClicked.bind(this)}
        />
      )
    });
  }

  render() {
    return (
      <div className="WebCombWindow_Container">
        {/* {()=>{
          if(this.state.SignedIn){
            return(<ButtonMenu OverideUI={this.OverideUI.bind(this)} HomeClicked={this.DefaultUI.bind(this)} SignOutClicked={this.SignOutClicked.bind(this)}/>);
          }else{
            return(<h1>Signed Out</h1>);
          }
        }} */}
        {/* {this.state.ButtonMenu} */}
        <div className="WebCombWindow_Holder">{this.state.PageToLoad}</div>
      </div>
    );
  }
}

export default WebCombWindow;
