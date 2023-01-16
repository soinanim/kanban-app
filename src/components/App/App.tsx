import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { Layout, Menu, theme } from 'antd';

import type { MenuProps } from 'antd';

import './App.css';

const { Content, Sider } = Layout;
const MENU_ITEMS = [{ key: 'boards', label: 'My boards' }];

const App: FC = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    return navigate(`/${e.keyPath[0]}`);
  };

  return (
    <div className='app'>
      <Layout className='app__layout'>
        <Header />
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu onClick={onClick} mode='inline' items={MENU_ITEMS} />
          </Sider>
          <Content className='app__content'>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
