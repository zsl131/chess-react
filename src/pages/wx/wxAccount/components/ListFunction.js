import React from 'react';
import {List} from 'antd-mobile';
import router from 'umi/router';

const Item = List.Item;
const Brief = Item.Brief;

export default class ListFunction extends React.Component {

  render() {

    return (
      <List style={{"paddingTop":"75px"}}>
        <Item
          thumb={require('../../../../assets/icons/message.png')}
          arrow="horizontal"
          onClick={() => {router.push("/wx/feedback/listFeedback");}}
        >我的反馈</Item>
        <Item
          thumb={require('../../../../assets/icons/activity.png')}
          onClick={() => {router.push("/wx/activity/listOwn")}}
          arrow="horizontal"
        >
          我的活动
        </Item>
      </List>
    )
  }
}
