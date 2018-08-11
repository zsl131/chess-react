import React from 'react';
import {Icon,Button} from 'antd';
import {connect} from 'dva';
import List from './components/List';
import AddRule from './components/AddRule';
import UpdateScoreRule from './components/UpdateScoreRule';
import {routerRedux} from 'dva/router';
const ScoreRule=({
  loading,
  location,
  scoreRule,
  dispatch,
})=>{
  const listOpts={
    dataSource:scoreRule.datas,
    onDel:(record)=>{
      dispatch({type:'scoreRule/delete',payload:record.id}).then(()=>{
        handleRefresh();
      })
    }
  }
  const handleAdd=()=>{
    dispatch({type:'scoreRule/modifyState',payload:{addVisible:true}})
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
    scoreRule:scoreRule.item,
    onCancel: () => {
      dispatch({type: 'scoreRule/modifyState', payload: {updateVisible: false}});
    },
    onUpdate: (values) => {
      console.log(values);
      dispatch({type: 'scoreRule/addOrUpdate', payload: values}).then(()=>{
        handleRefresh();
        dispatch({type:'scoreRule/modifyState',payload:{updateVisible:false}});
      })
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
      </div>
      <Button type="primary" icon="plus"onClick={handleAdd}>增加积分规则</Button>
      <List {...listOpts}/>
      {scoreRule.addVisible &&<AddRule{...addOpts}/>}
      {scoreRule.updateVisible &&<UpdateScoreRule{...updateOpts}/>}
    </div>
  );
}
export default connect(({loading,scoreRule})=>({loading,scoreRule}))(ScoreRule);
