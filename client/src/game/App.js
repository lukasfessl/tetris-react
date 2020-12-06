import React, { Component } from 'react';
import './App.css';
import Core from './Core';
import LoginPage from './LoginPage';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { username: 'user-' + Math.random() };
        // this.state = { username: null };
    }  

    render() {
        const { username } = this.state;
        return(       
            <div className="container-fluid">
                {username ? <Core username={this.state.username} /> : <LoginPage  setUsername={(username) => {
                    this.setState({username: username});
                }} />}
            </div>
        )
    };
}

export default App;
