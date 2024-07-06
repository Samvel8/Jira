import React from 'react';
import { Typography, Input, Button, Divider } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../services/firebase/firebase';
import './index.css';

const { Title } = Typography;

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            headline: '',
            email: '',
            password: '',
        }

        this.hendleRegister = this.hendleRegister.bind(this);
    }

    hendleChangeInput = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    hendleRegister() {
        const { email, password } = this.state;
        createUserWithEmailAndPassword(auth, email, password);
    }

    render () {
        return (
            <div className="auth_register_container">
                <Title level={2}>
                    Register
                </Title>

                <div>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.hendleChangeInput}
                    />
                </div>

                <div>
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.hendleChangeInput}
                    />
                </div>
                    
                <div>
                    <Input
                        type="text"
                        name="headline"
                        placeholder="HeadLine"
                        onChange={this.hendleChangeInput}
                    />
                </div>

                <div>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.hendleChangeInput}
                    />
                </div>

                <div>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.hendleChangeInput}
                    />
                </div>

                <Divider/>

                <Button type="primary" onClick={this.hendleRegister}>
                    Register
                </Button>
            </div>
        )
    }

}

export default Register;