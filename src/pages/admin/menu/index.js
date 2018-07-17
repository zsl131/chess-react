import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import LeftTree from './commponts/LeftTree';
import List from './commponts/List';

const Role = ({
  loading,
  menu,
  location,
  dispatch
}) => {



  return(
    <Row>
      <Col span={5} >
        <LeftTree menuTree={menu.menuTree}/>
      </Col>
      <Col span={19}><List dataSource={menu.datas}/></Col>
    </Row>
  );
}

export default connect(({ loading, menu }) => ({ loading, menu }))(Role);
