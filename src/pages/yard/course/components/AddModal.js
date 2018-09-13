import React from 'react';
import {Col, Form, Input, message, Modal, Radio, Row, Tooltip, Upload, Button, Icon} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

@Form.create()
export default class AddModal extends React.Component {

  state = {
    videoList: 0,
    pptList: 0,
    learnList: 0,
  }

  render() {
    // console.log(this.props.form)
    const {getFieldDecorator, getFieldValue, setFieldsValue, validateFieldsAndScroll} = this.props.form;
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
        console.log(values)
        if(!errors) {
          this.props.onOk(values);
        }
      });
    }

    const handleCancel = (e) => {
      e.preventDefault();
      const videoId = getFieldValue("videoId");
      const pptId = getFieldValue("pptId");
      const learnId = getFieldValue("learnId");
      const ids = (videoId?videoId:"")+","+(pptId?pptId:"")+","+(learnId?learnId:'');
      request("attachmentService.deleteByIds", {ids:ids}, true);
      this.props.onCancel();
    }

    const handleChangeContent = (html) => {
      // console.log("add===", html);
      setFieldsValue({"content": html});
    }

    const modalOpts = {
      ...this.props,
      onOk: handleOk,
      onCancel: handleCancel,
    }

    const handleChange = (file) => {
      if(file.file.status==='done') {
        setFieldsValue({"videoId": file.file.response.result.obj.id});
        this.setState({videoList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId}, true);
        setFieldsValue({"videoId": ''});
        this.setState({videoList: 0})
      }
    }

    const handlePPTChange = (file) => {
      if(file.file.status==='done') {
        setFieldsValue({"pptId": file.file.response.result.obj.id});
        this.setState({pptList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId}, true);
        setFieldsValue({"pptId": ''});
        this.setState({pptList: 0})
      }
    }

    const handleLearnChange = (file) => {
      if(file.file.status==='done') {
        setFieldsValue({"learnId": file.file.response.result.obj.id});
        this.setState({learnList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId}, true);
        setFieldsValue({"learnId": ''});
        this.setState({learnList: 0})
      }
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          <FormItem {...formItemLayout} label="课程标题">
            {getFieldDecorator('title', {rules: [{required: true, message: '课程标题不能为空'}]})(<Input placeholder="输入课程标题"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="适合">
            <Row>
              <Col span={8} style={{"textAlign":'right', "paddingRight":"10px"}}>
                <Tooltip placement="topLeft" title="输入适合的年级">{getFieldDecorator('grade')(<Input placeholder="输入年级"/>)}</Tooltip>
              </Col>
              <Col span={6} style={{"textAlign":'left', "paddingRight":"10px"}}>
                <Tooltip placement="topLeft" title="选择学期" arrowPointAtCenter>
                  {getFieldDecorator('term')(
                    <RadioGroup>
                      <Radio value="上">上学期</Radio>
                      <Radio value="下">下学期</Radio>
                    </RadioGroup>
                  )}
                </Tooltip>
              </Col>
              <Col span={8} style={{"textAlign":'right', "paddingRight":"10px"}}>
                <Tooltip placement="topLeft" title="输入适合的年龄">{getFieldDecorator('age')(<Input placeholder="输入年龄"/>)}</Tooltip>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="附件">
            <Row>
              <Col span={8} style={{"paddingRight":"10px"}}>
                {getFieldDecorator('videoId')(<Input type="hidden"/>)}
                  <Upload
                    action="/api/yardUpload/uploadFile"
                    data={{'path':'video'}}
                    onChange={handleChange}
                    accept="video/*"
                  >
                    { this.state.videoList>0?null:
                      <Button type="primary">
                        <Icon type='upload'/>
                        选择视频文件上传
                      </Button>
                    }
                  </Upload>
              </Col>
              <Col span={8} style={{"paddingRight":"10px"}}>
                {getFieldDecorator('pptId')(<Input type="hidden"/>)}
                  <Upload
                    action="/api/yardUpload/uploadFile"
                    data={{'path':'ppt'}}
                    onChange={handlePPTChange}
                    accept="application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  >
                    { this.state.pptList>0?null:
                      <Button type="primary">
                        <Icon type='upload'/>
                        选择PPT文件上传
                      </Button>
                    }
                  </Upload>
              </Col>
              <Col span={8} style={{"paddingRight":"10px"}}>
                {getFieldDecorator('learnId')(<Input type="hidden"/>)}
                  <Upload
                    action="/api/yardUpload/uploadFile"
                    data={{'path':'learn'}}
                    onChange={handleLearnChange}
                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  >
                    { this.state.learnList>0?null:
                      <Button type="primary">
                        <Icon type='upload'/>
                        选择PDF或Word文件上传
                      </Button>
                    }
                  </Upload>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator("content", {rules: [{required: true, message: '课程内容不能为空'}]})(<MyEditor placeholder="课程内容" onChangeContent={handleChangeContent}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
