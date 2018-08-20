import React from 'react';
import {Menu, Pagination, Table, Dropdown, Icon,Popconfirm,Button,Modal,Form,Input} from 'antd';

@Form.create()
export default class List extends React.Component {
  state = {
    isReject: false,
    item: {}
  };

  onReject = (record) => {
    console.log(record);
    this.setState({isReject: true, item: record});
  };

  hiddenReject = () => {
    this.setState({isReject: false});
  };

  render() {
    const props = this.props;
    const {getFieldDecorator, validateFields} = props.form;
    const handleReject = () => {
      validateFields((errors, values) => {
        if(!errors) {
          this.props.onVerify(this.state.item.id, "2", values.reason);
          this.hiddenReject();
        }
      })
    }
    const handlePass = (record) => {
      this.props.onVerify(record.id, "1", "通过");
    }

    const menu = (record) => {
      return (
        <Menu>
          <Menu.Item key="0">
            <Popconfirm okType="primary" onConfirm={()=>handlePass(record)} title={`确定让【${record.stuName}】通过审核吗？`}><Button icon="check" type="default"> 确定通过</Button></Popconfirm>
          </Menu.Item>
          <Menu.Item key="1">
            <Button icon="minus" type="default" onClick={()=>this.onReject(record)}> 驳回申请</Button>
          </Menu.Item>
        </Menu>
      )};

    const columns = [{
      title: '头像',
      render: (record) => {
        return (
          <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer"><img src={record.avatarUrl} alt={record.nickname} style={{"width":"60px"}}/></a>
        )
      }
    }, {
      title: '活动标题',
      dataIndex: 'actTitle'
    }, {
      title: "活动时间",
      dataIndex: 'holdTime'
    }, {
      title: "部门",
      dataIndex: "depName"
    }, {
      title: '学生',
      render:(record) => {
        return (
          <div>
            <p><b>{record.stuName}</b>｜{record.sex === '1'?"男":"女"} ｜ <span>{record.ageName}</span> ｜ {record.schoolName}</p>
            <p>{record.phone}</p>
          </div>
        );
      }
    }, {
      title: '状态',
      render:(record) => {
        return (
          <div>
            <p>
              {record.status === '0' ? <span className="green">未审核</span> : (record.status === '1' ?<span className="blue">通过</span>:<span className="red">驳回：{record.rejectReason}</span>)}
            </p>
            {record.status === "0" &&
            <Dropdown overlay={menu(record)}>
            <span>
              审核 <Icon type="down" />
            </span>
            </Dropdown>
            }
            {
              record.status === '2' &&
              <Popconfirm okType="primary" onConfirm={()=>handlePass(record)} title={`确定让【${record.stuName}】通过审核吗？`}><Button type="default"> 重新通过审核</Button></Popconfirm>
            }
          </div>
        );
      }
    }, {
      title: '签到',
      render:(record) => {
        return (
          <div>
          {record.hasCheck === '1'?<span className="blue">已签到</span>:<span className="red">未签到</span>}
          </div>
        );
      }
    }];

    const handlePageChange = (pageNumber) => {
      props.onPageChange(pageNumber);
    }

    const pager = () => {
      return (
        <Pagination showQuickJumper defaultPageSize={15} total={props.totalElement} onChange={handlePageChange}/>
      );
    }

    const item = this.state.item;

    const modelOpts = {
      title: "驳回【"+item.stuName+"】",
      visible: this.state.isReject,
      onCancel: ()=>this.hiddenReject(),
      onOk: () => handleReject()
    }

    return (
      <div>
        <Table {...props} columns={columns} rowKey="id" pagination={false} footer={pager}/>
        {this.state.isReject && <Modal {...modelOpts}>
          <Form layout="inline">
            <Form.Item>
              {getFieldDecorator("reason", {rules: [{required: true, message: '请输入驳回原因'}]})(<Input placeholder="输入驳回原因" style={{"width":"440px"}}/>)}
            </Form.Item>
          </Form>
        </Modal>}
      </div>
    );
  }
}

