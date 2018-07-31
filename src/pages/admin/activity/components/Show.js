import React from 'react';
import { Modal } from 'antd';
import styles from './show.css';

const Show = ({
  item,
  ...opts
}) => {

  return (
    <Modal {...opts} style={{top : 20}}>
      <div className={styles.title}>
        <h2>{item.title}</h2>
        <p>{item.depName} | {item.createTime}</p>
      </div>
      <div dangerouslySetInnerHTML={{__html: item.content}}>
      </div>
    </Modal>
  );
}
export default Show;
