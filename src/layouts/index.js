import React from 'react';
import {Affix, ConfigProvider, Layout} from 'antd';
import {connect} from 'dva';

import AdminHeader from './admin/AdminHeader';
import AdminFooter from './admin/AdminFooter';
import AdminSideMenu from './admin/AdminSideMenu';
import ErrorModel from './errors/ErrorModel';
import router from 'umi/router';
import styles from './layout.css';

import WxNormalHeader from './wx/WxNormalHeader';
import WxNormalFooter from './wx/WxNormalFooter';


import {checkAuthByUrl} from '../utils/authUtils';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import TeacherModel from "./teacher/TeacherModel";
import TeacherHeader from "./admin/TeacherHeader";

moment.locale('zh-cn');

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

    const isTeacher = sessionStorage.getItem("isTeacher");

    const isWx = pathname.indexOf("/wx") === 0;
    const isWeixin = pathname.indexOf("/weixin") === 0;

    const user = JSON.parse(sessionStorage.getItem("loginUser"));
    if (isWeixin) {
      // console.log("/weixin开头");
    } else if (isWx) {
      // console.log(user)
    } else if(pathname.indexOf("/public")===0) {
      return (
        <ConfigProvider locale={zhCN}>
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
        <ConfigProvider locale={zhCN}>
        <Layout>
          <Content>{props.children}</Content>
        </Layout>
        </ConfigProvider>
      );
    } else if (isWx || isWeixin) {
      return (
        <ConfigProvider locale={zhCN}>
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
      <ConfigProvider locale={zhCN}>
        {
          isTeacher==="true"?
            <Layout className={styles.adminLayout}>

              <Layout className={styles.adminMenuSider}>
                <Content style={{"background": "#f0f2f5"}}>
                  <Affix>
                    <TeacherHeader/>
                  </Affix>
                  <div style={{"width":"100%","float":"left"}}>
                    <TeacherModel>
                      {props.children}
                    </TeacherModel>
                  </div>
                  <AdminFooter/>
                </Content>
              </Layout>

            </Layout>
            :
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
                  <div style={{"width":"100%","float":"left"}}>
                    {props.children}</div>
                  <AdminFooter/>
                </Content>
              </Layout>

            </Layout>
        }
      </ConfigProvider>
    );
  }
}

export default connect()(MainLayout);
