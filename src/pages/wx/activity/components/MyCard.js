import React from 'react';
import {Card} from 'antd-mobile';
import Link from 'umi/link';
import styles from './myCard.css';
import IconText from '../../../../components/IconText';

const MyCard = ({
  dataSource,
  loading
}) => {

  const SingleObj = (({item}) => {
    return (
      <div className={styles.singleObjDiv}>
      <Card className={styles.singleObj}>
        <Card.Header title={<Link to={`/wx/activity/show?id=${item.id}`} className={styles.titleHref}>{item.title}</Link>}/>
        <Card.Body>
          {item.imgUrl &&
            <Link to={`/wx/activity/show?id=${item.id}`}>
              <img alt={item.title} src={item.imgUrl} className={styles.listImg}/>
            </Link>
          }
          {item.guide && <p className={styles.guide}>{item.guide}</p>}
        </Card.Body>
        <Card.Footer content={<div><IconText type="eye-o" text={item.readCount}/>，<IconText type="like-o" text={item.goodCount} />，<IconText type="message" text={item.commentCount} /></div>}/>
      </Card>
      </div>
    );
  });

  const ListObj = ({dataSource}) => {
    return (
      dataSource.map((item) => {
        return (
          <SingleObj key={item.id} item={item}/>
        );
      })
    );
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <ListObj dataSource={dataSource}/>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyCard;
