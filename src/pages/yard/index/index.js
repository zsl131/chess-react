import React from 'react';
import { connect } from 'dva';
import IndexNotice from "./components/IndexNotice";
import {Card, Col, Row} from "antd";
import IndexClassroom from "./components/IndexClassroom";
import IndexPlan from "./components/IndexPlan";

const YardIndex = ({
  loading,
  yardIndex
}) => {

  // console.log(yardIndex);

  const isTeacher = sessionStorage.getItem("isTeacher");
  const systemList = JSON.parse(sessionStorage.getItem("systemList"));
  // console.log(isTeacher)

  // console.log(alertMessage());

  const noticeOpts = {
    dataSource: yardIndex.noticeList,
  };

  const clsOpts = {
    classroomList: yardIndex.classroomList,
    roomCourseList: yardIndex.roomCourseList,
    planList: yardIndex.planList,
    imageList: yardIndex.imageList,
  };

  const courseOpts = {
    courseList: yardIndex.courseDtoList,
    planList: yardIndex.planList,
  };

  return (
    <div style={{"paddingBottom":"12px"}}>
      <IndexNotice {...noticeOpts}/>
      <Row style={{"marginTop":"12px"}}>
        <Col span={12} style={{"paddingRight":"5px"}}>
          <Card title={"课程教案"}>
            <IndexPlan {...courseOpts}/>
          </Card>
        </Col>
        <Col span={12} style={{"paddingLeft":"5px"}}>
          <IndexClassroom {...clsOpts}/>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ loading, yardIndex }) => ({ loading, yardIndex }))(YardIndex);
