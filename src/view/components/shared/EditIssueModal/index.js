import { useContext, useEffect, useState } from 'react';
import { Modal,Form, Input, Select, notification, Typography, Space } from 'antd';
import { ISSUE_OPTION } from '../../../../core/constants/issue';
import { updateDoc, doc, db } from '../../../../services/firebase/firebase';
import IssueModalForm from '../IssueModalForm';
import { AuthContext } from '../../../../context/AuthContext';

const { Text } = Typography;

const EditIssueModal = ({ visible, onClose, issueData }) => {
    const [ form ] = Form.useForm();
    const { handleGetIssues } = useContext(AuthContext);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleClose = () => {
        onClose()
    };

    useEffect(() => {
        const { key, index, ...restData } = issueData;
        form.setFieldsValue(restData);
    }, [])

    const handleEditForm = async values => {
        const docRef = doc(db, 'issue', issueData.key);
        await updateDoc(docRef, values);
        handleClose();
        notification.success({
            message: 'Your task has been updated'
        });
        try {

        }catch(error) {
            console.error(error)
        }finally{
            setConfirmLoading(false)
        }
    };

    return (
        <Modal
            title={
                <Space>
                    {ISSUE_OPTION[issueData.issueType].icon}
                    <Text type="secondary">
                        {ISSUE_OPTION[issueData.issueType].label}
                        {'-'}
                        {issueData.key}
                    </Text>
                </Space>
            }
            okText="Edit issue"
            centered
            onCancel={handleClose}
            onOk={form.submit}
            confirmLoading={confirmLoading}
            open={visible}
            width={800}
            styles={{
                body: {
                    maxHeight: '600px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }
            }}
        >
            <IssueModalForm 
                form={form}
                onFinish={handleEditForm}
                users={[]}
            />

        </Modal>
    )
};

export default EditIssueModal;