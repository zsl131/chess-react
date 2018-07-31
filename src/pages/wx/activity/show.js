import React from 'react';
import {connect} from 'dva';
import styles from './show.css';
import IconText from '../../../components/IconText';
import {Helmet} from 'react-helmet';

const ActivityShow = ({
  wxActivity
}) => {
  const item = wxActivity.item;
  return (
    <div>
      <Helmet><title>{item.title}</title></Helmet>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.showDate}>
        <IconText type="eye-o" text={item.readCount}/>，<IconText type="like-o" text={item.goodCount} />，<IconText type="message" text={item.commentCount} />
        ｜{item.createDate}
      </p>

      {item.guide && <div className={styles.guide}>{item.guide}</div>}

      <div className={styles.content} dangerouslySetInnerHTML={{__html: item.content}}></div>
    </div>
  );
}

export default connect(({wxActivity}) => ({wxActivity}))(ActivityShow);
