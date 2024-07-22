import { DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './index.css'

const items = [
    {
        key: 'board',
        label: 'Kabinet Board',
        icon:   <DatabaseOutlined />
    }
];

const CabinetLayout = () => {
    return (
        <div className="cabinet_layout_container">
            <Menu 
                items={items}
                mode="inline"
            />

            <main>

            </main>
        </div>
    )
};

export default CabinetLayout;