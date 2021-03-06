import React from 'react';
import {Button, Icon, Modal, Popconfirm, Upload} from 'antd';
import request from "../../../../utils/request";
import {Player} from "video-react";


export default class AttachmentModal extends React.Component {

  state = {
    videoList: 0,
    attachmentList: [],
  };

  componentDidMount() {
    const {attachmentList} = this.props;
    this.setState({attachmentList: attachmentList});
  }

  render() {

    const {item} = this.props;
    const {attachmentList} = this.state;

   // console.log(item);

    const handleOk = (e) => {
      e.preventDefault();
    };

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    };

    const handleChange = (file) => {
      if(file.file.status==='done') {
        this.setState({videoList: 1})
        //console.log(file);
        const attId = file.file.response.result.obj.id;
        request("classCourseService.rebuildVideoIds", {id:item.id, attaId:attId, flag:'1'}, true);
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId}, true);
        request("classCourseService.rebuildVideoIds", {id:item.id, attaId:attId, flag:'0'}, true);
        this.setState({videoList: 0})
      }
    };

    const onDelete = (attaId) => {
      //console.log("--------------")
      request("classCourseService.rebuildVideoIds", {id:item.id, attaId:attaId, flag:'0'}, true).then((data)=> {
        //console.log(data);
        if(data) {
          let newArray = [];
          attachmentList.map((atta) => {
            if(atta.id!==attaId) {newArray.push(atta);}
          });
          this.setState({attachmentList: newArray});
        }
      });
    };

    return(
      <Modal {...modalOpts}>

        <div style={{"width":"100%", "float":"left", "paddingBottom":"12px"}}>
        {
          attachmentList && attachmentList.map((atta) => {
            return (
              <div style={{"width":"49%", "float": "left", "marginLeft":"1%", "marginTop":"12px"}}>
              <Player autoPlay={false} ref="player" videoId="myVideo" >
                <source src={atta.url}/>
              </Player>
                <Popconfirm title="确定删除此文件吗？此操作不可逆" onConfirm={()=>onDelete(atta.id)}><Button><Icon type="delete"/>删除视频</Button></Popconfirm>
              </div>
            )
          })
        }
        </div>

        <div style={{"paddingTop":"12px", "width":"100%", "display":"inline"}}>
        <Upload
          action="/api/yardUpload/uploadFile"
          data={{'path':'video'}}
          onChange={handleChange}
          accept="video/*"
        >
          {/*{ this.state.videoList>0?null:
                    <Button type="primary">
                      <Icon type='upload'/>
                      选择视频文件上传
                    </Button>
                  }*/}
          <Button type="primary">
            <Icon type='upload'/>
            选择视频文件上传
          </Button>
        </Upload>
        </div>
      </Modal>
    );
  }
}
