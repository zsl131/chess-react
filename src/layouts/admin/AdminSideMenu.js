import React from 'react';
import {Icon, Menu, Tooltip} from 'antd';
import {Link} from 'react-router-dom';

import styles from '../layout.css';

const SubMenu = Menu.SubMenu;

class AdminSideMenu extends React.Component {

  state = {
    collapsed: false,
    defaultKey: sessionStorage.getItem("menuKey") || '1',
  }

  handlerClick = ({item, key, keyPath}) => {
    //console.log(item, key, keyPath);
    sessionStorage.setItem("menuKey", key+"");
    this.setState({defaultKey: key});
  }

  render() {

    const navMenus = JSON.parse(sessionStorage.getItem("navMenus"));
    const systemList = JSON.parse(sessionStorage.getItem("systemList"));

    const isTeacher = sessionStorage.getItem("isTeacher");
    // console.log(isTeacher, navMenus);

    const menus = navMenus!==null?navMenus.map((item) => {
      return (
        <SubMenu key={item.menu.sn} title={<span><Icon type={item.menu.icon || "appstore"} /><span>{item.menu.name}</span></span>}>
          {
            item.children.map((subMenu) => {
              return (<Menu.Item key={subMenu.id}><Link to={subMenu.href}>{subMenu.name}</Link></Menu.Item>)
            })
          }
        </SubMenu>
      );
    }):"";

    const systemData = systemList!==null?<SubMenu title="课程体系">
      {
        systemList.map((item)=>{
          return (
            <Menu.Item key={item.id}><Link to={'/admin/teacherCourse?gid='+item.id}>{item.name}</Link></Menu.Item>
          )
        })
      }
    </SubMenu>:"";

    const collapsed = this.props.collapsed;

    return (
      <div style={{"position":"relative", "height":"100vh"}}>
        <div className={styles.logoDiv}>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.collapseDiv}>
          <Tooltip title={collapsed?"点击展开侧边导航":"点击收起侧边导航"} placement="right">
            <Icon className={styles.collapseIcon} onClick={this.props.onCollapse} type={collapsed?"right-circle":"left-circle"}/>
          </Tooltip>
        </div>
        <Menu
          defaultSelectedKeys={[this.state.defaultKey]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          collapsed="{collapsed}"
          onClick={this.handlerClick.bind(this)}
        >
          {isTeacher==="true"?systemData:menus}
        </Menu>
      </div>
    );
  }
}
export default AdminSideMenu;
