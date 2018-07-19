import React from 'react';
import {Form, Input, Modal, Select, Switch} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";

const FormItem = Form.Item;
const Option = Select.Option;

const AddModal = ({
  onOk,
  depList,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    setFieldsValue,
  },
  ...modalProps
}) => {

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
        onOk(values);
      }
    });
  }

  const depSelect = depList.map((dep) => {
    return (<Option value={dep.id} key={dep.id}>{dep.name}</Option>);
  });

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  const handleChangeContent = (html) => {
    // console.log("add===", html);
    setFieldsValue({"content": html});
  }

  return(
    <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
      <Form layout="horizontal">
        <FormItem>
          {getFieldDecorator('depId', {rules: [{required: true, message: '请选择所属部门'}]})(
            <Select placeholder="请选择所属部门">
              {depSelect}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('title', {rules: [{required: true, message: '活动标题不能为空'}]})(<Input placeholder="输入活动标题"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("content", {rules: [{required: true, message: '活动内容不能为空'}]})(<MyEditor onChangeContent={handleChangeContent}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示状态">
          {getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
