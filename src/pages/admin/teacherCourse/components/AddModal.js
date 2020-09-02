import React from 'react';
import {Icon, message, Modal, Upload} from 'antd';
import {getLoginUser, getTeacherClassroom} from "../../../../utils/authUtils";

const { Dragger } = Upload;

export default class AddModal extends React.Component {
  state = {
    courseId: this.props.courseId
  };

  render() {

    const {
      onOk,
      record,
      courseId,
      ...modalProps
    } = this.props;

    const user = getLoginUser();
    console.log(courseId, user.username)
    const classroomList = getTeacherClassroom();
    console.log(classroomList)

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
        courseId: courseId,
        phone: user.username
      },
      action:"/api/app/upload/classImage",
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          //console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          // console.log(info);
          //const obj = info.file.response[0];

          // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>

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
