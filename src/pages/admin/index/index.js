import React from 'react';
import { connect } from 'dva';
import {Alert, Button} from 'antd';
import {Link} from 'react-router-dom';

const Index = ({
  loading,
 adminIndex
}) => {

  console.log(adminIndex);

  const alertMessage = ()=> {
    return (
      <div><p>有<b> {adminIndex.noConfigTemplateMessage.length} </b>条模板消息需要配置：</p>
        {adminIndex.noConfigTemplateMessage.map((item, index)=> (<p key={index}>{item.name}：{item.rules}</p>))}
        <p><Link to="/admin/templateMessageRelation"><Button icon="setting">前去配置</Button></Link></p>
      </div>
    );
  }

  // console.log(alertMessage());

  return (
    <div style={{"padding":"15px"}}>
      <h2>系统首页</h2>
      {
        adminIndex.noConfigTemplateMessage && <Alert type="error" message={alertMessage()} showIcon />
      }
    </div>
  );
}

export default connect(({ loading, adminIndex }) => ({ loading, adminIndex }))(Index);
