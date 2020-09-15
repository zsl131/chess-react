import React from 'react';
import {Button, Dropdown, Icon, Menu, message, Modal, Popconfirm, Upload} from 'antd';
import {getLoginUser, getTeacherInfo} from "../../../../utils/authUtils";
import request from "../../../../utils/request";
import {Player} from "video-react";

import styles from "./image.css";

const { Dragger } = Upload;

export default class AddModal extends React.Component {
  state = {
    courseId: this.props.courseId,
    roomId: this.props.roomId,
    roomList: [],
    canLoad: true,
    imageList: [],
    canUpload: !!this.props.roomId,
    classroomList: [],
    canLoadRoom: true,
  };

  render() {

    const {
      onOk,
      record,
      courseId,
      classroomId,
      ...modalProps
    } = this.props;

    const {canLoad, roomId, canUpload,imageList, canLoadRoom, classroomList} = this.state;

    const user = getLoginUser();
    //console.log(courseId, user.username)
    // const classroomList = getTeacherClassroom();
    const teacher = getTeacherInfo();
    if(canLoadRoom) {
      request("teachPlanService.queryClassroom", {courseId: courseId, teaId: teacher.id, classroomId: classroomId}, true).then((res) => {
        //console.log(res)
        const list = res.classroomList;
        this.setState({classroomList: list, canLoadRoom: false});
        //console.log(list && list.length===1)
        if(list && list.length === 1) {
          const room = list[0];
          this.setState({roomId: room.id, canUpload: true});
        }
      });
    }
    //console.log(classroomList)

    const loadImages = (curRoomId) => {
      request("classImageService.queryByTea", {courseId: courseId, teaId: teacher.id, roomId: curRoomId}, true).then((res)=> {
        //console.log(res)
        this.setState({imageList: res.imageList});
      });
    };

    if(canLoad && canUpload) {
      loadImages(roomId);
      this.setState({canLoad: false});
    }


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
        phone: user.username,
        roomId: roomId,
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

    //console.log(canUpload, roomList)

    const changeRoom = (room) => {
      this.setState({roomId: room.id, canUpload: true, imageList: []});
      //console.log(room)
      loadImages(room.id);
    };

    const dropdown = (item) => {
      return (
        <Menu>
          <Menu.Item><Popconfirm placement="bottom" title={"确定删除此影像吗？删除后无法恢复"} onConfirm={()=>deleteImg(item)}>点这里可删除此影像</Popconfirm></Menu.Item>
        </Menu>
      )
    };

    const deleteImg = (item) => {
      request("classImageService.deleteByTea", {id: item.id, teaId: teacher.id}, true).then((res)=> {
        //console.log(res)
        message.success(res.message);
        if(res.flag==='1') { //表示删除成功
          removeImg(item);
        }
        this.setState({imageList: res.imageList});
      });
    };

    const removeImg = (item) => {
      /*let list = imageList;
      console.log(imageList)
      list.splice(list.findIndex(item => item.id === id), 1);
      console.log(list)
      //this.setState({imageList: list});*/
      loadImages(item.roomId)
    };

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>

        <div style={{"paddingBottom": "15px"}}>
          <b>选择相应班级：</b>
          {classroomList &&
            classroomList.map((item)=> {
              return (
                <span><Button onClick={()=>changeRoom(item)} type={item.id===roomId?"primary":"default"}>{item.roomName}</Button> &nbsp;&nbsp;</span>
              )
            })
          }
        </div>

        {
          canUpload && <Dragger {...opts}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击这里或将图片/视频拖到这里上传</p>
            <p className="ant-upload-hint">
              请选择图片/视频文件上传，否则可能会导致未知异常
            </p>
          </Dragger>
        }

        <div className={styles.imageDiv}>
          {(imageList&&imageList.length>0)?imageList.map((item)=> {
            const type = item.fileType;
            return (
              <Dropdown overlay={dropdown(item)}>
                {type==='1'?<div className={styles.singleDiv}><a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"><img className={styles.image} src={item.url}/></a></div>:
                <div className={styles.singleDiv}>
                  <Player autoPlay={false} ref="player" videoId="myVideo">
                    <source src={item.url}/>
                  </Player>
                </div>}
              </Dropdown>
            )
          }):""}
        </div>

      </Modal>
    );
  }
}
