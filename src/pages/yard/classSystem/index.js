import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const AgeDic = ({
                  dispatch,
                  loading,
                  classSystem,
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
      dispatch({ type: 'classSystem/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: classSystem.data,
    loading: loading.models.classSystem,
    location,
    totalElement: classSystem.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'classSystem/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'classSystem/onUpdate', payload: id });
    },
    handleImport:(school) => {
      console.log(school)
      dispatch({type: 'classSystem/modifyState', payload: {item: school, importVisible: true}});
    }
  }

  const addOpts = {
    visible: classSystem.addVisible,
    title: "添加课程体系",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['classSystem/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'classSystem/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classSystem/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'classSystem/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: classSystem.updateVisible,
    title: `修改数据[${classSystem.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: classSystem.item,
    confirmLoading: loading.effects['classSystem/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'classSystem/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classSystem/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'classSystem/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课程体系管理<b>（{classSystem.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {classSystem.addVisible && <AddModal {...addOpts}/>}
      {classSystem.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, classSystem }) => ({ loading, classSystem }))(AgeDic);
