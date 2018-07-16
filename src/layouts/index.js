import React from 'react';
import { Layout,Affix } from 'antd';

import AdminHeader from './admin/AdminHeader';
import AdminFooter from './admin/AdminFooter';
import AdminSideMenu from './admin/AdminSideMenu';
import router from 'umi/router';
import styles from './layout.css';

const { Sider, Content } = Layout;

export default function(props, { dispatch }) {

  // console.log("layoutIndex->path::", props.location.pathname);

  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  const pathname = props.location.pathname;
  if((pathname !== '/login' && pathname !== '/init') && user === null) {
    console.log("loginUser is null", user);
    router.push("/login");
  }

  // console.log("layout::", props, dispatch);


  // dispatch({ type: 'interceptor/test', payload: 'abc123'});


  if (pathname === '/login' || pathname === '/init') {
    return (
      <Layout>
          <Content>{ props.children }</Content>
      </Layout>
    );
  }



  return (
    <Layout className={styles.adminLayout}>
      <Affix>
        <AdminHeader />
      </Affix>
      <Layout className={styles.adminMenuSider}>
        <Affix offsetTop={60}>
          <Sider>
            <AdminSideMenu/>
          </Sider>

        </Affix>
        <Content style={{"background":"#f0f2f5"}}>{ props.children }
          <AdminFooter />
        </Content>
      </Layout>

    </Layout>
  );
}
