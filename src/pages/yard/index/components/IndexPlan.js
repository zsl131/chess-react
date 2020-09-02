import React from "react";
import {Button, Table, Tabs, Tooltip} from "antd";

import styles from "./notice.css";
import AddPlan from "../../teachPlan/components/AddPlan";
import ShowModal from "../../../admin/teacherCourse/components/ShowModal";

const { TabPane } = Tabs;

class IndexPlan extends React.Component {

  state = {
    addPlanVisible: false,
    courseId: 0,
    showVisible: false,
    course: {},
  };

  render() {

    const {
      courseList,
      planList,
    } = this.props;

    //console.log(dataSource)

    const buildTabPanes= () => {
      return courseList.map((item)=> {
        return (
          <TabPane tab={`${item.classroom.gradeName}（${item.courseList.length}）`} key={item.classroomId}>
            <SingleCourse {...item}/>
          </TabPane>
        )
      })
    };

    const SingleCourse = (item) => {
      return (
        <div>
          <Table dataSource={item.courseList} columns={columns} rowKey="id" pagination={false} />
        </div>
      );
    };

    const writed = (courseId) => {
      let res = false;
      planList.map((item) => {
        if(item.courseId===courseId) {res = true;}
        return item;
      });
      return res;
    };

    const columns = [{
      title: '封面',
      render: (text, record) => {
        return (
          <a key={record.id} href={record.imgUrl} target="_blank" rel="noopener noreferrer"><img src={record.imgUrl} alt={record.id} className={styles.avatarImg}/></a>
        )
      }
    }, {
      title: '标题',
      // dataIndex: 'id'
      render:(record)=> {
        return (
          <div>
            <p>{record.title}</p>
            <p>{writed(record.id)?<b className="blue">已写教案</b>:<b className="red">未写教案</b>}</p>
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
            <Tooltip title="上传课程影像"><Button type="primary" shape="circle" icon="upload" onClick={()=>uploadImage(record.id)}/></Tooltip>
            <Tooltip title="填写教案"><Button type="primary" shape="circle" icon="edit" onClick={()=>writePlan(record.id)}/></Tooltip>
          </div>
        );
      }
    }];

    const showCourse = (course) => {
      this.setState({showVisible: true, course: course, courseId: course.id});
    };

    const uploadImage = () => {

    };

    const writePlan =(courseId) => {
      this.setState({addPlanVisible: true, courseId: courseId});
    };

    const planOpts = {
      visible: this.state.addPlanVisible,
      title: "填写教案",
      courseId: this.state.courseId,
      maskClosable: false,
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

    return(
      <div>
        <Tabs>
          {buildTabPanes()}
        </Tabs>

        {this.state.addPlanVisible && <AddPlan {...planOpts}/>}
        {this.state.showVisible && <ShowModal {...showOpts}/>}
      </div>
    );
  }
}

export default IndexPlan;
