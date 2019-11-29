import React from 'react';
import {Modal,List, Button,TextareaItem,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {getLoginAccount, getLoginAccount2Obj} from "../../../../utils/loginAccountUtils";

@createForm()
export default class AddComment extends React.Component {

  render() {
    const { getFieldProps,validateFields, setFieldsValue } = this.props.form;

    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        if(!errors) {

          const wxAccount = getLoginAccount2Obj();
          if(wxAccount) {
            values.openid = wxAccount.openid;
            values.nickname = wxAccount.nickname;
            values.avatarUrl = wxAccount.avatarUrl;
          }

          values.noticeId = this.props.item.id; //TODO 需要父组件提供item属性
          values.noticeTitle = this.props.item.title;
          this.props.onSubmit(values); //TODO 提交，需要父组件提供onSubmit方法
          setFieldsValue({content: ''});
        } else {
          Toast.fail("请认真输入评论内容");
        }
      });
    }

    return (
      <Modal
        popup
        animationType="slide-up"
        {...this.props}
      >
        <List renderHeader={() => <div>发表评论</div>} className="popup-list">
          <List.Item>
            <TextareaItem
              {...getFieldProps('content', {rules: [{required: true, message: '请认真输入评论内容'}]})}
              rows={5}
              count={300}
              placeholder="输入评论内容..."
            />
          </List.Item>
          <List.Item>
            <Button type="primary" onClick={handleSubmit}>发表评论</Button>
          </List.Item>
        </List>
      </Modal>
    );
  }
}
