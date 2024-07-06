import React from 'react';
import { Typography, Input, Button, Divider, Form, notification } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../services/firebase/firebase';
import './index.css';

const { Title } = Typography;

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            firstName: '',
            lastName: '',
            headline: '',
            email: '',
            password: '',
        }

        this.hendleRegister = this.hendleRegister.bind(this);
    }

    hendleChangeInput = value => {
        this.setState(value);
    }

    async hendleRegister() {
        const { email, password, firstName, lastName } = this.state;
        this.setState({
            loading: true
        });

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            notification.success({
                message: 'Success Registration',
                description: `Welcome dear ${firstName} ${lastName}`
            })
        } catch(error) {
            notification.error({
                message: 'Wrong Registration',
                description: 'Ooooops:('
            })
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render () {
        
        return (
            <div className="auth_register_container">
                <Title level={2}>
                    Register
                </Title>

                <Form layout='vertical' onValuesChange={this.hendleChangeInput}>
                    <Form.Item label="First Name" name="firstName">
                        <Input 
                            type="text"
                            placeholder="First Name"
                        />
                    </Form.Item>

                    <Form.Item label="Last Name" name="lastName">
                        <Input
                            type="text"
                            placeholder="Last Name"
                        />
                    </Form.Item>
                        
                    <Form.Item label="Headline" name="headline">
                        <Input
                            type="text"
                            placeholder="Headline"
                        />
                    </Form.Item>

                    <Form.Item label="Eamil" name="email">
                        <Input
                            type="email"
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input
                            type="password"
                            placeholder="Password"
                            
                        />
                    </Form.Item>

                    <Divider/>

                    <Button 
                        type="primary" 
                        onClick={this.hendleRegister}
                        loading={this.state.loading}
                    >
                        Register
                    </Button>
                </Form>

            </div>
        )
    }

}

export default Register;