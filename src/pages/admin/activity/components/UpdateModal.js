import React from 'react';
import {Form, Input, Modal, Switch, message, Row, Col, DatePicker} from 'antd';
import moment from 'moment';
import MyEditor from "../../../../components/Editor/MyEditor";
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    item:this.props.item,
    fileList:[]
  };
  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    const curItem = this.props.item;
    if(curItem.imgUrl) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: curItem.imgUrl,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }];
      this.setState({fileList: fileList, imgUrl: curItem.imgUrl});

      // console.log(fileList);
    }
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
    };

    const handleChangeContent = (html) => {
      // console.log("add===", html);
      setFieldsValue({"content": html});
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
        setFieldsValue({"imgUrl": file.response});
      }
    };

    const changeDate = (date, dateStr) => {
      setFieldsValue({"publishDate": dateStr});
    };

    const dateFormat = "YYYY-MM-DD";

    return(
      <Modal {...this.props} onOk={handleOk} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator('imgUrl')(<Input type="hidden" />)}
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          {/*<FormItem {...formItemLayout} label="所属部门">
            {this.props.item.depName}
          </FormItem>*/}
          <FormItem>
            <Row>
              <Col span={4} style={{"textAlign":'right', "paddingRight":"10px"}}>{this.props.item.depName}</Col>
              <Col span={11}>
                {getFieldDecorator('title', {rules: [{required: true, message: '活动标题不能为空'}]})(<Input placeholder="输入活动标题"/>)}
              </Col>
              <Col span={9}>
                {getFieldDecorator('publishDate')(<Input type="hidden"/>)}
                <DatePicker placeholder="选择发布日期" defaultValue={moment(this.props.item.publishDate, dateFormat)} format={dateFormat} onChange={changeDate}/>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span={4}>
                <PictureWall fileList={this.state.fileList} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="封面图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
              </Col>
              <Col span={20}>
                {getFieldDecorator('guide', {rules: [{required: true, message: '活动内容导读不能为空'}]})(<TextArea placeholder="输入活动内容导读" autosize={{ minRows: 4, maxRows: 4 }}/>)}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator("content", {rules: [{required: true, message: '活动内容不能为空'}]})(<MyEditor content={this.props.item.content} onChangeContent={handleChangeContent}/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="显示状态">
            {getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={this.props.item.status === '1'}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
