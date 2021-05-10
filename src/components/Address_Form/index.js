import './style.css';

import React from 'react';

class Address_Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '4',
      street_first_line: '8879 88th st.',
      street_second_line: '8D',
      city: 'Quicksville',
      state: 'Virginia',
      zip: '02694',
      country: 'United States of America',
      address_list: '4',
      description: 'Chu House'
    };
    this.SubmitClicked = this.SubmitClicked.bind(this);
  }

  SubmitClicked() {
    console.log('SubmitClicked');

    // this.props.Submit(this.state)
  }

  render() {
    return (
      <div className="Address_Form_Form_Container Form_Container">
        <h1 className="Address_Form_Form_Header Form_Header">Address Form</h1>

        <div className="Address_Form_id_container Address_Form_inputholder">
          <label className="Address_Form_id_label Address_Form_label">
            id:
          </label>
          <br />
          <input
            onChange={e => this.setState({ id: e.target.value })}
            className="Address_Form_id_input Address_ForminputKey"
            type="number "
            id="id"
            name="id"
            placeholder="4"
          />
          <br />
        </div>
        <div className="Address_Form_street_first_line_container Address_Form_inputholder">
          <label className="Address_Form_street_first_line_label Address_Form_label">
            street_first_line:
          </label>
          <br />
          <input
            onChange={e => this.setState({ street_first_line: e.target.value })}
            className="Address_Form_street_first_line_input Address_ForminputKey"
            type="text"
            id="street_first_line"
            name="street_first_line"
            placeholder="8879 88th st."
          />
          <br />
        </div>
        <div className="Address_Form_street_second_line_container Address_Form_inputholder">
          <label className="Address_Form_street_second_line_label Address_Form_label">
            street_second_line:
          </label>
          <br />
          <input
            onChange={e =>
              this.setState({ street_second_line: e.target.value })
            }
            className="Address_Form_street_second_line_input Address_ForminputKey"
            type="text"
            id="street_second_line"
            name="street_second_line"
            placeholder="8D"
          />
          <br />
        </div>
        <div className="Address_Form_city_container Address_Form_inputholder">
          <label className="Address_Form_city_label Address_Form_label">
            city:
          </label>
          <br />
          <input
            onChange={e => this.setState({ city: e.target.value })}
            className="Address_Form_city_input Address_ForminputKey"
            type="text"
            id="city"
            name="city"
            placeholder="Quicksville"
          />
          <br />
        </div>
        <div className="Address_Form_state_container Address_Form_inputholder">
          <label className="Address_Form_state_label Address_Form_label">
            state:
          </label>
          <br />
          <input
            onChange={e => this.setState({ state: e.target.value })}
            className="Address_Form_state_input Address_ForminputKey"
            type="text"
            id="state"
            name="state"
            placeholder="Virginia"
          />
          <br />
        </div>
        <div className="Address_Form_zip_container Address_Form_inputholder">
          <label className="Address_Form_zip_label Address_Form_label">
            zip:
          </label>
          <br />
          <input
            onChange={e => this.setState({ zip: e.target.value })}
            className="Address_Form_zip_input Address_ForminputKey"
            type="text"
            id="zip"
            name="zip"
            placeholder="02694"
          />
          <br />
        </div>
        <div className="Address_Form_country_container Address_Form_inputholder">
          <label className="Address_Form_country_label Address_Form_label">
            country:
          </label>
          <br />
          <input
            onChange={e => this.setState({ country: e.target.value })}
            className="Address_Form_country_input Address_ForminputKey"
            type="text"
            id="country"
            name="country"
            placeholder="United States of America"
          />
          <br />
        </div>
        <div className="Address_Form_address_list_container Address_Form_inputholder">
          <label className="Address_Form_address_list_label Address_Form_label">
            address_list:
          </label>
          <br />
          <input
            onChange={e => this.setState({ address_list: e.target.value })}
            className="Address_Form_address_list_input Address_ForminputKey"
            type="number "
            id="address_list"
            name="address_list"
            placeholder="4"
          />
          <br />
        </div>
        <div className="Address_Form_description_container Address_Form_inputholder">
          <label className="Address_Form_description_label Address_Form_label">
            description:
          </label>
          <br />
          <input
            onChange={e => this.setState({ description: e.target.value })}
            className="Address_Form_description_input Address_ForminputKey"
            type="text"
            id="description"
            name="description"
            placeholder="Chu House"
          />
          <br />
        </div>

        <button
          className="Address_Form_submitbutton"
          onClick={this.SubmitClicked}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default Address_Form;
