import React from 'react';
import { connect } from 'dva';
import { Modal, Row, Col, Icon } from 'antd';
import ListMenu from './ListMenu';

const MatchMenuModal = ({
  role,
  onCancel,
  onPageChange,
  onSetMenu,
  loading,
  visible,
  sidList,
  systemList,
}) => {

  const listOpts = {
    onPageChange: onPageChange,
    dataSource: systemList,
    sidList: sidList,
    rowKey: 'id',
    totalElements: role.menuElements,
    loading: loading.models.gradeRole,
    onSetMenu:(sid, checked)=>onSetMenu(role.id, sid, checked),
    curAuthMenu: role.curAuthMenu
  }

  return (
    <Modal visible={visible} style={{ "minWidth": '80%', top: 30 }} title={`为年级角色【${role.name}】授权课程分类`} footer={false} onCancel={onCancel}>
    <div style={{"height":"100%", "overflowY": 'hidden'}}>
      <Row style={{"height":"100%"}}>
        <Col span={24}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 课程分类列表<b>（勾选上即授权，不能全选）</b></h3>
          </div>
          <ListMenu {...listOpts}/>
        </Col>
      </Row>
    </div>
    </Modal>
  );
}

export default connect(({ loading }) => ({ loading }))(MatchMenuModal);
