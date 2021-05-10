import './style.css';
import WebCombRoutes from '../../../api/webcomb/routes';
// import DropDown from '../../DropDown';
import CrawlSetting_Table from '../CrawlSetting_Table';
import Dropdown_Crawl_Queue from '../Dropdown_Crawl_Queue';
import * as browser from 'webextension-polyfill';

import React from 'react';
let WebCombRoutes_ = new WebCombRoutes();
const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', className: 'myOptionClassName' },
  {
    type: 'group',
    name: 'group1',
    items: [
      { value: 'three', label: 'Three', className: 'myOptionClassName' },
      { value: 'four', label: 'Four' }
    ]
  },
  {
    type: 'group',
    name: 'group2',
    items: [{ value: 'five', label: 'Five' }, { value: 'six', label: 'Six' }]
  }
];
const defaultOption = options[0];
class Crawl_Queue extends React.Component {
  constructor() {
    super();
    this.state = {
      currentcrawlq: {
        id: '4',
        user: '4',
        status: 'Open',
        name: 'Dev Products',
        current_index: '0',
        options: options,
        defaultOption: defaultOption,
        crawlsettings: [
          {
            id: '99999',
            link: 'google.com',
            shipping_type: 'Ship',
            amount: 1,
            status: 0,
            vendor: 2,
            description: 'Google check'
          }
        ]
      },
      crawlqs: [],
      currentCrawlSetting:{
        id: '99999',
        link: 'google.com',
        shipping_type: 'Ship',
        amount: 1,
        status: 0,
        vendor: 2,
        description: 'Google check'
      }
    };
    this.SubmitClicked = this.SubmitClicked.bind(this);
    this.GetUserCrawlQueue = this.GetUserCrawlQueue.bind(this);
    this.DropdownChanged = this.DropdownChanged.bind(this);
    this.CrawlSettingtableRowClicked = this.CrawlSettingtableRowClicked.bind(this);
  }

  SubmitClicked() {
    // console.log('SubmitClicked');

    // this.props.Submit(this.state)
  }
  componentDidMount() {
    this.GetUserCrawlQueue();
  }

  DropdownChanged(SelectedValue) {
    // console.log('Selected', this.state.crawlqs[SelectedValue]);
    this.setState({ currentcrawlq: this.state.crawlqs[SelectedValue] });
  }
  CrawlSettingtableRowClicked(SelectedValue) {
    // console.log('Selected', SelectedValue);
    this.setState({ currentCrawlSetting: SelectedValue });
    this.props.CrawlSettingEdit(SelectedValue);

    
  }
  _onSelect(SelectedValue) {
    console.log('Selected', SelectedValue);
  }
  async GetUserCrawlQueue() {
    let UserCrawlQueue = await WebCombRoutes_.GetUserCrawlQueue();
    browser.storage.local.set({ crawlqueues: UserCrawlQueue.data });
    var crawlchoices = [];
    this.setState({ crawlqs: UserCrawlQueue.data.crawlqueues });
    for (var i = 0; i < UserCrawlQueue.data.crawlqueues.length; i++) {
      var crawlq = UserCrawlQueue.data.crawlqueues[i];

      crawlchoices.push(crawlq.id.toString() + ' | ' + crawlq.name);
    }
    this.setState({ currentcrawlq: UserCrawlQueue.data.crawlqueues[0] });

    this.setState({ options: crawlchoices, defaultOption: crawlchoices[0] });
  }

  render() {
    return (
      <div className="Crawl_Queue_Form_Container Form_Container">
        <h1 className="Crawl_Queue_Form_Header Form_Header">
          Crawl Queue Manager
        </h1>

        <Dropdown_Crawl_Queue onChange={this.DropdownChanged.bind(this)} />

        <div className="Crawl_Queue_card">
          <div className="Crawl_Queue_id_container Crawl_Queue_inputholder">
            <label className="Crawl_Queue_id_label Crawl_Queue_label">
              id:
            </label>
            <label
              className="Crawl_Queue_id_value Crawl_Queue_value Crawl_QueuevalueKey_number "
              id="id"
              name="id"
            >
              {this.state.currentcrawlq.id}
            </label>
          </div>
          <div className="Crawl_Queue_user_container Crawl_Queue_inputholder">
            <label className="Crawl_Queue_user_label Crawl_Queue_label">
              user:
            </label>
            <label
              className="Crawl_Queue_user_value Crawl_Queue_value Crawl_QueuevalueKey_number "
              id="user"
              name="user"
            >
              {this.state.currentcrawlq.user}
            </label>
          </div>
          <div className="Crawl_Queue_status_container Crawl_Queue_inputholder">
            <label className="Crawl_Queue_status_label Crawl_Queue_label">
              status:
            </label>
            <label
              className="Crawl_Queue_status_value Crawl_Queue_value Crawl_QueuevalueKey_text"
              id="status"
              name="status"
            >
              {this.state.currentcrawlq.status}
            </label>
          </div>
          <div className="Crawl_Queue_name_container Crawl_Queue_inputholder">
            <label className="Crawl_Queue_name_label Crawl_Queue_label">
              name:
            </label>
            <label
              className="Crawl_Queue_name_value Crawl_Queue_value Crawl_QueuevalueKey_text"
              id="name"
              name="name"
            >
              {this.state.currentcrawlq.name}
            </label>
            <br />
          </div>
          <div className="Crawl_Queue_current_index_container Crawl_Queue_inputholder">
            <label className="Crawl_Queue_current_index_label Crawl_Queue_label">
              current_index:
            </label>
            <label
              className="Crawl_Queue_current_index_value Crawl_Queue_value Crawl_QueuevalueKey_number "
              id="current_index"
              name="current_index"
            >
              {this.state.currentcrawlq.current_index}
            </label>
          </div>

          {/* <button
          className="Crawl_Queue_submitbutton"
          onClick={this.SubmitClicked}
        >
          Submit
        </button> */}
        </div>
        <CrawlSetting_Table rowClicked={this.CrawlSettingtableRowClicked.bind(this)}data={this.state.currentcrawlq.crawlsettings}/>
      </div>
    );
  }
}

export default Crawl_Queue;
