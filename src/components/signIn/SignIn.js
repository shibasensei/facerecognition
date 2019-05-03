import React from 'react';

class SignIn  extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword:'',
      status:'',
    }
  }

  onEmailChange = (event) =>{
    this.setState({signInEmail:event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({signInPassword:event.target.value});
  }

  restorePassword = () =>{
    this.props.onRouteChange('resetpassword');
  }

  onSubmitSignIn = () => {

    if(this.state.signInEmail!=='' | this.state.signInEmail!==''){
          fetch('https://git.heroku.com/facerecognition-b-shibasensei.git/signin',{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              email:this.state.signInEmail,
              password:this.state.signInPassword
            })
          })
          .then(response=> response.json())
          .then(user => {
            if(user.id){
              if(user.isverified){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
              }else{
                this.setState({status:'verify email please'});
              }
            }else{
              this.setState({status:'wrong credentials'});
            }
          });
    }else{
      this.setState({status:'enter login and password'});
    }
  }

  render(){
    return(
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label
                className="db fw6 lh-copy f6"
                htmlFor="email-address">Email</label>
                <input
                onChange={this.onEmailChange}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"/>
              </div>
              <div className="mv3">
                <label
                className="db fw6 lh-copy f6"
                htmlFor="password">Password</label>
                <input
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => this.onSubmitSignIn()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p className="f5 link dim black db pointer" onClick={() =>this.props.onRouteChange('resetpassword')}>Forgot password?</p>
            </div>
            <small id="status" className="f6 black-100 db  mt2">{this.state.status}</small>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
