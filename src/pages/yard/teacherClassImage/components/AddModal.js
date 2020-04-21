import React from 'react';
import {Icon, message, Modal, Upload} from 'antd';

const { Dragger } = Upload;

export default class AddModal extends React.Component {
  state = {
    imageList: this.props.imageList
  };

  render() {

    const {
      onOk,
      record,
      ...modalProps
    } = this.props;

    console.log(record)

    const handleOk = (e) => {
      onOk();
    };

    const modalOpts = {
      ...modalProps,
      onOk: handleOk
    };

    const opts = {
      name: 'file',
      multiple: true,
      accept: "image/png, image/jpeg, image/gif, video/*",
      data: {
        /*recordId: record.id,
        actTitle: record.actTitle,
        actId: record.actId,
        address: record.address,
        holdTime: record.holdTime*/
      },
      action:"/api/upload/recordImage",
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

          // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const pushImage = (data) => {
      const imageList = this.state.imageList;
      this.setState({imageList: data.concat(imageList)});
      // console.log(this.state.imageList);
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        {/*<PictureWall fileListLength={20} onBeforeUpload={onBeforeUpload} accept="image/png, image/jpeg, image/gif" showMsg="上传图片" data={{'path':'abcdef'}} onFileChange={onFileChange}/>*/}

        <Dragger {...opts}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">点击这里或将图片拖到这里上传</p>
          <p className="ant-upload-hint">
            请选择图片文件上传，否则可能会导致未知异常
          </p>
        </Dragger>
      </Modal>
    );
  }
}
