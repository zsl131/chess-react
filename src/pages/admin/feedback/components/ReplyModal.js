import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

@Form.create()
export default class UpdateModal extends React.Component {

  constructor(props) {
    super(props);
    state: {
      item:props.item
    }
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="反馈者昵称">
            {this.props.item.nickname}
          </FormItem>
          <FormItem {...formItemLayout} label="反馈时间">
            {this.props.item.createTime}
          </FormItem>
          <FormItem {...formItemLayout} label="回复内容">
            {getFieldDecorator("reply")(<TextArea rows={4} placeholder="输入回复内容"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
