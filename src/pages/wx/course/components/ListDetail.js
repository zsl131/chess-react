import React from 'react';
import ReactDOM from 'react-dom';
import styles from './detail.css';
import Link from 'umi/link';

export default class ListDetail extends React.Component {

  render() {

    const onClick = (item) => {
      console.log(item);
    }

    const dataSource = this.props.dataSource;
    return (
      <div>
        {
          dataSource.map((item)=> {
            return <Link to={`/wx/course/showDetail?id=${item.id}`}><div className={styles.singleDetailDiv} onClick={()=>onClick(item)}>{item.name}</div></Link>
          })
        }
      </div>
    )
  }
}
