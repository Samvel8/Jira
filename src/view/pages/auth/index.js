import React from 'react';
import { Tabs } from 'antd';
import Register from './register';
import Login from './login';
import './index.css';

const items = [
    {
        label: 'Register',
        key: 'register',
        children: <Register />
    },
    {
        label: 'Login',
        key: 'login',
        children: <Login />
    }
]

class Auth extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="auth_container">
                <Tabs items={items} defaultActiveKey="login"/>
            </div>
        )
    }
}

export default Auth;