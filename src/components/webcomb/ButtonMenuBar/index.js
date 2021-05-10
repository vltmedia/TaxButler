import React from 'react';
import Crawl_Queue from '../Crawl_Queue';
import Form_CrawlSettingEdit from '../Form_CrawlSettingEdit_';

class ButtonMenuBar extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 28
    };
    this.SubmitClicked = this.SubmitClicked.bind(this);
    this.UserClicked = this.UserClicked.bind(this);
    this.CrawlQueueClicked = this.CrawlQueueClicked.bind(this);
    this.CrawlersClicked = this.CrawlersClicked.bind(this);
    this.LogsClicked = this.LogsClicked.bind(this);
    this.SignOutClicked = this.SignOutClicked.bind(this);
    this.CrawlSettingtableRowClickedEdit = this.CrawlSettingtableRowClickedEdit.bind(this);
  }

  SubmitClicked() {
    console.log('SubmitClicked');

    // this.props.Submit(this.state)
  }
  UserClicked(){

    var overideUI = <div><h1>User Menu</h1></div>;
    this.props.OverideUI(overideUI);
  }
  CrawlSettingtableRowClickedEdit(row){
    var overideUI = <Form_CrawlSettingEdit overide={row}/>;
    this.props.OverideUI(overideUI);

    console.log('Crawl Edit ', row);

  }
  CrawlQueueClicked(){

    // var overideUI = <div><h1>Crawl Queue Menu</h1></div>;
    var overideUI = <Crawl_Queue CrawlSettingEdit={this.CrawlSettingtableRowClickedEdit}/>;
    this.props.OverideUI(overideUI);
  }

  CrawlersClicked(){

    var overideUI = <div><h1>Crawlers Menu</h1></div>;
    this.props.OverideUI(overideUI);
  }

  LogsClicked(){

    var overideUI = <div><h1>Logs Menu</h1></div>;
    this.props.OverideUI(overideUI);
  }

  SignOutClicked(){

    this.props.SignOutClicked();
  }

  render() {
    return (
      <div className="WebComb_ButtonToolbar_Holder">
        <button className="WebCombWindow_ButtonToolbar pure-material-button-contained" disabled ={!this.props.SignedIn} onClick={this.props.HomeClicked}>
          <span className="WebCombWindow_ButtonToolbar_span">Home</span>
        </button>
        <button className="WebCombWindow_ButtonToolbar pure-material-button-contained"  disabled ={!this.props.SignedIn} onClick={this.UserClicked}>
          <span className="WebCombWindow_ButtonToolbar_span">User</span>
        </button>
        <button className="WebCombWindow_ButtonToolbar pure-material-button-contained"  disabled ={!this.props.SignedIn} onClick={this.CrawlQueueClicked}>
          <span className="WebCombWindow_ButtonToolbar_span">Crawl Queue</span>
        </button>
        <button className="WebCombWindow_ButtonToolbar pure-material-button-contained"  disabled ={!this.props.SignedIn} onClick={this.CrawlersClicked}>
          <span className="WebCombWindow_ButtonToolbar_span">Crawlers</span>
        </button>
        <button className="WebCombWindow_ButtonToolbar pure-material-button-contained"  disabled ={!this.props.SignedIn} onClick={this.LogsClicked}>
          <span className="WebCombWindow_ButtonToolbar_span">Logs</span>
        </button>
        {/* <button className="WebCombWindow_ButtonToolbar pure-material-button-contained" onClick={this.SignOutClicked}>
          <span className="WebCombWindow_ButtonToolbar_span">Sign Out</span>
        </button> */}
      </div>
    );
  }
}

export default ButtonMenuBar;
