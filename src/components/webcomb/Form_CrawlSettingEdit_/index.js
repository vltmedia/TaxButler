import React from 'react';
import WebCombRoutes from '../../../api/webcomb/routes';
import Dropdown_Crawl_Queue from '../Dropdown_Crawl_Queue';
import * as browser from 'webextension-polyfill';

let WebCombRoutes_ = new WebCombRoutes();
class Form_CrawlSettingEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      currentcrawlq: {
        id: '4',
        user: '4',
        status: 'Open',
        name: 'Dev Products',
        current_index: '0',
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
      current: {
        link: '',
        shipping_type: 'Ship',
        extra_settings: '{"data":{}}',
        wait_time: '1',
        description: '',
        crawl_queue: 4,
        vendor: 1,
        amount: 1,
        status: 4
      },
      ShippingHTML: (
        <select
          id="shipping_type"
          name="shipping_type"
          className="form-control"
          onChange={e => this.setState({ shipping_type: e.target.value })}
        >
          <option value="Ship">Ship</option>
          <option value="Pickup">Pickup</option>
        </select>
      )
    };
    this.submitForm = this.submitForm.bind(this);
    this.GetUserCrawlQueue = this.GetUserCrawlQueue.bind(this);
  }
  DropdownChanged(SelectedValue) {
    // console.log('Selected', this.state.crawlqs[SelectedValue]);
    this.setState({ currentcrawlq: this.state.crawlqs[SelectedValue] });
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
  componentDidMount() {
    console.log(this.props.overide);
    console.log('Shipping Type', this.props.overide.shipping_type);
    if (this.props.overide.shipping_type == 'Ship') {
      this.setState({
        ShippingHTML: (
          <select
            id="shipping_type"
            name="shipping_type"
            className="form-control"
            onChange={e => this.setState({ shipping_type: e.target.value })}
          >
            <option selected value="Ship">
              Ship
            </option>
            <option value="Pickup">Pickup</option>
          </select>
        )
      });
    }
    if (this.props.overide.shipping_type == 'Pickup') {
      this.setState({
        ShippingHTML: (
          <select
            id="shipping_type"
            name="shipping_type"
            className="form-control"
            onChange={e => this.setState({ shipping_type: e.target.value })}
          >
            <option value="Ship">Ship</option>
            <option selected value="Pickup">
              Pickup
            </option>
          </select>
        )
      });
    }
    this.setState({ current: this.props.overide });
  }

  async submitForm() {
    let thinggg = this.state;

    let thing = await WebCombRoutes_.AddCrawlSetting(thinggg);
    alert('Successfully submitted a new Crawl Setting!');
    this.props.Submitted();
    console.log(thing);
    // browser.runtime.sendMessage(this.state);
    // console.log(this.state);
  }

  render() {
    return (
      <div>
        {/* <form className="form-horizontal">
          <fieldset> */}
        <legend>Crawl Setting</legend>

        <div className="form-group">
          <label className="col-md-4 control-label">URL</label>
          <div className="col-md-4">
            <input
              id="link"
              name="link"
              type="text"
              placeholder={this.state.current.link}
              className="form-control input-md"
              required=""
              onChange={e => this.setState({ link: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">Desciption</label>
          <div className="col-md-4">
            <input
              id="desciption"
              name="desciption"
              type="text"
              placeholder={this.state.current.desciption}
              className="form-control input-md"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">Shipping Type</label>
          <div className="col-md-2">{this.state.ShippingHTML}</div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">Amount</label>
          <div className="col-md-1">
            <input
              id="amount"
              name="amount"
              type="text"
              placeholder={this.state.current.amount}
              className="form-control input-md"
              required=""
              onChange={e =>
                this.setState({ amount: parseInt(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <Dropdown_Crawl_Queue defaultOption={this} onChange={this.DropdownChanged.bind(this)} />

          <label className="col-md-4 control-label">Crawl Queue</label>
          <div className="col-md-2">
            <select
              id="crawl_queue"
              name="crawl_queue"
              className="form-control"
              onChange={e =>
                this.setState({ crawl_queue: parseInt(e.target.value) })
              }
            >
              <option value="1">4</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">Vendor</label>
          <div className="col-md-2">
            <select
              id="vendor"
              name="vendor"
              className="form-control"
              onChange={e =>
                this.setState({ vendor: parseInt(e.target.value) })
              }
            >
              <option value="1">Target</option>
              <option value="2">Walmart</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-4">
            <button
              // id="submit"
              onClick={this.submitForm}
              // name="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
        {/* </fieldset>
        </form> */}
      </div>
    );
  }
}
export default Form_CrawlSettingEdit;
