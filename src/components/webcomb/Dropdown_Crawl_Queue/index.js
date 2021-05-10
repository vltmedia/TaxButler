import './style.css';
import WebCombRoutes from '../../../api/webcomb/routes';
import DropDown from '../../DropDown';
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
// const defaultOption = options[0];
class Dropdown_Crawl_Queue extends React.Component {
  constructor() {
    super();
    var defaultOption = options[0];
    try {
      if (this.props.defaultOption != undefined) {
        defaultOption = this.props.defaultOption;
      }
    } catch (e) {}
    this.state = {
      id: '4',
      user: '4',
      status: 'Open',
      name: 'Dev Products',
      current_index: '0',
      options: options,
      defaultOption: defaultOption,
      DropDownRender: (
        <DropDown
          options={options}
          value={defaultOption}
          placeholder="Select an option"
        />
      )
    };
    this.SubmitClicked = this.SubmitClicked.bind(this);
    this.GetUserCrawlQueue = this.GetUserCrawlQueue.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.RefreshDropDown = this.RefreshDropDown.bind(this);
  }

  RefreshDropDown() {
    this.setState({
      DropDownRender: (
        <DropDown
          options={this.state.options}
          onChange={this._onSelect}
          value={this.state.defaultOption}
          placeholder="Select an option"
        />
      )
    });
  }
  SubmitClicked() {
    console.log('SubmitClicked');

    // this.props.Submit(this.state)
  }
  componentDidMount() {
    this.GetUserCrawlQueue();
  }

  _onSelect(SelectedValue) {
    console.log('Selected', SelectedValue);
    var outindex = 0;
    for (var i = 0; i < this.state.options.length; i++) {
      if (SelectedValue.label == this.state.options[i]) {
        outindex = i;
      }
    }
    this.props.onChange(outindex);
  }
  async GetUserCrawlQueue() {
    let UserCrawlQueue = await WebCombRoutes_.GetUserCrawlQueue();
    browser.storage.local.set({ crawlqueues: UserCrawlQueue.data });
    var crawlchoices = [];
    for (var i = 0; i < UserCrawlQueue.data.crawlqueues.length; i++) {
      var crawlq = UserCrawlQueue.data.crawlqueues[i];
      crawlchoices.push('#' + crawlq.id.toString() + ' | ' + crawlq.name);
    }
    // try {
    //   if (this.props.defaultOption != undefined) {
    //     var defaultOption = this.props.defaultOption;
    //     this.setState({ options: crawlchoices, defaultOption: defaultOption });
    //   }
    // } catch (e) {
    //   this.setState({ options: crawlchoices, defaultOption: crawlchoices[0] });
    // }
    this.setState({ options: crawlchoices, defaultOption: crawlchoices[this.props.defaultOption] });

    this.RefreshDropDown();
  }

  render() {
    return (
      <div className="Crawl_Queue_Dropdown_Container">
        <h1 className="Crawl_Queue_DropDownForm_Header">Crawl Queue:</h1>
        {this.state.DropDownRender}
        {/* <div className="Crawl_Setting_id_container Crawl_Setting_inputholder">
          <label className="Crawl_Setting_id_label Crawl_Setting_label">
            id:
          </label>
          <br />
          <label
            className="Crawl_Setting_id_value Crawl_Setting_value Crawl_SettingvalueKey_number "
            id="id"
            name="id"
          >
            {this.props.data.id}
          </label>
          <br />
        </div>
        <div className="Crawl_Setting_user_container Crawl_Setting_inputholder">
          <label className="Crawl_Setting_user_label Crawl_Setting_label">
            user:
          </label>
          <br />
          <label
            className="Crawl_Setting_user_value Crawl_Setting_value Crawl_SettingvalueKey_number "
            id="user"
            name="user"
          >
            {this.props.data.user}
          </label>
          <br />
        </div>
        <div className="Crawl_Setting_status_container Crawl_Setting_inputholder">
          <label className="Crawl_Setting_status_label Crawl_Setting_label">
            status:
          </label>
          <br />
          <label
            className="Crawl_Setting_status_value Crawl_Setting_value Crawl_SettingvalueKey_text"
            id="status"
            name="status"
          >
            {this.props.data.status}
          </label>
          <br />
        </div>
        <div className="Crawl_Setting_name_container Crawl_Setting_inputholder">
          <label className="Crawl_Setting_name_label Crawl_Setting_label">
            name:
          </label>
          <br />
          <label
            className="Crawl_Setting_name_value Crawl_Setting_value Crawl_SettingvalueKey_text"
            id="name"
            name="name"
          >
            {this.props.data.name}
          </label>
          <br />
        </div>
        <div className="Crawl_Setting_current_index_container Crawl_Setting_inputholder">
          <label className="Crawl_Setting_current_index_label Crawl_Setting_label">
            current_index:
          </label>
          <br />
          <label
            className="Crawl_Setting_current_index_value Crawl_Setting_value Crawl_SettingvalueKey_number "
            id="current_index"
            name="current_index"
          >
            {this.props.data.current_index}
          </label>
          <br />
        </div>

        <button
          className="Crawl_Queue_submitbutton"
          onClick={this.SubmitClicked}
        >
          Submit
        </button> */}
      </div>
    );
  }
}

export default Dropdown_Crawl_Queue;
