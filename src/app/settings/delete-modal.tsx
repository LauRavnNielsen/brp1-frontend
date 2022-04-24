import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { Button, Col, Form, Input, Modal, notification, Row } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { DeleteAccountPost } from './api';
import { UserContext } from '../context/user-context';

export type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const DeleteModal = ({ visible, onClose }: DeleteModalProps) => {
  const { username } = useContext(UserContext);
  const history = useHistory();

  const updateAccountFailedNotification = (placement: any) => {
    notification.info({
      icon: <ExclamationCircleOutlined />,
      message: `Delete account failed`,
      description: 'The delete attempt failed',
      placement,
    });
  };

  const updateQueryFailedNotification = (placement: any) => {
    notification.info({
      icon: <ExclamationCircleOutlined />,
      message: `Something went wrong`,
      description: 'Something went wrong, please try again later.',
      placement,
    });
  };

  const updateQuerySuccessNotification = (placement: any) => {
    notification.info({
      icon: <CheckCircleOutlined />,
      message: `Account deleted`,
      description: 'Your account has successfully been deleted.',
      placement,
    });
  };

  const mutateDelete = useMutation(
    (params: $TSFixMe) => DeleteAccountPost(params.username, params.password),
    {
      onSuccess: (data) => {
        if (data.data) {
          updateQuerySuccessNotification('bottom');
          history.push('/login');
        } else {
          updateAccountFailedNotification('bottom');
        }
      },
      onError: () => {
        updateQueryFailedNotification('bottom');
      },
    }
  );

  const onFinish = async (values: any) => {
    await mutateDelete.mutate({
      username: values.username,
      password: values.password,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{
        height: 'fit-content',
        width: 'fit-content',
        background: '#fff',
      }}
      closable={false}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ username }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '500px' }}
      >
        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeat-password"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row>
          <Col offset={18} span={6}>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
            >
              <Button
                type="default"
                htmlType="button"
                onClick={onClose}
                style={{ marginRight: '1rem' }}
              >
                Cancel
              </Button>
              <Form.Item>
                <Button type="primary" htmlType="submit" danger>
                  Delete
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
