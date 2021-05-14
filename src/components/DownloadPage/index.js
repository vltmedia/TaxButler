import React from 'react';

class DownloadPage extends React.Component {
  render() {
    return (
      <div>
        <div className="ButtonContainer">
          <button
            className="StartButton"
            onClick={this.props.DownloadAmazonJson}
          >
            Download Amazon Orders Json
          </button>
          <button
            className="StartButton"
            onClick={this.props.DownloadPaypalJson}
          >
            Download Paypal Orders Json
          </button>
          <button
            className="StartButton"
            onClick={this.props.DownloadCombinedJson}
          >
            Download Combined Orders Json
          </button>
        </div>
      </div>
    );
  }
}

export default DownloadPage;
