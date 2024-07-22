import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../services/firebase/firebase';
import { Typography, Input, Button, Divider, Form, Flex } from 'antd';
import AuthWrapper from '../../../components/shared/AuthWrapper';
import LoginCoverImg from '../../../../core/images/loginCover.png';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    handleFormChange = (value) => {
        this.setState(value);
    };

    handleLogin = async () => {
        this.setState({
            loading: true
        });

        const { email, password } = this.state;
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response, 'response')

        } catch (error) {
            console.log(error, 'ERRORRR')
        }finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <AuthWrapper coverImg={LoginCoverImg}>
                <Title level={2}>
                    Sign In
                </Title>

                <Form onValuesChange={this.handleFormChange} layout='vertical'>
                    <Form.Item name="email" label="Email">
                        <Input
                            type="text"
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item name="password" label="Password">
                        <Input.Password
                            placeholder="password"
                        />
                    </Form.Item>

                    <Divider/>

                    <Flex justify="space-between" aligin="flex-end">
                        <Text underline>
                            <Link to="/register">
                                Create Account
                            </Link>
                        </Text>

                        <Button
                            type="primary"
                            loading={this.state.loading}
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>
                    </Flex>
                </Form>
            </AuthWrapper>
        )
    }
}

export default Login;