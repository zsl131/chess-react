import React from 'react';
import {Pagination, Table, Button, Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
                onDelConfirm,
                onUpdate,
                onPageChange,
                setField,
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
    title: '版本',
    // dataIndex: 'createTime'
    render: (record) => {
      return (
        <div>
          <p>版本：{record.version}</p>
          <p>时间：{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: "更新标记",
    render:(record)=> {
      return (
        <p><Tooltip placement="top" title="设置是否可更新"><Button icon={record.status==="1"?"check":"close"} type={record.status==="1"?"danger":"default"} onClick={()=>setField({field: "status", val:(record.status==='1'?"0":"1"), id: record.id})}/></Tooltip></p>
      )
    }
  }, {
    title: "状态",
    render:(record)=> {
      return (
        <p><Tooltip placement="top" title="设置此数据是否有效"><Button icon={record.flag==="1"?"check":"close"} type={record.flag==="1"?"primary":"default"} onClick={()=>setField({field: 'flag', val: (record.flag==='1'?"0":"1"), id: record.id})}/></Tooltip></p>
      )
    }
  }, {
    title: "下载地址",
    render:(record) => {
      return (
        <div>
          <p>WGT：{record.url}</p>
          <p>APK：{record.apkUrl}</p>
          <p>ISO：{record.isoUrl}</p>
        </div>
      )
    }
  }, {
    title: "更新说明",
    dataIndex: "note"
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts}/>
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
