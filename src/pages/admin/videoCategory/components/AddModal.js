import React from 'react';
import {Form, Input, InputNumber, message, Modal} from 'antd';
import PictureWall from "../../../../components/PictureWall";
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  form: {
    getFieldDecorator,
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
      if(!errors) {
        onOk(values);
      }
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  };

  const onBeforeUpload = (file) => {
    // console.log("====", file);
    if(file.type.indexOf("image")<0) {
      message.error("只能上传图片格式文件");
      return false;
    }
    return true;
  };

  const onFileChange = (file) => {
    // console.log("onFileChange", file);
    if(file.status === 'done') {
      setFieldsValue({"picPath": file.response});
    }
  };

  return(
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        {getFieldDecorator('picPath')(<Input type="hidden" />)}
        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator('name', {rules: [{required: true, message: '分类名称不能为空'}]})(<Input placeholder="输入分类名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="图片信息">
          <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="封面图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
          <span style={{"color":"#999"}}>建议尺寸：460*220px，背景色不要是白色</span>
        </FormItem>

        <FormItem {...formItemLayout} label="序号">
          {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号'}]})(<InputNumber placeholder="输入分类名称" style={{"width":"100%"}}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {rules: [{required: true, message: '备注信息'}]})(<TextArea placeholder="输入备注信息"></TextArea>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
