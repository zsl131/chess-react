import React from 'react';
import {connect} from 'dva';
import {createForm} from 'rc-form';
import ShowRecord from './components/ShowRecord';
import AddStudent from './components/AddStudent';
import ListStudent from './components/ListStudent';
import ListApply from './components/ListApply';
import { routerRedux } from 'dva/router'

@createForm()
class SignUp extends React.Component {

  render() {

    const { query, pathname } = this.props.location;

    const signUp = this.props.signUp;

    const handleRefresh = (newQuery) => {
      this.props.dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...newQuery,
        },
      }));
    }

    const handlerDeleteApply = (id) => {
      this.props.dispatch({type: 'signUp/onDeleteApply', payload: id});
    }

    // console.log(this.props);

    const handleAddStudent = (student) =>  {
      this.props.dispatch({type: "signUp/addStudent", payload: student}).then(()=>handleRefresh());
    }

    const handleAddStudentOnly = (stu) => {
      this.props.dispatch({type: "signUp/addStudentOnly", payload: stu});
    }

    const handleDeleteBatch = (objIds) => {
      this.props.dispatch({type: "signUp/deleteBatch", payload: objIds}).then(()=>handleRefresh());
    }

    const handleApplyBatch = (objIds) => {
      this.props.dispatch({type: "signUp/applyBatch", payload: {objIds: objIds, recordId: signUp.record.id}}).then(()=>handleRefresh());
    }



    const stuList = this.props.signUp.stuList;
    const needAdd = stuList == null || stuList.length<=0;

    const applyList = signUp.applyList;

    return (
      <div style={{"padding": "10px"}}>
        <div className="listPageHeader">报名参与活动</div>

        {needAdd && <AddStudent onAdd={handleAddStudent} record={this.props.signUp.record} loading={this.props.loading.effects["signUp/addStudent"]} ageList={signUp.ageList} schoolList={signUp.schoolList}/>}
        {!needAdd && <ListStudent dataSource={signUp.stuList} ageList={signUp.ageList} schoolList={signUp.schoolList} addStudent={handleAddStudentOnly} deleteBatch={handleDeleteBatch} applyBatch={handleApplyBatch}/>}
        {applyList && applyList.length>0 && <ListApply dataSource={applyList} onDeleteApply={handlerDeleteApply}/>}

        <ShowRecord record={this.props.signUp.record}/>
      </div>
    );
  }
}

export default connect(({signUp, loading}) => ({signUp, loading}))(SignUp);
