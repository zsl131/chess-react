import React from 'react';
import {Card, Icon, Row, Col} from 'antd';
import Link from 'umi/link';

import styles from './myList.css';

const MyList = ({
  dataSource
}) => {

  const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  const SingleObj = ({item}) => (
      <Row className={styles.listRole}>
        <Col span={10}>
          <Link to={`/wx/activity/show/${item.id}`}>
            <img alt={item.id} src={item.imgUrl} className={styles.listImg}/>
          </Link>
        </Col>
        <Col span={14}>
          <Link to={`/wx/activity/show/${item.id}`}><h3 className={styles.title}>{item.title}</h3></Link>
          <p className={styles.guide}>{item.guide}</p>
          <IconText type="eye-o" text={item.readCount}/>，
          <IconText type="like-o" text={item.goodCount} />，
          <IconText type="message" text={item.commentCount} />
        </Col>
      </Row>
  )

  const ListObj = ({dataSource}) => {
    return (
      dataSource.map((item) => {
        return <SingleObj item={item} key={item.id}/>
      })
    )
  }

  return (
    <ListObj dataSource={dataSource}/>
  );
}

export default MyList;
