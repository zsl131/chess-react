import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import ImportModal from './components/ImportModal';

const School = ({
                  dispatch,
                  loading,
                  school,
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
      dispatch({ type: 'school/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: school.data,
    loading: loading.models.school,
    location,
    totalElement: school.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'school/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'school/onUpdate', payload: id });
    },
    handleImport:(school) => {
      console.log(school)
      dispatch({type: 'school/modifyState', payload: {item: school, importVisible: true}});
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: school.addVisible,
    title: "添加学校",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['school/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'school/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'school/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'school/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: school.updateVisible,
    title: `修改数据[${school.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: school.item,
    confirmLoading: loading.effects['school/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'school/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'school/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'school/modifyState', payload: { updateVisible: false } });
    }
  }

  const importOpts = {
    maskClosable: false,
    visible: school.importVisible,
    title: `批量导入教师到[${school.item.name}]`,
    okText:'关闭窗口',
    cancelText: '取消',
    item: school.item,
    confirmLoading: loading.effects['school/addOrUpdate'],
    onOk: () => {
      dispatch({ type: 'school/modifyState', payload: { importVisible: false } });
    },
    onCancel: () => {
      dispatch({ type: 'school/modifyState', payload: { importVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 学校管理<b>（{school.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {school.addVisible && <AddModal {...addOpts}/>}
      {school.updateVisible && <UpdateModal {...updateOpts}/>}
      {school.importVisible && <ImportModal {...importOpts}/>}
    </div>
  );
}

export default connect(({ loading, school }) => ({ loading, school }))(School);
