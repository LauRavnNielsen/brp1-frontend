import React, { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, notification, Row } from 'antd';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { UserDispatchContext } from '../context/user-context';
import { LoginCall } from './api';
import {
  RememberUserContext,
  RememberUserDispatchContext,
} from '../context/remember-me-user-context';

export const LoginView = () => {
  const setUser = useContext(UserDispatchContext);
  const setRememberUser = useContext(RememberUserDispatchContext);
  const { username, password } = useContext(RememberUserContext);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [user, setUserState] = useState<{ username: string; password: string }>(
    {
      username: '',
      password: '',
    }
  );

  const loginFailedNotification = (placement: any) => {
    notification.info({
      message: `Login failed`,
      description:
        'The login attempt failed, the password or username doesnt match.',
      placement,
    });
  };

  const loginQueryFailedNotification = (placement: any) => {
    notification.info({
      message: `Something went wrong`,
      description: 'Something went wrong, please try again later.',
      placement,
    });
  };

  const mutateLogin = useMutation(
    (params: $TSFixMe) => LoginCall(params.username, params.password),
    {
      onSuccess: (data) => {
        if (data.data) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUser({ username: user.username });

          if (rememberMe) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setRememberUser({
              username: user.username,
              password: user.password,
            });
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setRememberUser({});
          }
        } else {
          loginFailedNotification('bottom');
        }
      },
      onError: () => {
        loginQueryFailedNotification('bottom');
      },
    }
  );

  const onFinish = async (values: any) => {
    setUserState({ username: values.username, password: values.password });
    setRememberMe(values.remember);
    await mutateLogin.mutate({
      username: values.username,
      password: values.password,
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
        initialValues={{ username, password, remember: true }}
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
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Row>
          <Col offset={8} span={12}>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col span={4}>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
            >
              <Link to="/create-account">Sign up</Link>
            </div>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
