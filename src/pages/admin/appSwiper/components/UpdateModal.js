import React from 'react';
import {Form, Icon, Input, InputNumber, message, Modal, Switch} from 'antd';
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    fileList:[],
    item:{}
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    /*let item = this.props.item;
    item.status = item.status=='1'?true:false;
    console.log(item)*/
    const curItem = this.props.item;
    setFieldsValue(curItem);

    if(curItem.url) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: curItem.url,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
      this.setState({fileList: fileList, url: curItem.url});

      // console.log(fileList);
    }
  }

  render() {

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
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
          values.status = values.status?"1":"0";
         this.props.onOk(values);
        }
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

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {getFieldDecorator('url')(<Input type="hidden" />)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber placeholder="输入序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="图片">
            <PictureWall fileList={this.state.fileList} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="上传图片" data={{'path':'swiper'}} onFileChange={onFileChange}/>
          </FormItem>
          <FormItem {...formItemLayout} label="是否启用">
            {getFieldDecorator("status")(<Switch defaultChecked={item.status==="1"} checkedChildren={<Icon type="check"/>} unCheckedChildren={<Icon type="cross" />}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
