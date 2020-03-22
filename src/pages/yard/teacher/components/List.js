import React from 'react';
import {Button, Icon, Menu, Pagination, Popconfirm, Table, Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import {Link} from "react-router-dom";

const List = ({
                onDelConfirm,
                onUpdate,
                handleVideoCount,
                authGradeRole,
                setGrade,
                onPageChange,
                initPwd,
                setIsTest,
                onUploadComment,
                totalElement,
                ...listOpts
              }) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '所在学校',
    dataIndex: 'schoolName'
  }, {
    title: '姓名',
    render:(record) => {
      return (
        <p>{record.name}[{record.sex === '1'?'男':'女'}]</p>
      )
    }
  }, {
    title: '联系方式',
    render:(record) => {
      return (
        <div>
          <p>{record.phone}[{record.hasBind === '0'?<span className="red">未绑定</span>:<span className="blue">已绑定</span>}]</p>
          <p>{record.identity}</p>
        </div>
      )
    }
  }, {
    title: "备注",
    dataIndex: "remark",
  }, {
    title: '密码',
    render: (record) => {
      return <Popconfirm title="确定将密码初始化为手机号码后6位吗？" onConfirm={()=>initPwd(record)}><Button>重置</Button></Popconfirm>
    }
  }, {
    title: '测试',
    render:(record)=>{return <Tooltip placement="top" title="是否为测试教师用户"><Button icon={record.isTest==="1"?"check":"close"} type={record.isTest==="1"?"danger":"default"} onClick={()=>setIsTest(record)}/></Tooltip>}
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts}>
          <Menu.Item>
            <span onClick={()=>onUploadComment(record)}><Icon type="upload"/> 课堂点评</span>
          </Menu.Item>
          <Menu.Item>
            <span onClick={()=>handleVideoCount(record)}><Icon type="eye"/> 视频播放次数</span>
          </Menu.Item>
          <Menu.Item>
            <span onClick={()=>authGradeRole(record)}><Icon type="team"/> 授权年级角色</span>
          </Menu.Item>
        </ListOperator>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
