import React from 'react';
import {Modal} from 'antd';

const ShowModal = ({
  onOk,
  item,
  ...modalProps
}) => {

  const modalOpts = {
    ...modalProps,
    onOk: onOk
  };

  const content = () => {
    const con = item.content;
    const res = con.replace(/\n/g,'<br/>');
    // console.log(res);
    return res;
  };

  return(
    <Modal {...modalOpts} style={{"minWidth":"70%", "top":"30px"}}>
      <h4>【{item.authorName}】{item.title}</h4>
      <h4 style={{"padding":"10px", "background":"#eee", "borderLeft": "3px #ddd solid"}}>{item.guide}</h4>
      <div style={{"lineHeight": "26px"}} dangerouslySetInnerHTML={{__html: content()}}></div>
      <div style={{"color":"#888", "paddingTop": "12px"}}>{item.updateTime}</div>
    </Modal>
  );
}

export default ShowModal;
