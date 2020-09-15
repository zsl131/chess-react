import React from 'react';
import {Pagination, Table, Menu, Icon, Tooltip, Button} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
                onDelConfirm,
                onUpdate,
                handleImport,
                onPageChange,
                totalElement,
                setIsUse,
                ...listOpts
              }) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '学校名称',
    // dataIndex: 'name'
    render:(record)=> {
      return (
        <div>
          <p>{record.name}</p>
          <p>{record.address}</p>
        </div>
      )
    }
  }, {
    title: '联系人',
    // dataIndex: 'contacts'
    render:(record)=> {
      return (
        <div>
          <p>{record.contacts}</p>
          <p>{record.phone}</p>
        </div>
      )
    }
  }, {
    title: "状态",
    render:(record)=> {
      return (
        <div><p>{record.status === '1' ? <span className="blue">在合作</span>:<span className="red">未使用</span>}</p>
          <p>{record.systemName?record.systemName:"未配置体系"}</p>
        </div>
      )
    }
  }, {
    title: '使用',
    render:(record)=>{return <Tooltip placement="top" title="是否在正常使用"><Button icon={record.isUse==="1"?"check":"close"} type={record.isUse==="1"?"danger":"default"} onClick={()=>setIsUse(record)}/></Tooltip>}
  }, {
    title: "备注",
    dataIndex: "remark",
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts}>
          <Menu.Item key={record.id}>
            <span onClick={()=>handleImport(record)}><Icon type="plus"/> 导入教师</span>
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
