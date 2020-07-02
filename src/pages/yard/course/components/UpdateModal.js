import React from 'react';
import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Tooltip,
  TreeSelect,
  Upload,
  message,
  Popconfirm
} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";
import request from "../../../../utils/request";
import CourseTag from "../../../../components/CourseTag";
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
const { Dragger } = Upload;

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
    gradeList:this.props.gradeList||[],
    fetching: false,
    treeData:[],
    fileList : [],
    attachmentList: this.props.attachmentList,
  };

  fetchTree = ()=> {
    if(this.state.treeData<=0) {
      request("classCategoryService.buildCategoryTree", {}, true).then((res) => {
        this.setState({treeData: res.data, fetching: false});
      });
    }
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;

    let item = this.props.item;

    if(item.imgUrl) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: item.imgUrl,
      }]
      this.setState({fileList: fileList});
    }

    const that = this;
    request("attachmentService.loadAttach", {cid: item.id}, true).then((res) => {
      //console.log(res);
      item.video = res.video;
      item.learn = res.learn;
      item.ppt = res.ppt;
     // console.log(item);
      that.setState({item: item});
      const videoList = item.video?[{ uid: -1,name: item.video.fileName, status: 'done', url: '', response: {result:{obj:item.video}}}]:[];
      const pptList = item.ppt?[{ uid: -1,name: item.ppt.fileName, status: 'done', url: '', response: {result:{obj:item.ppt}}}]:[];
      const learnList = item.learn?[{ uid: -1,name: item.learn.fileName, status: 'done', url: '', response: {result:{obj:item.learn}}}]:[];
      that.setState({videos: videoList, ppts: pptList, learns: learnList});
    });

    setFieldsValue(item);
    request("gradeService.listNoPage",{}, true).then((res)=> {
      // console.log(res)
      setFieldsValue({gradeId: item.gradeId+"", cid: item.cid+""});
      this.setState({gradeList: res.list});
    })
  }

  render() {
// console.log(this.state, this.props.item)
    const {getFieldDecorator, getFieldValue, setFieldsValue, validateFieldsAndScroll} = this.props.form;
    const {fetching, treeData} = this.state;
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

    const handleCancel = (e) => {
      e.preventDefault();
      this.props.onCancel();
    };

    const handleChangeContent = (html) => {
      // console.log("add===", html);
      setFieldsValue({"content": html});
    };

    const modalOpts = {
      ...this.props,
      onOk: handleOk,
      onCancel: handleCancel,
    };

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
    };

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
    };

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
        // console.log(file);
        setFieldsValue({"imgUrl": file.response});
      }
    };

    const props = {
      name: 'file',
      multiple: true,
      action: "/api/yardUpload/uploadAttachment",
      data: {'courseId':this.state.item.id},
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传成功.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
    };

    const removeAtta = (atta) => {
      request("classCourseAttaService.delete", {id:atta.id}, true).then((res)=> {
        message.success(res.message);
      });
    };

    const showAtta = (atta) => {
      // console.log(atta)
      window.location.href = atta.url;
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout} label="分类及标题">
            <Row>
              <Col span={6}>
                <FormItem>
                  {getFieldDecorator('cid', {rules: [{required: true, message: '请选择所在分类'}]})(
                    <TreeSelect
                      placeholder="所在分类"
                      notFoundContent={fetching ? <Spin size="small" /> : null}
                      onFocus={this.fetchTree}
                      showSearch
                      treeDefaultExpandAll={true}
                      searchPlaceholder="输入名称筛选"
                      treeNodeFilterProp="title"
                      style={{ width: '98%' }}
                    >
                      {
                        treeData.map(item => {
                            return (
                              <TreeNode value={item.category.id} title={item.category.name} key={item.category.id} disabled>
                                {
                                  item.children.map(e => <TreeNode value={e.id} title={e.name} key={e.id}/>)
                                }
                              </TreeNode>
                            )
                          }
                        )
                      }
                    </TreeSelect>
                  )}
                </FormItem>
              </Col>
              <Col span={18}>
                <FormItem>
                  {getFieldDecorator('title', {rules: [{required: true, message: '课程标题不能为空'}]})(<Input placeholder="输入课程标题"/>)}
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="适合">
            <Row>
              <Col span={5} style={{"textAlign":'right', "paddingRight":"10px"}}>
                <Tooltip placement="topLeft" title="选择适合的年级">
                  {getFieldDecorator("gradeId")(
                    <Select
                      placeholder="选择年级"
                      style={{ width: '120px' }}
                    >
                      {this.state.gradeList.map(d => <Option key={d.id}>{d.name}</Option>)}
                    </Select>
                  )}
                </Tooltip>
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
          <FormItem {...formItemLayout} label="学习目标">
            <Row>
              <Col span={6}>
                <Tooltip placement="topLeft" title="上传封面图片">
                  <PictureWall onBeforeUpload={onBeforeUpload} fileList={this.state.fileList} accept="image/png, image/jpeg, image/gif" showMsg="封面图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
                  {getFieldDecorator('imgUrl')(<Input type="hidden"/>)}
                </Tooltip>
              </Col>
              <Col span={18}>
                <Tooltip placement="topLeft" title="输入课程学习目标">
                  {getFieldDecorator('learnTarget')(<TextArea placeholder="输入课程学习目标" rows={3}>&nbsp;</TextArea>)}
                </Tooltip>
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

          <FormItem {...formItemLayout} label="其他附件">
            <Row>
              <Col span={24} style={{"paddingRight":"10px"}}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">上传其他附件</p>
                  <p className="ant-upload-hint">
                    如材料清单等其他文件
                  </p>
                </Dragger>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{"paddingRight":"10px"}}>
                {
                  this.state.attachmentList.map((atta)=> {
                    return (
                      <Input disabled={true} onClick={()=>showAtta(atta)}
                             addonAfter={<div><Icon type="eye" onClick={()=>showAtta(atta)}/>&nbsp;&nbsp;<Popconfirm title="确定删除此附件吗？" onConfirm={()=>removeAtta(atta)}><Icon type="close" /></Popconfirm></div>}
                             defaultValue={atta.name} />
                    )
                  })
                }
              </Col>
            </Row>
          </FormItem>

          <FormItem {...formItemLayout} label="课程标签">
            {getFieldDecorator('courseTags')(<CourseTag cid={this.props.item.id}/>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("content", {rules: [{required: true, message: '课程内容不能为空'}]})(<MyEditor content={this.props.item.content} onChangeContent={handleChangeContent}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
