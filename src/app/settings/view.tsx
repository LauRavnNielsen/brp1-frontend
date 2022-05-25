import React, { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, notification, Row } from 'antd';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { CreateAccountPost, DeleteAccountPost } from './api';
import { UserContext, UserDispatchContext } from '../context/user-context';
import { DeleteModal } from './delete-modal';

export const SettingsView = () => {
  const { username } = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const updateAccountFailedNotification = (placement: any) => {
    notification.info({
      icon: <ExclamationCircleOutlined />,
      message: `Update failed`,
      description: 'The update attempt failed',
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
      message: `Account updated`,
      description: 'Your account has successfully been updated.',
      placement,
    });
  };

  const mutateUpdate = useMutation(
    (params: $TSFixMe) =>
      CreateAccountPost(params.username, params.password, params.email),
    {
      onSuccess: (data) => {
        if (data.data) {
          updateQuerySuccessNotification('bottom');
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUser({});
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
    await mutateUpdate.mutate({
      username: values.username,
      password: values.password,
      email: values.email,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
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
          label="New email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="New password"
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
                danger
                htmlType="button"
                style={{ marginRight: '1rem' }}
                onClick={() => setModalVisible(true)}
              >
                Delete
              </Button>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
      <DeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};
