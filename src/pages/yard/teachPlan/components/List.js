import React from 'react';
import {Button, Icon, Menu, Pagination, Popconfirm, Table, Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import {Link} from "react-router-dom";

const List = ({
                onPageChange,
                totalElement,
                showDetail,
                ...listOpts
              }) => {

  const columns = [{
    title: '教师',
    // dataIndex: 'schoolName'
    render: (record)=> {
      return (
        <div><p>{record.schName}</p><p>{record.teaName}[{record.teaPhone}]</p></div>
      )
    }
  }, {
    title: '课程',
    render:(record) => {
      return (
        <div><p><span className="red">[{record.planYear}]</span>{record.sname}</p><p>{record.courseTitle}</p></div>
      )
    }
  }/*, {
    title: '教案',
    render:(record) => {
      return (
        <div>
          <p>{record.blockName}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }*/, {
    title: '操作',
    render: (text, record) => {
      return (
        <span><Tooltip title="点击查看详情"><Button type="primary" shape="circle" icon="eye" onClick={()=>showDetail(record)}/></Tooltip></span>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  };

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default List;
