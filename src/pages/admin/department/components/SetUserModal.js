import React from 'react';
import {Modal} from 'antd';

import UserTag from './UserTag';

const SetUserModal = ({
  onChange,
  userList,
  userIds,
  ...modalProps
}) => {


  const handleOk = (e) => {
    e.preventDefault();
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  const tagOpts = {
    onChange: (obj) => {
      onChange(obj);
    }
  }



  return(
    <Modal {...modalOpts}>
      {
        userList.map((user) => {
          return (<UserTag {...tagOpts} userid={user.id} key={user.id} checked={userIds.includes(user.id)}>{user.nickname}</UserTag>);
        })
      }
    </Modal>
  );
}

export default SetUserModal;
