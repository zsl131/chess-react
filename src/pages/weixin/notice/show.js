import React from 'react';
import {connect} from 'dva';
import styles from './show.css';
import {Helmet} from 'react-helmet';
import {Affix, BackTop, Badge, Button, Col, Input, Row} from 'antd';
import {Player} from 'video-react';
import AddComment from "./components/AddComment";
import {Tabs} from 'antd-mobile';
import ListComment from "../../../components/ListComment";

const ShowNotice = ({
                      wxNotice,
  dispatch,
}) => {
  const item = wxNotice.item;

  const addCommentOpts = {
    visible: wxNotice.addCommentVisible,
    item: item,
    onClose:()=> {
      dispatch({type: 'wxNotice/modifyState', payload: {addCommentVisible:false}})
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch({type: "wxNotice/addComment", payload: values}).then(()=>dispatch({type: 'wxNotice/modifyState', payload: {addCommentVisible:false}}));
    }
  }

  const handleOnGood = (objId) => {
    dispatch({type: 'wxNotice/onCommentGood', payload: objId});
  }

  const handleChangePage = (query) => {
    query.noticeId = item.id;
    dispatch({type: "wxNotice/listComment", payload: query}).then(()=> {
      dispatch({type: 'wxNotice/modifyState',  payload:{curCommentPage: query.page+1}})
    });
  }

  const onFocusComment = () => {
    dispatch({type: 'wxNotice/modifyState', payload: {addCommentVisible: true}});
  }

  return (
    <div>
      <Helmet><title>{item.title}</title></Helmet>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.showDate}>
        {item.createTime}
      </p>
      { item.videoId && wxNotice.attachment &&
        <div style={{"padding": "0px 10px 12px 10px"}}>
          <Affix offsetTop={10}>
            <Player>
              <source src={wxNotice.attachment.url} />
            </Player>
          </Affix>
        </div>
      }
      {item.guide && <div className={styles.guide}><b>导读：</b>{item.guide}</div>}

      <div className={styles.content} dangerouslySetInnerHTML={{__html: item.content}}></div>

      {/*<div style={{"height":"600px"}}>--</div>*/}

      { item.canComment === '1' &&
        <Affix offsetBottom={0} className={styles.commentAffix}
               style={{"position": "fixed", "bottom": "0px", "zIndex": 2}}>
          <div className={styles.comments}>
            <Row>
              <Col span={20}>
                {/*<Input placeholder="写评论..." disabled={true} onClick={onFocusComment}/>*/}
                <Button style={{"width": "100%", "textAlign": "left"}} onClick={onFocusComment}>写评论...</Button>
              </Col>
              <Col span={4} style={{"textAlign": "center"}}><Badge count={wxNotice.commentCount} showZero><Button
                icon="message" shape="circle"/></Badge></Col>
            </Row>
          </div>
        </Affix>
      }

      { wxNotice.commentCount>0 &&
        <Tabs tabs={[{title: <Badge text={wxNotice.commentCount}>评论信息</Badge>}]}>
          <div className={styles.tabDiv}>
            <ListComment curPage={wxNotice.curCommentPage} onChangePage={handleChangePage} title="活动评论信息"
                         totalElements={wxNotice.commentCount} dataSource={wxNotice.commentList}
                         totalPage={wxNotice.commentPage} onGood={handleOnGood}/>
          </div>
        </Tabs>
      }

      <BackTop visibilityHeight={100}/>
      {wxNotice.addCommentVisible && item.canComment === '1' && <AddComment {...addCommentOpts}/>}
    </div>
  );
}

export default connect(({ wxNotice }) => ({ wxNotice }))(ShowNotice);
