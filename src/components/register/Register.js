
import React from 'react';

const initialState = {
  nameRegister:'',
  emailRegister:'',
  passwordRegister:'',
  status:'',
}

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = initialState;
  }

  onNameChange = (event) =>{
    this.setState({nameRegister:event.target.value});
  }

  onEmailChange = (event) =>{
    this.setState({emailRegister:event.target.value});
  }

  onPasswordChange = (event)=>{
    this.setState({passwordRegister:event.target.value});
  }

  registerUser = () =>{
    fetch('http://localhost:3001/register',{
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name:this.state.nameRegister,
        email:this.state.emailRegister,
        password:this.state.passwordRegister
      })
    })
    .then(response =>response.json())
    .then(user =>{
      //console.log(user)
      if(user === 100 || user === 101 || user === 102 || user === 103){
        switch(user){
          case 100:
            this.setState({status:'invalid email'})
          break;
          case 101:
          this.setState({status:'email already registered'})
          break;
          case 102:
          this.setState({status:'something went wrong, sorry!'})
          break;
          case 103:
          this.setState({status:'password >=8 please!'})
          break;
          default:
          this.setState({status:'service error'})
        }
        this.setState({initialState})
      }else{
        this.setState({status:'registered!'})

        fetch('http://localhost:3001/send',{
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            email:this.state.emailRegister,
          })
        })
          this.setState({initialState})
          this.props.onRouteChange('signin');
      }
    });
  }

  render(){
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="register" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
              <div className="flex items-center mb2">
                <input onClick={this.props.showPassword} className="mr2 black" type="checkbox" id="showpassword" value="showpassword"/>
                <label htmlFor="showpassword" className="lh-copy">Show Password</label>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.registerUser}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <small id="status" className="f6 black-100 db mt2">{this.state.status}</small>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
