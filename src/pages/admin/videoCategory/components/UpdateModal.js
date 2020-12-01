import React from 'react';
import {Form, Input, InputNumber, message, Modal} from 'antd';
import PictureWall from "../../../../components/PictureWall";
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    fileList : [],
  };

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);

    const curItem = this.props.item;
    if(curItem.picPath) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: curItem.picPath,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }];
      this.setState({fileList: fileList});
    }
  }

  render() {

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
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
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('picPath')(<Input type="hidden" />)}
          <FormItem {...formItemLayout} label="分类名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '分类名称不能为空'}]})(<Input placeholder="输入分类名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="图片信息">
            <PictureWall fileList={this.state.fileList} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="封面图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
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
}
