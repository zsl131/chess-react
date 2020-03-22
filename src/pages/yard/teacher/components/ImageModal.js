import React from 'react';
import {Form, Icon, Input, message, Modal, Upload} from 'antd';

const { Dragger } = Upload;
const FormItem = Form.Item;

export default class ImageModal extends React.Component {
  state = {
    imageList: [],
    content: '',
  };

  render() {

    const {
      onOk,
      item,
      ...modalProps
    } = this.props;

    //console.log(item.id)

    const handleOk = (e) => {
      onOk();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const opts = {
      name: 'files',
      multiple: true,
      accept: "image/png, image/jpeg, image/gif, video/*",
      data: {
        teaId: item.id,
        content: this.state.content
      },
      action:"/api/app/upload/classComment",
      onChange(info) {

        const { status } = info.file;
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          // console.log(info);
          const obj = info.file.response[0];
          let newList = [];
          newList.push(obj);
          pushImage(newList); //更新数据

        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

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

    const pushImage = (data) => {
      const imageList = this.state.imageList;
      this.setState({imageList: data.concat(imageList)});
      // console.log(this.state.imageList);
    };

    const changeContent = (e) => {
      console.log(e.target.value)
      this.setState({content: e.target.value});
    };

    return(
      <Modal {...modalOpts} >
        {/*<PictureWall fileListLength={20} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="上传图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>*/}
        <FormItem {...formItemLayout} label="点评内容">
          <Input placeholder="输入点评内容" onChange={changeContent}/>
        </FormItem>
        <Dragger {...opts}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击这里或将图片/视频拖到这里上传</p>
          <p className="ant-upload-hint">
            请选择图片/视频文件上传，否则可能会导致未知异常
          </p>
        </Dragger>
      </Modal>
    );
  }
}
