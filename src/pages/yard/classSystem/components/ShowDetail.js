import React from 'react';
import {Card,Tabs,Button} from 'antd';
import {Player} from 'video-react';
import "video-react/dist/video-react.css"; // import css
import ShowPDFModal from '../../course/components/ShowPDFModal';
import request from "../../../../utils/request";

const TabPane = Tabs.TabPane;

export default class ShowDetail extends React.Component {

  state = {
    showPDFVisible: false,
    attachment:{}
  }

  render() {
    const {course, learn, ppt, video, detail} = this.props;

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
    }

    const handleShowPPT = () => {
      this.setState({attachment: ppt, showPDFVisible: true})
    }

    const handleShowLearn = () => {
      this.setState({attachment: learn, showPDFVisible: true})
    }

    return(
      <div>
        <div className="listHeader">
          <h3>课程体系内容检阅<b>（{detail.sectionNo}-{detail.name}）</b></h3>
        </div>

        {
          course?<Card>
            <h2>课程标题：{course.title}</h2>
            <p>学习目标：{course.learnTarget}</p>
            <p>适合：{course.grade}</p>
            <p style={{"borderTop":"1px #ddd solid"}}>&nbsp;</p>

            <Tabs defaultActiveKey="1">
              <TabPane tab="内容" key="1"><div dangerouslySetInnerHTML={{__html: course.content}}/></TabPane>
              {video && video.id && <TabPane tab="视频" key="2">
                <Player>
                  <source src={video.url} />
                </Player>
              </TabPane>}
              {ppt && ppt.id && <TabPane tab="PPT" key="3"><Button icon="eye" type="primary" onClick={()=>handleShowPPT()}>查看PPT</Button></TabPane>}
              {learn && learn.id && <TabPane tab="学习单" key="4"><Button icon="eye" type="primary" onClick={()=>handleShowLearn()}>查看学习单</Button></TabPane>}
            </Tabs>
          </Card>:
          <Card>
            <span className="red">未分配课程</span>
          </Card>
        }

        {this.state.showPDFVisible && <ShowPDFModal {...showPDFOpts}/>}
      </div>
    );
  }
}
