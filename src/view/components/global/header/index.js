import { Layout, Button, Typography, Space } from 'antd';
import UserProfile from '../../shared/UserProfile';
import './index.css';

const Header = ({ isAuth, userProfileInfo }) => { 
   
    return (
        <Layout.Header className="main_header">
            <Typography.Title level={3}>
                Jira
            </Typography.Title>

            <Space>
                {
                    !isAuth && (
                        <Button>
                            Login
                        </Button>
                    )
                }

                {
                    isAuth && <UserProfile userProfileInfo={userProfileInfo} />
                }
            </Space>
        </Layout.Header>
    )
};

export default Header;