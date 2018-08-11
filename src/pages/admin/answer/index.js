import React from 'react';
import {Button,Icon} from 'antd';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import ListAnswer from './components/ListAnswer';
import Update from './components/Update';


const Answer = ({
  loading,
  location,
  dispatch,
  answer,
}) => {
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
  const listOpts = {
    dataSource:answer.datas,
    onDel: (record) =>{
      console.log(record);
      dispatch({type:"answer/deleteObj",payload:record.id}).then(() =>{handleRefresh()});
    },
  }
  const updateOpts = {
    visible:answer.item,
    title:"修改答案",
    answer:answer.item,
    onCancel:() => {
      dispatch({type:"answer/modifyState",payload:{updateVisible:false}});
    },
    onUpdate:(values) => {
      console.log(values);
      dispatch({type:"answer/addOrUpdate",payload:values}).then(()=>{
        dispatch({type:"answer/modifyState",payload:{updateVisible:false}});
        handleRefresh()});
    }
  }
  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 题库答案管理<b>（{answer.totalElements}）</b></h3>
      </div>
      <div>
        <ListAnswer {...listOpts}/>
        {answer.updateVisible && <Update {...updateOpts}/>}
      </div>
    </div>
  );
}
export default connect(({answer,loading})=>({answer,loading}))(Answer);
