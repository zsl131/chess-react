import React from 'react';
import {Icon} from 'antd';
import {connect} from 'dva';
import List from './components/List';
import AddRule from './components/AddRule';
import Operator from './components/Operator';
import UpdateScoreRule from './components/UpdateScoreRule';
import Filter from './components/Filter';
import {routerRedux} from 'dva/router';
const ScoreRule=({
  loading,
  location,
  scoreRule,
  dispatch,
})=>{
  const operatorOpts={
    onAdd:()=>{
    dispatch({type:'scoreRule/modifyState',payload:{addVisible:true}});
  }
  }
  const listOpts={
    location,
    dataSource:scoreRule.datas,
    onDelConfirm: (record) => {
      dispatch({ type: 'scoreRule/delete', payload: record}).then(()=> {
        handleRefresh();
      });
    },
  }
  const addOpts={
    visible:scoreRule.addVisible,
    title:'增加规则',
    onCancel:()=>{
      dispatch({type:'scoreRule/modifyState',payload:{addVisible:false}});
    },
    onAdd: (values)=>{
      dispatch({type:'scoreRule/addOrUpdate', payload: values}).then(()=> {
        handleRefresh();
      });
    }
  }
  const updateOpts = {
    visible:scoreRule.updateVisible,
    title: "修改规则[" + scoreRule.item.ruleCode + "]",
    okText:'确认提交',
    cancelText: '取消',
    confirmLoading: loading.effects['scoreRule/addOrUpdate'],
    scoreRule:scoreRule.item,
    onCancel: () => {
      dispatch({type: 'scoreRule/modifyState', payload: {updateVisible: false}});
    },
   onUpdate(values) {
      dispatch({type: 'scoreRule/addOrUpdate', payload: values}).then(() => {
        dispatch({type: 'scoreRule/modifyState', payload: {updateVisible: false}});
        handleRefresh();
      });
    }
  }
  const filterOpts = {
    onFilter: (params) => {
      //console.log(params, JSON.stringify(params));
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }
  const {query,pathname} =location;
  const handleRefresh = (newQuery)=>{
    dispatch(routerRedux.push({
      pathname,
      query:{
        ...query,
        ...newQuery,
      },
    }));
  }
  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/>积分规则管理<b>({scoreRule.totalElements})</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts}/>
      </div>
      {scoreRule.addVisible &&<AddRule{...addOpts}/>}
      {scoreRule.updateVisible &&<UpdateScoreRule{...updateOpts}/>}
    </div>
  );
}
export default connect(({loading,scoreRule})=>({loading,scoreRule}))(ScoreRule);
