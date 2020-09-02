import React from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;

const AddModal = ({
  onOk,
  config,
  grade,
  teacher,
  form: {
    getFieldDecorator,
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

  //console.log(grade, teacher)

  const handleOk = (e) => {
    e.preventDefault();

    validateFieldsAndScroll((errors, values) => {
      if(!errors) {
        values.gradeId = grade.id;
        values.teaId = teacher.id;
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

        <FormItem {...formItemLayout} label="隶属">
          <b className="red">{config.configYear}{config.term==='1'?"春季学期":"冬季学期"}</b>
        </FormItem>
        <FormItem {...formItemLayout} label="班级名称">
          {getFieldDecorator('roomName', {rules: [{required: true, message: '班级名称不能为空'}]})(<Input maxLength={11} placeholder="输入班级名称，如：三一班"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create()(AddModal);
