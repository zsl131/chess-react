import React from 'react';
import {Button, Checkbox, List, Modal} from 'antd-mobile';
import styles from './listStudent.css';
import AddStudentModal from './AddStudentModal';

const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
class ListStudent extends React.Component {

  state = {
    disabled: true,
    selectedList: [],
    addVisible: false,
  }

  handleChange = (value, e) => {
    e.preventDefault();
    const checked = e.target.checked;
    let tempList = this.state.selectedList;
    if(checked) {tempList.push(value);}
    else {
      tempList.splice(tempList.findIndex(item => item.id === value.id), 1); //从数组中移除
    }
    this.modifyState(tempList.length<=0, tempList);
  }

  checkboxChecked = (item) => {
    let result = false;
    this.state.selectedList.map((obj)=> {
      if(obj.id === item.id) {
        result = true;
      }
    })
    return result;
  }

  modifyState = (disabled, selectedList) => {
    this.setState({disabled: disabled, selectedList: selectedList});
  }

  handleAddStudent = () => {
    this.setState({addVisible: true});
  }

  getObjIds = () => {
    let objIds = [];
    this.state.selectedList.map((item) => {
      objIds.push(item.id);
    })
    return objIds;
  }

  handleDelete = () => {
    alert("批量删除学生信息", "确定删除所选学生信息吗？", [{text: "关闭"}, {
      text: "确定删除", onPress: () => {this.props.deleteBatch(this.getObjIds());}
    }])
  }

  handleApply = () => {
    alert("批量报名参加活动", "确定为所选学生报名参加活动吗？", [{text: "关闭"}, {
      text: "确定报名", onPress: () => {this.props.applyBatch(this.getObjIds());}
    }])
  }

  render() {

    const SingleStudent = ({item}) => {
      return (
        <CheckboxItem key={item.id} defaultChecked={this.checkboxChecked(item)} multipleLine onChange={(e) => this.handleChange(item, e)}>
          {item.name}
          <Brief >
            {item.sex ==='1'?"男":"女"} ｜ {item.ageName} | {item.schoolName} | {item.phone}
          </Brief>
        </CheckboxItem>
      );
    }

    const dataSource = this.props.dataSource;

    const addStuOpts = {
      visible: this.state.addVisible,
      maskClosable: true,
      onClose: () => {this.setState({addVisible: false})},
      onAdd: (stu) => {
        this.props.addStudent(stu);
        this.setState({addVisible: false});
      }
    }

    return (
      <div className={styles.mainContainer}>
        <List renderHeader={() => {return (<div><span>学生信息</span><Button size="small" type="ghost" onClick={() => {this.handleAddStudent()}} inline style={{"float":"right", "marginTop":"-5px"}}>增加</Button></div>)}}>
          {
            dataSource.map((item) => {
              return <SingleStudent item={item} key={item.id}/>
            })
          }
        </List>
        <div className={styles.optDiv}>
          <Button size="small" inline type="warning" onClick={this.handleDelete} className={styles.optBtn} disabled={this.state.disabled}>删除</Button>
          <Button size="small" inline type="primary" onClick={this.handleApply} className={styles.optBtn} disabled={this.state.disabled}>报名</Button>
        </div>
        {this.state.addVisible && <AddStudentModal {...addStuOpts} {...this.props}/>}
      </div>
    );
  }
}

export default ListStudent;
