import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import List from './components/List';

const Student = ({
  dispatch,
  loading,
  student,
  location
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

  const filterOpts = {
    ageList: student.ageList,
    schoolList: student.schoolList,
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: student.datas,
    loading: loading.models.student,
    location,
    totalElement: student.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 学生管理<b>（{student.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
    </div>
  );
}

export default connect(({ loading, student }) => ({ loading, student }))(Student);
