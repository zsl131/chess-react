import React from "react";
import {Button, Dropdown, Empty, Form, Icon, Menu, message, Modal, Popconfirm, Table, Tooltip} from "antd";
// import { DragableBodyRow } from '@/components/common/DragTable';
import {buildSortObj} from "@/utils/common";
import request from "../../../../utils/request";
import {getTeacherInfo} from "../../../../utils/authUtils";
import AddPlanContent from "./AddPlanContent";

import HTML5Backend from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {DragableBodyRow} from "../../../../components/common/DragTable";
import ShowPlan from "./ShowPlan";

const { confirm } = Modal;

@Form.create()
class AddPlan extends React.Component {

  state = {
    planList: [],
    canLoad: true,
    course:{},
    flag: false,
    planId: 0,
    planFlag: {},
    addVisible: false,
  };

  render() {

    const {
      courseId,
      onOk,
      writePlan,
      ...opts
    } = this.props;

    const {flag, planList, course, addVisible, planId, showVisible, planFlag} = this.state;

    const loadPlans = () => {
      request("teachPlanService.queryPlan", {teaId: teacher.id, courseId: courseId}, true).then((res)=> {
        //console.log(res);
        setDatas(res)
      })
    };

    // console.log(this.state.plan)
    const teacher = getTeacherInfo();
    if(this.state.canLoad) {
      loadPlans();
    }

    const setDatas = (obj) => {
      this.setState({planList: obj.planList, canLoad: false, course: obj.course, flag: obj.flag, planFlag: obj.planFlag});
      //setFieldsValue(plan);
    };

    const addPlan = () => {
      this.setState({addVisible: true, planId: 0});
    };

    const handleOk = (e) => {
      //onOk();
      request("teachPlanService.updateFlag", {teaId: teacher.id, courseId: courseId, flag: "1"}, true).then((res)=> {
        message.success(res.message);
        //console.log(res);
        this.setState({planFlag: res.planFlag});
        //writePlan(res.planFlag);
      })
    };

    const showConfirm = () => {
      if(!planList || planList.length<=0) {
        Modal.info({title: "提示", content: "你还没有添加任何知识点，不可以提交教案"});
      } else {
        confirm({
          title: '确定提交教案吗？',
          content: '请确保教案已经整理完成再提交哦。',
          okText: "确定提交", cancelText: "取消提交",
          onOk() {
            handleOk();
          },
          onCancel() {},
        });
      }
    };

    const modalOpts = {
      ...opts,
      footer:[
          <Button key="back" onClick={()=>this.props.onCancel()}>
            关闭
          </Button>,
          <Button key="submit" type="primary" onClick={()=>showConfirm()}>
            提交教案
          </Button>,
        ],
      onOk: handleOk
    };

    const addOpts = {
      visible: addVisible,
      title: `添加知识点[${course.title}]`,
      courseId: course.id,
      planId: planId,
      maskClosable: false,
      onOk: (data) => {
        //console.log(data);
        let list = planList;
        let index = list.findIndex(item => item.id === data.id);
        if(index>=0) {
          list.splice(index, 1, data);
        } else {
          list.push(data);
        }
        // list.push(data);
        this.setState({addVisible: false, planList: list});
      },
      onCancel: ()=> {
        this.setState({addVisible: false})
      }
    };

    const showOpts = {
      visible: showVisible,
      courseId: courseId,
      title: `查看教案`,
      maskClosable: false,
      onOk: ()=> {
        this.setState({showVisible: false});
      },
      onCancel: ()=> {
        this.setState({showVisible: false})
      }
    };

    const showPlan = () => {
      this.setState({showVisible: true});
    };

    const tableOpts = {
      dataSource: planList,
    };

    const components = {
      body: {
        row: DragableBodyRow,
      },
    };

    const handlerRow = (dragIndex, hoverIndex) => {
      const obj = buildSortObj(planList, dragIndex, hoverIndex);
      //console.log(obj);
      // changeOrderNo({type: "Carousel", data: obj});
      request("publicCommonService.changeOrderNo", {type: "TeachPlan", data: obj}, true).then((res)=> {
        // console.log(res);
        loadPlans();
      })
    };

    const plans = () => {
      return (
        <div>
          <p className="dark">可拖动数据行进行排序</p>
        <DndProvider backend={HTML5Backend}>
          <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={false}
                 components={components}
                 onRow={(record, index) => ({
                   index,
                   moveRow: handlerRow,
                 })}
          />
        </DndProvider>
        </div>
      );
    };

    const columns = [{
      title: '序号',
      dataIndex: 'orderNo'
    }, {
      title: '知识点',
      dataIndex: 'blockName'
    }, {
      title: '操作',
      dataIndex: "id",
      render: (text, record) => {
        return (
          <div>
            <Dropdown overlay={menus(record)}>
              <span className="ant-dropdown-link">
                操作 <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        );
      }
    }];

    const menus = (record) => {
      return (
        <Menu>
          <Menu.Item key="0"><span onClick={()=>handleUpdate(record)}><Icon type="edit"/> 修改</span></Menu.Item>
          <Menu.Item key="1"><Popconfirm okType="danger" onConfirm={()=>handleConfirm(record)} title={`确定删除[${record.blockName}]？此操作不可逆！`}><Icon type="close"/> 删除</Popconfirm></Menu.Item>
        </Menu>
      )
    };

    const handleUpdate = (item) => {
      //console.log(item)
      this.setState({planId: item.id, addVisible: true});
    };

    const handleConfirm = (item) => {
      //console.log(item)
      request("teachPlanService.delete", {id: item.id}, true).then((res)=> {
        //console.log(res);
        message.success(res.message);
        loadPlans();
      })
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        <p>对应课程：<span>【{(planFlag && planFlag.flag==='1')?<b className="blue">教案已提交</b>:<b className="yellow">教案未提交</b>}】</span><b className="red">{course.title}</b></p>
        <p style={{"paddingBottom":"6px"}}>
          <Tooltip title="点击这里添加知识点"><Button type="primary" onClick={()=>addPlan()} icon="plus">添加一个知识点</Button></Tooltip>&nbsp;&nbsp;
          <Tooltip title="点击这里查看已添加的知识点"><Button type="danger" onClick={()=>showPlan()} icon="eye">查看知识点</Button></Tooltip>
        </p>
        {(planList && planList.length>0) ? plans()
        :<Empty description="目前还没有已添加的知识点"/>}
        {addVisible && <AddPlanContent {...addOpts}/>}
        {showVisible && <ShowPlan {...showOpts}/>}
      </Modal>
    );
  }
}

export default AddPlan;
