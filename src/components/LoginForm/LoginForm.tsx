import React, { FC, useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { updateUser } from '../../api/user';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../api/user';

const LoginForm: FC = () => {
  const [user, setUser] = useState<string>('');

  const onFinish = (values: any) => {
    setUser(values.username);
    updateUser(values.username);

    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    getUser().then((res) => res && setUser(res));
  }, []);

  return (
    <>
      {user && <Navigate to='/boards' replace={true} />}

      <Form
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
