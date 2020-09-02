import React from "react";
import {Card, Carousel, Icon, Tabs} from "antd";
import BeautyMarquee from 'react-beauty-marquee'

import styles from "./notice.css";
import Tab from "antd-mobile/es/tab-bar/Tab";

const { TabPane } = Tabs;

class IndexClassroom extends React.Component {

  state = {
  };

  render() {

    const {
      classroomList,
    } = this.props;

    //console.log(dataSource)

    const changeTabs = (e) => {
      //console.log(e)
    };

    const buildTabs = () => {
      return classroomList.map((room)=> {
        return (
          <TabPane tab={room.roomName} key={room.id}>
            {/*{buildTabCon(grade)}*/}
            这里是内容{room.roomName}
          </TabPane>
        )
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

    return(
      <Card title={"班级教案概况"}>
        <Tabs defaultActiveKey="1" onChange={changeTabs}>
          {buildTabs()}
        </Tabs>
      </Card>
    );
  }
}

export default IndexClassroom;
