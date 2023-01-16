import React, { FC } from 'react';
import { Card, Row } from 'antd';
import LoginForm from '../../components/LoginForm';

import './styles.css';

const Login: FC = () => {
  return (
    <Row justify='center' align='middle'>
      <Card>
        <h2 className='login__header'>Please enter your name</h2>
        <LoginForm />
      </Card>
    </Row>
  );
};

export default Login;
