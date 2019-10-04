import React from 'react';
import {Button, Col, Icon, Modal, Row} from 'antd';

export default class TeacherGradeModal extends React.Component {

  state= {
    gradeIds:this.props.gradeIds
  };

  render() {

    const {gradeList, setGrade, item} = this.props;

    const onSetGrade = (obj) => {
      setGrade({tid: item.id, gid: obj.gid, flag: obj.flag});
      let newIds = this.state.gradeIds;
      if(newIds.includes(obj.gid)) {
        newIds.splice(newIds.findIndex(item => item === obj.gid), 1);
      } else {
        newIds.push(obj.gid);
      }
      this.setState({gradeIds: newIds});
    }

    return(
      <Modal {...this.props} footer={null}>
        <Row>
          <Col span={24}>
            <div className="listHeader">
              <h3><Icon type="bars"/> 年级列表<b>（点亮即授权）</b></h3>
            </div>
            {gradeList.map((grade)=> {
              return <span key={grade.id} style={{"margin":"5px", "float":"left"}}><Button onClick={()=>onSetGrade({flag:this.state.gradeIds.includes(grade.id)?"0":"1", gid: grade.id})} key={grade.id} type={this.state.gradeIds.includes(grade.id)?"primary":"default"}>{grade.name}</Button></span>
            })}
          </Col>
        </Row>
      </Modal>
    );
  }
}
