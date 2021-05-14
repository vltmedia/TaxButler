import React from 'react';

class ProcessPage extends React.Component {
  render() {
    return (
      <div>
        <div className="Container">
            
          <h2 className = "NameMatch-Label" >Amazon Payee To Match:</h2>
          <input
            className = "NameMatch-Input"
            onChange={e => this.setState({ NameToFind: e.target.value })}
            placeholder="John Smith"
          />
          <div className="TextArea-Container">
            <div className="TextArea-Header">
              <p>Amazon Orders: {this.props.amazoncount}</p>
            </div>
            <div className="TextArea-Header">
              <p>Paypal Orders: {this.props.paypalcount}</p>
            </div>
          </div>
          <div className="ClickButton-Container">
            <button className="StartButton" onClick={this.props.ProcessAmazon}>
              Process Amazon Page
            </button>
            <button className="StartButton" onClick={this.props.ProcessPaypal}>
              Process Paypal Page
            </button>
            <button
              className="StartButton"
              onClick={this.props.SetCategoriesRegular}
            >
              Update Categories
            </button>
            <button className="StartButton" onClick={this.props.ClearCache}>
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProcessPage;
