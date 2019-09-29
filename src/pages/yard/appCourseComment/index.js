import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import UpdateModal from './components/UpdateModal';

const AppCourseComment = ({
                  dispatch,
                  loading,
                  appCourseComment,
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
      dispatch({ type: 'appCourseComment/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: appCourseComment.data,
    loading: loading.models.appCourseComment,
    location,
    totalElement: appCourseComment.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'appCourseComment/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'appCourseComment/onUpdate', payload: id });
    },
    handleImport:(appCourseComment) => {
      console.log(appCourseComment)
      dispatch({type: 'appCourseComment/modifyState', payload: {item: appCourseComment, importVisible: true}});
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: appCourseComment.updateVisible,
    title: `修改数据[${appCourseComment.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: appCourseComment.item,
    confirmLoading: loading.effects['appCourseComment/reply'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      console.log(datas);
      dispatch({ type: 'appCourseComment/reply', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'appCourseComment/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'appCourseComment/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课程评论管理<b>（{appCourseComment.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {appCourseComment.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, appCourseComment }) => ({ loading, appCourseComment }))(AppCourseComment);
