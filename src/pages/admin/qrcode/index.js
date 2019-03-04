import React from 'react';
import { connect } from 'dva';
import { Icon, message } from 'antd';
import { routerRedux } from 'dva/router'

import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Operator from './components/Operator';
import List from './components/List';
import Qrconfig from './components/Qrconfig';
import Filter from './components/Filter';

const Qrcode = ({
  qrcode,
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
      dispatch({ type: 'qrcode/setModalVisible', payload: {addVisible: true}});
    }
  }

  const listOpts = {
    dataSource: qrcode.datas,
    loading: loading.models.qrcode,
    location,
    totalElement: qrcode.totalElements,
    config: qrcode.config,
    onDelConfirm: (id) => {
      dispatch({ type: 'qrcode/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'qrcode/update', payload: id });
    },
    onMatchMenu: (curRole) => {
      dispatch({ type: 'qrcode/queryMenus', payload: {rid: curRole.id}}).then(() => { dispatch({ type: 'qrcode/setModalVisible', payload: {curRole: curRole} }) });
    }
  }

  const addOpts = {
    visible: qrcode.addVisible,
    title: "添加二维码",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['qrcode/addOrUpdateCode'],
    onOk(datas) {
      dispatch({ type: 'qrcode/addOrUpdateCode', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'qrcode/setModalVisible', payload: { addVisible: false } });
    }
  }
  const updateOpts = {
    visible: qrcode.updateVisible,
    title: `修改二维码[${qrcode.item.name}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: qrcode.item,
    confirmLoading: loading.effects['qrcode/addOrUpdateCode'],
    onOk(datas) {
      dispatch({ type: 'qrcode/setModalVisible', payload: { updateVisible: false } });
      dispatch({ type: 'qrcode/addOrUpdateCode', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel: () => {
      dispatch({ type: 'qrcode/setModalVisible', payload: { updateVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  const configOpt = {
    url: qrcode.config.baseUrl,
    onModify: (url)=> {
      if(url && (url.startsWith("http://") || url.startsWith("https://"))) {
        dispatch({type: "qrcode/saveConfig", payload: {baseUrl: url}});
      } else {
        message.error("请输入有效的域名")
      }
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 二维码管理<b>（{qrcode.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <Qrconfig {...configOpt}/>
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {qrcode.addVisible && <AddModal {...addOpts}/>}
      {qrcode.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ qrcode, loading }) => ({ qrcode, loading }))(Qrcode);
