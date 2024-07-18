import { Avatar, Dropdown, Flex, Typography, Divider} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getfirstLetters } from '../../../../core/helpers/getFirstLetters';
import { auth } from '../../../../services/firebase/firebase';
import { signOut } from 'firebase/auth';

const { Text } = Typography;

const UserProfile = ({ userProfileInfo }) => {
    const { firstName, lastName, headline, email } = userProfileInfo;

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch(e) {
            console.log(e, 'errror')
        }
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
                        {firstName} {lastName}
                    </Text>
                    
                    <Text underline>
                        {email}
                    </Text>

                    <Text type='secondary'>
                        {headline}
                    </Text>
    
                    <Divider />
                </Flex>
            )
        },
        {
            key: 'logout',
            label: (
                <Text onClick={handleLogout}>
                    Logout
                </Text>
            )
        }
    ]

    return (
        <Dropdown
            menu={{
                items
            }}
        >
            <Avatar size="large">
                {getfirstLetters(`${firstName} ${lastName}`)}
            </Avatar>
        </Dropdown>
    )
};

export default UserProfile;