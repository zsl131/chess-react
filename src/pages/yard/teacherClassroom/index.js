import React from 'react';
import {connect} from 'dva';
import {Icon, Tabs, Card, Button, Tooltip} from "antd";
import AddModal from "./components/AddModal";
import styles from "./index.css";

const { TabPane } = Tabs;

class TeacherClassroom extends React.Component {

  state = {
    addVisible: false,
    grade: {},
  };

  render() {
    const isTeacher = sessionStorage.getItem("isTeacher");
    const systemList = JSON.parse(sessionStorage.getItem("systemList"));

    const {dispatch} = this.props;
    const {gradeList, classroomList, config, teacher} = this.props.teacherClassroom;
    // console.log(gradeList);
    const buildTabs = () => {
      return gradeList.map((grade)=> {
        return (
          <TabPane tab={buildTabName(grade)} key={grade.id}>
            {buildTabCon(grade)}
          </TabPane>
        )
      });
    };

    const buildTabCon = (grade) => {
      return (
        <div>
          {buildRoom(grade)}
          <Tooltip title={`添加班级到【${grade.name}】`}>
            <Button onClick={()=>{this.setState({addVisible: true, grade: grade})}} icon="plus" type="primary"/>
          </Tooltip>
        </div>
      )
    };

    const buildRoom = (grade) => {
      return classroomList.map((item)=> {
        if(item.gradeId===grade.id) {
          return <span className={styles.singleRoom}><Button>{item.roomName}</Button></span>
        } else {
          return "";
        }
      });
    };

    const buildTabName = (grade) => {
      let name = grade.name;
      let count = 0;
      classroomList.map((item)=> {
        if(item.gradeId===grade.id) {count ++;}
        return item;
      });
      return name + "（"+count+"）";
    };

    const changeTabs = (e)=> {
      //console.log(e);
    };

    const setVisible = (flag) => {
      this.setState({addVisible: flag});
    };

    const addOpt = {
      visible: this.state.addVisible,
      title: `添加班级到【${this.state.grade.name}】`,
      config: config,
      grade: this.state.grade,
      teacher: teacher,
      onOk(data) {
        //console.log(data)
        dispatch({ type: 'teacherClassroom/addOrUpdate', payload: data }).then(() => {
          setVisible(false)
        });
      },
      onCancel() {
        setVisible(false);
      }
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="setting"/> 配置所教班级<b className="red">【{config.configYear}{config.term==='1'?"春季学期":"冬季学期"}】</b></h3>
        </div>
        <Card>
          <Tabs defaultActiveKey="1" onChange={changeTabs}>
            {buildTabs()}
          </Tabs>
        </Card>

        {this.state.addVisible && <AddModal {...addOpt}/>}
      </div>
    );
  }
}

export default connect(({ loading, teacherClassroom }) => ({ loading, teacherClassroom }))(TeacherClassroom);
