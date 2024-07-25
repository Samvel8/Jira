import { Input, Avatar, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';

const SubHeader = () => {
    return (
        <div className="sub_header">
            <Input.Search 
                className="serach_input"
                placeholder="Search"
            />

            <Divider type="vertical"/>

            <Avatar.Group 
                max={{
                    count: 4,
                    style: { color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' },
                    popover: {
                        trigger: 'hover'
                    }
                }}
            >
                <Avatar style={{backgroundColor: 'green'}}>
                    DS
                </Avatar>

                <Avatar style={{backgroundColor: 'indigo'}}>
                    KA
                </Avatar>

                <Avatar style={{backgroundColor: 'red'}}>
                    DD
                </Avatar>

                <Avatar style={{backgroundColor: 'blue'}}>
                    AD
                </Avatar>

                <Avatar style={{backgroundColor: 'blue'}}>
                    AD
                </Avatar>
            </Avatar.Group>

            <Divider type="vertical"/>

            <Button type="primary" icon={<PlusOutlined />}>
                Create issue
            </Button>
        </div>
    )
};

export default SubHeader;