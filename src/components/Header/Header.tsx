import React, { FC, useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

import { deleteUser } from '../../api/user';
import { getUser } from '../../api/user';

import './style.css';

const { Header } = Layout;

const HeaderComponent: FC = () => {
  const [username, setUsername] = useState<string>('');

  const signout = () => {
    setUsername('');
    deleteUser();
  };

  useEffect(() => {
    getUser().then((res) => res && setUsername(res));
  }, [username]);

  const Logout = () => {
    return (
      <Link onClick={signout} to={`/`}>
        Log out
      </Link>
    );
  };

  const Login = () => <Link to={`login`}>Log in</Link>;

  return (
    <Header className='header'>
      <div className='header__logo'></div>
      <div className='header__right'>
        {username && <p className='header__username'>{username}</p>}
        <Button className='header__button'>
          {username ? <Logout /> : <Login />}
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
