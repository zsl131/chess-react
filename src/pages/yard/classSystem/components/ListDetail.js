import React from 'react';
import {Button, Icon, Table, Tooltip,Popconfirm} from 'antd';
import UpdateDetailModal from '../components/UpdateDetailModal';
import AddDetailModal from '../components/AddDetailModal';
import Download from "./Download";

export default class ListDetail extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    item:{},
  }

  render() {
    const {
      system,
      addDetail,
      updateDetail,
      deleteSystem,
      ...listOpts
    } = this.props;

    const columns = [{
      title: '序号',
      dataIndex: 'orderNo'
    }, {
      title: '名称',
      // dataIndex: 'sectionNo'
      render:(record) => {
        return (
          <div>
            <p><span>{record.sectionNo}-{record.name}</span></p>
            <p>{record.inRange === '1'?<span className="blue">在课标范围</span>:<span className="red">不在课标范围</span>}</p>
          </div>
        )
      }
    }, {
      title: '对应课程',
      render:(record) => {
        return(
          record.courseId?
            <div>
              <p>标题：{record.courseTitle}</p>
              <p>目标：{record.courseTarget}</p>
            </div>:"未分配"

        );
      }
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <div>
          <Tooltip placement="top" title="修改体系内容">
          <Button type="default" icon="edit" onClick={()=>handleUpdate(record)}/>
          </Tooltip>
            <Tooltip placement="top" title="删除体系">
              <Popconfirm okType="danger" onConfirm={()=>deleteSystem(record)} title={`确定删除[${record.name}]？此操作不可逆！`}><Button type="default" icon="close"/></Popconfirm>
            </Tooltip>
          </div>
        );
      }
    }];

    const handleUpdate = (record) => {
      // onUpdate(record);
      this.setState({updateVisible: true, item: record})
    }

    const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber);
    }

    const handleAdd = () => {
      this.setState({addVisible: true})
    }

    const addOpts = {
      maskClosable: false,
      visible: this.state.addVisible,
      title: `添加体系内容到【${(system && system.name)?system.name:"根目录"}】`,
      sid: system.id,
      // pname: classsystem.pname,
      onCancel: () => {
        this.setState({addVisible: false});
      },
      onOk : (obj) => {
        // console.log(obj);
        addDetail(obj)
        this.setState({addVisible: false});
      }
    }

    const updateOpts = {
      maskClosable: false,
      visible: this.state.updateVisible,
      title: `修改体系内容【${this.state.item.name}】`,
      item: this.state.item,
      sid: system.id,
      onCancel:() => {
        this.setState({updateVisible: false})
      },
      onOk:(obj) => {
        updateDetail(obj);
        this.setState({updateVisible: false})
      }
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 课程体系内容管理<b>（{system.name}，{listOpts.dataSource.length}条数据）</b></h3>
          <div className="listOperator">
            <Download system={system}/>
            <Button type="primary" icon="plus" onClick={handleAdd}>添加体系内容</Button>
          </div>
        </div>
        <Table {...listOpts} columns={columns} pagination={false}/>
        {this.state.addVisible && <AddDetailModal {...addOpts}/>}
        {this.state.updateVisible && <UpdateDetailModal {...updateOpts}/>}
      </div>
    );
  }

}
