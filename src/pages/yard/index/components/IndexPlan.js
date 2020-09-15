import React from "react";
import {Button, Empty, Table, Tabs, Tooltip} from "antd";

const { TabPane } = Tabs;

class IndexPlan extends React.Component {

  state = {
    addPlanVisible: false,
    courseId: 0,
    showVisible: false,
    course: {},

    addImageVisible: false,
  };

  render() {

    const {
      courseList,
      planFlagList,
    } = this.props;

    const {addImageVisible, courseId, course} = this.state;

    //console.log(dataSource)

    const buildTabPanes= () => {
      return courseList.map((item)=> {
        const data = buildCourse(item.courseList);
        return (
          <TabPane tab={`${item.classroom.gradeName}（${data.length}）`} key={item.classroomId}>
            <SingleCourse data={data}/>
          </TabPane>
        )
      })
    };

    const SingleCourse = ({data}) => {
      return (
        <div>
          {(data && data.length>0) ? <Table dataSource={data} columns={columns} rowKey="id" pagination={false} />:
          <Empty description={`恭喜，该类目下所有课程教案均已完成！`} />
          }

        </div>
      );
    };

    const buildCourse = (data) => {
      let res = [];
      data.map((item)=> {if(!writed(item.id)) {res.push(item);} return item;});
      return res;
    };

    const writed = (courseId) => {
      let res = false;
      planFlagList.map((item) => {
        if(item.courseId===courseId) {res = true;}
        return item;
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
            <Tooltip title="上传课程影像"><Button type="primary" shape="circle" icon="upload" onClick={()=>uploadImage(record)}/></Tooltip>
            <Tooltip title="填写教案"><Button type="primary" shape="circle" icon="edit" onClick={()=>writePlan(record.id)}/></Tooltip>
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

    const addOpts = {
      visible: addImageVisible,
      title: `添加课堂影像[${course.title}]`,
      maskClosable: false,
      courseId: courseId,
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
        <Tabs>
          {buildTabPanes()}
        </Tabs>

        {this.state.addPlanVisible && <AddPlan {...planOpts}/>}
        {this.state.showVisible && <ShowModal {...showOpts}/>}
        {addImageVisible && <AddModal {...addOpts}/>}
      </div>
    );
  }
}

export default IndexPlan;
