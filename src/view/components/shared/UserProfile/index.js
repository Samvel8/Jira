import { Avatar, Dropdown, Flex, Typography, Divider} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const user = {
    firstName: 'Samvel',
    lastName: 'Jmalayan',
    headline: 'Front End Dev',
    email: 'samveljamalyan@gmail.com',
    logout: ''

}

const items = [
    {
        key: 'profile',
        label: (
            <Flex vertical justify="center" align="center">
                <Avatar 
                    size={64}
                    icon={<UserOutlined />}
                />

                <Text>
                    Samvel Jmalayan
                </Text>
                
                <Text underline>
                    samveljamalyan@gmail.com
                </Text>

                <Divider />
            </Flex>
        )
    },
    {
        key: 'logout',
        label: 'Logout'
    }
]

const UserProfile = () => {
    return (
        <Dropdown
            menu={{
                items
            }}
        >
            <Avatar size="large">
                S J
            </Avatar>
        </Dropdown>
    )
};

export default UserProfile;