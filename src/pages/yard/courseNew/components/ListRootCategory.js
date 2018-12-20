import React from 'react';
import {Button, Icon, Pagination, Popconfirm, Popover, Table} from 'antd';

import UpdateModal from '../../classCategory/components/UpdateModal';
import AddModal from '../../classCategory/components/AddModal';

export default class ListRootCategory extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    item:{},
  }

  render() {
    const {
      onDelete,
      category,
      totalElements,
      addCategory,
      updateCategory,
      ...listOpts
    } = this.props;

    const columns = [{
      title: '序号',
      dataIndex: 'orderNo'
    }, {
      title: '分类名称',
      dataIndex: 'name'
    }, /*{
      title: '状态',
      // dataIndex: 'url'
      render: (record) => {
        return (
          record.status=='1'?<span className="blue">在使用</span>:<span className="red">已停用</span>
        )
      }
    }, */{
      title: '操作',
      render: (text, record) => {
        return (
          <div>
          <Button type="default" icon="edit" onClick={()=>handleUpdate(record)}>修改</Button>
          {/*<Popover content={operators(record)} title="相关操作" placement="bottom">
            <span className="ant-dropdown-link">
              操作 <Icon type="down" />
            </span>
          </Popover>*/}
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

    const pager = () => {
      return (
        <Pagination defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
      );
    }

    const handleAdd = () => {
      this.setState({addVisible: true})
    }

    const addOpts = {
      visible: this.state.addVisible,
      title: `添加课程分类【${(category && category.name)?category.name:"根目录"}】`,
      pid: category.id,
      // pname: classCategory.pname,
      onCancel: () => {
        this.setState({addVisible: false});
      },
      onOk : (obj) => {
        addCategory(obj)
        this.setState({addVisible: false});
      }
    }

    const updateOpts = {
      visible: this.state.updateVisible,
      title: `修改课程分类【${this.state.item.name}】`,
      item: this.state.item,
      onCancel:() => {
        this.setState({updateVisible: false})
      },
      onOk:(obj) => {
        updateCategory(obj);
        this.setState({updateVisible: false})
      }
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 科普分类管理<b>（{(category && category.name)?category.name:"根目录"}，{listOpts.dataSource.length}条数据）</b><span className="red">仅限2级分类</span></h3>
          <div className="listOperator">
            <Button type="primary" icon="plus" onClick={handleAdd}>添加课程分类</Button>
          </div>
        </div>
        <Table {...listOpts} columns={columns} pagination={false}/>
        {this.state.addVisible && <AddModal {...addOpts}/>}
        {this.state.updateVisible && <UpdateModal {...updateOpts}/>}
      </div>
    );
  }

}
