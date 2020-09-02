import React from 'react';
import {Col, Icon, Layout, Popconfirm, Popover, Row, Menu} from 'antd';
import {Link} from 'react-router-dom';

import router from 'umi/router';

import styles from './teacher.css';
import Helmet from 'react-helmet';
import configApi from '../../utils/configApi';
import {getTeacherClassroom} from "../../utils/authUtils";

const { Header } = Layout;

export default class TeacherHeader extends React.Component {

  state = {
    loginUser:[]
  };

  UNSAFE_componentWillMount() {
    const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
    this.setState({loginUser: loginUser || []});
  }

  render() {
    const confirmOpts = {
      title: '确定退出登陆吗？',
      okText: '确定退出',
      cancelText: '取消操作',
      onConfirm: () => {
        sessionStorage.clear();
        localStorage.clear();
        router.push("/login");
      }
    };

    const classroomList = getTeacherClassroom();
    //console.log(classroomList);

    let tempList = [];
    const buildMenus = () => {
      return classroomList.map((item)=> {
        if (!tempList.includes(item.gradeId)) {
          tempList.push(item.gradeId);
          return <Menu.Item key={`grade${item.gradeId}`}><Link to={`/admin/teacherCourse?gid=${item.sid}`}>{item.gradeName}</Link></Menu.Item>
        } else {
          return "";
        }
      });
    };

    const content = (
      <div>
        <p><Link to="/yard/teacherClassroom"><Icon type="setting"/> 班级配置</Link></p>
        <p><Link to="/admin/users/updatePwd"><Icon type="setting"/> 用户配置</Link></p>
        {/*<Divider></Divider>*/}
        <p><Popconfirm {...confirmOpts}><Icon type="logout"/> 退出登陆</Popconfirm></p>
      </div>
    );

    return (
      <Header className={styles.adminHeader}>
        <Helmet><title>{configApi.appName} - 后台管理</title></Helmet>
        <Row>
          <Col span={20}>
            <div className={styles.headerMain}>
              <div className={styles.logoName}>科普进校园</div>
              <div className={styles.headerNav}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['index']}
                  style={{ lineHeight: '60px' }}
                >
                  <Menu.Item key="index"><Link to={'/yard/index'}>首页</Link></Menu.Item>
                  {buildMenus()}
                </Menu>
              </div>
            </div>
          </Col>
          <Col span={4} style={{"textAlign": "right"}}>
            <Popover placement="bottomRight" content={content} trigger="hover">
              <Icon type="user"/> {this.state.loginUser.nickname}
            </Popover>
          </Col>
        </Row>
      </Header>
    );
  }
}
