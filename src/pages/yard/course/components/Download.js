import React from 'react';
import {Button, Dropdown, Icon, Menu} from 'antd';

export default class Download extends React.Component {

  render() {

    // console.log("systemId::", this.props.systemId)

    const system = this.props.system;
    const name = system?system.name:"数据";
    const id = system?system.id:0;
    const type = system?(system.pid?"child":"root"):"all";

    const handleMenuClick = (e) => {
      const orderBy = e.key;
      // console.log(e)
      const w=window.open('about:blank');
      w.location.href="/api/download/system?orderBy="+orderBy+"&sid="+id+"&type="+type;
    }

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="orderNo"><Icon type="download" />通过序号排序导出</Menu.Item>
        <Menu.Item key="sectionNo"><Icon type="download" />通过章节排序导出</Menu.Item>
      </Menu>
    );

    return (
      <span style={{"paddingRight":"10px"}}>
        <Dropdown overlay={menu}>
          <Button type="danger">
            导出{name} <Icon type="down" />
          </Button>
        </Dropdown>
      </span>
    )
  }
}
