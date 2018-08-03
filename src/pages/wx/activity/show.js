import React from 'react';
import {connect} from 'dva';
import styles from './show.css';
import IconText from '../../../components/IconText';
import {Helmet} from 'react-helmet';
import AddComment from '../../../components/AddComment';
import ListComment from '../../../components/ListComment';
import RecommendActivity from '../../../components/RecommendActivity';
import {Tabs} from 'antd-mobile';

const ActivityShow = ({
  wxActivity,
  dispatch
}) => {
  const item = wxActivity.item;

  const handleSubmit = (comment) => {
    dispatch({type: 'wxActivity/onComment', payload: comment});
  }

  const handleOnGood = (objId) => {
    dispatch({type: 'wxActivity/onCommentGood', payload: objId});
  }

  const handleChangePage = (query) => {
    query.actId = item.id;
    dispatch({type: "wxActivity/listComment", payload: query}).then(()=> {
      dispatch({type: 'wxActivity/modifyState',  payload:{curCommentPage: query.page+1}})
    });
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
      <Tabs tabs={[{title: '相关推荐'}, {title: '评论信息'}]} >
        <div className={styles.tabDiv}>
          <RecommendActivity/>
        </div>
        <div className={styles.tabDiv}>
          <ListComment curPage={wxActivity.curCommentPage} onChangePage={handleChangePage} title="活动评论信息" totalElements={wxActivity.commentElements} dataSource={wxActivity.commentList} totalPage={wxActivity.commentPage} onGood={handleOnGood}/>
        </div>
      </Tabs>
    </div>
  );
}

export default connect(({wxActivity}) => ({wxActivity}))(ActivityShow);
