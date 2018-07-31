import React from 'react';
import { Form, Modal, Switch, Input, Icon } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      item: this.props.item,
    })
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
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

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    }

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<input type="hidden"/>)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入菜单名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<Input placeholder="输入菜单序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="链接">
            {getFieldDecorator('url', {rules: [{required: true, message: '链接地址不能为空'}]})(<Input placeholder="输入菜单链接地址"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
