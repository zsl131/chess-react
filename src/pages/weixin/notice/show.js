import React from 'react';
import {connect} from 'dva';
import styles from './show.css';
import {Helmet} from 'react-helmet';
import {BackTop} from 'antd';

const ShowNotice = ({
                      wxNotice,
}) => {
  const item = wxNotice.item;
  return (
    <div>
      <Helmet><title>{item.title}</title></Helmet>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.showDate}>
        {item.createTime}
      </p>

      {item.guide && <div className={styles.guide}><b>导读：</b>{item.guide}</div>}

      <div className={styles.content} dangerouslySetInnerHTML={{__html: item.content}}></div>

      <BackTop visibilityHeight={100}/>
    </div>
  );
}

export default connect(({ wxNotice }) => ({ wxNotice }))(ShowNotice);
