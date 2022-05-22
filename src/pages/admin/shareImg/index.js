import React from 'react';
import { connect } from 'dva';
import {Icon, message} from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import {getLoginUser} from "../../../utils/authUtils";

const ShareImg = ({
  dispatch,
  loading,
  shareImg,
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

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'shareImg/modifyState', payload: {addVisible: true}});
    }
  };

  const filterOpts = {
    onFilter: (type, params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: shareImg.datas,
    loading: loading.models.shareImg,
    location,
    totalElement: shareImg.totalElements,
    onDelConfirm: (obj) => {
      dispatch({ type: 'shareImg/deleteObj', payload: obj.id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (obj) => {
      dispatch({ type: 'shareImg/onUpdate', payload: obj.id });
    },
    showContent: (obj)=> {
      //console.log(obj)
      dispatch({ type: 'shareImg/modifyState', payload: {showVisible: true, item:obj} });
    }
  };

  const addOpts = {
    visible: shareImg.addVisible,
    title: "添加推广用户",
    maskClosable: false,
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['shareImg/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'shareImg/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'shareImg/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'shareImg/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: shareImg.updateVisible,
    title: `修改数据[${shareImg.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    maskClosable: false,
    item: shareImg.item,
    confirmLoading: loading.effects['shareImg/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'shareImg/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'shareImg/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'shareImg/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 推广图片管理<b>（{shareImg.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {shareImg.addVisible && <AddModal {...addOpts}/>}
      {shareImg.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, shareImg }) => ({ loading, shareImg }))(ShareImg);
