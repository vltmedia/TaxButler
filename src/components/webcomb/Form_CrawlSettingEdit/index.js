import React from 'react';
import * as browser from 'webextension-polyfill';
import WebCombRoutes from '../../../api/webcomb/routes';
let WebCombRoutes_ = new WebCombRoutes();
class Form_CrawlSettingEdit extends React.Component {
  constructor() {
    super();
    this.state = {
 
      link: '',
      shipping_type: 'Ship',
      extra_settings: '{"data":{}}',
      wait_time: '1',
      description: '',
      crawl_queue: 4,
      vendor: 1,
      amount: 1,
      status: 4
    };
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
    browser.tabs
      .query({ active: true, lastFocusedWindow: true })
      .then(res => {document.getElementById('link').value = res[0].url; this.setState({link:res[0].url});});
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
              placeholder=""
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
              placeholder=""
              className="form-control input-md"
              onChange={e => this.setState({ description: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">Shipping Type</label>
          <div className="col-md-2">
            <select
              id="shipping_type"
              name="shipping_type"
              className="form-control"
              onChange={e => this.setState({ shipping_type: e.target.value })}
            >
              <option value="Ship">Ship</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">Amount</label>
          <div className="col-md-1">
            <input
              id="amount"
              name="amount"
              type="text"
              placeholder="1"
              className="form-control input-md"
              required=""
              onChange={e =>
                this.setState({ amount: parseInt(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="form-group">
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
