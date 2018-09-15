import React from 'react';
import {Pagination, Table, Button,Popconfirm} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from "./list.css";

const List = ({
                onDelConfirm,
                onUpdate,
                updateProperty,
                onPageChange,
                totalElement,
                ...listOpts
              }) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const handleProperty = (id, field, value) => {
    updateProperty(id, field, value);
  }

  const columns = [{
    title: '图片',
    render: (text, record) => {
      return (
        <a href={record.picPath} target="_blank" rel="noopener noreferrer"><img src={record.picPath} alt={record.title} className={styles.avatarImg}/></a>
      )
    }
  }, {
    title: '标题',
    // dataIndex: 'title'
    render:(record) => {
      return (
        <div>
          <p>{record.title}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: '属性',
    render:(record) => {
      return (
        <p>
          <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "status", record.status==='1'?"0":"1")} title={`确定设置状态为[${record.status==='1'?"隐藏":"显示"}]吗？`}>{record.status==='1'?<Button type="primary">显示</Button>:<Button>隐藏</Button>}</Popconfirm>
          <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "isTop", record.isTop==='1'?"0":"1")} title={`确定设置为[${record.isTop==='1'?"不置顶":"置顶"}]吗？`}>{record.isTop==='1'?<Button type="primary">置顶</Button>:<Button>不置顶</Button>}</Popconfirm>
            <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "needSend", record.needSend==='1'?"0":"1")} title={`确定设置为[${record.needSend==='1'?"关注不推送":"关注推送"}]吗？`}>{record.needSend==='1'?<Button type="primary">关注推送</Button>:<Button>关注不推送</Button>}</Popconfirm>
        </p>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.title} {...delOpts}/>
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
