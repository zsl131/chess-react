import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class ReplyModal extends React.Component {

  componentDidMount() {
    const {item} = this.props;
    const {setFieldsValue} = this.props.form;
    setFieldsValue({
      reply: item.content
    });
  }

  render() {
    const {
      onOk,
      item,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
      ...modalProps
    } = this.props;

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

    //console.log(item)

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.id = item.id;
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="点评内容">
            {getFieldDecorator('reply', {rules: [{required: true, message: '点评内容不能为空'}]})(<Input placeholder="输入点评内容"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

