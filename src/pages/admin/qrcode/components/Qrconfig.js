import React from 'react';
import { Icon,Input } from 'antd';

const Qrconfig = ({
  onModify,
  url
}) => {
  const onSave= (e) => {
    // console.log(e.currentTarget.value)
    onModify(e.currentTarget.value);
  }
  return(
    <div>
      <Input placeholder="输入域名，如：http://" defaultValue={url} addonAfter={<Icon type="save"/>}  onBlur={onSave}/>
    </div>
  );
}

export default Qrconfig;
