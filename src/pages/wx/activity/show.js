import React from 'react';
import {connect} from 'dva';
import styles from './show.css';
import IconText from '../../../components/IconText';
import {Helmet} from 'react-helmet';
import AddComment from '../../../components/AddComment';
import ListComment from '../../../components/ListComment';
import RecommendActivity from '../../../components/RecommendActivity';
import {Tabs,Badge,Toast} from 'antd-mobile';
import {BackTop, Button} from 'antd';
import RecordList from './components/RecordList';
// import wx from 'weixin-js-sdk'

const ActivityShow = ({
  wxActivity,
  dispatch
}) => {
  dispatch({type: 'wxJsApi/queryJsApi', payload: {}}); //

  /*dispatch({type: 'wxJsApi/shareData', payload: {
    title: wxActivity.item.title,
    desc: wxActivity.item.guide,
    link: window.location.href,
    img: wxActivity.item.imgUrl
  }});*/

  const item = wxActivity.item;

  shareObj = {
    title: item.title,
    desc: item.guide,
    // link: window.location.href,
    imgUrl: item.imgUrl
  }

  /*const url = window.location.href;
  const domain = window.location.protocol+"//"+window.location.host; //域名
  const imgUrl = wxActivity.item.imgUrl?(domain+wxActivity.item.imgUrl):"";

  window.wx.ready(function() {
    // Toast.info("wxReady");
    //分享给朋友
    window.wx.updateAppMessageShareData({
      title: "分享："+item.title, // 分享标题
      desc: item.desc,
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
        Toast.success("分享成功");
      },
      fail: function(res) {
        Toast.fail(res);
      }
    });

    //分享到朋友圈
    window.wx.updateTimelineShareData({
      title: "分享："+item.title, // 分享标题
      desc: item.desc,
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
        Toast.success("分享成功");
      },
      fail: function(res) {
        Toast.fail(res);
      }
    })
  })*/

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

  const handleClickLike = (e) => {
    e.preventDefault();
    dispatch({type: "wxActivity/onGood", payload: item.id});
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
      <Tabs tabs={[{title:<Badge text={wxActivity.recordSize}>开展记录</Badge>}, {title: '相关推荐'}, {title: <Badge text={wxActivity.commentElements}>评论信息</Badge>}]} >
        <div className={styles.tabDiv}>
          <RecordList dataSource={wxActivity.recordList}/>
        </div>
        <div className={styles.tabDiv}>
          <RecommendActivity/>
        </div>
        <div className={styles.tabDiv}>
          <ListComment curPage={wxActivity.curCommentPage} onChangePage={handleChangePage} title="活动评论信息" totalElements={wxActivity.commentElements} dataSource={wxActivity.commentList} totalPage={wxActivity.commentPage} onGood={handleOnGood}/>
        </div>
      </Tabs>
      <BackTop visibilityHeight={100}/>
      <div className={styles.goodBtn}>
        <Button type="primary" shape="circle" icon="like" size="large" onClick={handleClickLike}/>
      </div>
      <div style={{"paddingBottom":"50px"}}></div>
    </div>
  );
}

export default connect(({wxActivity}) => ({wxActivity}))(ActivityShow);
