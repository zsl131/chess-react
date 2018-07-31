import React from 'react';
import { Layout,Affix } from 'antd';
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
import {decodeBase64, encodeBase64} from "../utils/Base64Utils";

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

      /*const laStr = sessionStorage.getItem(LOGIN_WX_ACCOUNT_SESSION_NAME);

      if (laStr === null) { //表示没有Account
        const query = props.location.query;

        const account = query.account; //检测参数中是有account

        if(account !== null && account !== undefined) {
          const targetUrl = decodeBase64(query.targetUrl);
          console.log("targetUrl::"+account);
          console.log("targetUrl::"+decodeBase64(account));
          const loadAccount = JSON.parse(decodeBase64(account));
          // console.log("loadAccount:"+loadAccount)
          if(loadAccount.size===1) {
            sessionStorage.setItem(LOGIN_WX_ACCOUNT_SESSION_NAME, JSON.stringify(loadAccount.datas));
            console.log(loadAccount);
            // window.location.href = targetUrl;
          } else {
            console.log("没有获取微信用户，需要跳转到关注页面");
          }
          // window.location.href = targetUrl;
        } else {
          window.location.href = "/wxRemote/queryAccount?targetUrl="+encodeBase64(encodeURIComponent(window.location.href));
          return null;
        }
      }*/

    } else if ((pathname !== '/login' && pathname !== '/init') && user === null) {
      // console.log("loginUser is null", user);
      router.push("/login");
    }

    // console.log("layout::", props, dispatch);

    // console.log("layoutIndex:::", window.history);
    // console.log("layoutIndex:::", props);

    if (pathname === '/login' || pathname === '/init') {
      return (
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
      );
    } else if (isWx) {
      return (
        <div style={{"background":"#FFFFFF"}}>
          <WxNormalHeader/>
          {props.children}
          <WxNormalFooter/>
        </div>
      );
    } else if (pathname === '/weixin/root' || pathname === '/weixin/public/loadLoginAccount') {
      return (<p>{props.children}</p>);
    }


    return (
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
    );
  }
}

export default withRouter(connect()(MainLayout));
