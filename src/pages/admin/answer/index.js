import React from 'react';
import {Button,Icon} from 'antd';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import ListAnswer from './components/ListAnswer';
import Update from './components/Update';
import Filter from './components/Filter';

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
    loading: loading.models.answer,
    location,
    totalElement: answer.totalElements,
    onDelConfirm: (id) =>{
      dispatch({type:"answer/deleteObj",payload:id}).then(() =>{handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'answer/onUpdate', payload: id });
    },
  }
  const updateOpts = {
    visible:answer.updateVisible,
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
  const filterOpts = {
    onFilter: (params) => {
      // console.log(params, JSON.stringify(params));
      handleRefresh({conditions: JSON.stringify(params)});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }
  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 题库答案管理<b>（{answer.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <ListAnswer {...listOpts}/>
      </div>
      <div>
        {answer.updateVisible && <Update {...updateOpts}/>}
      </div>
    </div>
  );
}
export default connect(({answer,loading})=>({answer,loading}))(Answer);
