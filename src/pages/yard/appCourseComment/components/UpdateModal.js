import React from 'react';
import {Form, Input, Modal, Select} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    systemList:[],
    fetching: false,
    recordDate:'',
    item:{},
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    this.setState({item: this.props.item});
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
    const {item} = this.props;
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
          <FormItem {...formItemLayout} label="评论人">
            {item.schName}-{item.name}-{item.phone}
          </FormItem>
          <FormItem {...formItemLayout} label="评论内容">
            <p>对应课程：{item.courseTitle}</p>
            <p>{item.content}</p>
            <p>{item.createTime}</p>
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {rules: [{required: true, message: '请选择状态'}]})(
              <Select>
                <Option value="1">显示</Option>
                <Option value="0">隐藏</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="回复">
            {getFieldDecorator('reply')(<TextArea rows={4} placeholder="输入回复内容"/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
