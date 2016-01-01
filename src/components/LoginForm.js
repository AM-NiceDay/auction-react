import React, { Component } from 'react';

export default class LoginForm extends Component{

  loginHandler() {
    const name = this.refs.name.value;
    const { login } = this.props;

    login(name);
  }

  render() {
    return <div>
      <input type="text" ref="name" />
      <button onClick={ () => this.loginHandler() }>Login</button>
    </div>;
  }
}
