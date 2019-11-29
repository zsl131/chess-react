import React from 'react';
import {Tooltip, Modal, InputNumber, Table, Tree, Row, Col, message} from 'antd';
import styles from "./leftTree.css"

const TreeNode = Tree.TreeNode;

export default class TeacherCountModal extends React.Component {

  state = {
    expandedKeys: [],
    searchValue: '',
    expandAll: false,
    autoExpandParent: true,
    currentValue: 0,
    data:[],
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  componentDidMount() {
  }

  render() {

    const {countTree, saveCount} = this.props;

    const buildTitle = (oldTitle) => {
      const searchValue = this.state.searchValue;
      const index = oldTitle.indexOf(searchValue);
      const beforeStr = oldTitle.substr(0, index);
      const afterStr = oldTitle.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{oldTitle}</span>;
      return title;
    }

    const menus = countTree.map((obj) => {
      return (
        <TreeNode title={buildTitle(obj.systemName + "("+ obj.data.length +")")} key={obj.systemId} >
          {
            obj.data.map((c)=>{return (<TreeNode disabled={true} title={buildTitle(c.courseTitle)} key={"detail_"+`${c.courseId}`}/>)})
          }
        </TreeNode>
      );
    });

    const handlerSelect = (key, e) => {
      const rootId = parseInt(key[0]);
      if(rootId) {
        // console.log(queryData(rootId));
        this.setState({data: queryData(rootId)});
      }
      // onSelect(key, e.node.props.title);
    }

    const queryData = (rid) => {
      let res = [];
      countTree.map((obj)=>{
        if(obj.systemId===rid) {res = obj.data;}
      })
      return res;
    }

    const columns = [{
      title: '课程',
      dataIndex: 'courseTitle'
    }, {
      title: '可播',
      // dataIndex: 'name'
      render:(record) =>{
        return (
          <span>{record.surplusCount} 次</span>
        )
      }
    }, {
      title: '增加',
      // dataIndex: 'url'
      render: (record) => {
        return (
          <span>
            <Tooltip title="输入次数后，点击其他地方保存"><InputNumber defaultValue={record.plusCount} onFocus={(e)=>onFocus(e)} onBlur={(e)=>onBlur(e, record)}/></Tooltip>
          </span>
        )
      }
    }];

    const onFocus = (e) => {
      // console.log(e);
      this.setState({currentValue: parseInt(e.target.defaultValue)});
    }

    const onBlur = (e, record) => {
      //console.log(e)
      const val = parseInt(e.target.defaultValue);
      if(val === this.state.currentValue) {
        message.warn("值无变化，不能提交保存");
      } else if(val===0) {
        message.warn("请输入有效的值，不能为0")
      } else if(record.surplusCount + val <0) {
        message.warn("增加次数加剩余次数之和不能小于0");
      } else {
        //console.log(val, record)
        record.count = val;
        saveCount(record);
      }
    }

    return(
      <Modal {...this.props} footer={null} style={{ "minWidth": '90%', top: 20 }}>
        <Row>
          <Col span={5} style={{"borderRight":"1px #ddd solid"}}>
            <Tree className={styles.tree} showLine={true} onSelect={handlerSelect}
                  defaultExpandAll={this.state.expandAll}
            >
              {menus}
            </Tree>
          </Col>
          <Col span={19}>
            <Table dataSource={this.state.data} columns={columns} pagination={{position:"both",pageSize:5}} footer={null}/>
          </Col>
        </Row>
      </Modal>
    );
  }
}
