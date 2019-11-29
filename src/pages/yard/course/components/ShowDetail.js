import React from 'react';
import {Card,Tabs,Button} from 'antd';
import {Player, ControlBar,BigPlayButton} from 'video-react';
import "video-react/dist/video-react.css"; // import css
import ShowPDFModal from '../../course/components/ShowPDFModal';
import request from "../../../../utils/request";
import "./my-video.css";

const TabPane = Tabs.TabPane;

export default class ShowDetail extends React.Component {

  state = {
    showPDFVisible: false,
    totalTime: 0, //秒
    startTime: 0, //秒
    curTime:0, //当前视频播放
    pauseTime: 0, //暂停时长
    pauseStart:0,
    paused: false,
    surplusCount: this.props.surplusCount, //剩余次数
    attachment:{}
  }

  componentDidMount() {
    // subscribe state change
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    // console.log(state, prevState);
    const currentTime = state.currentTime; //当前时间
    const totalTime = state.duration; //总时间
    const paused = state.paused; //是否暂停
    // const percent = currentTime / totalTime;
    // console.log(percent);
    this.checkPause(paused);
    if(!paused) { //不是暂停才执行
      this.setTotalTime(totalTime); //
      this.setStartTime();
      this.checkTime(currentTime);
    }
  }

  checkPause(paused) {
    const hasP = this.state.paused; //是否暂停
    if(hasP) {
      const pauseTime = this.state.pauseTime; //已经暂停的时长
      const pauseStart = this.state.pauseStart; //暂停的开始时间
      const now = parseInt(new Date().getTime()/1000); //现在时长
      const time = pauseTime + now - (pauseStart==0?now:pauseStart); //总暂停时长
      this.setState({pauseTime: time, pauseStart: parseInt(new Date().getTime()/1000)});
    } else {
      this.setState({pauseStart:0});
    }
    this.setState({paused:paused});
    //console.log("paused::", this.state.pauseTime);
  }

  checkTime(currentTime) {
    const totalTime = this.state.totalTime;
    const startTime = this.state.startTime;
    const curTime = this.state.curTime;
    if(totalTime>10 && curTime!=currentTime) { //视频总时长必须大于10秒， 且不是暂停
      const now = parseInt(new Date().getTime()/1000);
      const diff = now - startTime - this.state.pauseTime; //去除暂停时长
      if(diff>=totalTime*0.8 && currentTime>totalTime*0.8) { //如果停留时间超过80%且播放时长超过80%
        // console.log("diff:"+diff+",totalTime:"+totalTime+", currentTime:"+currentTime+",curTime:"+curTime);
        const {course} = this.props;
        request("videoRecordService.addRecord", {courseTitle:course.title,courseId:course.id,totalTime:parseInt(totalTime)+1}, true).then((req)=>{
          if(req.flag=='1') {
            this.setState({surplusCount: this.state.surplusCount-1});
          }
        });
      }
    }
    this.setState({curTime: currentTime}); //设置视频当前播放时间
  }

  setStartTime() {
    const startTime = this.state.startTime;
    if(startTime<=0) {
      this.setState({startTime: parseInt((new Date().getTime())/1000)});
    }
  }

  setTotalTime (val) {
    const totalTime = this.state.totalTime;
    if(totalTime<=0) {
      this.setState({totalTime: parseInt(val)+1});
    }
  }

  render() {
    const {course, learn, ppt, video, detail} = this.props;
    const {surplusCount} = this.state;
    const that = this;

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

    const onChangeTabs = (key)=> {
      if(key==='2') { //视频
        //this.refs.player.play();//
        setTimeout(() => {
          const player = that.refs.player;
          player && player.subscribeToStateChange(this.handleStateChange.bind(this));
        }, 2000);

      }
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

            <Tabs defaultActiveKey="1" onChange={onChangeTabs}>
              <TabPane tab="内容" key="1"><div dangerouslySetInnerHTML={{__html: course.content}}/></TabPane>
              {video && video.id && <TabPane tab={"视频（余 "+surplusCount+" 次）"} key="2">
                {surplusCount>0?
                  <Player autoPlay={true} ref="player" videoId="myVideo">
                    <source src={video.url}/>
                  </Player>:
                  <div><h2 style={{"textAlign":"center", "padding":"20px"}} className="red">视频播放次数已用完，请联系管理员处理！</h2></div>
                }
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
