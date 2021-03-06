import React from 'react';
import { Button } from 'antd';

const Operator = ({
  msg,
  onAdd,
}) => {
  return(
    <div className="listOperator"><Button type="primary" icon="plus" onClick={onAdd}>{msg?msg:'添加数据'}</Button></div>
  );
}

export default Operator;
