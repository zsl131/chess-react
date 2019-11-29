import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const ClassTag = ({
  dispatch,
  loading,
 classTag,
  location
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
    onAdd: () => {
      dispatch({ type: 'classTag/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: classTag.datas,

    loading: loading.models.classTag,
    location,
    totalElement: classTag.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'classTag/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'classTag/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: classTag.addVisible,
    title: "添加课程标签",
    confirmLoading: loading.effects['classTag/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'classTag/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classTag/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'classTag/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: classTag.updateVisible,
    title: `修改标签[${classTag.item.name}]`,
    item: classTag.item,
    confirmLoading: loading.effects['classTag/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'classTag/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classTag/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'classTag/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课程标签管理<b>（{classTag.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {classTag.addVisible && <AddModal {...addOpts}/>}
      {classTag.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, classTag }) => ({ loading, classTag }))(ClassTag);
