import React from 'react';
import {Form, Input, Modal, Select, Switch, message, Row, Col} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

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
      setFieldsValue({"imgUrl": file.response});
    }
  }

  return(
    <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
      <Form layout="horizontal">
        {getFieldDecorator('imgUrl')(<Input type="hidden" />)}
        <FormItem>
          <Row>
            <Col span={4} style={{"textAlign":'right', "paddingRight":"10px"}}>
              {getFieldDecorator('depId', {rules: [{required: true, message: '请选择所属部门'}]})(
                <Select placeholder="所属部门">
                  {depSelect}
                </Select>
              )}
            </Col>
            <Col span={20}>
              {getFieldDecorator('title', {rules: [{required: true, message: '活动标题不能为空'}]})(<Input placeholder="输入活动标题"/>)}
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span={4}>
              <PictureWall onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
            </Col>
            <Col span={20}>
              {getFieldDecorator('guide', {rules: [{required: true, message: '活动内容导读不能为空'}]})(<TextArea placeholder="输入活动内容导读" autosize={{ minRows: 4, maxRows: 4 }}/>)}
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator("content", {rules: [{required: true, message: '活动内容不能为空'}]})(<MyEditor placeholder="活动内容" onChangeContent={handleChangeContent}/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示状态">
          {getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(AddModal);
