import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

@Form.create()
export default class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
         this.props.onOk(values);
        }
      });
    };

    return(
      <Modal {...this.props}  style={{"minWidth":"80%", "top":"20px"}} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="视频标题">
            {getFieldDecorator('title', {rules: [{required: true, message: '视频标题不能为空'}]})(<Input placeholder="输入视频标题"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="引导问题">
            {getFieldDecorator('guide', {rules: [{required: true, message: '引导问题不能为空'}]})(<Input placeholder="输入引导问题"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="引导问题">
            {getFieldDecorator('content', {rules: [{required: true, message: '内容不能为空'}]})(<TextArea rows={8} placeholder="内容部份">&nbsp;</TextArea>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
