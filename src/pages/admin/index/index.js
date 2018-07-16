import React from 'react';
import { connect } from 'dva';

const Index = ({
  loading,
  index
}) => {

  return (
    <div>
      <h2>系统首页</h2>
    </div>
  );
}

export default connect(({ loading, index }) => ({ loading, index }))(Index);
