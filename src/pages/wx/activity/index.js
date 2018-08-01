import React from 'react';
import {connect} from 'dva';
import MyCard from './components/MyCard';
import {Helmet} from 'react-helmet';

const WxActivity = ({
  loading,
  wxActivity
}) => {

  return (

    <div>
      <Helmet>
        <title>活动精选</title>
      </Helmet>
      <div className="listPageHeader">
        <h3>活动精选</h3>
      </div>
      <MyCard dataSource={wxActivity.datas} loading={loading.models.activity}/>
    </div>
  );
}

export default connect(({loading, wxActivity}) => ({loading, wxActivity}))(WxActivity);
