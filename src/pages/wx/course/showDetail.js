import React from 'react';
import {connect} from 'dva';
import {Player} from 'video-react';
import {Helmet} from 'react-helmet';
import styles from './components/detail.css';

const ShowDetail = ({
  wxCourse,
  dispatch
}) => {
  console.log(wxCourse);
  const item = wxCourse.detail;
  const video = wxCourse.video;
  return (
    <div>
      <Helmet><title>{item.name}</title></Helmet>
      <h3 className={styles.title}>{item.name}</h3>
      <p className={styles.showDate}>
        {item.sname}
      </p>
      { video && video.id>0 &&
      <div style={{"padding": "0px 10px 12px 10px"}}>
        <Player>
          <source src={video.url} />
        </Player>
      </div>
      }

      <div className={styles.content} dangerouslySetInnerHTML={{__html: wxCourse.course.content}}></div>
    </div>
  )
}

export default connect(({wxCourse}) => ({wxCourse}))(ShowDetail);
