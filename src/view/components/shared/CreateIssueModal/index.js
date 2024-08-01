import { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { issueTypes, priority } from '../../../../core/constants/issue';
import Editor from '../Editor';
import { doc, setDoc, db, } from '../../../../services/firebase/firebase';

const CreateIssueModal = ({ visible, setVisible }) => {
    const [ form ] = Form.useForm();

    const [ confirmLoading, setConfirmLoading ] = useState(false);

    const handleCloseModal = () => {
        setVisible(false);
        form.resetFields();
    }

    const handleCreateIssue = async (values) => {
        setConfirmLoading(true);
        try{
            const createDoc = doc(db, 'issue', `${Date.now()}`);
            setDoc(createDoc, values);
            setVisible(false);
            form.resetFields();
        }catch(error) {

        }finally{
            setConfirmLoading(false);
        }
    }

    return (
        <Modal
            title="Create issue"
            okText="Create issue"
            centered
            open={visible}
            width={800}
            confirmLoading={confirmLoading}
            onCancel={handleCloseModal}
            onOk={form.submit}
        >
            <Form layout='vertical' form={form} onFinish={handleCreateIssue}>
                <Form.Item
                    name="issueType"
                    label="Issue Type"
                    rules={[{required: true, message: 'Please Select Issue Type!'}]}
                >
                    <Select 
                        showSearch
                        placeholder="Issue Type"
                        options={issueTypes}
                    />   
                </Form.Item>

                <Form.Item
                    name="shortSummary"
                    label="Short Summary"
                    rules={[{required: true, message: 'Please Input Short Summary!'}]}
                >
                    <Input 
                        placeholder="Short Summary"
                    />
                     
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true, message: 'Please Input Description!'}]}
                >
                    <Editor />
                </Form.Item>
                <Form.Item
                    name="priority"
                    label="Priority"
                    rules={[{required: true, message: 'Please Select Priority!'}]}
                >
                    <Select 
                        placeholder="Priority"
                        options={priority}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default CreateIssueModal;