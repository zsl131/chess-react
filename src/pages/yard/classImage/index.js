import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const ClassImage = ({
  dispatch,
  loading,
 classImage,
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
      dispatch({ type: 'classImage/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: classImage.datas,

    loading: loading.models.classImage,
    location,
    totalElement: classImage.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'classImage/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'classImage/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: classImage.addVisible,
    title: "添加课程标签",
    confirmLoading: loading.effects['classImage/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'classImage/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classImage/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'classImage/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: classImage.updateVisible,
    title: `修改标签[${classImage.item.name}]`,
    item: classImage.item,
    confirmLoading: loading.effects['classImage/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'classImage/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classImage/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'classImage/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课堂影像管理<b>（{classImage.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {classImage.addVisible && <AddModal {...addOpts}/>}
      {classImage.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, classImage }) => ({ loading, classImage }))(ClassImage);
