import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const VideoContent = ({
  dispatch,
  loading,
  videoContent,
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
      dispatch({ type: 'videoContent/modifyState', payload: {addVisible: true}});
    }
  };

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  };

  const listOpts = {
    dataSource: videoContent.data,
    loading: loading.models.videoContent,
    location,
    totalElement: videoContent.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'videoContent/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'videoContent/onUpdate', payload: id });
    },
    updateField:(obj) => {
      dispatch({ type: 'videoContent/updateField', payload: obj }).then(()=> {handleRefresh();});
    }
  };

  const addOpts = {
    visible: videoContent.addVisible,
    title: "添加视频内容",
    maskClosable: false,
    confirmLoading: loading.effects['videoContent/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'videoContent/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'videoContent/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'videoContent/modifyState', payload: { addVisible: false } });
    }
  };

  const updateOpts = {
    visible: videoContent.updateVisible,
    title: `修改数据[${videoContent.item.title}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: videoContent.item,
    cateList: videoContent.categoryList,
    confirmLoading: loading.effects['videoContent/addOrUpdate'],
    onOk(datas) {
      // dispatch({ type: 'department/modifyState', payload: { updateVisible: false } });
      dispatch({ type: 'videoContent/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'videoContent/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'videoContent/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 视频资源管理<b>（{videoContent.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {videoContent.addVisible && <AddModal {...addOpts}/>}
      {videoContent.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, videoContent }) => ({ loading, videoContent }))(VideoContent);
