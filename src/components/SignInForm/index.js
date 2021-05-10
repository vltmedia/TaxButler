import React from 'react';

class SignInForm  extends React.Component {

  constructor() {
    super();
    this.state = {
      email:'',
      password:''
    };
    this.LoginClicked_ = this.LoginClicked_.bind(this);
    this.LoginClicked_Debug = this.LoginClicked_Debug.bind(this);
    this.SetEmail = this.SetEmail.bind(this);
    this.SetPassword = this.SetPassword.bind(this);


  }
  SetEmail(e){
    this.setState({email: e.target.value});
  }
  SetPassword(e){
    this.setState({password: e.target.value});

  }
  LoginClicked_(){
    // browser.runtime.sendMessage({data:'test 123'});

    this.props.LoginClick({data: {email :this.state.email, password:this.state.password }});
  }
  LoginClicked_Debug(){
    // browser.runtime.sendMessage({data:'test 123'});

    this.props.LoginClick({data: {email :'dev@vltmedia.com', password:'dev123' }});
  }

  render() {

    let devbutton = <div></div>;

    if(this.props.showdev == true){
      devbutton = <button type="submit" onClick={this.LoginClicked_Debug}>Login Dev</button>;
    }


    return     <div>
      <div className="container">
        <label className="signInLabel"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" onChange={this.SetEmail}  name="uname" required/>
        <label className="signInLabel"  ><b>Password</b></label>
        <input type="password" onChange={this.SetPassword} placeholder="Enter Password" name="psw" required></input>
        <button type="submit" onClick={this.LoginClicked_}>Login</button>
        {devbutton}
        
      </div>
    </div>;
  }



}
export default SignInForm; 
