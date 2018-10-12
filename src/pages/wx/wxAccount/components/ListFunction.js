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
        {/*<Item
          thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
          onClick={() => {}}
          arrow="horizontal"
        >
          My Cost Ratio
        </Item>*/}
      </List>
    )
  }
}
