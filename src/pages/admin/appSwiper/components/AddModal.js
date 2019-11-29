import React from 'react';
import {Form, Switch, Input, Modal, Icon, message, InputNumber} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
    getFieldValue,
    setFieldsValue,
    validateFieldsAndScroll,
  },
  ...modalProps
}) => {

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
      // console.log(values)
      if(!errors) {
        values.status = values.status?"1":"0";
        onOk(values);
      }
      // console.log("submit", errors, values);
    });
  }

  const onBeforeUpload = (file) => {
    // console.log("====", file);
    if(file.type.indexOf("image")<0) {
      message.error("只能上传图片格式文件");
      return false;
    }
    return true;
  }

  const onFileChange = (file) => {
    // console.log("onFileChange", file);
    if(file.status === 'done') {
      setFieldsValue({"url": file.response});
    }
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  }

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {getFieldDecorator('url')(<Input type="hidden" />)}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="序号">
          {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="输入序号"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="图片">
          <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="上传图片" data={{'path':'swiper'}} onFileChange={onFileChange}/>
        </FormItem>
        <FormItem {...formItemLayout} label="是否启用">
          {getFieldDecorator("status")(<Switch checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross" />}/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
