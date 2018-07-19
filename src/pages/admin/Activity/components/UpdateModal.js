import React from 'react';
import {Form, Input, Modal, Switch, Select} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";

const FormItem = Form.Item;

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

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
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
    }

    const handleChangeContent = (html) => {
      // console.log("add===", html);
      setFieldsValue({"content": html});
    }

    return(
      <Modal {...this.props} onOk={handleOk} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="所属部门">
            {this.props.item.depName}
          </FormItem>
          <FormItem>
            {getFieldDecorator('title', {rules: [{required: true, message: '活动标题不能为空'}]})(<Input placeholder="输入活动标题"/>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("content", {rules: [{required: true, message: '活动内容不能为空'}]})(<MyEditor content={this.props.item.content} onChangeContent={handleChangeContent}/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={this.props.item.status === 1}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
