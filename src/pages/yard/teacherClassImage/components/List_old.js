import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from './list.css';
import {Player, ControlBar,BigPlayButton} from 'video-react';
import "video-react/dist/video-react.css"; // import css

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  ...listOpts
}) => {
  //console.log(dataSource);

  const html = () => {
    return (
      dataSource.map((item)=> {
        if(item.fileType==='1') {
          return <div className={styles.singleDiv}><img className={styles.image} src={item.url}/></div>
        } else if(item.fileType==='2') {
          return (
            <Player autoPlay={true} ref="player" videoId="myVideo">
              <source src={item.url}/>
            </Player>
          )
        }
      })
    )
  };

  return (
    <div className={styles.imageMain}>
      {html()}
    </div>
  );
};

export default List;
