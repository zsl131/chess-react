import React from "react";
import {Button, Card, Carousel, Icon, Table, Tabs, Tooltip} from "antd";
import BeautyMarquee from 'react-beauty-marquee'

import styles from "./notice.css";
import Tab from "antd-mobile/es/tab-bar/Tab";
import AddPlan from "../../teachPlan/components/AddPlan";
import ShowModal from "../../../admin/teacherCourse/components/ShowModal";
import AddModal from "../../../admin/teacherCourse/components/AddModal";

const { TabPane } = Tabs;

class IndexClassroom extends React.Component {

  state = {
    addImageVisible: false,
    courseId: 0,
    addPlanVisible: false,
    showVisible: false,
    course: {},
    roomId: 0,
  };


  render() {

    const {
      classroomList,
      roomCourseList,
      imageList,
      planFlagList,
    } = this.props;

    const {addImageVisible, courseId, course, roomId} = this.state;

    if(!roomId && classroomList.length>0) {
      //console.log(classroomList)
      //console.log("--------->"+classroomList[0].id);
      this.setState({roomId: classroomList[0].id});
    }

    //console.log(imageList)

    const changeTabs = (e) => {
      // console.log(e)
      this.setState({roomId: parseInt(e)});
    };

    const writed = (courseId) => {
      let res = false;
      planFlagList.map((item) => {
        if(item.courseId===courseId) {res = true;}
        return item;
      });
      return res;
    };

    const hasImage = (courseId) => {
      let res = false;
      const data = getImageList();
      //console.log(data)
      data.map((item)=> {
        if(item.courseId === courseId) {res = true;}
      });
      return res;
    };

    //console.log(imageList, roomId)
    const getImageList = () => {
      let res = [];
      imageList.map((item)=> {
        if(item.classroomId === roomId) {res = item.imageList;}
      });
      return res;
    };

    const columns = [/*{
      title: '封面',
      render: (text, record) => {
        return (
          <a key={record.id} href={record.imgUrl} target="_blank" rel="noopener noreferrer"><img src={record.imgUrl} alt={record.id} className={styles.avatarImg}/></a>
        )
      }
    }, */{
      title: '标题',
      // dataIndex: 'id'
      render:(record)=> {
        return (
          <div>
            <p>{record.title}</p>
            <p>{writed(record.id)?<b className="blue">已写教案</b>:<b className="red">未写教案</b>}，
              {hasImage(record.id)?<b className="blue">已传影集</b>:<b className="red">未传影集</b>}
            </p>
          </div>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        return (
          <div>
            <Tooltip title="点击查阅"><Button type="primary" shape="circle" icon="eye" onClick={()=>showCourse(record)}/></Tooltip>
            <Tooltip title="上传课程影像"><Button type="primary" shape="circle" icon="upload" onClick={()=>uploadImage(record)}/></Tooltip>
            <Tooltip title="填写教案"><Button type="primary" shape="circle" icon="edit" onClick={()=>writePlan(record)}/></Tooltip>
          </div>
        );
      }
    }];

    const showCourse = (course) => {
      this.setState({showVisible: true, course: course, courseId: course.id});
    };

    const uploadImage = (course) => {
      this.setState({addImageVisible: true, course: course, courseId: course.id});
    };

    const writePlan =(course) => {
      this.setState({addPlanVisible: true, courseId: course.id, course: course});
    };

    const buildCon = (roomId) => {
      const courseList = queryCourse(roomId);
      //console.log(courseList)
      return (
        <Table dataSource={courseList} columns={columns} rowKey="id" pagination={false} />
      )
    };

    const queryCourse = (classroomId) => {
      let res = [];
      roomCourseList.map((item)=> {
        if(classroomId===item.classroomId) {res = item.courseList;}
      });
      return res;
    };

    const buildTabs = () => {
      return classroomList.map((room)=> {
        return (
          <TabPane tab={room.roomName} key={room.id}>
            {buildCon(room.id)}
          </TabPane>
        )
      });
    };

    const planOpts = {
      visible: this.state.addPlanVisible,
      title: "填写教案",
      courseId: this.state.courseId,
      maskClosable: false,
      writePlan: (flag)=> {
        //console.log(flag, planFlagList);
        //let tmp = planFlagList.push(flag);
        //this.setState({planFlagList: tmp});
        //this.setState({planFlagList: planFlagList.push(flag)});
      },
      onCancel: ()=> {
        closePlan();
      },
      onOk: () => {
        closePlan();
      }
    };

    const closePlan = () => {
      this.setState({addPlanVisible: false});
    };

    const showOpts = {
      visible: this.state.showVisible,
      title: `课程详情-${this.state.course.title}`,
      courseId: this.state.courseId,
      maskClosable: false,
      onCancel: ()=> {
        closeShow();
      },
      onOk: () => {
        closeShow();
      }
    };

    const closeShow =() => {
      this.setState({showVisible: false});
    };

    const addOpts = {
      visible: addImageVisible,
      title: `添加课堂影像[${course.title}]`,
      maskClosable: false,
      courseId: courseId,
      classroomId: roomId,
      onOk(datas) {
        closeImage();
      },
      onCancel() {
        closeImage();
      }
    };

    const closeImage = () => {
      this.setState({addImageVisible: false});
    };

    return(
      <div>
        <Card title={"班级教案概况"}>
          <Tabs onChange={changeTabs}>
            {buildTabs()}
          </Tabs>
        </Card>
        {this.state.addPlanVisible && <AddPlan {...planOpts}/>}
        {this.state.showVisible && <ShowModal {...showOpts}/>}
        {addImageVisible && <AddModal {...addOpts}/>}
      </div>
    );
  }
}

export default IndexClassroom;
