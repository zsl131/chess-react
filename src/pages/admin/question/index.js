import React from 'react';
import {connect} from 'dva';
import { Icon,Button } from 'antd';
import { routerRedux } from 'dva/router';
import ListQuestion from "./components/ListQuestion";
import AddModal from "./components/AddModal";
import UpdateModal from "./components/UpdateModal";
import Update from "./components/Update";

const Question = ({
  loading,
  dispatch,
  question,
  location,
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
    dataSource:question.datas,
    loading: loading.models.question,
    location,
    totalElements: question.totalElements,
    onDelConfirm: (id) => {
      dispatch({type: 'question/deleteObj', payload: id}).then(()=> {handleRefresh();});
    },
    onButto: (record) => {
      console.log(record);
      dispatch({type:"question/show",payload:record.id}).then(()=> {handleRefresh()});
    },
    onButt: (record) => {
      console.log(record);
      dispatch({type:"question/showw",payload:record.id}).then(()=> {handleRefresh()});
    },
    onBut: (record) => {
      console.log(record);
      dispatch({type:"question/showww",payload:record.id}).then(()=> {handleRefresh()});
    },
    onBu: (record) => {
      console.log(record);
      dispatch({type:"question/showwww",payload:record.id}).then(()=> {handleRefresh()});
    },
    onUpdate: (id) => {
      dispatch({ type: 'question/onUpdate', payload: id });
    },
    onAdd: (record) => {
      dispatch({type:'question/modifyState',payload:{it:record,update:true}});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }
  const addOpts = {
      visible:question.addVisible,
      title:"添加题目",
      onCancel: () => {
        dispatch({type:'question/modifyState',payload:{addVisible:false}});
      },
    onAdd: (values) => {
        console.log(values);
        dispatch({type:'question/addOrUpdate',payload:values}).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible:question.updateVisible,
    title:"修改",
    question:question.item,
    onCancel: () => {
      dispatch({type:'question/modifyState',payload:{updateVisible:false}});
    },
    onUpdate:(values) => {
      dispatch({type:'question/addOrUpdate',payload:values}).then(() => {
        dispatch({type: 'question/modifyState', payload: {updateVisible: false}});
        handleRefresh();
      });
    }
  }
  const update = {
    visible:question.update,
    title:"设施答案",
    question:question.it,
    onCancel: () => {
      dispatch({type:'question/modifyState',payload:{update:false}});
    },
    onUpdate:(values) => {
      dispatch({type:'question/addOrUpdateAnswer',payload:values}).then(() =>{
        dispatch({type:'question/modifyState',payload:{update:false}});
      });        handleRefresh();

    }
}
  const handler = () => {
    dispatch({type:'question/modifyState',payload:{addVisible:true}});
  }

  return (
    <div>
    <div className="listHeader">
      <h3><Icon type="bars"/> 题目管理<b>（{question.totalElements}）</b></h3>
        <div className="listOperator"><Button type="primary" icon="plus" onClick={handler}> 题目添加</Button></div>
    </div>
      <div className="listContent">
        <ListQuestion {...listOpts}/>
      <div/>
        <div>
        {question.addVisible && <AddModal {...addOpts}/>}
        {question.updateVisible && <UpdateModal {...updateOpts}/>}
        {question.update && <Update {...update}/>}
      </div>
      </div>
    </div>
  );
}
export default connect(({question,loading}) => ({question,loading}))(Question);
