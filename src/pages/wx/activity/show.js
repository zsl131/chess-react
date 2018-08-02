import React from 'react';
import {connect} from 'dva';
import styles from './show.css';
import IconText from '../../../components/IconText';
import {Helmet} from 'react-helmet';
import AddComment from '../../../components/AddComment';

const ActivityShow = ({
  wxActivity,
  dispatch
}) => {
  const item = wxActivity.item;

  const handleSubmit = (comment) => {
    console.log(comment);
    dispatch({type: 'wxActivity/onComment', payload: comment});
  }

  return (
    <div>
      <Helmet><title>{item.title}</title></Helmet>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.showDate}>
        <IconText type="eye-o" text={item.readCount}/>，<IconText type="like-o" text={item.goodCount} />，<IconText type="message" text={item.commentCount} />
        ｜{item.createDate}
      </p>

      {item.guide && <div className={styles.guide}><b>导读：</b>{item.guide}</div>}

      <div className={styles.content} dangerouslySetInnerHTML={{__html: item.content}}></div>

      <AddComment objId={item.id} onSubmit={handleSubmit}/>
    </div>
  );
}

export default connect(({wxActivity}) => ({wxActivity}))(ActivityShow);
