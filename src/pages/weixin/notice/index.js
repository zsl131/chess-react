import React from 'react';
import {connect} from 'dva';
import {Helmet} from 'react-helmet';
import router from 'umi/router';
import {List,Icon} from 'antd-mobile';
import WeixinPage from "../../../components/WeixinPage";

const Item = List.Item;

class Index extends React.Component {

  render() {
    const notice = this.props.wxNotice;

    // console.log(this.props)

    const list = notice.data.map((item) => {
      return (
        <Item
          thumb={item.picPath}
          arrow="horizontal"
          key={item.id}
          onClick={() => {router.push(`/weixin/notice/show?id=${item.id}`);}}
        >{item.title}</Item>
      )
    })

    // const item = wxNotice.item;
    return (
        notice.loaded?
        <div>
          <Helmet><title>通知公告</title></Helmet>
          <List renderHeader={() => '最新通知公告（' + notice.totalElements + '）'}>
            {list}
          </List>
          <WeixinPage {...this.props} totalPage={notice.totalPage}/>
        </div>:
        <div style={{"textAlign":"center", "paddingTop":"30px"}}>
          <Icon type="loading" size="lg"/>
        </div>
    )
  }
}

export default connect(({ wxNotice,loading }) => ({ wxNotice, loading }))(Index);
