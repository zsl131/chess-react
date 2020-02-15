import React from 'react';
import {Button, Modal, Tabs} from 'antd';
import {Player} from 'video-react';
import styles from './show.css';
import ShowPDFModal from "../components/ShowPDFModal";

export default class ShowModal extends React.Component {
  state = {
    showPDFVisible: false,
    attachment: {}
  };

  render() {
    const {commentList, ppt, learn, course, video, commentCount, ...modalProps} = this.props;

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
        <div className={styles.contentDiv} dangerouslySetInnerHTML={{__html: course.content}}/>

        {ppt && ppt.id && <Button icon="eye" type="primary" onClick={()=>handleShowPPT()}>查看PPT</Button>}
        &nbsp;&nbsp;
        {learn && learn.id && <Button icon="eye" type="primary" onClick={()=>handleShowLearn()}>查看学习单</Button>}

        {this.state.showPDFVisible && <ShowPDFModal {...showPDFOpts}/>}
      </Modal>
    );
  }
}

