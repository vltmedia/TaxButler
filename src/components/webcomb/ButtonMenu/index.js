import React from 'react';
import Form_CrawlSettingEdit from '../Form_CrawlSettingEdit';

// import 'react-pro-sidebar/dist/css/styles.css';
class ButtonMenu extends React.Component {
  constructor() {
    super();
    this.state = { color: 'red', PageToRender: this.DefaultButtonMenu() };
    this.DefaultButtonMenu = this.DefaultButtonMenu.bind(this);
  }

  DefaultButtonMenu() {
    return (
      <div className="ButtonMenuContainer">
        <button
          onClick={() =>
            this.setState({ PageToRender: this.OpenAddCrawlSetting() })
          }
        >
          + Crawl Setting
        </button>
      </div>
    );
  }

  OpenAddCrawlSetting() {
    return (
      <div>
        <Form_CrawlSettingEdit
          Submitted={() =>
            this.setState({ PageToRender: this.DefaultButtonMenu() })
          }
          className="ButtonMenuContainer"
        />
      </div>
    );
  }
  render() {
    return (
      <div className="ButtonMenu">
      
        {this.state.PageToRender};
      </div>
    );
  }
}
export default ButtonMenu;
