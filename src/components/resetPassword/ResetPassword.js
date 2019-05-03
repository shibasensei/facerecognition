import React from 'react';

const initialState = {
  email:'',
  newPassword:'',
  status:'enter email and new password'
}

class ResetPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  onEmailChange = (event) =>{
    this.setState({email:event.target.value});
  }

  onPasswordChange = (event)=>{
    this.setState({newPassword:event.target.value});
  }

  changePassword = () => {
    fetch('http://localhost:3001/reset',{
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.newPassword
      })
    })
    .then(response=>response.json())
    .then(data=>{
        document.getElementById('email-address').value = ""
        document.getElementById('password').value = ""
      switch(data){
        case 101:
          this.setState({initialState})
          this.setState({status:'no user found'})
        break;
        case 103:
          this.setState({initialState})
          this.setState({status:'password <=8'})
        break;
        case 777:
          this.setState({initialState})
          this.setState({status:'check your email'})
        break;
        case 666:
          this.setState({initialState})
          this.setState({status:'server error'})
        break;
        default:
          this.setState({initialState})
          this.setState({status:'smth went wrong'})
        break;
      }
    })
  }

  render(){
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="register" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Reset Password</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Your email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"  />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">New password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"  />
              </div>
              <div className="flex items-center mb2">
                <input onClick={this.props.showPassword} className="mr2 black" type="checkbox" id="showpassword" value="showpassword"/>
                <label htmlFor="showpassword" className="lh-copy">Show Password</label>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.changePassword}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Submit"
              />
            </div>
            <small id="status" className="f6 black-100 db mt2">{this.state.status}</small>
          </div>
        </main>
      </article>
    );
  }
}

export default ResetPassword
