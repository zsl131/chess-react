import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import MatchMenuModal from './components/MatchMenuModal';
import List from './components/List';
import Filter from './components/Filter';

const GradeRole = ({
  gradeRole,
  location,
  dispatch,
  loading
}) => {
  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  }

  const operatorOpts = {
    onAdd() {
      // console.log("UserIndex operator");
      dispatch({ type: 'gradeRole/setModalVisible', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: gradeRole.datas,
    loading: loading.models.gradeRole,
    location,
    totalElement: gradeRole.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'gradeRole/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'gradeRole/update', payload: id });
    },
    onMatchMenu: (curRole) => {
      dispatch({ type: 'gradeRole/querySystem', payload: {rid: curRole.id}}).then(() => { dispatch({ type: 'gradeRole/setModalVisible', payload: {curRole: curRole,matchMenuVisible:true} }) });
    }
  }

  const addOpts = {
    visible: gradeRole.addVisible,
    title: "添加年级角色",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['gradeRole/addRole'],
    onOk(datas) {
      dispatch({ type: 'gradeRole/addRole', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'gradeRole/setModalVisible', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: gradeRole.updateVisible,
    title: `修改年级角色[${gradeRole.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: gradeRole.item,
    confirmLoading: loading.effects['gradeRole/updateRole'],
    onOk(datas) {
      dispatch({ type: 'gradeRole/setModalVisible', payload: { updateVisible: false } });
      dispatch({ type: 'gradeRole/updateRole', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'gradeRole/setModalVisible', payload: { updateVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  const treeOpts = {
    role: gradeRole.curRole,
    visible: gradeRole.matchMenuVisible,
    systemList: gradeRole.systemList,
    sidList: gradeRole.sidList,
    onSelect: (key) => {
      dispatch({ type: 'gradeRole/queryMenus', payload: { pid: key[0], rid: gradeRole.curRole.id } });
    },
    onCancel: ()=>{
      dispatch({ type: 'gradeRole/setModalVisible', payload: { matchMenuVisible: false } });
    },

    onPageChange: (page) => {
      // console.log("page::"+page);
      dispatch({ type: 'gradeRole/queryMenus', payload: { page: page-1, rid: gradeRole.curRole.id } });
    },
    onSetMenu: (rid, sid, checked) => {
      // console.log("setMenu"+key, "roleId:"+role.curRole.id);
      // console.log(rid, sid, checked)
      dispatch({ type: 'gradeRole/authSystem', payload: {rid: rid, sid:sid, checked:checked} });
    },
    loading: loading.effects.gradeRole
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 年级角色管理<b>（{gradeRole.totalElements}）</b></h3>
        {/*<div className="listOperator"><Button type="primary" icon="plus">添加用户</Button></div>*/}
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {gradeRole.addVisible && <AddModal {...addOpts}/>}
      {gradeRole.updateVisible && <UpdateModal {...updateOpts}/>}
      {gradeRole.matchMenuVisible && <MatchMenuModal {...treeOpts}/>}
    </div>
  );
}

export default connect(({ gradeRole, loading }) => ({ gradeRole, loading }))(GradeRole);
