import React from 'react';
import {connect} from 'dva';
import ListRecord from './components/List';
import SingleRecord from './components/SingleRecord';
import NoRecord from './components/NoRecord';

/** 签到 */
class ActivitySignIn extends React.Component {

  handleCheck = (id) => {
    this.props.dispatch({type: 'activitySignIn/sign', payload: id});
  }

  handleSearch = (phone) => {
    let query = this.props.location.query;
    query.phone = phone;
    this.props.dispatch({type: 'activitySignIn/searchRecord', payload: query});
  }

  render() {
    const obj = this.props.activitySignIn;
    const dataSource = obj.data;

    const baseOpts = {
      onCheck: this.handleCheck,
      loading: this.props.loading.effects["activitySignIn/sign"]
    }

    const noRecordOpts = {
      loading: this.props.loading.effects["activitySignIn/searchRecord"],
      onSearch: this.handleSearch
    }

    return (
      <div>
        {dataSource && dataSource.length>1 && <ListRecord dataSource={dataSource} {...baseOpts}/>}
        {dataSource && dataSource.length==1 && <SingleRecord dataSource={dataSource[0]} {...baseOpts}/>}
        {(!dataSource || dataSource.length ===0) && <NoRecord {...noRecordOpts}/>}
      </div>
    );
  }
}

export default connect(({activitySignIn, loading}) => ({activitySignIn, loading}))(ActivitySignIn);
