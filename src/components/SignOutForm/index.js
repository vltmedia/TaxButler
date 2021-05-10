import React from 'react';

class SignOutForm  extends React.Component {

  constructor() {
    super();
  
    this.SignOutClicked = this.SignOutClicked.bind(this);

  }
  
  SignOutClicked(){
    // browser.runtime.sendMessage({data:'test 123'});

    this.props.SignOutClick();
  }

  render() {
    return     <div>
      <div className="container">
       
        <button type="submit" onClick={this.SignOutClicked}>Sign Out</button>
      </div>
    </div>;
  }



}
export default SignOutForm; 
