import React from 'react';
import { Button, Checkbox, Col, Form, Input, notification, Row } from 'antd';
import { useMutation } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { CreateAccountPost } from './api';

export const CreateView = () => {
  const history = useHistory();

  const registerAccountFailedNotification = (placement: any) => {
    notification.info({
      icon: <ExclamationCircleOutlined />,
      message: `Registration failed`,
      description: 'The registration attempt failed',
      placement,
    });
  };

  const registerQueryFailedNotification = (placement: any) => {
    notification.info({
      icon: <ExclamationCircleOutlined />,
      message: `Something went wrong`,
      description: 'Something went wrong, please try again later.',
      placement,
    });
  };

  const registerQuerySuccessNotification = (placement: any) => {
    notification.info({
      icon: <CheckCircleOutlined />,
      message: `Account registered`,
      description: 'Your account has successfully been registered.',
      placement,
    });
  };

  const mutateRegister = useMutation(
    (params: $TSFixMe) =>
      CreateAccountPost(params.username, params.password, params.email),
    {
      onSuccess: (data) => {
        if (data.data) {
          registerQuerySuccessNotification('bottom');
          history.push('/login');
        } else {
          registerAccountFailedNotification('bottom');
        }
      },
      onError: () => {
        registerQueryFailedNotification('bottom');
      },
    }
  );

  const onFinish = async (values: any) => {
    await mutateRegister.mutate({
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '500px' }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
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
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>{' '}
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
          <Col offset={14} span={4}>
            <Button htmlType="button">
              <Link to="/login">Cancel</Link>
            </Button>
          </Col>
          <Col span={6}>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create account
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
