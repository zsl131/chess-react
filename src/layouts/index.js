import React from 'react';
import {Affix, Layout, ConfigProvider} from 'antd';
import {connect} from 'dva';

import AdminHeader from './admin/AdminHeader';
import AdminFooter from './admin/AdminFooter';
import AdminSideMenu from './admin/AdminSideMenu';
import ErrorModel from './errors/ErrorModel';
import router from 'umi/router';
import styles from './layout.css';

import WxNormalHeader from './wx/WxNormalHeader';
import WxNormalFooter from './wx/WxNormalFooter';
<<<<<<< HEAD

import zhCN from 'antd/es/locale/zh_CN';

import {checkAuthByUrl, hideNoAuthContent} from '../utils/authUtils';

=======
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import {checkAuthByUrl, hideNoAuthContent} from '../utils/authUtils';

moment.locale('zh-cn');

>>>>>>> 941da9c9188d829abe627bc665eebdce777b2bda
const { Sider, Content } = Layout;

class MainLayout extends React.Component {

  state = {
    collapsed: false
  };

  componentWillMount() {
    const curVal = sessionStorage.getItem("curCollapsed");
    this.setState({collapsed: curVal==="1"});
  }

  render() {

<<<<<<< HEAD
=======
    const { locale } = this.state;

>>>>>>> 941da9c9188d829abe627bc665eebdce777b2bda
    const setCollapse = () => {
      const curVal = !this.state.collapsed;
      this.setState({collapsed: curVal});
      sessionStorage.setItem("curCollapsed", curVal?"1":"0");
    };

    const onCollapse = () => {
      setCollapse();
    };

    const props = this.props;

    const pathname = props.location.pathname;

    const isWx = pathname.indexOf("/wx") === 0;
    const isWeixin = pathname.indexOf("/weixin") === 0;

    const user = JSON.parse(sessionStorage.getItem("loginUser"));
    if (isWeixin) {
      // console.log("/weixin开头");
    } else if (isWx) {
      // console.log(user)
    } else if(pathname.indexOf("/public")===0) {
      return (
<<<<<<< HEAD
        <ConfigProvider locale={zhCN}>
=======
        <ConfigProvider locale={locale}>
>>>>>>> 941da9c9188d829abe627bc665eebdce777b2bda
          <ErrorModel>
            {props.children}
          </ErrorModel>
        </ConfigProvider>
      );
    } else if ((pathname !== '/login' && pathname !== '/init') && user === null) {
      // console.log("loginUser is null", user);
      router.push("/login");
    } else if(pathname.indexOf("/admin")===0 || pathname.indexOf("/yard")===0) { //需要进行登陆验证
      const hasAuth = checkAuthByUrl(pathname); //通过url检测权限
      if(!hasAuth) { //无权限
        router.push("/public/noAuth");
      }
    }

    if (pathname === '/login' || pathname === '/init') {
      return (
<<<<<<< HEAD
        <ConfigProvider locale={zhCN}>
=======
        <ConfigProvider locale={locale}>
>>>>>>> 941da9c9188d829abe627bc665eebdce777b2bda
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
        </ConfigProvider>
      );
    } else if (isWx || isWeixin) {
      return (
<<<<<<< HEAD
        <ConfigProvider locale={zhCN}>
=======
        <ConfigProvider locale={locale}>
>>>>>>> 941da9c9188d829abe627bc665eebdce777b2bda
        <div style={{"background":"#FFFFFF"}}>
          <WxNormalHeader/>
          {props.children}
          <WxNormalFooter/>
        </div>
        </ConfigProvider>
      );
    } else if (pathname === '/weixin/root' || pathname === '/weixin/public/loadLoginAccount') {
      return (<p>{props.children}</p>);
    }

    return (
<<<<<<< HEAD
      <ConfigProvider locale={zhCN}>
=======
      <ConfigProvider locale={locale}>
>>>>>>> 941da9c9188d829abe627bc665eebdce777b2bda
      <Layout className={styles.adminLayout}>
        <Layout className={styles.adminMenuSider}>
          <Affix offsetTop={0} style={{"overflow": "auto"}}>
            <Sider collapsed={this.state.collapsed}>
              <AdminSideMenu onCollapse={onCollapse} collapsed={this.state.collapsed}/>
            </Sider>
          </Affix>
          <Content style={{"background": "#f0f2f5"}}>
            <Affix>
              <AdminHeader/>
            </Affix>
            <div style={{"width":"100%","float":"left"}}>{props.children}</div>
            <AdminFooter/>
          </Content>
        </Layout>

      </Layout>
      </ConfigProvider>
    );
  }
}

export default connect()(MainLayout);
