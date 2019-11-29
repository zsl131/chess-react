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
      {item.guide && <div className={styles.guide}><b>导读：</b>{item.guide}</div>}
      <div className={styles.content} dangerouslySetInnerHTML={{__html: item.content}}>
      </div>
    </Modal>
  );
}
export default Show;
