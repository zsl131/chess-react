import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const TeacherClassImage = ({
  dispatch,
  loading,
  teacherClassImage,
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
      dispatch({ type: 'teacherClassImage/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: teacherClassImage.datas,

    loading: loading.models.teacherClassImage,
    location,
    totalElement: teacherClassImage.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'teacherClassImage/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'teacherClassImage/onUpdate', payload: id });
    },
  }

  const addOpts = {
    visible: teacherClassImage.addVisible,
    title: "添加课程标签",
    maskClosable: false,
    confirmLoading: loading.effects['teacherClassImage/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'teacherClassImage/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'teacherClassImage/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'teacherClassImage/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    visible: teacherClassImage.updateVisible,
    title: `修改标签[${teacherClassImage.item.name}]`,
    item: teacherClassImage.item,
    confirmLoading: loading.effects['teacherClassImage/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'teacherClassImage/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'teacherClassImage/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'teacherClassImage/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课堂影像管理<b>（{teacherClassImage.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {teacherClassImage.addVisible && <AddModal {...addOpts}/>}
      {teacherClassImage.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, teacherClassImage }) => ({ loading, teacherClassImage }))(TeacherClassImage);
