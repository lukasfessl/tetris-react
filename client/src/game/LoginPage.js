import React, { Component } from 'react';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

class LoginPage extends Component {

    logInUser = () => {
        const username = this.username.value;
        if (username.trim()) {
            this.props.setUsername(username);
        }
      }

    showLogin = () => (
        <div className="account">
            <div className="account__wrapper">
                <div className="account__card">
                    <div className="account__profile">
                        <p className="account__sub">Zadej jméno</p>
                    </div>
                    <input name="username" ref={(input) => { this.username = input; }} className="form-control" />
                    <button type="button" onClick={() => this.logInUser()} className="btn btn-primary account__btn">Join</button>
                </div>
            </div>
        </div>
      )

    render() {
        return(this.showLogin())
    } 
}

export default LoginPage;