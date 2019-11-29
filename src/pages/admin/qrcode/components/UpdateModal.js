import React from 'react';
import {Form, Switch, Input, Modal, Icon} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    /*let item = this.props.item;
    item.status = item.status=='1'?true:false;
    console.log(item)*/
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
          values.status = values.status?"1":"0";
         this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="跳转地址">
            {getFieldDecorator('url', {rules: [{required: true, message: '跳转地址不能为空'}]})(<Input placeholder="输入地址，http:// 开头"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否启用">
            {getFieldDecorator("status")(<Switch defaultChecked={this.props.item.status=='1'} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross" />}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
