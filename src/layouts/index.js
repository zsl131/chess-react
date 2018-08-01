import React from 'react';
import {LocaleProvider,Affix, Layout} from 'antd';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';

import AdminHeader from './admin/AdminHeader';
import AdminFooter from './admin/AdminFooter';
import AdminSideMenu from './admin/AdminSideMenu';
import router from 'umi/router';
import styles from './layout.css';

import WxNormalHeader from './wx/WxNormalHeader';
import WxNormalFooter from './wx/WxNormalFooter';
// import { base64ToString,toBase64 } from "../utils/AesUtil";

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Sider, Content } = Layout;

class MainLayout extends React.Component {


  // console.log("layoutIndex->path::", props);
  render() {

    const LOGIN_WX_ACCOUNT_SESSION_NAME = "wxLoginAccount";

    const props = this.props;

    const pathname = props.location.pathname;

    const isWx = pathname.indexOf("/wx") === 0;
    const isWeixin = pathname.indexOf("/weixin") === 0;

    const user = JSON.parse(sessionStorage.getItem("loginUser"));

    if (isWeixin) {
      console.log("/weixin开头");
    } else if (isWx) {

    } else if ((pathname !== '/login' && pathname !== '/init') && user === null) {
      // console.log("loginUser is null", user);
      router.push("/login");
    }

    // console.log("layout::", props, dispatch);

    // console.log("layoutIndex:::", window.history);
    // console.log("layoutIndex:::", props);

    if (pathname === '/login' || pathname === '/init') {
      return (
        <LocaleProvider locale={zhCN}>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
        </LocaleProvider>
      );
    } else if (isWx) {
      return (
        <LocaleProvider locale={zhCN}>
        <div style={{"background":"#FFFFFF"}}>
          <WxNormalHeader/>
          {props.children}
          <WxNormalFooter/>
        </div>
        </LocaleProvider>
      );
    } else if (pathname === '/weixin/root' || pathname === '/weixin/public/loadLoginAccount') {
      return (<p>{props.children}</p>);
    }


    return (
      <LocaleProvider locale={zhCN}>
      <Layout className={styles.adminLayout}>
        <Affix>
          <AdminHeader/>
        </Affix>
        <Layout className={styles.adminMenuSider}>
          <Affix offsetTop={60} style={{"overflow": "auto"}}>
            <Sider>
              <AdminSideMenu/>
            </Sider>
          </Affix>
          <Content style={{"background": "#f0f2f5"}}>{props.children}
            <AdminFooter/>
          </Content>
        </Layout>

      </Layout>
      </LocaleProvider>
    );
  }
}

export default withRouter(connect()(MainLayout));
