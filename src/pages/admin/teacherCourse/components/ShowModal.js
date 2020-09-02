import React from 'react';
import {Button, Modal, Tabs} from 'antd';
import {Player} from 'video-react';
import styles from './show.css';
import ShowPDFModal from "../components/ShowPDFModal";
import request from "../../../../utils/request";

export default class ShowModal extends React.Component {
  state = {
    showPDFVisible: false,
    attachment: {},
    canLoad: true,
    courseId: this.props.courseId,
    commentList: this.props.commentList,
    ppt: this.props.ppt,
    learn: this.props.learn,
    course: this.props.course,
    video: this.props.video,
    commentCount: this.props.commentCount
  };

  render() {
    let {...modalProps} = this.props;
    const {canLoad,courseId,commentList,ppt,learn,course,video,commentCount} = this.state;
    if(!course && canLoad) {
      request("appCourseService.loadCourse", {cid: courseId}, true).then((res)=> {
        console.log(res);
        this.setState({
          canLoad: false,
          commentList: res.commentList,
          ppt: res.ppt,
          learn: res.learn,
          course: res.course,
          video: res.video,
          commentCount: res.commentCount
        });
      });
    }

    const showPDFOpts = {
      maskClosable: false,
      visible: this.state.showPDFVisible,
      title: `PDF预览`,
      okText:'关闭窗口',
      cancelText: '取消',
      pdf: this.state.attachment,
      onOk:()=> {
        this.setState({showPDFVisible: false})
      },
      onCancel: () => {
        this.setState({showPDFVisible: false})
      }
    };

    const handleShowPPT = () => {
      this.setState({attachment: ppt, showPDFVisible: true})
    };

    const handleShowLearn = () => {
      this.setState({attachment: learn, showPDFVisible: true})
    };

    return(
      <Modal {...modalProps} style={{"top":"10px", "min-width":"60%"}}>
        {
          (video && video.id) &&
          <Player>
            <source src={video.url} />
          </Player>
        }
        {course && <div className={styles.contentDiv} dangerouslySetInnerHTML={{__html: course.content}}/>}

        {ppt && ppt.id && <Button icon="eye" type="primary" onClick={()=>handleShowPPT()}>查看PPT</Button>}
        &nbsp;&nbsp;
        {learn && learn.id && <Button icon="eye" type="primary" onClick={()=>handleShowLearn()}>查看学习单</Button>}

        {this.state.showPDFVisible && <ShowPDFModal {...showPDFOpts}/>}
      </Modal>
    );
  }
}

