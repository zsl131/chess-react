import React from 'react';
import { Button } from 'antd';
import createHistory from "umi/src/createHistory";

const Operator = ({
}) => {
  const onBack = () => {
    const history = createHistory();
    console.log(history)
    history.goBack();
  };
  return(
    <div className="listOperator">
      {/*<Button type="primary" icon="plus" onClick={onAdd}>{msg?msg:'添加数据'}</Button>*/}
      <Button type="primary" icon="caret-left" onClick={()=>onBack()}>返回上一步</Button>
    </div>
  );
};

export default Operator;
