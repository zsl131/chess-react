import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const Notice = ({
                  dispatch,
                  loading,
                  notice,
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
    msg: '添加通知公告',
    onAdd: () => {
      dispatch({ type: 'notice/onAdd', payload: {}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: notice.data,
    loading: loading.models.notice,
    location,
    totalElement: notice.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'notice/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'notice/onUpdate', payload: id });
    },
    updateProperty: (id, field, value) => {
      dispatch({type: 'notice/updateProperty', payload: {id: id, field: field, value: value}}).then(() => {handleRefresh()});
    }
  }

  const addOpts = {
    visible: notice.addVisible,
    title: "添加通知公告",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['notice/addOrUpdate'],
    onOk: (datas) => {
      dispatch({ type: 'notice/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'notice/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'notice/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: notice.updateVisible,
    title: `修改数据[${notice.item.title}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: notice.item,
    confirmLoading: loading.effects['notice/addOrUpdate'],
    onOk:(datas) => {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'notice/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'notice/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'notice/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 通知公告管理<b>（{notice.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {notice.addVisible && <AddModal {...addOpts}/>}
      {notice.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, notice }) => ({ loading, notice }))(Notice);
