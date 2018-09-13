import React from 'react';
import { routerRedux } from 'dva/router';
import {connect} from 'dva';
import {Icon,Button} from 'antd';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import List from './components/List';
import  Filter from './components/Filter';

const Contacts = ({
  location,
  loading,
  contacts,
  dispatch,
})=>{
  const {query,pathname} = location;
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  }
  const listOpts={
    dataSource:contacts.datas,
    loading:loading.models.contacts,
    location,
    totalElements: contacts.totalElements,
    onDelConfirm:(id)=>{
      dispatch({type:'contacts/deleteObj',payload:id}).then(()=>handleRefresh());
    },
    onUpdate:(id)=>{
      dispatch({type:'contacts/onUpdate',payload:id});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }
  const addOpts = {
    visible:contacts.addVisible,
    title:"添加记录",
    onCancel: () => {
      dispatch({type:'contacts/modifyState',payload:{addVisible:false}});
    },
    onAdd: (values) => {
      console.log(values);
      dispatch({type:'contacts/addOrUpdate',payload:values}).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible:contacts.updateVisible,
    title:"修改记录",
    contacts:contacts.item,
    onCancel: () => {
      dispatch({type:'contacts/modifyState',payload:{updateVisible:false}});
    },
    onUpdate:(values) => {
      dispatch({type:'contacts/addOrUpdate',payload:values}).then(() => {
        dispatch({type: 'contacts/modifyState', payload: {updateVisible: false}});
        handleRefresh();
      });
    }
  }
  const handler = () => {
    dispatch({type:'contacts/modifyState',payload:{addVisible:true}});
  }
  const filterOpts = {
    onFilter: (params) => {
      // console.log(params, JSON.stringify(params));
      handleRefresh({conditions: JSON.stringify(params)});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }

  return (
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 通讯录管理<b>（{contacts.totalElements}）</b></h3>
        <div className="listOperator"><Button type="primary" icon="plus" onClick={handler}> 添加联系人</Button></div>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts}/>
        <div/>
        <div>
          {contacts.addVisible && <AddModal {...addOpts}/>}
          {contacts.updateVisible && <UpdateModal {...updateOpts}/>}
        </div>
      </div>
    </div>
  );
}
export default connect(({contacts,loading}) => ({contacts,loading}))(Contacts);
