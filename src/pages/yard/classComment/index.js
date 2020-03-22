import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import ReplyModal from "./components/ReplyModal";

const ClassComment = ({
  dispatch,
  loading,
 classComment,
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
  };

  /*const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'classComment/modifyState', payload: {addVisible: true}});
    }
  };*/

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: classComment.datas,

    loading: loading.models.classComment,
    location,
    totalElement: classComment.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'classComment/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'classComment/onUpdate', payload: id });
    },
    openReply: (obj)=> {
      //console.log(obj);
      dispatch({ type: 'classComment/modifyState', payload: {replyVisible: true, item: obj} });
    },
  };

  const addOpts = {
    visible: classComment.addVisible,
    title: "添加课程标签",
    confirmLoading: loading.effects['classComment/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'classComment/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classComment/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'classComment/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: classComment.updateVisible,
    title: `修改标签[${classComment.item.name}]`,
    item: classComment.item,
    confirmLoading: loading.effects['classComment/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'classComment/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classComment/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'classComment/modifyState', payload: { updateVisible: false } });
    }
  };

  const replyOpts = {
    visible: classComment.replyVisible,
    title: `点评[${classComment.item.teaName}]`,
    item: classComment.item,
    confirmLoading: loading.effects['classComment/reply'],
    onOk(datas) {
      //console.log(datas);
      dispatch({ type: 'classComment/reply', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'classComment/modifyState', payload: { replyVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'classComment/modifyState', payload: { replyVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 课堂点评管理<b>（{classComment.totalElements}）</b><span className="gray">在《老师管理》中添加课堂点评</span></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {classComment.addVisible && <AddModal {...addOpts}/>}
      {classComment.updateVisible && <UpdateModal {...updateOpts}/>}
      {classComment.replyVisible && <ReplyModal {...replyOpts}/>}
    </div>
  );
}

export default connect(({ loading, classComment }) => ({ loading, classComment }))(ClassComment);
