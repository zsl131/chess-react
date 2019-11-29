import React from 'react';
import {connect} from 'dva';
import {Icon, message} from 'antd';
import {routerRedux} from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';

const AppSwiper = ({
  appSwiper,
  location,
  dispatch,
  loading
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
    onAdd() {
      // console.log("UserIndex operator");
      dispatch({ type: 'appSwiper/updateState', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: appSwiper.datas,
    loading: loading.models.appSwiper,
    location,
    totalElement: appSwiper.totalElements,
    config: appSwiper.config,
    onDelConfirm: (id) => {
      dispatch({ type: 'appSwiper/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'appSwiper/update', payload: id });
    },
  }

  const addOpts = {
    visible: appSwiper.addVisible,
    title: "添加移动端面滚动图",
    okText:'确认提交',
    cancelText: '取消并关闭',
    maskClosable: false,
    confirmLoading: loading.effects['appSwiper/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'appSwiper/addOrUpdate', payload: datas }).then(() => {handleRefresh();dispatch({ type: 'appSwiper/updateState', payload: { addVisible: false } });});
    },
    onCancel() {
      dispatch({ type: 'appSwiper/updateState', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: appSwiper.updateVisible,
    title: `修改二维码[${appSwiper.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    maskClosable: false,
    item: appSwiper.item,
    confirmLoading: loading.effects['appSwiper/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'appSwiper/updateState', payload: { updateVisible: false } });
      dispatch({ type: 'appSwiper/addOrUpdate', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'appSwiper/updateState', payload: { updateVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 移动端面滚动管理<b>（{appSwiper.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {appSwiper.addVisible && <AddModal {...addOpts}/>}
      {appSwiper.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ appSwiper, loading }) => ({ appSwiper, loading }))(AppSwiper);
