import React from 'react';
import {Menu, Pagination, Table, Icon} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import {Link} from 'react-router-dom';
import styles from './list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  onShow,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '标题',
    // dataIndex: 'title'
    render: (text, record) => {
      return (<a href="javascript:;" onClick={()=>{onShow(record.id)}}>{record.title}</a>);
      // return (<span>-</span>);
    }
  }, {
    title: '所属部门',
    dataIndex: 'depName',
  }, {
    title: '状态',
    render: (text, record) => {
      return (record.status === '1'?<span className={styles.show}>显示</span>:<span className={styles.hidden}>隐藏</span>)
    }
  }, {
    title: '报名',
    render: (text, record) => {
      return (record.canJoin === '1'?<span className={styles.show}>可报名</span>:<span className={styles.hidden}>不可报名</span>)
    }
  }, {
    title: '创建时间',
    // dataIndex: 'createTime'
    render: (record) => {
      return (<span title={record.createTime}>{record.createDate}</span>);
    }
  }, {
    title: '流量',
    dataIndex: 'readCount'
  }, {
    title: '点赞',
    dataIndex: 'goodCount'
  }, {
    title: '评论',
    dataIndex: 'commentCount'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator key={record.id} id={record.id} delName={record.title} {...delOpts}>
          {
            record.canJoin==='0'?
          <Menu.Item key={record.id + 10}>
            {/*<span onClick={()=>onJoin(record)}><Icon type="smile-o"/> 开展活动</span>*/}
            <Link to={`/admin/activity/record?actId=${record.id}`}><Icon type="smile-o"/> 开展活动</Link>
          </Menu.Item>:""
          }
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
