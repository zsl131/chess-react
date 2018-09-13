import React from 'react';
import {Button, Col, Form, Icon, Input, Modal, Radio, Row, Tooltip, Upload} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    item: this.props.item,
    videoList: this.props.item.video?1:0,
    videos: [],
    pptList: this.props.item.ppt?1:0,
    ppts: [],
    learnList: this.props.item.learn?1:0,
    learns: [],
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    const item = this.props.item;
    //response.result.obj
    const videoList = item.video?[{ uid: -1,name: item.video.fileName, status: 'done', url: '', response: {result:{obj:item.video}}}]:[]
    const pptList = item.ppt?[{ uid: -1,name: item.ppt.fileName, status: 'done', url: '', response: {result:{obj:item.ppt}}}]:[]
    const learnList = item.learn?[{ uid: -1,name: item.learn.fileName, status: 'done', url: '', response: {result:{obj:item.learn}}}]:[]
    this.setState({videos: videoList, ppts: pptList, learns: learnList})
  }

  render() {
// console.log(this.state, this.props.item)
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
      // const videoId = getFieldValue("videoId");
      // const pptId = getFieldValue("pptId");
      // const learnId = getFieldValue("learnId");
      // const ids = (videoId?videoId:"")+","+(pptId?pptId:"")+","+(learnId?learnId:'');
      // request("attachmentService.deleteByIds", {ids:ids}, true);
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
      this.setState({videos:[file.file]})
      if(file.file.status==='done') {
        setFieldsValue({"videoId": file.file.response.result.obj.id});
        this.setState({videoList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId, courseId: this.state.item.id, fieldName: 'video'}, true);
        setFieldsValue({"videoId": ''});
        this.setState({videoList: 0, videos:[]})
      }
    }

    const handlePPTChange = (file) => {
      this.setState({ppts:[file.file]})
      if(file.file.status==='done') {
        setFieldsValue({"pptId": file.file.response.result.obj.id});
        this.setState({pptList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId, courseId: this.state.item.id, fieldName: 'ppt'}, true);
        setFieldsValue({"pptId": ''});
        this.setState({pptList: 0, ppts:[]})
      }
    }

    const handleLearnChange = (file) => {
      this.setState({learns:[file.file]})
      if(file.file.status==='done') {
        setFieldsValue({"learnId": file.file.response.result.obj.id});
        this.setState({learnList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId, courseId: this.state.item.id, fieldName: 'learn'}, true);
        setFieldsValue({"learnId": ''});

        this.setState({learnList: 0, learns:[]})
      }
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
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
                  fileList={this.state.videos}
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
                  fileList={this.state.ppts}
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
                  fileList={this.state.learns}
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
            {getFieldDecorator("content", {rules: [{required: true, message: '课程内容不能为空'}]})(<MyEditor content={this.props.item.content} onChangeContent={handleChangeContent}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
