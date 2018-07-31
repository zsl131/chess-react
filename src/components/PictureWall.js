import React from 'react';
import {Icon, Modal, Upload} from 'antd';

export default class PictureWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.fileList || [],
    fileListLength: this.props.fileListLength || 1,
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file, fileList, event }) => {
    // console.log("file:"+file, "event:"+event);
    // console.log("file:::", file);
    // console.log("event::", event);
    this.setState({ fileList });
    this.props.onFileChange(file);
  }

  handleBeforeUpload = (file) => {
    // console.log(file);
    return this.props.onBeforeUpload(file);
  }

  render() {
    const { previewVisible, previewImage, fileList, fileListLength } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">选择文件</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          {...this.props}
          action="/api/upload/uploadFile"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.handleBeforeUpload}
        >
          {fileList.length >= fileListLength ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
